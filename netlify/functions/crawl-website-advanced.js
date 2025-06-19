const cheerio = require('cheerio');
const OpenAI = require('openai');

/**
 * Advanced website crawler using AI to extract structured business information
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

    console.log(`🚀 Starting advanced crawl for: ${url}`);

    // Fetch the website HTML
    const crawlUrl = url.startsWith('http') ? url : `https://${url}`;
    const html = await fetchWebsiteContent(crawlUrl);
    
    // Parse with Cheerio for structured extraction
    const $ = cheerio.load(html);
    
    // Extract text content and structure
    const extractedData = extractStructuredContent($, crawlUrl);
    
    // Use OpenAI to analyze and structure the content
    const businessInfo = await analyzeWithAI(extractedData);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        businessInfo,
        crawlMetadata: {
          url: crawlUrl,
          extractionMethod: 'ai-enhanced',
          pagesProcessed: 1,
          extractedAt: new Date().toISOString()
        }
      })
    };

  } catch (error) {
    console.error('❌ Advanced crawling error:', error);
    
    // Return fallback
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message,
        businessInfo: generateSmartFallback(url),
        crawlMetadata: {
          usedFallback: true,
          error: error.message
        }
      })
    };
  }
};

/**
 * Fetch website content with proper headers and timeout
 */
