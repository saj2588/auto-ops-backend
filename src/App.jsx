import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaRocket, FaRobot, FaChartLine, FaCode, 
  FaDatabase, FaGithub, FaLinkedin, FaTwitter,
  FaCheckCircle, FaArrowRight, FaUserCheck, FaCog, FaServer,
  FaNetworkWired, FaPaperPlane, FaLock, FaCloud,
  FaGlobe, FaEnvelope, FaComments, FaUsers,
  FaLaptopCode, FaBrain, FaTools, FaPlug
} from 'react-icons/fa';
import { HiOutlineCpuChip } from 'react-icons/hi2';
import ParticlesBackground from './components/ParticlesBackground';
import Calculator from './components/Calculator';
import Chatbot from './components/Chatbot';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative">
      <ParticlesBackground />
      
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(255,255,255,0.03)] backdrop-blur-[12px] border-b border-white/5">
        <div className="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00f5ff] to-[#7c3aed] flex items-center justify-center">
              <FaRocket className="text-black text-sm" />
            </div>
            <span className="text-xl font-bold text-white">
              Auto<span className="text-[#00f5ff]">Ops</span>
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Services', 'Projects', 'About', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className={`text-sm font-medium transition-colors ${
                  activeSection === item.toLowerCase() 
                    ? 'text-[#00f5ff]' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('contact')}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#7c3aed] text-black font-semibold text-sm hover:shadow-lg hover:shadow-[#00f5ff]/20 transition-all"
            >
              Get Started
            </motion.button>
          </div>

          <button className="md:hidden text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00f5ff]/20 bg-[#00f5ff]/5 text-[#00f5ff] text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-[#00f5ff] animate-pulse"></span>
                AI-Powered Automation Agency
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                Modernise Your
                <br />
                <span className="bg-gradient-to-r from-[#00f5ff] via-[#7c3aed] to-[#f472b6] bg-clip-text text-transparent">Small Business</span>
              </h1>
              <p className="text-gray-400 text-base md:text-lg lg:text-xl mt-4 max-w-lg">
                Websites, automation, and AI — I help small businesses run like enterprises 
                without the enterprise complexity.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollTo('services')}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#7c3aed] text-black font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-[#00f5ff]/20 transition-all"
                >
                  See Services <FaArrowRight />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollTo('about')}
                  className="px-6 py-3 rounded-full border border-gray-700 text-gray-300 font-semibold hover:border-[#00f5ff] hover:text-[#00f5ff] transition-all"
                >
                  Meet Me
                </motion.button>
              </div>

              <div className="flex flex-wrap gap-6 md:gap-8 mt-10 pt-8 border-t border-white/5">
                <div>
                  <div className="text-xl md:text-2xl font-bold text-white">99.9%</div>
                  <div className="text-gray-500 text-xs md:text-sm">Uptime Guarantee</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold text-white">&lt;15m</div>
                  <div className="text-gray-500 text-xs md:text-sm">Incident Response</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold text-white">100%</div>
                  <div className="text-gray-500 text-xs md:text-sm">Data Integrity</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center items-center"
            >
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -left-6 md:-top-8 md:-left-8 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#1a1a2e]/50 backdrop-blur border border-[#00f5ff]/20 flex items-center justify-center text-[#00f5ff] text-xl md:text-2xl"
              >
                <FaGlobe />
              </motion.div>
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#1a1a2e]/50 backdrop-blur border border-[#7c3aed]/20 flex items-center justify-center text-[#7c3aed] text-xl md:text-2xl"
              >
                <FaBrain />
              </motion.div>
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
                className="absolute top-1/2 -right-4 md:-right-8 w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[#1a1a2e]/50 backdrop-blur border border-[#f472b6]/20 flex items-center justify-center text-[#f472b6] text-lg md:text-xl"
              >
                <FaTools />
              </motion.div>

              <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl rounded-3xl overflow-hidden border border-white/5 shadow-2xl shadow-[#00f5ff]/5">
                <div className="aspect-square w-full bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f] flex items-center justify-center relative overflow-hidden">
                  
                  {/* Animated Circuit Lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 400">
                    <motion.circle
                      cx="200"
                      cy="200"
                      r="120"
                      fill="none"
                      stroke="#00f5ff"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.circle
                      cx="200"
                      cy="200"
                      r="160"
                      fill="none"
                      stroke="#7c3aed"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
                    />
                    <motion.circle
                      cx="200"
                      cy="200"
                      r="80"
                      fill="none"
                      stroke="#f472b6"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
                    />
                    
                    <motion.line
                      x1="80"
                      y1="200"
                      x2="320"
                      y2="200"
                      stroke="#00f5ff"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.line
                      x1="200"
                      y1="80"
                      x2="200"
                      y2="320"
                      stroke="#7c3aed"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
                    />
                    <motion.line
                      x1="120"
                      y1="120"
                      x2="280"
                      y2="280"
                      stroke="#f472b6"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
                    />
                    <motion.line
                      x1="280"
                      y1="120"
                      x2="120"
                      y2="280"
                      stroke="#00f5ff"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
                    />
                  </svg>

                  <motion.div
                    animate={{ 
                      scale: [1, 1.3, 1],
                      boxShadow: [
                        '0 0 20px rgba(0,245,255,0.2)',
                        '0 0 60px rgba(0,245,255,0.4)',
                        '0 0 20px rgba(0,245,255,0.2)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#00f5ff] to-[#7c3aed] flex items-center justify-center text-black text-3xl md:text-4xl font-bold shadow-2xl shadow-[#00f5ff]/20"
                  >
                    <span className="relative z-10">AI</span>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.8, 2.2],
                        opacity: [0.6, 0.2, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full border-2 border-[#00f5ff]"
                    />
                    <motion.div
                      animate={{ 
                        scale: [1, 1.5, 2.8],
                        opacity: [0.4, 0.1, 0]
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                      className="absolute inset-0 rounded-full border-2 border-[#7c3aed]"
                    />
                  </motion.div>

                  {[
                    { x: '15%', y: '20%', delay: 0 },
                    { x: '85%', y: '25%', delay: 0.3 },
                    { x: '10%', y: '75%', delay: 0.6 },
                    { x: '90%', y: '80%', delay: 0.9 },
                    { x: '45%', y: '5%', delay: 1.2 },
                    { x: '55%', y: '95%', delay: 1.5 },
                    { x: '5%', y: '50%', delay: 0.2 },
                    { x: '95%', y: '55%', delay: 0.7 },
                  ].map((node, index) => (
                    <motion.div
                      key={index}
                      animate={{ 
                        opacity: [0.3, 1, 0.3],
                        scale: [1, 1.5, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: node.delay }}
                      className="absolute w-2 h-2 rounded-full bg-[#00f5ff]"
                      style={{ left: node.x, top: node.y }}
                    />
                  ))}
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
                  <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-[12px] rounded-xl p-3 md:p-4 border border-white/5">
                    <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-400 font-mono">
                      <span className="text-green-400">$</span>
                      <span className="text-[#00f5ff]">sajid@auto-ops</span>
                      <span className="text-gray-500">~/</span>
                      <span className="text-white">$</span>
                      <span className="text-green-400 animate-pulse">▌</span>
                    </div>
                    <div className="text-[10px] md:text-xs text-gray-500 font-mono mt-1 flex flex-wrap gap-2 md:gap-4">
                      <span className="text-green-400">✔</span> System: Operational
                      <span className="text-[#00f5ff]">●</span> Uptime: 99.9%
                      <span className="text-[#f472b6]">●</span> AI: Active
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section - Expanded */}
      <section id="services" className="py-16 md:py-20 bg-[#1a1a2e]/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              What I <span className="bg-gradient-to-r from-[#00f5ff] via-[#7c3aed] to-[#f472b6] bg-clip-text text-transparent">Offer</span>
            </h2>
            <p className="text-gray-400 mt-2 text-sm md:text-base">Websites, automation, and AI — all tailored for small businesses.</p>
          </motion.div>

          {/* Service Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <FaGlobe className="text-3xl" />,
                title: 'Websites & Digital Presence',
                desc: 'Modern, responsive websites that work on all devices and are optimized for search engines.',
                features: ['Custom website design', 'Mobile-responsive', 'SEO-optimised', 'Managed hosting & maintenance', 'Content management system (CMS)'],
                color: '#00f5ff'
              },
              {
                icon: <FaTools className="text-3xl" />,
                title: 'Business Automation',
                desc: 'Connect your tools and automate repetitive tasks to save time and reduce errors.',
                features: ['Workflow automation (n8n/Make/Zapier)', 'CRM setup & customisation', 'Process optimisation', 'Email marketing automation', 'Invoicing & quoting automation'],
                color: '#7c3aed'
              },
              {
                icon: <FaBrain className="text-3xl" />,
                title: 'AI Implementation',
                desc: 'Practical AI solutions that work for your business — not just hype.',
                features: ['AI-powered chatbots & assistants', 'Automated customer engagement', 'Custom AI agents & workflows', 'Lead qualification & follow-up', 'Data analysis & reporting'],
                color: '#f472b6'
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 md:p-8 rounded-2xl bg-[rgba(255,255,255,0.03)] backdrop-blur-[12px] hover:bg-[rgba(255,255,255,0.06)] border border-white/5 transition-all duration-300"
              >
                <div 
                  className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${category.color}15`, color: category.color }}
                >
                  {category.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white">{category.title}</h3>
                <p className="text-gray-400 text-sm mt-2">{category.desc}</p>
                <ul className="space-y-2 mt-4">
                  {category.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-gray-300">
                      <FaCheckCircle className="text-[#00f5ff] text-xs mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Pricing Tiers */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="text-xl md:text-2xl font-bold text-white">
              Choose Your <span className="text-gradient">Engagement Model</span>
            </h3>
            <p className="text-gray-400 text-sm">From full-service to self-serve — I meet you where you are.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <FaCog />,
                title: 'Managed Agency',
                price: '£2,500',
                period: '/mo',
                features: ['Custom website build', 'Full automation setup', 'AI integration', '24/7 system monitoring', 'Dedicated support', 'Monthly optimisation reviews'],
                popular: false,
              },
              {
                icon: <FaCode />,
                title: 'Hybrid Build',
                price: '£1,200',
                period: '/mo',
                features: ['Custom automation solution', 'Website build & handover', 'AI setup & training', 'Full source code ownership', '1-month handover & training', 'Optional ongoing support'],
                popular: true,
              },
              {
                icon: <FaCloud />,
                title: 'Self-Serve SaaS',
                price: '£399',
                period: '/mo',
                features: ['Pre-built dashboard & reports', 'AI log analyser', 'Automated alerting', 'API access', 'Email support', 'Quick setup'],
                popular: false,
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
                className={`relative p-6 md:p-8 rounded-2xl bg-[rgba(255,255,255,0.03)] backdrop-blur-[12px] hover:bg-[rgba(255,255,255,0.06)] transition-all duration-300 border ${
                  plan.popular ? 'border-[#00f5ff]/30' : 'border-white/5'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 right-4 md:right-6 px-3 md:px-4 py-1 rounded-full text-[10px] md:text-xs font-semibold bg-gradient-to-r from-[#00f5ff] to-[#7c3aed] text-black">
                    Most Popular
                  </div>
                )}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#00f5ff]/10 flex items-center justify-center text-[#00f5ff] text-lg md:text-xl mb-4">
                  {plan.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white">{plan.title}</h3>
                <div className="text-2xl md:text-3xl font-bold text-white mt-2">
                  {plan.price} <span className="text-gray-400 text-sm md:text-base font-normal">{plan.period}</span>
                </div>
                <p className="text-gray-400 text-xs md:text-sm mt-1">
                  <FaUserCheck className="inline mr-1 text-[#00f5ff]" /> Built and managed by me
                </p>
                <ul className="space-y-2 mt-4 md:mt-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-gray-300">
                      <FaCheckCircle className="text-[#00f5ff] text-xs mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollTo('calculator')}
                  className={`w-full mt-4 md:mt-6 py-2.5 md:py-3 rounded-full text-sm md:text-base font-semibold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#00f5ff] to-[#7c3aed] text-black hover:shadow-lg hover:shadow-[#00f5ff]/20'
                      : 'border border-gray-700 text-gray-300 hover:border-[#00f5ff] hover:text-[#00f5ff]'
                  }`}
                >
                  Calculate Price
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              📊 <span className="bg-gradient-to-r from-[#00f5ff] via-[#7c3aed] to-[#f472b6] bg-clip-text text-transparent">Estimate Your Cost</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base">Adjust the sliders to see your custom price. No hidden fees.</p>
          </motion.div>
          <Calculator scrollTo={scrollTo} />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-20 bg-[#1a1a2e]/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              <span className="bg-gradient-to-r from-[#00f5ff] via-[#7c3aed] to-[#f472b6] bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base">Real solutions I've built — each one a building block for your business.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <FaGlobe />,
                title: 'Business Website + AI Chatbot',
                desc: 'Full website with integrated AI chatbot for lead qualification and 24/7 customer support.',
                tags: ['React', 'Next.js', 'Azure OpenAI', 'Tailwind'],
              },
              {
                icon: <FaPlug />,
                title: 'CRM & Workflow Automation',
                desc: 'Connected CRM, email marketing, and invoicing into a seamless automated workflow.',
                tags: ['n8n', 'HubSpot', 'Zapier', 'Python'],
              },
              {
                icon: <FaBrain />,
                title: 'AI Customer Engagement Agent',
                desc: 'AI agent that handles incoming calls, follows up with leads, and answers customer questions.',
                tags: ['LangChain', 'Azure AI', 'FastAPI', 'Streamlit'],
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-[rgba(255,255,255,0.03)] backdrop-blur-[12px] hover:bg-[rgba(255,255,255,0.06)] border border-white/5 transition-all duration-300"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#00f5ff]/10 flex items-center justify-center text-[#00f5ff] text-lg md:text-xl mb-4">
                  {project.icon}
                </div>
                <h3 className="text-base md:text-lg font-bold text-white">{project.title}</h3>
                <p className="text-gray-400 text-sm mt-2">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-2.5 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-medium bg-white/5 border border-white/5 text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="mt-4 text-[#00f5ff] text-sm font-medium hover:text-[#7c3aed] transition-colors flex items-center gap-1">
                  View Case Study <FaArrowRight className="text-xs" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <div className="relative inline-block">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-[#00f5ff]/30 shadow-xl shadow-[#00f5ff]/10 mx-auto lg:mx-0">
                  <img 
                    src="/BB62C8DF-DF8B-4342-B3CD-037B5CC53237.PNG"
                    alt="Sajid Javed - Founder of Auto-Ops"
                    className="w-full h-full object-cover object-[50%_35%]"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200x200/1a1a2e/00f5ff?text=Sajid';
                    }}
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#00f5ff]/20 border border-[#00f5ff]/30 flex items-center justify-center text-[#00f5ff]">
                  <FaUserCheck className="text-xs md:text-sm" />
                </div>
              </div>
              <div className="flex justify-center lg:justify-start gap-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-lg md:text-xl"><FaGithub /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-lg md:text-xl"><FaLinkedin /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-lg md:text-xl"><FaTwitter /></a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <div className="inline-block px-3 md:px-4 py-1 rounded-full text-[10px] md:text-xs font-medium border border-[#00f5ff]/20 text-[#00f5ff] bg-[#00f5ff]/5 mb-3 md:mb-4">
                <FaUserCheck className="inline mr-1" /> You work directly with me
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Hi, I'm Sajid 👋</h2>
              <p className="text-gray-400 text-base md:text-lg mt-1 md:mt-2">Solo founder. Enterprise ops expert.</p>
              <p className="text-gray-400 text-sm md:text-base mt-3 md:mt-4 leading-relaxed">
                I spent <strong className="text-white">years managing business-critical systems</strong> in global financial services — where downtime is not an option and data integrity is everything.
              </p>
              <p className="text-gray-400 text-sm md:text-base mt-2 leading-relaxed">
                Now I'm bringing that same <strong className="text-white">rigour and expertise</strong> to help small businesses modernise with websites, automation, and AI.
              </p>
              <div className="flex flex-wrap gap-2 mt-4 md:mt-6">
                <span className="px-2.5 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-medium bg-white/5 border border-white/5 text-gray-300">
                  <FaCheckCircle className="inline mr-1 text-[#00f5ff]" /> 10+ years ops
                </span>
                <span className="px-2.5 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-medium bg-white/5 border border-white/5 text-gray-300">
                  <FaCheckCircle className="inline mr-1 text-[#00f5ff]" /> Azure AI certified
                </span>
                <span className="px-2.5 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-medium bg-white/5 border border-white/5 text-gray-300">
                  <FaCheckCircle className="inline mr-1 text-[#00f5ff]" /> Full-stack engineer
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Growing Roadmap */}
      <section className="py-12 md:py-16 bg-[#1a1a2e]/30">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl md:text-2xl font-bold">🚀 Growing With You</h3>
            <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto mt-2">
              I'm a solo founder today — but as I grow, I'll add vetted engineers. You'll always get direct access to me.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mt-6 md:mt-8">
              <div>
                <div className="text-xs md:text-sm text-gray-500">Now</div>
                <div className="text-lg md:text-xl font-bold text-[#00f5ff]">Solo Founder</div>
                <div className="text-gray-400 text-xs md:text-sm">Direct access to me</div>
              </div>
              <div className="text-xl md:text-2xl text-gray-600">→</div>
              <div>
                <div className="text-xs md:text-sm text-gray-500">6-12 Months</div>
                <div className="text-lg md:text-xl font-bold text-[#7c3aed]">Small Team</div>
                <div className="text-gray-400 text-xs md:text-sm">Still direct access</div>
              </div>
              <div className="text-xl md:text-2xl text-gray-600">→</div>
              <div>
                <div className="text-xs md:text-sm text-gray-500">Scale</div>
                <div className="text-lg md:text-xl font-bold text-[#f472b6]">Full Agency</div>
                <div className="text-gray-400 text-xs md:text-sm">You get the best</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              Get In <span className="bg-gradient-to-r from-[#00f5ff] via-[#7c3aed] to-[#f472b6] bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base">Book a free 30-min consultation. I'll map your pain points and build a plan.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-[rgba(255,255,255,0.03)] backdrop-blur-[12px] rounded-2xl p-6 md:p-8 border border-white/5"
          >
            <form className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f]/50 border border-white/5 text-white placeholder-gray-500 focus:border-[#00f5ff] focus:outline-none transition-colors text-sm md:text-base"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f]/50 border border-white/5 text-white placeholder-gray-500 focus:border-[#00f5ff] focus:outline-none transition-colors text-sm md:text-base"
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Company Name" 
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f]/50 border border-white/5 text-white placeholder-gray-500 focus:border-[#00f5ff] focus:outline-none transition-colors text-sm md:text-base"
                />
              </div>
              <div>
                <select 
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f]/50 border border-white/5 text-gray-400 focus:border-[#00f5ff] focus:outline-none transition-colors text-sm md:text-base"
                >
                  <option value="">What service are you interested in?</option>
                  <option value="website">Website Development</option>
                  <option value="automation">Business Automation</option>
                  <option value="ai">AI Implementation</option>
                  <option value="all">All of the above</option>
                </select>
              </div>
              <div>
                <textarea 
                  placeholder="Tell me about your business and what you'd like to achieve..." 
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f]/50 border border-white/5 text-white placeholder-gray-500 focus:border-[#00f5ff] focus:outline-none transition-colors resize-none text-sm md:text-base"
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#7c3aed] text-black font-semibold hover:shadow-lg hover:shadow-[#00f5ff]/20 transition-all text-sm md:text-base"
              >
                <FaPaperPlane className="inline mr-2" /> Send Enquiry
              </motion.button>
            </form>
            <p className="text-center text-gray-500 text-xs md:text-sm mt-4">
              <FaLock className="inline mr-1" /> Your data is safe. I'll never share it.
            </p>
          </motion.div>
        </div>
      </section>

      <footer className="py-6 md:py-8 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6 flex flex-wrap justify-between items-center gap-3 md:gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">Auto<span className="text-[#00f5ff]">Ops</span></span>
            <span className="text-gray-500 text-xs md:text-sm">© 2026 Built by Sajid Javed</span>
          </div>
          <div className="flex gap-3 md:gap-4">
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-lg md:text-xl"><FaGithub /></a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-lg md:text-xl"><FaLinkedin /></a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-lg md:text-xl"><FaTwitter /></a>
          </div>
        </div>
      </footer>

      {/* Chatbot - Fixed position, stays on all pages */}
      <Chatbot />
    </div>
  );
}

export default App;
