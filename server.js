import express from 'express';
import cors from 'cors';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4.1-mini';

console.log('==================================================');
console.log('🚀 Auto-Ops Multi-Website Chat Server Starting...');
console.log('==================================================');
console.log('📡 Endpoint:', endpoint);
console.log('📡 Deployment:', deployment);
console.log('🔑 API Key:', apiKey ? '✅ Set' : '❌ Missing');
console.log('==================================================');

// Normalize Azure endpoint once and log it
const azureBase = (() => {
  if (!endpoint) return endpoint;
  let e = endpoint.trim();
  e = e.replace(/\/+$/, '');
  if (e.toLowerCase().includes('/openai')) {
    e = e.replace(/\/v1$/i, '').replace(/\/v1\/$/i, '');
    return e;
  }
  return `${e}/openai`;
})();

console.log('📡 AZURE_OPENAI_ENDPOINT env:', endpoint);
console.log('📡 Computed Azure base URL:', azureBase);

const client = new OpenAI({
  baseURL: azureBase,
  apiKey: apiKey,
});

// ============================================================
// PROMPT 1: AUTO-OPS (Business Automation Agency)
// ============================================================
const AUTO_OPS_PROMPT = `You are Auto-Ops AI, a friendly and professional assistant for Auto-Ops, a small business automation agency.

Your role is to help visitors understand services and encourage them to book a consultation.

Services offered:
1. Websites: Custom, responsive websites with SEO, hosting, and maintenance (starting from £1,500)
2. Automation: Workflow automation, CRM setup, process optimization using n8n/Make/Zapier
3. AI Implementation: AI chatbots, customer engagement agents, custom AI workflows

Pricing:
- Self-Serve SaaS: £399/month
- Hybrid Build: £1,200/month
- Managed Agency: £2,500/month

Key info:
- Founded by Sajid Javed, a solo founder with 10+ years enterprise ops experience
- Free 30-minute consultation available
- Email: saj.javed@yahoo.co.uk

Be helpful, concise, and encourage action. If unsure, suggest booking a consultation.`;

// ============================================================
// PROMPT 2: SOBIA CHEMISTRY TUTOR
// ============================================================
const SOBIA_CHEMISTRY_PROMPT = `You are Sobia Chemistry Tutor AI, a friendly and professional assistant for Sobia Chemistry Tutor.

Your role is to help visitors learn about chemistry tutoring services and encourage them to book a session.

About Sobia:
- Sobia is a qualified chemistry specialist with over 15 years of teaching and leadership experience
- Head of KS5 Science at an inner London school
- Experienced examiner with insight into exam marking
- B.Sc Applied Chemistry and PGCE Chemistry Specialism

Services offered:
1. Group Sessions: £50/person for 60-minute collaborative sessions (max 5 students)
2. Online Sessions: Available via video call
3. In-person Sessions: Available in London

Tutoring covers:
- A Level Chemistry (Year 12 and Year 13)
- Exam technique and mark scheme insights
- Organic chemistry, physical chemistry, and inorganic chemistry

Availability:
- Tuesday: 7:00 PM - 9:00 PM
- Saturday: 3:00 PM - 4:00 PM
- Monday-Friday: 9:00 AM - 8:00 PM
- Sunday: By appointment only

Contact:
- Email: sobiachemistrytutor@gmail.com
- Phone: +44 (0)7903333955
- Location: London, UK

Free 15-minute video consultation available. Be helpful, concise, and encourage action.`;

// ============================================================
// Function to detect which website the request is from
// ============================================================
function getWebsitePrompt(origin, body) {
  // Respect explicit override in request body first
  if (body && typeof body.website === 'string') {
    const wb = body.website.toLowerCase();
    if (wb === 'sobia' || wb === 'sobiachemistry' || wb === 'sobiachemistrytutor') {
      console.log('🔬 Using Sobia Chemistry Tutor prompt (from body override)');
      return SOBIA_CHEMISTRY_PROMPT;
    }
    if (wb === 'auto-ops' || wb === 'autoops' || wb === 'autoops-business') {
      console.log('🚀 Using Auto-Ops prompt (from body override)');
      return AUTO_OPS_PROMPT;
    }
  }

  // If origin provided, parse hostname and match known site domains
  if (origin) {
    try {
      const url = new URL(origin);
      const host = url.hostname.toLowerCase();

      // Strong domain matching lists (include common variants)
      const sobiaDomains = [
        'sobiachemistrytutor.co.uk',
        'www.sobiachemistrytutor.co.uk',
        'sobiachemistry.co.uk',
        'sobia.co.uk'
      ];
      const autoOpsDomains = [
        'auto-ops.co.uk',
        'www.auto-ops.co.uk',
        'autoops.co.uk',
        'www.autoops.co.uk'
      ];

      // helper to check exact or subdomain match
      const matchesDomain = (host, domain) => host === domain || host.endsWith('.' + domain);

      for (const d of sobiaDomains) {
        if (matchesDomain(host, d)) {
          console.log('🔬 Selected prompt: SOBIA_CHEMISTRY_PROMPT (matched domain:', d + ')');
          return SOBIA_CHEMISTRY_PROMPT;
        }
      }

      for (const d of autoOpsDomains) {
        if (matchesDomain(host, d)) {
          console.log('🚀 Selected prompt: AUTO_OPS_PROMPT (matched domain:', d + ')');
          return AUTO_OPS_PROMPT;
        }
      }

      // Localhost / dev defaults to Auto-Ops unless explicit
      if (host === 'localhost' || host === '127.0.0.1') {
        console.log('🚀 Selected prompt: AUTO_OPS_PROMPT (localhost)');
        return AUTO_OPS_PROMPT;
      }
    } catch (err) {
      // origin may not be a full URL; fall back to string matching
      const originLower = origin.toLowerCase();
      if (originLower.includes('sobiachemistrytutor') || originLower.includes('sobia')) {
        console.log('🔬 Selected prompt: SOBIA_CHEMISTRY_PROMPT (origin string match)');
        return SOBIA_CHEMISTRY_PROMPT;
      }
      if (originLower.includes('auto-ops') || originLower.includes('autoops') || originLower.includes('sajid')) {
        console.log('🚀 Selected prompt: AUTO_OPS_PROMPT (origin string match)');
        return AUTO_OPS_PROMPT;
      }
    }
  }

  // Fallback default
  console.log('🚀 Selected prompt: AUTO_OPS_PROMPT (default fallback)');
  return AUTO_OPS_PROMPT;
}

