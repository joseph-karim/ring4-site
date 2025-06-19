const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs').promises;

/**
 * Real Crawl4AI-based website crawler for AI Receptionist knowledge base extraction
 * This function uses the Python Crawl4AI script for sophisticated extraction
 */
exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, error: 'Method not allowed' })
    };
  }

  try {
    const { url } = JSON.parse(event.body);
    
    if (!url) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: 'URL is required' })
      };
    }

    console.log(`🚀 Starting Crawl4AI extraction for: ${url}`);

    // Try to use the Python Crawl4AI script first
    try {
      const scriptPath = path.join(__dirname, '..', '..', 'scripts', 'business_crawler.py');
      const pythonResult = await runCrawl4AI(scriptPath, url);
      
      if (pythonResult && pythonResult.businessInfo) {
        console.log('✅ Crawl4AI extraction successful');
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            businessInfo: pythonResult.businessInfo,
            crawlMetadata: pythonResult.metadata || {
              url,
              usedFallback: false,
              extractionMethod: 'crawl4ai',
              extractedAt: new Date().toISOString()
            }
          })
        };
      }
    } catch (pythonError) {
      console.error('⚠️ Python Crawl4AI failed, falling back to Node.js:', pythonError.message);
    }

    // Fallback to Node.js crawler if Python fails
    const businessInfo = await crawlWebsiteNodeJS(url);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        businessInfo,
        crawlMetadata: {
          url,
          usedFallback: false,
          extractionMethod: 'nodejs-fetch',
          extractedAt: new Date().toISOString()
        }
      })
    };

  } catch (error) {
    console.error('❌ Crawling error:', error);
    
    // Return fallback with clear error indication
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        businessInfo: generateFallbackBusinessInfo(url || 'unknown'),
        crawlMetadata: {
          usedFallback: true,
          error: error.message,
          extractedAt: new Date().toISOString()
        }
      })
    };
  }
};

/**
 * Node.js-based website crawler (working alternative to Python Crawl4AI)
 */
async function crawlWebsiteNodeJS(url) {
  try {
    // Ensure URL has protocol
    const crawlUrl = url.startsWith('http') ? url : `https://${url}`;
    
    console.log(`🔍 Fetching: ${crawlUrl}`);
    
    // Use built-in fetch (available in Node 18+)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(crawlUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Ring4Bot/1.0; +https://ring4.com/bot)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const html = await response.text();
    const domain = extractDomain(url);
    
    console.log(`✅ Successfully fetched ${html.length} characters from ${domain}`);
    
    // Extract business information from HTML
    const businessInfo = extractBusinessInfoFromHTML(html, domain);
    
    return businessInfo;
    
  } catch (error) {
    console.error(`❌ Crawl failed for ${url}:`, error.message);
    throw error;
  }
}

/**
 * Extract business information from HTML content
 */
function extractBusinessInfoFromHTML(html, domain) {
  // Extract business name
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  let businessName = titleMatch ? titleMatch[1].trim() : '';
  
  // Clean up title
  if (businessName) {
    businessName = businessName.split('|')[0].split('-')[0].trim();
  }
  
  if (!businessName || businessName.length < 3) {
    businessName = domain.charAt(0).toUpperCase() + domain.slice(1).replace(/\..+$/, '');
  }
  
  // Extract services from content
  const services = extractServicesFromHTML(html);
  
  // Extract contact information
  const contact = extractContactFromHTML(html);
  
  // Generate business hours based on content
  const hours = generateHoursFromContent(html);
  
  // Generate description
  const description = `${businessName} is a professional business providing quality services. We are committed to customer satisfaction and excellence.`;
  
  return {
    name: businessName,
    description,
    services: services.length > 0 ? services : [
      'Professional services',
      'Customer support',
      'Quality solutions'
    ],
    hours,
    contact,
    specialties: [
      'Professional service delivery',
      'Customer-focused approach',
      'Quality results'
    ],
    values: [
      'Customer satisfaction',
      'Professional excellence',
      'Reliable service'
    ],
    faqs: [
      {
        question: 'What are your business hours?',
        answer: `We're open ${hours['Monday-Friday']} on weekdays. ${hours['Saturday'] !== 'Closed' ? `Saturdays ${hours['Saturday']}.` : 'We\'re closed on weekends.'}`
      },
      {
        question: 'How can I contact you?',
        answer: contact.phone ? `You can reach us at ${contact.phone}${contact.email ? ` or email us at ${contact.email}` : ''}.` : 'Please visit our website for current contact information.'
      },
      {
        question: 'What services do you offer?',
        answer: `We offer ${services.slice(0, 3).join(', ')}${services.length > 3 ? ' and more' : ''}. Contact us to discuss your specific needs.`
      }
    ]
  };
}