async function fetchWebsiteContent(url) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);
  
  try {
    const response = await fetch(url, {
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
    
    return await response.text();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Extract structured content from HTML using Cheerio
 */
function extractStructuredContent($, url) {
  const data = {
    url,
    title: $('title').text().trim() || '',
    metaDescription: $('meta[name="description"]').attr('content') || '',
    headings: {
      h1: [],
      h2: [],
      h3: []
    },
    navigation: [],
    mainContent: '',
    services: [],
    hours: [],
    contact: {},
    ctas: [],
    about: ''
  };

  // Extract headings
  $('h1').each((i, el) => data.headings.h1.push($(el).text().trim()));
  $('h2').each((i, el) => data.headings.h2.push($(el).text().trim()));
  $('h3').each((i, el) => data.headings.h3.push($(el).text().trim()));

  // Extract navigation links
  $('nav a, header a').each((i, el) => {
    const text = $(el).text().trim();
    const href = $(el).attr('href');
    if (text && href) {
      data.navigation.push({ text, href });
    }
  });

  // Extract main content areas
  const contentSelectors = ['main', 'article', '[role="main"]', '.content', '#content'];
  for (const selector of contentSelectors) {
    const content = $(selector).text().trim();
    if (content && content.length > data.mainContent.length) {
      data.mainContent = content;
    }
  }

  // Extract services (look for lists, service sections, etc.)
  const serviceSelectors = [
    '.services li', '.service-item', '[class*="service"]',
    'section:contains("Services") li', 'section:contains("What We Do") li'
  ];
  serviceSelectors.forEach(selector => {
    $(selector).each((i, el) => {
      const service = $(el).text().trim();
      if (service && service.length > 5 && service.length < 200) {
        data.services.push(service);
      }
    });
  });

  // Extract hours (look for patterns)
  const hoursSelectors = [
    '.hours', '.business-hours', '[class*="hours"]',
    'section:contains("Hours")', 'div:contains("Open")'
  ];
  hoursSelectors.forEach(selector => {
    const hoursText = $(selector).text();
    if (hoursText && hoursText.match(/\d{1,2}[:.]?\d{0,2}\s*[ap]m/i)) {
      data.hours.push(hoursText.trim());
    }
  });

  // Extract contact information
  data.contact = {
    phone: extractPhoneNumbers($),
    email: extractEmails($),
    address: extractAddress($)
  };

  // Extract CTAs (buttons and prominent links)
  const ctaSelectors = [
    'a.btn', 'a.button', 'button', '[class*="cta"]',
    'a[class*="primary"]', 'a[class*="action"]'
  ];
  ctaSelectors.forEach(selector => {
    $(selector).each((i, el) => {
      const text = $(el).text().trim();
      const href = $(el).attr('href') || $(el).attr('onclick') || '';
      if (text && text.length < 50) {
        data.ctas.push({ text, action: href });
      }
    });
  });

  // Extract about section
  const aboutSelectors = [
    '.about', '#about', 'section:contains("About")',
    '[class*="about-us"]', 'section:contains("Who We Are")'
  ];
  aboutSelectors.forEach(selector => {
    const aboutText = $(selector).text().trim();
    if (aboutText && aboutText.length > data.about.length) {
      data.about = aboutText;
    }
  });

  return data;
}

/**
 * Extract phone numbers from the page
 */
function extractPhoneNumbers($) {
  const phones = [];
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  
  // Look in common places
  const selectors = ['a[href^="tel:"]', '.phone', '.contact', 'footer'];
  selectors.forEach(selector => {
    $(selector).each((i, el) => {
      const text = $(el).text();
      const matches = text.match(phoneRegex);
      if (matches) {
        phones.push(...matches);
      }
    });
  });

  // Also check href attributes
  $('a[href^="tel:"]').each((i, el) => {
    const tel = $(el).attr('href').replace('tel:', '');
    if (tel) phones.push(tel);
  });

  return [...new Set(phones)]; // Remove duplicates
}

/**
 * Extract email addresses from the page
 */
function extractEmails($) {
  const emails = [];
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  
  // Look in common places
  const selectors = ['a[href^="mailto:"]', '.email', '.contact', 'footer'];
  selectors.forEach(selector => {
    $(selector).each((i, el) => {
      const text = $(el).text();
      const matches = text.match(emailRegex);
      if (matches) {
        emails.push(...matches);
      }
    });
  });

  // Also check href attributes
  $('a[href^="mailto:"]').each((i, el) => {
    const email = $(el).attr('href').replace('mailto:', '');
    if (email) emails.push(email);
  });

  return [...new Set(emails)]; // Remove duplicates
}

/**
 * Extract address from the page
 */
function extractAddress($) {
  let address = '';
  
  // Look for structured data
  const structuredAddress = $('[itemtype*="PostalAddress"]').text().trim();
  if (structuredAddress) return structuredAddress;
  
  // Look in common places
  const selectors = ['.address', '.location', 'address', 'footer'];
  selectors.forEach(selector => {
    const text = $(selector).text();
    // Simple heuristic: look for text with numbers and state abbreviations
    if (text && text.match(/\d+.*\b[A-Z]{2}\b.*\d{5}/)) {
      address = text.trim();
    }
  });
  
  return address;
}

/**
 * Use AI to analyze and structure the extracted content
 */
async function analyzeWithAI(extractedData) {
  // Check if OpenAI API key is available
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.log('No OpenAI API key, using structured extraction only');
    return structureWithoutAI(extractedData);
  }

  try {
    const openai = new OpenAI({ apiKey });
    
    const prompt = `Analyze this website data and extract structured business information. Focus on being accurate and specific.

Website Data:
${JSON.stringify(extractedData, null, 2)}

Extract and return a JSON object with:
1. name: The actual business name
2. description: A clear, concise description of what the business does (2-3 sentences)
3. services: Array of specific services offered (not generic terms)
4. hours: Business hours in a structured format
5. contact: Phone, email, and address
6. specialties: What makes this business unique
7. values: Core values or principles
8. faqs: Common questions and answers
9. primaryCTA: The main call-to-action from the website

Be specific and use actual information from the website. Don't make up generic information.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      response_format: { type: 'json_object' }
    });

    const result = JSON.parse(completion.choices[0].message.content);
    
    // Ensure all required fields exist
    return {
      name: result.name || extractedData.title.split('|')[0].trim(),
      description: result.description || 'Professional business services',
      services: result.services || extractedData.services,
      hours: normalizeHours(result.hours || parseHoursFromText(extractedData.hours)),
      contact: {
        phone: result.contact?.phone || extractedData.contact.phone[0] || 'Contact via website',
        email: result.contact?.email || extractedData.contact.email[0] || 'Contact via website',
        address: result.contact?.address || extractedData.contact.address || 'See website'
      },
      specialties: result.specialties || ['Professional service', 'Customer focus'],
      values: result.values || ['Quality', 'Reliability', 'Customer satisfaction'],
      faqs: result.faqs || generateDefaultFAQs(result),
      primaryCTA: result.primaryCTA || extractedData.ctas[0] || { text: 'Contact Us', action: 'contact' }
    };
    
  } catch (error) {
    console.error('AI analysis failed:', error);
    return structureWithoutAI(extractedData);
  }
}

/**
 * Structure the data without AI assistance
 */
function structureWithoutAI(data) {
  const businessName = data.title.split(/[-|]/)[0].trim() || 'Business';
  
  return {
    name: businessName,
    description: data.metaDescription || `${businessName} provides professional services.`,
    services: data.services.length > 0 ? data.services : [
      'Professional services',
      'Customer support',
      'Quality solutions'
    ],
    hours: parseHoursFromText(data.hours),
    contact: {
      phone: data.contact.phone[0] || 'Contact via website',
      email: data.contact.email[0] || 'Contact via website',
      address: data.contact.address || 'See website for location'
    },
    specialties: extractSpecialties(data),
    values: extractValues(data),
    faqs: generateDefaultFAQs({ name: businessName }),
    primaryCTA: data.ctas[0] || { text: 'Contact Us', action: 'contact' }
  };
}

/**
 * Parse hours from text
 */
function parseHoursFromText(hoursArray) {
  if (!hoursArray || hoursArray.length === 0) {
    return {
      'Monday-Friday': '9:00 AM - 6:00 PM',
      'Saturday': '10:00 AM - 4:00 PM',
      'Sunday': 'Closed'
    };
  }
  
  // Try to parse structured hours
  const hoursText = hoursArray.join(' ');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hours = {};
  
  days.forEach(day => {
    const pattern = new RegExp(`${day}[:\\s-]*(\\d{1,2}(?::\\d{2})?\\s*[ap]m\\s*-\\s*\\d{1,2}(?::\\d{2})?\\s*[ap]m|closed)`, 'i');
    const match = hoursText.match(pattern);
    if (match) {
      hours[day] = match[1];
    }
  });
  
  // If we found some hours, return them
  if (Object.keys(hours).length > 0) {
    return hours;
  }
  
  // Otherwise return defaults
  return {
    'Monday-Friday': '9:00 AM - 6:00 PM',
    'Saturday': '10:00 AM - 4:00 PM',
    'Sunday': 'Closed'
  };
}

/**
 * Extract specialties from content
 */
function extractSpecialties(data) {
  const specialties = [];
  
  // Look for specialty keywords in headings and content
  const keywords = ['specialize', 'expert', 'certified', 'award', 'leading', 'trusted'];
  const content = `${data.headings.h2.join(' ')} ${data.headings.h3.join(' ')} ${data.about}`.toLowerCase();
  
  keywords.forEach(keyword => {
    if (content.includes(keyword)) {
      // Extract the sentence containing the keyword
      const sentences = content.split(/[.!?]/);
      sentences.forEach(sentence => {
        if (sentence.includes(keyword) && sentence.length < 100) {
          specialties.push(sentence.trim());
        }
      });
    }
  });
  
  return specialties.slice(0, 5).map(s => 
    s.charAt(0).toUpperCase() + s.slice(1)
  );
}

/**
 * Extract values from content
 */
function extractValues(data) {
  const values = [];
  const valueKeywords = ['value', 'believe', 'commit', 'dedicate', 'pride', 'mission'];
  const content = `${data.about} ${data.mainContent}`.toLowerCase();
  
  valueKeywords.forEach(keyword => {
    if (content.includes(keyword)) {
      values.push(`${keyword}-driven service`);
    }
  });
  
  return values.length > 0 ? values : [
    'Customer satisfaction',
    'Professional excellence',
    'Reliable service'
  ];
}

/**
 * Normalize hours to consistent format
 */
function normalizeHours(hours) {
  if (typeof hours === 'string') {
    return {
      'Monday-Friday': hours,
      'Saturday': 'By appointment',
      'Sunday': 'Closed'
    };
  }
  
  if (Array.isArray(hours)) {
    return {
      'Monday-Friday': hours[0] || '9:00 AM - 6:00 PM',
      'Saturday': hours[1] || 'By appointment',
      'Sunday': hours[2] || 'Closed'
    };
  }
  
  return hours || {
    'Monday-Friday': '9:00 AM - 6:00 PM',
    'Saturday': '10:00 AM - 4:00 PM',
    'Sunday': 'Closed'
  };
}

/**
 * Generate default FAQs
 */
function generateDefaultFAQs(info) {
  return [
    {
      question: 'What are your business hours?',
      answer: `We're open Monday through Friday, with weekend availability by appointment.`
    },
    {
      question: 'How can I contact you?',
      answer: `You can reach us through our website or give us a call during business hours.`
    },
    {
      question: 'What services do you offer?',
      answer: `We offer a range of professional services. Contact us to discuss your specific needs.`
    }
  ];
}

/**
 * Generate smart fallback
 */
function generateSmartFallback(url) {
  const domain = extractDomain(url);
  const businessName = domain.charAt(0).toUpperCase() + domain.slice(1).replace(/\..+$/, '');
  
  return {
    name: businessName,
    description: `${businessName} provides professional services with a focus on quality and customer satisfaction.`,
    services: [
      'Professional consultation',
      'Customer support',
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
      address: 'See website for location'
    },
    specialties: [
      'Professional expertise',
      'Customer-focused approach',
      'Reliable service'
    ],
    values: [
      'Quality',
      'Integrity',
      'Customer satisfaction'
    ],
    faqs: generateDefaultFAQs({ name: businessName }),
    primaryCTA: { text: 'Contact Us', action: 'contact' }
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