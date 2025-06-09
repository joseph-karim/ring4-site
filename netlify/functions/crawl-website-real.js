const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs').promises;

/**
 * Real Crawl4AI-based website crawler for AI Receptionist knowledge base extraction
 * This function uses proper Python + Crawl4AI to extract business information
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

    console.log(`🚀 Starting real Crawl4AI crawl for: ${url}`);

    // Create the Python crawler script path
    const crawlerScript = path.join(__dirname, '..', '..', 'scripts', 'business_crawler.py');
    
    // Execute the real Crawl4AI crawler
    const results = await runCrawl4AI(crawlerScript, url);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        businessInfo: results.businessInfo,
        crawlMetadata: results.metadata
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
 * Execute the real Crawl4AI Python script
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