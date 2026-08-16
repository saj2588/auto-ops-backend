import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaCalendarCheck } from 'react-icons/fa';

const Calculator = ({ scrollTo }) => {
  const [systems, setSystems] = useState(5);
  const [logVolume, setLogVolume] = useState(10);
  const [analyses, setAnalyses] = useState(500);
  const [support, setSupport] = useState('managed');

  const calculatePrice = () => {
    let price = 399;
    if (systems > 3) price += (systems - 3) * 50;
    if (logVolume > 5) price += (logVolume - 5) * 5;
    if (analyses > 100) price += Math.ceil((analyses - 100) / 100) * 0.5;
    if (support === 'managed') price = price * 1.6;
    if (support === 'enterprise') price = price * 2.8;
    return Math.round(Math.max(price, 399) / 50) * 50;
  };

  const price = calculatePrice();

  return (
    <div className="max-w-2xl mx-auto glass rounded-2xl p-8 border border-white/5">
      <div className="space-y-6">
        <div>
          <label className="flex justify-between text-sm font-medium text-gray-300">
            Systems to monitor <span className="text-[#00f5ff]">{systems}</span>
          </label>
          <input
            type="range"
            min="1"
            max="20"
            value={systems}
            onChange={(e) => setSystems(parseInt(e.target.value))}
            className="w-full mt-2 accent-[#00f5ff]"
          />
        </div>

        <div>
          <label className="flex justify-between text-sm font-medium text-gray-300">
            Daily log volume (GB) <span className="text-[#00f5ff]">{logVolume} GB</span>
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={logVolume}
            onChange={(e) => setLogVolume(parseInt(e.target.value))}
            className="w-full mt-2 accent-[#00f5ff]"
          />
        </div>

        <div>
          <label className="flex justify-between text-sm font-medium text-gray-300">
            AI analyses per month <span className="text-[#00f5ff]">{analyses}</span>
          </label>
          <input
            type="range"
            min="50"
            max="5000"
            step="50"
            value={analyses}
            onChange={(e) => setAnalyses(parseInt(e.target.value))}
            className="w-full mt-2 accent-[#00f5ff]"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-300 block mb-2">Support level</label>
          <div className="flex gap-3 flex-wrap">
            {['self', 'managed', 'enterprise'].map((level) => (
              <button
                key={level}
                onClick={() => setSupport(level)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  support === level
                    ? 'bg-[#00f5ff]/20 border border-[#00f5ff] text-[#00f5ff]'
                    : 'border border-white/5 text-gray-400 hover:text-white'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-white/5">
          <div className="text-center">
            <div className="text-4xl font-bold text-white">
              £{price.toLocaleString()} <span className="text-base font-normal text-gray-400">/month</span>
            </div>
            <p className="text-gray-400 text-sm mt-1">Based on your selections</p>
          </div>

          <div className="flex flex-wrap gap-4 mt-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollTo('contact')}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#7c3aed] text-black font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-[#00f5ff]/20 transition-all"
            >
              <FaCalendarCheck /> Book Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const email = prompt('Enter your email to get this quote (£' + price + '/month):');
                if (email && email.includes('@')) {
                  alert('Quote sent to ' + email + '! I will be in touch within 24 hours.');
                }
              }}
              className="px-6 py-2 rounded-full border border-gray-700 text-gray-300 font-semibold hover:border-[#00f5ff] hover:text-[#00f5ff] transition-all flex items-center gap-2"
            >
              <FaEnvelope /> Get Quote
            </motion.button>
          </div>

          <p className="text-center text-gray-500 text-xs mt-4">
            No setup fees · Cancel anytime · 14-day free trial
          </p>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
