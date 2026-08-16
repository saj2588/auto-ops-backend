import express from 'express';
import cors from 'cors';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4.1-mini';

console.log('==================================================');
console.log('🚀 Auto-Ops Chat Server Starting...');
console.log('==================================================');
console.log('📡 Endpoint:', endpoint);
console.log('📡 Deployment:', deployment);
console.log('🔑 API Key:', apiKey ? '✅ Set' : '❌ Missing');
console.log('==================================================');

const client = new OpenAI({
  baseURL: endpoint,
  apiKey: apiKey,
});

const SYSTEM_PROMPT = `You are Auto-Ops AI, a friendly and professional assistant for Auto-Ops, a small business automation agency.

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

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    console.log('📨 Received:', message?.substring(0, 50) + (message?.length > 50 ? '...' : ''));

    // Build messages with system prompt
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...(history || []).slice(-10),
      { role: 'user', content: message }
    ];

    // Try using the regular chat completions endpoint instead of responses
    // This is more standard and works better with the OpenAI SDK
    try {
      console.log('🔄 Trying chat.completions...');
      
      const response = await client.chat.completions.create({
        model: deployment,
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      });

      const botResponse = response.choices[0]?.message?.content || 'I\'m sorry, I couldn\'t process that.';
      console.log('✅ Response sent via chat.completions');
      console.log('🤖 Response:', botResponse.substring(0, 100) + '...');
      
      return res.json({ response: botResponse });
    } catch (chatError) {
      console.log('❌ chat.completions failed, trying responses API...');
      
      // Fallback to responses API
      try {
        const response = await client.responses.create({
          model: deployment,
          input: message,
        });

        console.log('📦 Full Response:', JSON.stringify(response, null, 2));

        let botResponse = 'I\'m sorry, I couldn\'t process that.';
        
        // Parse the response properly
        if (response.output && Array.isArray(response.output)) {
          // The output is an array of messages
          for (const outputItem of response.output) {
            if (outputItem.type === 'message' && outputItem.content) {
              if (Array.isArray(outputItem.content)) {
                // Content is an array of content blocks
                for (const contentBlock of outputItem.content) {
                  if (contentBlock.type === 'output_text' && contentBlock.text) {
                    botResponse = contentBlock.text;
                    break;
                  }
                }
              } else if (typeof outputItem.content === 'string') {
                botResponse = outputItem.content;
                break;
              }
            }
          }
        } else if (response.choices && Array.isArray(response.choices)) {
          // Fallback to choices format
          botResponse = response.choices[0]?.message?.content || botResponse;
        }

        console.log('✅ Response sent via responses API');
        console.log('🤖 Response:', botResponse.substring(0, 100) + '...');
        
        return res.json({ response: botResponse });
      } catch (responsesError) {
        console.error('❌ Both API methods failed');
        throw responsesError;
      }
    }
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

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    deployment,
    endpoint: endpoint || 'not set',
    apiKeySet: !!apiKey,
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📡 Deployment: ${deployment}`);
  console.log(`🌐 Health: http://localhost:${PORT}/api/health`);
  console.log('==================================================');
});
