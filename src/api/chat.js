// This is a mock API endpoint for development
// In production, this would connect to Azure OpenAI

export async function POST(request) {
  try {
    const { message, history } = await request.json();

    // For now, return a mock response
    // Replace this with actual Azure OpenAI call
    const mockResponses = [
      "I can help you with that! We offer website development, business automation, and AI implementation services.",
      "Great question! Our pricing starts from £399/month for the self-serve plan and goes up to £2,500/month for full managed services.",
      "We specialize in helping small businesses modernize with AI. I'd love to schedule a free consultation to discuss your specific needs.",
      "You can get started by booking a free 30-minute consultation through our contact form."
    ];

    // Simple response logic
    let response = mockResponses[Math.floor(Math.random() * mockResponses.length)];

    if (message.toLowerCase().includes('website')) {
      response = "We build modern, responsive websites starting from £1,500. This includes custom design, mobile optimization, SEO setup, and ongoing maintenance. Would you like to discuss your specific requirements?";
    } else if (message.toLowerCase().includes('price') || message.toLowerCase().includes('cost')) {
      response = "Our pricing is flexible! Self-serve SaaS starts at £399/month, Hybrid Build at £1,200/month, and full Managed Agency at £2,500/month. You can use our pricing calculator on the website for a custom quote.";
    } else if (message.toLowerCase().includes('automation')) {
      response = "We connect your tools and automate repetitive tasks using n8n, Make, or Zapier. This typically saves businesses 10-20 hours per week. Would you like to see an example of what we can automate?";
    } else if (message.toLowerCase().includes('ai') || message.toLowerCase().includes('chatbot')) {
      response = "We implement practical AI solutions including chatbots, customer engagement agents, and custom AI workflows. I'd love to understand your business needs better — shall we schedule a call?";
    }

    return new Response(JSON.stringify({ response }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