// ============================================================
// Helper function to parse Responses API response
// ============================================================
function parseResponse(response) {
  let botResponse = '';
  
  if (response.output && Array.isArray(response.output) && response.output.length > 0) {
    const firstOutput = response.output[0];
    
    if (firstOutput && firstOutput.content && Array.isArray(firstOutput.content) && firstOutput.content.length > 0) {
      const firstContent = firstOutput.content[0];
      if (firstContent && firstContent.text) {
        botResponse = firstContent.text;
      } else if (firstContent && firstContent.type === 'output_text' && firstContent.text) {
        botResponse = firstContent.text;
      } else {
        botResponse = JSON.stringify(firstContent);
      }
    } else if (firstOutput && firstOutput.text) {
      botResponse = firstOutput.text;
    } else {
      botResponse = JSON.stringify(firstOutput);
    }
  } else if (response.choices && Array.isArray(response.choices) && response.choices.length > 0) {
    const choice = response.choices[0];
    if (choice && choice.message && choice.message.content) {
      botResponse = choice.message.content;
    } else if (choice && choice.text) {
      botResponse = choice.text;
    } else {
      botResponse = JSON.stringify(choice);
    }
  } else {
    botResponse = 'I\'m sorry, I couldn\'t process that.';
  }

  if (!botResponse || botResponse === '[object Object]' || botResponse.startsWith('{')) {
    botResponse = 'I\'m sorry, I couldn\'t process that. Please try again.';
  }

  return botResponse;
}

// ============================================================
// Chat Endpoint
// ============================================================
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history, website } = req.body;
    const origin = req.headers.origin || req.headers.referer || '';

    console.log('📨 Received message:', message?.substring(0, 50) + (message?.length > 50 ? '...' : ''));
    console.log('🌐 Origin:', origin);
    console.log('🌐 Website param:', website || 'not specified');

    // Select the correct prompt
    const systemPrompt = getWebsitePrompt(origin, req.body);

    let conversation = [];
    conversation.push({ role: 'system', content: systemPrompt });
    
    if (history) {
      conversation = conversation.concat(history.slice(-10));
    }
    
    conversation.push({ role: 'user', content: message });

    console.log('📤 Sending to Azure... Deployment:', deployment);
    console.log('📤 Conversation summary:', conversation.map(c => ({ role: c.role, content: (c.content || '').substring(0, 120) })));

    let response;
    try {
      response = await client.responses.create({
        model: deployment,
        input: conversation,
        temperature: 0.7,
        max_output_tokens: 500,
      });
    } catch (err) {
      console.error('❌ Azure call failed:', err?.message || err);
      // Log HTTP details when available
      if (err?.response) {
        try {
          console.error('📄 Azure response status:', err.response.status);
          console.error('📄 Azure response data:', JSON.stringify(err.response.data, null, 2));
        } catch (e) {
          console.error('📄 Could not stringify err.response:', e);
        }
      } else if (err?.body) {
        console.error('📄 Azure error body:', err.body);
      } else {
        console.error(err);
      }
      throw err;
    }

    const botResponse = parseResponse(response);

    console.log('🤖 Response sent (' + botResponse.length + ' characters)');

    res.json({ response: botResponse });
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('📄 Error Details:', JSON.stringify(error.response.data, null, 2));
    }
    res.status(500).json({ 
      error: error.message,
      details: error.response?.data || null
    });
  }
});

// ============================================================
// Health Endpoint
// ============================================================
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    deployment,
    endpoint: endpoint || 'not set',
    apiKeySet: !!apiKey,
    timestamp: new Date().toISOString(),
    websites: {
      autoOps: 'Auto-Ops Business Automation',
      sobiaChemistry: 'Sobia Chemistry Tutor'
    }
  });
});

app.get('/', (req, res) => {
  res.json({
    service: 'Auto-Ops Multi-Website Chat API',
    version: '1.0.0',
    status: 'running',
    websites: {
      autoOps: 'Auto-Ops Business Automation',
      sobiaChemistry: 'Sobia Chemistry Tutor'
    }
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📡 Deployment: ${deployment}`);
  console.log(`🌐 Health: http://localhost:${PORT}/api/health`);
  console.log('==================================================');
});
