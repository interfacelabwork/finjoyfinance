'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { 
  CheckCircle2, 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin, 
  Linkedin, 
  Instagram, 
  Menu, 
  X,
  TrendingUp,
  ShieldCheck,
  Zap,
  Star,
  ArrowRight
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import confetti from 'canvas-confetti';

// --- Constants ---
const BRAND_GOLD = '#D4A64A';
const BRAND_NAVY = '#111E38';
const BRAND_NAVY_LIGHT = '#1c2d52';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'services', 'calculator', 'testimonials', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            const capitalized = section.charAt(0).toUpperCase() + section.slice(1);
            setActiveTab(capitalized === 'Calculator' ? 'SIP Calculator' : capitalized);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'SIP Calculator', href: '#calculator' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-navy/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center font-bold text-navy text-xl">F</div>
          <span className="text-xl md:text-2xl font-heading font-bold">
            FinJoy <span className="text-gold">Finance</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-gold ${activeTab === link.name ? 'text-gold' : 'text-gray-300'}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-offwhite" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy-light px-4 pb-8 overflow-hidden"
          >
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-lg font-medium ${activeTab === link.name ? 'text-gold' : 'text-gray-300'}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const CalculatorSection = () => {
  const [monthlyAmount, setMonthlyAmount] = useState(10000);
  const [period, setPeriod] = useState(10);
  const [returnRate, setReturnRate] = useState(12);

  const results = useMemo(() => {
    const P = monthlyAmount;
    const r = returnRate / 100 / 12;
    const n = period * 12;
    
    // SIP Future Value formula: P * [((1 + r)^n - 1) / r] * (1 + r)
    const totalValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalInvested = monthlyAmount * n;
    const estReturns = totalValue - totalInvested;
    
    return {
      totalValue: Math.round(totalValue),
      totalInvested: Math.round(totalInvested),
      estReturns: Math.round(estReturns),
    };
  }, [monthlyAmount, period, returnRate]);

  const data = [
    { name: 'Invested', value: results.totalInvested },
    { name: 'Returns', value: results.estReturns },
  ];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="calculator" className="py-24 bg-navy-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-heading font-bold mb-4"
          >
            SIP <span className="text-gold">Calculator</span>
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Visualize the power of compounding. Adjust the parameters to see your potential wealth creation over time.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center bg-navy p-8 md:p-12 rounded-3xl border border-gray-800 shadow-2xl">
          <div className="space-y-10">
            {/* Range Sliders */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-sm font-medium text-gray-400">Monthly Investment Amount</label>
                  <span className="text-gold font-bold">{formatCurrency(monthlyAmount)}</span>
                </div>
                <input 
                  type="range" 
                  min="1000" 
                  max="100000" 
                  step="500"
                  value={monthlyAmount}
                  onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                  className="w-full h-2 bg-navy-light rounded-lg appearance-none cursor-pointer accent-gold"
                />
              </div>

              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-sm font-medium text-gray-400">Investment Period (Years)</label>
                  <span className="text-gold font-bold">{period} Yrs</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  value={period}
                  onChange={(e) => setPeriod(Number(e.target.value))}
                  className="w-full h-2 bg-navy-light rounded-lg appearance-none cursor-pointer accent-gold"
                />
              </div>

              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-sm font-medium text-gray-400">Expected Annual Return (%)</label>
                  <span className="text-gold font-bold">{returnRate}%</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="20" 
                  step="0.5"
                  value={returnRate}
                  onChange={(e) => setReturnRate(Number(e.target.value))}
                  className="w-full h-2 bg-navy-light rounded-lg appearance-none cursor-pointer accent-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-gray-800">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Total Invested</p>
                <p className="text-xl font-bold">{formatCurrency(results.totalInvested)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Est. Returns</p>
                <p className="text-xl font-bold text-green-400">{formatCurrency(results.estReturns)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Total Value</p>
                <p className="text-xl font-bold text-gold">{formatCurrency(results.totalValue)}</p>
              </div>
            </div>
          </div>

          <div className="h-[300px] md:h-[400px] flex flex-col items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={800}
                >
                  <Cell fill={BRAND_NAVY_LIGHT} stroke="rgba(255,255,255,0.05)" />
                  <Cell fill={BRAND_GOLD} stroke="rgba(255,255,255,0.1)" />
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: BRAND_NAVY, borderColor: '#333', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
               <p className="text-gray-400 text-sm">Wealth Ratio</p>
               <p className="text-2xl font-bold">{Math.round((results.estReturns / results.totalValue) * 100)}% Returns</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://formspree.io/f/movlllnv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setStatus('success');
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4A64A', '#111E38', '#F7F6F5']
        });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-offwhite text-navy">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Get clarity, not pressure</h2>
              <p className="text-lg text-gray-600 mb-10">
                Contact us today for a free clarity session. No sales pitch, just honest financial understanding.
              </p>
            </motion.div>

            <div className="space-y-6">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-navy/5 flex items-center justify-center text-navy">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">Email us</p>
                  <p className="text-lg font-medium">finjoyfinance@gmail.com</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-navy/5 flex items-center justify-center text-navy">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">Location</p>
                  <p className="text-lg font-medium">Mumbai, Maharashtra, India</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-navy/20 flex items-center justify-center hover:bg-navy hover:text-offwhite transition-all">
                <Linkedin size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-navy/20 flex items-center justify-center hover:bg-navy hover:text-offwhite transition-all">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-navy p-8 md:p-10 rounded-3xl shadow-2xl relative"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Name</label>
                  <input 
                    name="name"
                    required
                    className="w-full bg-navy-light border border-gray-800 rounded-xl px-4 py-3 focus:border-gold outline-none text-offwhite transition-all"
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Email</label>
                  <input 
                    name="email"
                    type="email"
                    required
                    className="w-full bg-navy-light border border-gray-800 rounded-xl px-4 py-3 focus:border-gold outline-none text-offwhite transition-all"
                    placeholder="Enter email"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Phone</label>
                  <input 
                    name="phone"
                    type="tel"
                    required
                    className="w-full bg-navy-light border border-gray-800 rounded-xl px-4 py-3 focus:border-gold outline-none text-offwhite transition-all"
                    placeholder="Enter phone"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Interest</label>
                  <select 
                    name="service"
                    className="w-full bg-navy-light border border-gray-800 rounded-xl px-4 py-3 focus:border-gold outline-none text-offwhite transition-all appearance-none"
                  >
                    <option>Mutual Fund SIP</option>
                    <option>Wealth Planning</option>
                    <option>Portfolio Review</option>
                    <option>Education Session</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Message</label>
                <textarea 
                  name="message"
                  rows={4}
                  className="w-full bg-navy-light border border-gray-800 rounded-xl px-4 py-3 focus:border-gold outline-none text-offwhite transition-all resize-none"
                  placeholder="How can we help?"
                />
              </div>

              <button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-gold hover:bg-gold/90 text-navy font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : 'Request Clarity Session'}
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>

              {status === 'success' && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 text-center font-medium">
                  Success! We&apos;ll get back to you soon.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-center font-medium">
                  Oops! Something went wrong. Please try again.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-24 md:pt-48 md:pb-40 px-4 md:px-8 bg-navy-gradient overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 blur-[120px] rounded-full -translate-y-1/2" />
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold border border-gold/20 text-xs font-bold uppercase tracking-widest mb-8"
          >
            Mumbai&apos;s Trusted Financial clarity partner
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-7xl font-heading font-black max-w-4xl text-offwhite leading-tight mb-8"
          >
            Simple mutual fund <span className="text-gold italic">clarity</span> for long-term investors
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12"
          >
            We don&apos;t sell products. We provide the knowledge and logic you need to build wealth with confidence.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
          >
            <a href="#calculator" className="bg-gold text-navy font-bold px-10 py-4 rounded-xl hover:bg-gold/90 transition-all gold-glow text-center">
              Understand SIPs
            </a>
            <a href="#contact" className="border border-gold/40 text-gold font-bold px-10 py-4 rounded-xl hover:bg-gold/10 transition-all text-center">
              Talk for clarity
            </a>
          </motion.div>
        </div>
      </section>

      {/* Is FinJoy Right For You? */}
      <section className="py-24 bg-navy px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Is FinJoy <span className="text-gold">Right For You?</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: '🤯', title: 'Too much confusion', text: 'Struggling to choose the right fund from 2500+ options?' },
              { emoji: '📉', title: 'Market ups & downs', text: 'Worried about volatility and when to stay or exit?' },
              { emoji: '💡', title: 'Prefer understanding', text: 'You want to know the logic behind your portfolio.' },
              { emoji: '⏳', title: 'Think long term', text: 'Wealth is built over decades, not overnight.' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-navy-light p-8 rounded-3xl border border-gray-800 hover:border-gold/40 transition-colors group"
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">{item.emoji}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-navy-light px-4 md:px-8 border-y border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div className="max-w-2xl">
              <span className="text-gold font-bold uppercase tracking-widest text-xs">How We Help</span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold mt-2">Personalized Financial <span className="text-gold">Education</span></h2>
            </div>
            <a href="#contact" className="text-gold font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View all services <ArrowRight size={20} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <TrendingUp className="text-gold" />,
                title: 'SIP & Mutual Fund Education',
                items: ['Power of Compounding', 'Risk Assessment', 'Fund Selection Logic']
              },
              {
                icon: <ShieldCheck className="text-gold" />,
                title: 'Goal-Based Understanding',
                items: ['Retirement Planning', 'Education Funding', 'Wealth Creation']
              },
              {
                icon: <Zap className="text-gold" />,
                title: 'Portfolio Clarity Sessions',
                items: ['Overlap Analysis', 'Risk Rebalancing', 'Performance Review']
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-navy p-10 rounded-[2.5rem] border border-gray-800 shadow-xl"
              >
                <div className="w-16 h-16 rounded-2xl bg-navy-light flex items-center justify-center mb-8">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-6">{service.title}</h3>
                <ul className="space-y-4">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-400">
                      <CheckCircle2 size={18} className="text-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CalculatorSection />

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-navy px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Investor <span className="text-gold">Stories</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Koushik Paul', role: 'IT Professional', text: 'FinJoy clarified concepts I found daunting for years. Their SIP logic is purely objective.' },
              { name: 'Ashwairya Nadaf', role: 'Entrepreneur', text: 'The goal-based planning session was an eye-opener. I now know exactly why I am investing.' },
              { name: 'Alisha Shaikh', role: 'Creative Director', text: 'Clarity over hype. No sales pressure, just deep financial understanding and planning.' },
            ].map((test, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-navy-light p-10 rounded-3xl border border-gray-800 relative"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={BRAND_GOLD} color={BRAND_GOLD} />)}
                </div>
                <p className="text-lg italic text-gray-300 mb-8 leading-relaxed">&quot;{test.text}&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center font-bold text-gold">
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold">{test.name}</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">{test.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />

      {/* Footer */}
      <footer className="bg-navy border-t border-gold/20 pt-20 pb-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center font-bold text-navy text-2xl">F</div>
                <span className="text-2xl font-heading font-bold text-offwhite">
                  FinJoy <span className="text-gold">Finance</span>
                </span>
              </div>
              <p className="text-gray-400 max-w-sm">
                Empowering Indian investors with clarity and data-driven logical selection of mutual funds for long-term wealth.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-offwhite uppercase tracking-widest text-sm">Quick Links</h4>
              <ul className="space-y-4">
                {['Home', 'Services', 'SIP Calculator'].map(link => (
                  <li key={link}><a href={`#${link.toLowerCase().replace(' ', '')}`} className="text-gray-400 hover:text-gold transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-offwhite uppercase tracking-widest text-sm">Legal</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-gold transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gold transition-colors text-sm">Risk Disclosure</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gold transition-colors text-sm">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} FinJoy Finance. All Reserved.</p>
            <div className="flex gap-6">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gold transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
