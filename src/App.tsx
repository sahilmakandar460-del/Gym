/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Dumbbell, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter, 
  Flame,
  Zap,
  ChevronRight, 
  Users, 
  Trophy, 
  Clock, 
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';

const PHONE_NUMBER = "+91 9766297807";
const PHONE_DISPLAY = "+91 97662 97807";
const EMAIL_ADDRESS = "sm8293999@gmail.com";
const ADDRESS = "VIP Road, Seven Square Complex, Solapur, MH 413003";
const WHATSAPP_URL = "https://wa.me/919766297807";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
      }
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Heritage', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Membership', href: '#membership' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/80 backdrop-blur-xl py-3 border-b border-white/5' : 'bg-transparent py-0'
      }`}
    >
      {/* Top Info Bar */}
      {!isScrolled && (
        <div className="hidden lg:block border-b border-white/5 py-3">
          <div className="container mx-auto px-12 flex justify-between items-center text-[10px] font-oswald tracking-[0.3em] font-medium text-white/40">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-accent" />
                <span>{ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={12} className="text-accent" />
                <span className="uppercase">05:00 — 23:00</span>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <a href={`tel:${PHONE_NUMBER}`} className="hover:text-accent transition-colors flex items-center gap-2">
                <Phone size={12} className="text-accent" />
                <span>{PHONE_DISPLAY}</span>
              </a>
              <a href={`mailto:${EMAIL_ADDRESS}`} className="hover:text-accent transition-colors flex items-center gap-2">
                <Mail size={12} className="text-accent" />
                <span>{EMAIL_ADDRESS}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <div className={`container mx-auto px-6 md:px-12 flex justify-between items-center ${!isScrolled ? 'py-8' : ''}`}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="relative">
            <div className="w-12 h-12 bg-accent flex items-center justify-center rounded-xs rotate-45 transform transition-transform group-hover:rotate-90">
              <Dumbbell className="text-black -rotate-45" size={26} />
            </div>
            <div className="absolute inset-0 bg-accent/20 blur-lg -z-1"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-bebas text-2xl tracking-[0.2em] text-white leading-none">GOODLIFE</span>
            <span className="font-oswald text-[10px] tracking-[0.5em] text-accent uppercase font-semibold">Fitness Club</span>
          </div>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-12">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -2 }}
              className="font-oswald text-xs uppercase tracking-[0.3em] font-medium text-white/50 hover:text-accent transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
          ))}
          <motion.a 
            href="#membership"
            onClick={(e) => handleNavClick(e, '#membership')}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 215, 0, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-accent text-black font-bebas px-8 py-2.5 tracking-[0.2em] rounded-xs transition-all flex items-center gap-2 group cursor-pointer"
          >
            BECOME A MEMBER
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white hover:text-accent transition-colors z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-black z-40 lg:hidden flex flex-col items-center justify-center gap-10"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-bebas text-5xl tracking-[0.2em] text-white hover:text-accent transition-all"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a 
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-accent text-black font-bebas px-12 py-5 text-2xl tracking-[0.2em]"
              >
                JOIN NOW
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center">
      {/* Cinematic Background with Parallax */}
      <motion.div 
        style={{ y }}
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://i.ibb.co/rRq96v9d/5b21f1e327d54ca88df5787048d91bbd.jpg" 
          alt="Gym Hero"
          className="w-full h-full object-cover grayscale-20 brightness-50"
        />
        {/* Dynamic Overlays */}
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-linear-to-t from-black via-zinc-950/20 to-black/40"></div>
        {/* Floating Light Effect */}
        <div className="absolute top-1/4 right-0 w-1/2 h-1/2 bg-accent/5 blur-[120px] rounded-full"></div>
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-accent"></div>
              <h2 className="text-accent font-oswald text-xs md:text-sm tracking-[0.8em] uppercase font-bold">
                The Pinnacle of Human Performance
              </h2>
            </div>
            
            <h1 className="text-7xl md:text-[10rem] font-bebas leading-[0.85] text-white mb-8 uppercase tracking-tight">
              REDEFINE <br/>
              <span className="text-white outline-text transition-all cursor-default">YOURSELF</span>
            </h1>
            
            <p className="text-white/40 text-lg md:text-xl max-w-xl mb-12 leading-relaxed font-light font-oswald tracking-wide">
              Step into an elite sanctuary of strength. Solapur's premier luxury fitness 
              destination where legacy meets modern performance science.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
              <motion.a 
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-accent text-black font-bebas text-2xl px-14 py-5 tracking-[0.2em] rounded-xs shadow-[0_20px_50px_rgba(255,215,0,0.15)] flex items-center gap-4 cursor-pointer"
              >
                JOIN THE ELITE
                <ChevronRight size={24} />
              </motion.a>
              <button 
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1 group-hover:border-l-accent transition-all"></div>
                </div>
                <span className="text-white font-oswald text-sm tracking-[0.4em] uppercase font-bold group-hover:text-accent transition-colors">Learn More</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Indicators */}
      <div className="absolute bottom-12 left-0 w-full hidden lg:block">
        <div className="container mx-auto px-12 flex justify-between items-end">
          <div className="flex gap-24">
            <div className="flex flex-col gap-2">
              <span className="text-accent font-bebas text-5xl leading-none">01</span>
              <span className="text-white/30 font-oswald text-[10px] tracking-[0.3em] font-bold uppercase">PREMIUM EQUIPMENT</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white/20 font-bebas text-5xl leading-none">02</span>
              <span className="text-white/30 font-oswald text-[10px] tracking-[0.3em] font-bold uppercase">EXPERT COACHING</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white/20 font-bebas text-5xl leading-none">03</span>
              <span className="text-white/30 font-oswald text-[10px] tracking-[0.3em] font-bold uppercase">LUXURY AMENITIES</span>
            </div>
          </div>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-4"
          >
            <span className="text-white/20 font-oswald text-[9px] tracking-[0.3em] uppercase rotate-90 origin-right translate-x-3 translate-y-10">SCROLL</span>
            <div className="w-[1px] h-20 bg-linear-to-b from-accent to-transparent"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden bg-black">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-zinc-900 overflow-hidden rounded-xs border border-white/5 shadow-2xl">
               <img 
                 src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=2069&auto=format&fit=crop" 
                 alt="Luxury Gym Interior" 
                 className="w-full h-full object-cover opacity-60 grayscale-[0.5] hover:grayscale-0 transition-all duration-1000 scale-110 hover:scale-100"
               />
            </div>
            
            {/* Absolute Badges */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-10 -right-10 bg-accent p-12 shadow-2xl flex flex-col justify-center border-t border-l border-white/20"
            >
              <span className="text-black font-bebas text-8xl leading-none">10+</span>
              <span className="text-black font-oswald text-xs tracking-[0.4em] font-bold">YEARS OF<br/>ELITE LEGACY</span>
            </motion.div>

            <div className="absolute top-10 -left-10 w-20 h-20 border-l border-t border-accent/30"></div>
          </motion.div>

          <motion.div
             whileInView={{ opacity: 1, x: 0 }}
             initial={{ opacity: 0, x: 40 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-10 h-[1px] bg-accent/50"></span>
              <h2 className="text-accent font-oswald text-sm tracking-[0.4em] uppercase font-semibold">THE HERITAGE</h2>
            </div>
            <h3 className="text-6xl md:text-8xl font-bebas text-white mb-10 leading-tight uppercase">
              BEYOND THE <span className="text-white/20 italic font-light outline-text">PHYSICAL</span>
            </h3>
            <p className="text-white/40 text-xl mb-12 font-oswald font-light leading-relaxed tracking-wide">
              Goodlife Fitness Club isn't just a destination—it's a high-performance sanctuary. 
              We've cultivated a culture where discipline meets luxury, providing an environment 
              that demands greatness from everyone who walks through our doors.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="group">
                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center mb-6 group-hover:border-accent group-hover:bg-accent/5 transition-all">
                  <Users className="text-accent" size={28} />
                </div>
                <h4 className="text-white font-bebas text-2xl tracking-widest mb-3 uppercase">Elite Circle</h4>
                <p className="text-white/30 text-sm font-oswald font-light leading-relaxed">Join a community of high-achievers and elite athletes dedicated to collective growth.</p>
              </div>
              <div className="group">
                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center mb-6 group-hover:border-accent group-hover:bg-accent/5 transition-all">
                  <Trophy className="text-accent" size={28} />
                </div>
                <h4 className="text-white font-bebas text-2xl tracking-widest mb-3 uppercase">Master Mastery</h4>
                <p className="text-white/30 text-sm font-oswald font-light leading-relaxed">Access methodologies practiced by world champions and Olympic professionals.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { title: 'WEIGHT', subtitle: 'POWER & STRENGTH', desc: 'Elite muscle development programs utilizing high-precision machinery and world-class free weights.', icon: <Dumbbell />, image: 'https://i.ibb.co/5QYHjDg/5c39522db8753602d4036c7cf7293b99.jpg' },
    { title: 'CARDIO', subtitle: 'ENDURANCE FLOW', desc: 'Advanced cardiovascular conditioning designed to optimize metabolic rate and stamina.', icon: <Clock />, image: 'https://i.ibb.co/CsSxZdpG/28ff425249a9fe8a9ec9066a80182570.jpg' },
    { title: 'LOSS', subtitle: 'FAT BURNING', desc: 'Data-driven weight management programs tailored to your unique metabolic profile and goals.', icon: <Flame />, image: 'https://i.ibb.co/KcQJpFxd/bf4a6e98394970fad44d93ece63ac7d1.jpg' },
    { title: 'HIIT', subtitle: 'INTENSE WORKOUT', desc: 'High-intensity interval protocols designed to maximize caloric burn and explosive power.', icon: <Zap />, image: 'https://i.ibb.co/Z3LmsC2/21b20e5f6832c5856a6a67b64cbaf6bf.jpg' },
  ];

  return (
    <section id="services" className="py-32 bg-zinc-950 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-[0.02]">
        <h2 className="text-[30rem] font-bebas leading-none select-none translate-x-1/2">GLFC</h2>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-accent font-oswald text-sm md:text-base tracking-[0.5em] mb-6 uppercase font-bold">PREMIUM SERVICES</h2>
            <h3 className="text-6xl md:text-8xl font-bebas text-white uppercase tracking-wider leading-none">
              ENGINEERED FOR <br/><span className="text-white outline-text">PERFECTION</span>
            </h3>
          </div>
          <p className="text-white/30 font-light text-lg max-w-sm mb-2 font-oswald leading-relaxed">
            Every service at Goodlife is designed around our philosophy of maximum performance through science-backed methodologies.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative h-[600px] overflow-hidden cursor-pointer"
            >
              {/* Service Image Background */}
              <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover brightness-[0.4] group-hover:brightness-[0.5] transition-all" />
              </div>
              
              {/* Multi-layered Cinematic Overlays */}
              <div className="absolute inset-0 bg-linear-to-b from-black/90 via-black/20 to-transparent opacity-100 group-hover:opacity-80 transition-opacity duration-700"></div>
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent opacity-100 group-hover:from-accent/10 transition-all duration-700"></div>
              
              <div className="absolute top-10 left-10 flex flex-col items-start px-2">
                <span className="text-accent font-oswald text-[10px] tracking-[0.8em] font-bold mb-4 opacity-100 group-hover:translate-x-2 transition-transform">{service.subtitle}</span>
                <h4 className="text-white font-bebas text-5xl mb-2 group-hover:text-accent transition-colors">{service.title}</h4>
              </div>

              <div className="absolute bottom-10 left-10 right-10 flex flex-col gap-6">
                <p className="text-white/50 font-oswald text-xs leading-relaxed tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                  {service.desc}
                </p>
                <div className="h-[1px] w-0 bg-accent group-hover:w-full transition-all duration-700"></div>
                <div className="flex justify-between items-center text-white font-bebas text-xl opacity-40 group-hover:opacity-100 transition-opacity">
                  <span>DISCOVER</span>
                  <div className="p-3 bg-white/5 group-hover:bg-accent group-hover:text-black rounded-full transition-all">
                    <ChevronRight size={24} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Membership = () => {
  const plans = [
    { name: 'SILVER', price: '4,000', features: ['Luxury Gym Access', 'Member Lounge', 'Consultation', 'Standard Support'], accent: false },
    { name: 'GOLD', price: '10,000', features: ['All Silver Features', 'Steam & Sauna', 'Daily Classes', 'Fitness Biometrics', 'Nutrition Plan'], accent: true },
    { name: 'PLATINUM', price: '25,000', features: ['All Gold Features', 'Personal Concierge', 'Massage Therapy', 'Priority Access', 'Elite Supplements'], accent: false },
  ];

  return (
    <section id="membership" className="py-32 bg-black relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <h2 className="text-accent font-oswald text-sm tracking-[0.5em] mb-6 uppercase font-bold">PRESTIGE ACCESS</h2>
          <h3 className="text-6xl md:text-8xl font-bebas text-white uppercase tracking-wider leading-none mb-8">
            CHOOSE YOUR <span className="text-white outline-text">LEGACY</span>
          </h3>
          <p className="text-white/30 font-light text-lg font-oswald tracking-wide">
            Select the tier that aligns with your ambitions. Every plan includes an unparalleled standard of luxury and performance.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative p-12 transition-all duration-500 overflow-hidden ${
                plan.accent ? 'bg-zinc-900 border-accent shadow-[0_30px_100px_rgba(255,215,0,0.05)]' : 'bg-zinc-950 border-white/5'
              } border`}
            >
              {plan.accent && (
                 <div className="absolute top-0 right-0 bg-accent text-black font-bebas py-2 px-10 text-lg tracking-widest uppercase">
                    MOST EXCLUSIVE
                 </div>
              )}
              
              <div className="mb-12">
                <h4 className="text-white font-bebas text-4xl mb-4 tracking-widest">{plan.name}</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-accent font-bebas text-6xl">₹{plan.price}</span>
                  <span className="text-white/20 font-oswald text-xs tracking-widest font-bold">/ 3 MONTHS</span>
                </div>
              </div>
              
              <div className="w-full h-[1px] bg-white/5 mb-10"></div>

              <ul className="w-full space-y-6 mb-16">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-4 text-white/50 font-oswald text-xs uppercase tracking-[0.2em] font-medium group-hover:text-white transition-colors">
                    <CheckCircle2 size={18} className="text-accent shadow-glow" /> {f}
                  </li>
                ))}
              </ul>

              <motion.a 
                href={`${WHATSAPP_URL}?text=I'm interested in the ${plan.name} Membership plan.`}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full font-bebas text-2xl py-5 tracking-[0.3em] transition-all rounded-xs text-center block ${
                plan.accent ? 'bg-accent text-black hover:bg-white' : 'border border-white/20 text-white hover:bg-white hover:text-black'
              }`}>
                SECURE ACCESS
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-zinc-950 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-24">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-10 h-[1px] bg-accent/50"></span>
              <h2 className="text-accent font-oswald text-sm tracking-[0.5em] mb-6 uppercase font-bold text-left">ESTABLISH CONTACT</h2>
            </div>
            <h3 className="text-6xl md:text-8xl font-bebas text-white mb-12 uppercase tracking-widest leading-[0.9]">
              START YOUR <br/><span className="text-white outline-text">TRANSFORMATION</span>
            </h3>
            
            <div className="space-y-12">
              <div className="flex gap-8 items-start group">
                <div className="w-16 h-16 bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0 group-hover:border-accent transition-all">
                  <MapPin size={28} className="text-accent" />
                </div>
                <div>
                  <h4 className="text-white font-bebas text-2xl tracking-[0.1em] mb-2 uppercase">THE SANCTUARY</h4>
                  <p className="text-white/30 font-oswald text-sm font-light leading-relaxed tracking-wide">
                    VIP Road, Seven Square Complex,<br/>
                    Solapur, Maharashtra 413003
                  </p>
                </div>
              </div>

              <div className="flex gap-8 items-start group">
                <a 
                  href={`tel:${PHONE_NUMBER}`}
                  className="w-16 h-16 bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0 group-hover:border-accent transition-all"
                >
                  <Phone size={28} className="text-accent" />
                </a>
                <div>
                  <h4 className="text-white font-bebas text-2xl tracking-[0.1em] mb-2 uppercase">DIRECT LINE</h4>
                  <a href={`tel:${PHONE_NUMBER}`} className="text-white/30 font-oswald text-sm font-light tracking-wide hover:text-accent transition-colors">{PHONE_DISPLAY}</a>
                </div>
              </div>

              <div className="flex gap-8 items-start group">
                <a 
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="w-16 h-16 bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0 group-hover:border-accent transition-all"
                >
                  <Mail size={28} className="text-accent" />
                </a>
                <div>
                  <h4 className="text-white font-bebas text-2xl tracking-[0.1em] mb-2 uppercase">ELECTRONIC MAIL</h4>
                  <a href={`mailto:${EMAIL_ADDRESS}`} className="text-white/30 font-oswald text-sm font-light tracking-wide underline decoration-accent/30 hover:decoration-accent transition-all">{EMAIL_ADDRESS}</a>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900/50 backdrop-blur-md p-12 lg:p-16 border border-white/5 relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[80px]"></div>
            <h4 className="text-white font-bebas text-4xl mb-10 tracking-widest uppercase">ENQUIRY FORM</h4>
            <form action="https://formspree.io/f/placeholder" method="POST" className="grid gap-8">
              <div className="grid md:grid-cols-2 gap-8">
                <input name="name" type="text" required placeholder="GIVEN NAME" className="bg-transparent border-b border-white/10 py-4 text-white font-oswald text-xs tracking-widest focus:border-accent outline-hidden transition-all placeholder:text-white/20" />
                <input name="email" type="email" required placeholder="EMAIL ADDRESS" className="bg-transparent border-b border-white/10 py-4 text-white font-oswald text-xs tracking-widest focus:border-accent outline-hidden transition-all placeholder:text-white/20" />
              </div>
              <input name="program" type="text" placeholder="INTERESTED PROGRAM" className="bg-transparent border-b border-white/10 py-4 text-white font-oswald text-xs tracking-widest focus:border-accent outline-hidden transition-all placeholder:text-white/20" />
              <textarea name="message" rows={4} placeholder="MEMBERSHIP OBJECTIVES" className="bg-transparent border-b border-white/10 py-4 text-white font-oswald text-xs tracking-widest focus:border-accent outline-hidden transition-all placeholder:text-white/20"></textarea>
              <motion.button 
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-accent text-black font-bebas text-2xl py-5 tracking-[0.3em] shadow-[0_10px_40px_rgba(255,215,0,0.2)] hover:shadow-[0_15px_50px_rgba(255,215,0,0.3)] transition-all"
              >
                REQUEST CALLBACK
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-32 pb-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-5 gap-16 mb-24">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-accent flex items-center justify-center rounded-xs rotate-45">
                <Dumbbell className="text-black -rotate-45" size={20} />
              </div>
              <div className="flex flex-col">
                <span className="font-bebas text-3xl tracking-[0.2em] text-white leading-none">GOODLIFE</span>
                <span className="font-oswald text-[10px] tracking-[0.5em] text-accent uppercase font-semibold">Fitness Club</span>
              </div>
            </div>
            <p className="text-white/30 font-oswald text-sm font-light max-w-sm mb-10 leading-relaxed tracking-wide">
              The definitive luxury training environment in Solapur. Dedicated to the pursuit of physical excellence since 2014.
            </p>
            <div className="flex gap-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <div key={i} className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-white/30 hover:text-accent hover:border-accent hover:bg-accent/5 cursor-pointer transition-all">
                  <Icon size={20} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bebas text-xl tracking-[0.2em] mb-10 uppercase">NAVIGATION</h4>
            <ul className="space-y-4">
              {['Home', 'Heritage', 'Services', 'Membership', 'Contact'].map(l => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="text-white/20 text-xs font-oswald tracking-[0.2em] hover:text-accent uppercase transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bebas text-xl tracking-[0.2em] mb-10 uppercase">ENQUIRIES</h4>
            <ul className="space-y-4">
              {['Careers', 'Corporate', 'Press', 'Investors'].map(l => (
                <li key={l}><a href="#" className="text-white/20 text-xs font-oswald tracking-[0.2em] hover:text-accent uppercase transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bebas text-xl tracking-[0.2em] mb-10 uppercase">OPERATIONS</h4>
            <ul className="space-y-5">
              <li className="flex flex-col gap-1">
                <span className="text-white/20 text-[10px] uppercase tracking-[0.3em] font-bold">WEEKDAYS</span>
                <span className="text-white font-oswald text-xs tracking-widest font-medium">05:00 — 23:00</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-white/20 text-[10px] uppercase tracking-[0.3em] font-bold">SATURDAY</span>
                <span className="text-white font-oswald text-xs tracking-widest font-medium">06:00 — 21:00</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-white/20 text-[10px] uppercase tracking-[0.3em] font-bold">SUNDAY</span>
                <span className="text-white font-oswald text-xs tracking-widest font-medium text-accent">CLOSED</span>
              </li>
              <li className="pt-4 flex flex-col gap-2">
                 <a href={`tel:${PHONE_NUMBER}`} className="text-accent font-oswald text-xs tracking-widest hover:underline">{PHONE_DISPLAY}</a>
                 <a href={`mailto:${EMAIL_ADDRESS}`} className="text-white/30 font-oswald text-[10px] tracking-widest hover:text-white transition-colors">{EMAIL_ADDRESS}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <p className="text-white/10 text-[10px] uppercase tracking-[0.5em] font-bold">© 2024 GLFC INTERNATIONAL. ART DIRECTION BY PREMIER DESIGN.</p>
          <div className="flex gap-10">
            <span className="text-white/10 text-[10px] uppercase tracking-[0.3em] hover:text-white cursor-pointer transition-colors font-bold">PRIVACY</span>
            <span className="text-white/10 text-[10px] uppercase tracking-[0.3em] hover:text-white cursor-pointer transition-colors font-bold">TERMS</span>
            <span className="text-white/10 text-[10px] uppercase tracking-[0.3em] hover:text-white cursor-pointer transition-colors font-bold">COOKIES</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <main className="bg-black selection:bg-accent selection:text-black scroll-smooth">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Membership />
      <Contact />
      <Footer />

      {/* Floating WhatsApp UI */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.3)] group"
      >
        <span className="absolute right-full mr-4 bg-black/80 backdrop-blur-md text-white text-[10px] font-oswald font-bold tracking-[0.2em] px-4 py-2 rounded-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">INQUIRE NOW</span>
        <Phone size={28} />
      </motion.a>
    </main>
  );
}
