const { spawn } = require('child_process');
const path = require('path');

/**
 * Netlify function to run the realtor scraper Python script
 */
exports.handler = async function(event, context) {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, error: 'Method not allowed' })
    };
  }

  try {
    // Parse request body
    const requestBody = JSON.parse(event.body);
    const { url, startPage = 1, maxPages = 3, headless = true } = requestBody;

    if (!url) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: 'URL is required' })
      };
    }

    // Path to the Python script (relative to the site root)
    const scriptPath = path.join(__dirname, '..', '..', 'local-tools', 'realtor_scraper.py');
    
    // Create a temporary directory for output
    const outputDir = path.join('/tmp', `scraper_${Date.now()}`);
    const outputFile = path.join(outputDir, 'results.json');

    // Prepare command arguments
    const args = [
      scriptPath,
      url,
      '--start-page', startPage.toString(),
      '--max-pages', maxPages.toString(),
      '--output', 'results.json',
      '--output-dir', outputDir
    ];

    if (!headless) {
      args.push('--visible');
    }

    // Execute the Python script
    const results = await runPythonScript('python', args);
    
    // Read the results file
    const fs = require('fs').promises;
    let scrapedData = [];
    let pagesScraped = 0;
    
    try {
      const fileContent = await fs.readFile(outputFile, 'utf8');
      scrapedData = JSON.parse(fileContent);
      
      // Estimate pages scraped based on results and max per page (usually 20)
      const resultsPerPage = 20;
      pagesScraped = Math.ceil(scrapedData.length / resultsPerPage);
      if (pagesScraped > maxPages) pagesScraped = maxPages;
    } catch (err) {
      console.error('Error reading results file:', err);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        results: scrapedData,
        pagesScraped,
        message: results.stdout
      })
    };
  } catch (error) {
    console.error('Error running scraper:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message || 'Internal server error'
      })
    };
  }
};

/**
 * Run a Python script and return its output
 */
function runPythonScript(command, args) {
  return new Promise((resolve, reject) => {
    // Activate the virtual environment first
    const venvPath = path.join(__dirname, '..', '..', 'local-tools', 'venv');
    const activateCmd = process.platform === 'win32' 
      ? `${venvPath}\\Scripts\\activate.bat && `
      : `source ${venvPath}/bin/activate && `;
    
    // Spawn the process
    const process = spawn(command, args, {
      shell: true,
      env: {
        ...process.env,
        PATH: `${venvPath}/bin:${process.env.PATH}`
      }
    });
    
    let stdout = '';
    let stderr = '';
    
    process.stdout.on('data', (data) => {
      stdout += data.toString();
      console.log(`[Scraper] ${data.toString().trim()}`);
    });
    
    process.stderr.on('data', (data) => {
      stderr += data.toString();
      console.error(`[Scraper Error] ${data.toString().trim()}`);
    });
    
    process.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        reject(new Error(`Process exited with code ${code}: ${stderr}`));
      }
    });
    
    process.on('error', (err) => {
      reject(err);
    });
  });
}