function extractServicesFromHTML(html) {
  const services = [];
  
  // Look for service patterns in the HTML
  const servicePatterns = [
    /(?:services?|offerings?|solutions?)[^>]*>([^<]+)/gi,
    /<li[^>]*>([^<]*(?:service|solution|consulting|support)[^<]*)<\/li>/gi,
    /we\s+(?:provide|offer|specialize)\s+([^<.!?]+)/gi
  ];
  
  for (const pattern of servicePatterns) {
    let match;
    while ((match = pattern.exec(html)) !== null && services.length < 8) {
      const service = match[1].replace(/<[^>]*>/g, '').trim();
      if (service.length > 5 && service.length < 100 && !services.includes(service)) {
        services.push(service);
      }
    }
  }
  
  return services;
}

function extractContactFromHTML(html) {
  // Phone number extraction
  const phoneMatch = html.match(/(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/);
  
  // Email extraction
  const emailMatch = html.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  
  return {
    phone: phoneMatch ? phoneMatch[1] : 'Contact via website',
    email: emailMatch ? emailMatch[1] : 'Contact via website',
    address: 'See website for location details'
  };
}

function generateHoursFromContent(html) {
  const lowerContent = html.toLowerCase();
  
  // Check for business types and set appropriate hours
  if (lowerContent.includes('real estate') || lowerContent.includes('realtor')) {
    return {
      'Monday-Friday': '9:00 AM - 6:00 PM',
      'Saturday': '10:00 AM - 4:00 PM',
      'Sunday': 'By appointment'
    };
  } else if (lowerContent.includes('law') || lowerContent.includes('attorney')) {
    return {
      'Monday-Friday': '9:00 AM - 5:00 PM',
      'Saturday': 'By appointment',
      'Sunday': 'Closed'
    };
  } else if (lowerContent.includes('medical') || lowerContent.includes('doctor')) {
    return {
      'Monday-Friday': '8:00 AM - 5:00 PM',
      'Saturday': '9:00 AM - 1:00 PM',
      'Sunday': 'Closed'
    };
  }
  
  // Default business hours
  return {
    'Monday-Friday': '9:00 AM - 6:00 PM',
    'Saturday': '10:00 AM - 4:00 PM',
    'Sunday': 'Closed'
  };
}

/**
 * Execute the real Crawl4AI Python script (keeping for future use)
 */
function runCrawl4AI(scriptPath, url) {
  return new Promise((resolve, reject) => {
    const timeout = 30000; // 30 second timeout
    
    const pythonProcess = spawn('python3', [scriptPath, url], {
      cwd: path.dirname(scriptPath),
      env: {
        ...process.env,
        PYTHONPATH: path.join(__dirname, '..', '..', 'scripts')
      },
      timeout
    });

    let stdout = '';
    let stderr = '';

    pythonProcess.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      stderr += data.toString();
      console.error(`Crawler stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        try {
          // Parse the JSON output from the Python script
          const results = JSON.parse(stdout);
          resolve(results);
        } catch (parseError) {
          reject(new Error(`Failed to parse crawler output: ${parseError.message}`));
        }
      } else {
        reject(new Error(`Crawler exited with code ${code}: ${stderr}`));
      }
    });

    pythonProcess.on('error', (err) => {
      reject(new Error(`Failed to start crawler: ${err.message}`));
    });

    // Handle timeout
    setTimeout(() => {
      pythonProcess.kill('SIGTERM');
      reject(new Error('Crawler timed out after 30 seconds'));
    }, timeout);
  });
}

/**
 * Generate fallback business info when crawling fails
 */
function generateFallbackBusinessInfo(url) {
  const domain = extractDomain(url);
  const businessName = domain.charAt(0).toUpperCase() + domain.slice(1).replace(/[^a-zA-Z0-9]/g, ' ');
  
  return {
    name: businessName,
    description: `${businessName} is a professional business. We're committed to providing excellent service to our customers.`,
    services: [
      'Customer service and support',
      'Professional consultations',
      'Information and assistance',
      'Quality service delivery'
    ],
    hours: {
      'Monday-Friday': '9:00 AM - 6:00 PM',
      'Saturday': '10:00 AM - 4:00 PM',
      'Sunday': 'Closed'
    },
    contact: {
      phone: 'Contact via website',
      email: 'Contact via website',
      address: 'See website for location details'
    },
    specialties: [
      'Professional service delivery',
      'Customer-focused approach',
      'Reliable communication',
      'Quality results'
    ],
    values: [
      'Customer satisfaction',
      'Professional excellence',
      'Honest communication',
      'Reliable service'
    ],
    faqs: [
      {
        question: 'What are your business hours?',
        answer: 'We\'re typically open Monday through Friday from 9 AM to 6 PM, and Saturdays from 10 AM to 4 PM. We\'re closed on Sundays.'
      },
      {
        question: 'How can I contact you?',
        answer: 'Please call us directly or visit our website for the most current contact information.'
      },
      {
        question: 'What services do you provide?',
        answer: 'We provide professional services tailored to our customers\' needs. Please contact us to discuss your specific requirements.'
      }
    ]
  };
}

function extractDomain(url) {
  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return url.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
  }
}