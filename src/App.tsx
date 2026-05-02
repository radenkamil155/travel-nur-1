import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  MessageSquare,
  Menu,
  X,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  ChevronRight,
  Plane,
  Heart,
  Globe,
  Sparkles,
  Info,
  Package,
  Clock,
  Filter,
  Play,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TRIPS, REVIEWS } from './constants.ts';
import { Trip } from './types.ts';
import { askTravelAdvisor } from './services/geminiService.ts';

// --- Components ---

const BookingModal = ({ trip, isOpen, onClose }: { trip: Trip; isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', count: 1 });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-900 transition-colors">
          <X className="w-6 h-6" />
        </button>
        
        <div className="p-10">
          <div className="flex gap-4 mb-8">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= step ? 'bg-brand-gold' : 'bg-zinc-100'}`} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold block mb-2">Step 01</span>
                <h3 className="text-4xl font-black tracking-tighter uppercase mb-4 leading-tight">Envisioning <br /> your voyage</h3>
                <p className="text-zinc-500 text-sm mb-10 leading-relaxed italic opacity-70">Tell us about the company you keep for this spiritual metamorphosis.</p>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <span className="font-black text-[10px] uppercase tracking-widest text-zinc-400">Total Sovereigns</span>
                    <div className="flex items-center gap-6">
                      <button 
                        onClick={() => setFormData({...formData, count: Math.max(1, formData.count - 1)})}
                        className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-brand-dark hover:text-white transition-all text-xl"
                      >-</button>
                      <span className="font-black text-xl w-6 text-center">{formData.count}</span>
                      <button 
                         onClick={() => setFormData({...formData, count: formData.count + 1})}
                        className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-brand-dark hover:text-white transition-all text-xl"
                      >+</button>
                    </div>
                  </div>
                  <div className="p-6 bg-brand-bg rounded-2xl border border-brand-gold/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2"><Sparkles className="text-brand-gold/20 w-12 h-12" /></div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] uppercase font-black text-brand-gold tracking-[0.2em]">Total Investment</span>
                      <span className="text-2xl font-black text-brand-dark">${trip.price * formData.count}</span>
                    </div>
                    <p className="text-[9px] text-zinc-400 font-bold tracking-widest uppercase">Premium hospitality inclusive.</p>
                  </div>
                </div>

                <button 
                  onClick={() => setStep(2)}
                  className="w-full bg-brand-dark text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest mt-10 hover:bg-brand-gold transition-all shadow-2xl"
                >
                  Confirm & Continue
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block mb-2">Step 02</span>
                <h3 className="text-3xl font-serif font-bold mb-4">Traveler Information</h3>
                <p className="text-zinc-500 text-sm mb-8 leading-relaxed">Where shall we send the booking details and itinerary?</p>
                
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm focus:outline-none focus:border-amber-200"
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm focus:outline-none focus:border-amber-200"
                  />
                </div>

                <button 
                  onClick={() => setStep(3)}
                  disabled={!formData.name || !formData.email}
                  className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-bold mt-8 hover:bg-amber-600 transition-all shadow-lg disabled:opacity-50"
                >
                  Finalize Request
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-3xl font-serif font-bold mb-4">Request Received</h3>
                <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
                  Salam, {formData.name.split(' ')[0]}. Your interest in the {trip.title} has been logged. 
                  A travel specialist will contact you within 2 hours to finalize the details.
                </p>
                
                <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 text-left mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <Info className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold uppercase tracking-widest">What's Next?</span>
                  </div>
                  <ul className="text-xs text-zinc-500 space-y-2">
                    <li className="flex gap-2"><span>1.</span> Phone consultation with a travel specialist</li>
                    <li className="flex gap-2"><span>2.</span> Final package customization</li>
                    <li className="flex gap-2"><span>3.</span> Secure deposit payment</li>
                  </ul>
                </div>

                <button 
                  onClick={onClose}
                  className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all"
                >
                  Close & Explore More
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

const Navbar = ({ onNavigate }: { onNavigate: (page: string, params?: any) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-brand-bg/90 backdrop-blur-md py-4 shadow-sm border-b border-zinc-100' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center transition-colors">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <div className="h-10 w-auto group-hover:scale-105 transition-transform duration-500">
            <img src="input_file_0.png" alt="NUR TRAVEL" className="h-full w-auto object-contain" />
          </div>
          <span className={`text-xl font-black tracking-tighter uppercase ${isScrolled ? 'text-brand-dark' : 'text-white'}`}>NUR TRAVEL</span>
        </div>

        <div className={`hidden md:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.2em] ${isScrolled ? 'text-brand-dark/70' : 'text-white/70'}`}>
          <button onClick={() => onNavigate('home')} className="hover:text-brand-gold transition-colors">Journeys</button>
          <button onClick={() => onNavigate('destinations')} className="hover:text-brand-gold transition-colors">Destinations</button>
          <button className="hover:text-brand-gold transition-colors">Philosophy</button>
          <button className="hover:text-brand-gold transition-colors">Legacy</button>
          <button className="bg-brand-gold text-white px-7 py-3 rounded-full font-black text-[11px] shadow-lg hover:shadow-brand-gold/20 hover:-translate-y-0.5 transition-all active:translate-y-0">
            Start Your Journey
          </button>
        </div>

        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-6 flex flex-col gap-4 text-white md:hidden"
          >
            <button onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }} className="text-left py-2 border-b border-zinc-800">Home</button>
            <button onClick={() => { onNavigate('destinations'); setIsMobileMenuOpen(false); }} className="text-left py-2 border-b border-zinc-800">Destinations</button>
            <button className="text-left py-2 border-b border-zinc-800">Philosophy</button>
            <button className="text-left py-2 border-b border-zinc-800">Journal</button>
            <button className="bg-amber-200 text-zinc-950 px-6 py-3 rounded-full font-bold w-full mt-4">Enquire Now</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-zinc-950 text-white pt-20 pb-10 border-t border-zinc-800">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-auto">
            <img src="input_file_0.png" alt="NUR TRAVEL" className="h-full w-auto object-contain" />
          </div>
          <span className="text-3xl font-black tracking-tighter uppercase">NUR TRAVEL</span>
        </div>
        <p className="text-zinc-400 text-sm leading-relaxed mb-8 font-medium opacity-60 uppercase tracking-tight">
          Crafting transcendent sacred voyages for the discerning soul. Metamorphosis through legacy.
        </p>
        <div className="flex gap-6">
          <Instagram className="w-5 h-5 hover:text-brand-gold cursor-pointer transition-colors" />
          <Facebook className="w-5 h-5 hover:text-brand-gold cursor-pointer transition-colors" />
          <Twitter className="w-5 h-5 hover:text-brand-gold cursor-pointer transition-colors" />
        </div>
      </div>
      <div>
        <h4 className="font-black mb-8 text-[10px] uppercase tracking-[0.4em] text-brand-gold">Gateways</h4>
        <ul className="space-y-4 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
          <li className="hover:text-white cursor-pointer transition-colors">Andalusia</li>
          <li className="hover:text-white cursor-pointer transition-colors">Madinah</li>
          <li className="hover:text-white cursor-pointer transition-colors">Ottoman Route</li>
          <li className="hover:text-white cursor-pointer transition-colors">Silk Road</li>
          <li className="hover:text-white cursor-pointer transition-colors">Maghreb Legacy</li>
        </ul>
      </div>
      <div>
        <h4 className="font-black mb-8 text-[10px] uppercase tracking-[0.4em] text-brand-gold">Heritage</h4>
        <ul className="space-y-4 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
          <li className="hover:text-white cursor-pointer transition-colors">Philosophy</li>
          <li className="hover:text-white cursor-pointer transition-colors">Storytellers</li>
          <li className="hover:text-white cursor-pointer transition-colors">Testimonials</li>
          <li className="hover:text-white cursor-pointer transition-colors">Concierge</li>
          <li className="hover:text-white cursor-pointer transition-colors">Ethics</li>
        </ul>
      </div>
      <div>
        <h4 className="font-black mb-8 text-[10px] uppercase tracking-[0.4em] text-brand-gold">Concierge</h4>
        <div className="space-y-6 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
          <div className="flex items-center gap-4">
            <Phone className="w-4 h-4 text-brand-gold" />
            <span>+44 20 7946 0958</span>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="w-4 h-4 text-brand-gold" />
            <span>legacy@hikayat.com</span>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="w-4 h-4 text-brand-gold mt-0.5" />
            <span>Marylebone, London<br />United Kingdom</span>
          </div>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-zinc-900 flex flex-col md:row justify-between text-zinc-500 text-xs">
      <p>&copy; 2026 NUR TRAVEL. All rights reserved.</p>
      <div className="flex gap-6 mt-4 md:mt-0">
        <span className="hover:text-white cursor-pointer">Privacy Policy</span>
        <span className="hover:text-white cursor-pointer">Terms of Service</span>
      </div>
    </div>
  </footer>
);

const SectionHeading = ({ title, subtitle, light = false }: { title: string; subtitle?: string; light?: boolean }) => (
  <div className="mb-16 text-center">
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-4 mb-4"
    >
      <div className={`h-[1px] w-12 ${light ? 'bg-brand-gold/40' : 'bg-brand-gold'}`}></div>
      <span className={`text-[10px] uppercase tracking-[0.3em] font-black italic ${light ? 'text-brand-gold/60' : 'text-brand-gold'}`}>
        {subtitle}
      </span>
      <div className={`h-[1px] w-12 ${light ? 'bg-brand-gold/40' : 'bg-brand-gold'}`}></div>
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`text-5xl md:text-7xl font-black tracking-tight-extreme uppercase leading-none ${light ? 'text-white' : 'text-brand-dark'}`}
    >
      {title}
    </motion.h2>
  </div>
);

// --- Pages ---

const Home = ({ onNavigate }: { onNavigate: (page: string, params?: any) => void }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1920" 
            alt="Istanbul Mosque" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/20 to-zinc-950/80" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-block px-5 py-2 bg-white/10 backdrop-blur-lg rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-8 border border-white/20 shadow-2xl">
              Est. 2026 • Premium Sacred Tourism
            </span>
            <h1 className="text-7xl md:text-[110px] font-black leading-[0.85] tracking-tight-extreme mb-12 uppercase">
              Where Souls <br />
              Find Their <span className="text-outline">Way Home</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              More than travel. A spiritual metamorphosis curated for the modern professional. Experience tranquility without compromise.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => onNavigate('destinations')}
                className="bg-brand-gold text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-brand-dark transition-all transform hover:scale-105 shadow-2xl"
              >
                Start Your Journey
              </button>
              <button className="flex items-center gap-3 group px-12 py-5 rounded-full border border-white/30 backdrop-blur-md hover:bg-white/10 transition-all text-xs font-black uppercase tracking-widest">
                <Play className="w-4 h-4 fill-white" />
                <span>Watch the Story</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-12 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-6 flex justify-around md:justify-center md:gap-24 opacity-80 text-white">
            <div className="text-center">
              <div className="text-3xl font-black tracking-tighter">15,000+</div>
              <div className="text-[9px] uppercase font-black tracking-[0.2em] text-white/50 mt-1">Legacies Crafted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black tracking-tighter">42</div>
              <div className="text-[9px] uppercase font-black tracking-[0.2em] text-white/50 mt-1">Sacred Gateways</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black tracking-tighter">4.9/5</div>
              <div className="text-[9px] uppercase font-black tracking-[0.2em] text-white/50 mt-1">Peer Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="bg-white py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Curated Expeditions" subtitle="Handpicked for you" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TRIPS.map((trip, idx) => (
              <motion.div 
                key={trip.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
                onClick={() => onNavigate('trip', trip.id)}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] mb-6 bg-zinc-100 border border-zinc-100 shadow-xl group">
                  <img 
                    src={trip.heroImage} 
                    alt={trip.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-brand-dark border border-black/5 shadow-sm">
                      {trip.duration}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-brand-dark/90 to-transparent">
                    <div className="flex items-center gap-2 text-brand-gold text-[10px] font-black uppercase tracking-widest mb-2">
                      <MapPin className="w-3 h-3" />
                      <span>{trip.destination}</span>
                    </div>
                    <h3 className="text-3xl font-black text-white leading-none tracking-tighter uppercase">{trip.title}</h3>
                  </div>
                </div>
                <div className="flex justify-between items-center px-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-3 h-3 fill-brand-gold text-brand-gold" />
                    <span className="text-xs font-black uppercase tracking-tighter">{trip.rating}</span>
                  </div>
                  <div className="text-2xl font-black tracking-tighter">
                    <span className="text-[10px] font-bold text-zinc-300 mr-2 uppercase tracking-widest">from</span>
                    <span className="text-brand-dark">${trip.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button 
              onClick={() => onNavigate('destinations')}
              className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-sm text-zinc-900 border-b-2 border-amber-200 pb-1 hover:text-amber-600 transition-colors"
            >
              View All Destinations <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Storytelling Content Section */}
      <section className="bg-zinc-950 py-32 px-6 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="md:w-1/2 relative">
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl"
             >
                <img 
                  src="https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=1000" 
                  alt="Taj Mahal Meditation" 
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
             </motion.div>
             <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.3 }}
               className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-gold/10 backdrop-blur-3xl rounded-full -z-0"
             />
             <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-6 left-6 z-20 bg-white p-8 rounded-3xl text-brand-dark flex items-center gap-5 max-w-xs shadow-2xl"
             >
                <div className="w-14 h-14 bg-brand-gold/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="text-brand-gold w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-black text-[10px] uppercase tracking-widest text-brand-gold">Certified Legacy</h4>
                  <p className="text-xs text-zinc-500 font-medium">Halal vetted for peace of mind.</p>
                </div>
             </motion.div>
          </div>
          <div className="md:w-1/2">
            <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.4em] mb-6 block">The Storyteller</span>
            <h2 className="text-5xl md:text-7xl font-black mb-10 leading-[0.9] tracking-tighter uppercase">Travel is the <br /><span className="text-outline">Language</span> <br /> of our souls</h2>
            <p className="text-zinc-400 text-xl leading-relaxed mb-10 font-light italic opacity-80">
              "We believe exploring creation isn't just about checkboxes. It's about witnessing greatness, resilience, and the beauty of diversity."
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-12">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-brand-gold">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-black uppercase tracking-widest text-[10px]">Sacred Guidance</span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed uppercase font-bold tracking-tight">Dedicated mentors on every spiritual voyage.</p>
              </div>
               <div className="space-y-3">
                <div className="flex items-center gap-3 text-brand-gold">
                  <Shield className="w-4 h-4" />
                  <span className="font-black uppercase tracking-widest text-[10px]">Zero Friction</span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed uppercase font-bold tracking-tight">Concierge planning. You arrive, we handle.</p>
              </div>
            </div>
            <button className="bg-white text-brand-dark px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-brand-gold hover:text-white transition-all shadow-xl">
              Explore Our Legacy
            </button>
          </div>
        </div>
      </section>

      {/* AI Advisor Chatbot UI Section */}
      <AIAdvisorSection />

      {/* Global Presence SVG Map */}
      <section className="bg-zinc-950 py-32 px-6 text-white overflow-hidden border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="A World of Stories" subtitle="Global Footprint" light />
          
          <div className="relative mt-20">
            {/* Simple Graphic Map Representation */}
            <svg viewBox="0 0 1000 500" className="w-full h-auto opacity-20">
              <path d="M150,150 Q200,100 250,150 T350,150 T450,200 T550,150 T650,200 T750,150 T850,200" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
              <path d="M100,300 Q200,350 300,300 T500,300 T700,350 T900,300" fill="none" stroke="currentColor" strokeWidth="1" />
              {/* Abstract Continent Shapes */}
              <circle cx="200" cy="180" r="100" fill="currentColor" fillOpacity="0.1" />
              <circle cx="500" cy="200" r="120" fill="currentColor" fillOpacity="0.1" />
              <circle cx="800" cy="250" r="100" fill="currentColor" fillOpacity="0.1" />
              <circle cx="300" cy="350" r="80" fill="currentColor" fillOpacity="0.1" />
            </svg>

            {/* Clickable Map Pointers */}
            <div className="absolute inset-0">
               {[
                 { x: '20%', y: '35%', label: 'Europe', desc: 'Cordoba & London' },
                 { x: '48%', y: '42%', label: 'Middle East', desc: 'Makkah & Madinah' },
                 { x: '45%', y: '55%', label: 'North Africa', desc: 'Marrakech & Fes' },
                 { x: '75%', y: '40%', label: 'Japan', desc: 'Kyoto & Tokyo' },
                 { x: '68%', y: '65%', label: 'Southeast Asia', desc: 'Kuala Lumpur & Bali' },
               ].map((point, i) => (
                 <motion.div 
                   key={i}
                   initial={{ scale: 0 }}
                   whileInView={{ scale: 1 }}
                   transition={{ delay: i * 0.2 }}
                   className="absolute group cursor-pointer"
                   style={{ left: point.x, top: point.y }}
                 >
                    <div className="w-4 h-4 bg-amber-400 rounded-full animate-pulse shadow-[0_0_20px_rgba(251,191,36,0.5)]" />
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-48 opacity-0 group-hover:opacity-100 transition-all pointer-events-none group-hover:top-8">
                       <div className="bg-white text-zinc-950 p-4 rounded-2xl shadow-2xl relative">
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45" />
                          <h4 className="font-bold text-sm mb-1">{point.label}</h4>
                          <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{point.desc}</p>
                       </div>
                    </div>
                 </motion.div>
               ))}
            </div>
          </div>

          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-zinc-900 pt-16">
            <div className="text-center">
               <h4 className="text-3xl font-serif font-bold text-amber-200 mb-2">98%</h4>
               <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Client Retention Rate</p>
            </div>
             <div className="text-center">
               <h4 className="text-3xl font-serif font-bold text-amber-200 mb-2">24/7</h4>
               <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">On-Ground Support</p>
            </div>
             <div className="text-center">
               <h4 className="text-3xl font-serif font-bold text-amber-200 mb-2">1,200+</h4>
               <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Unique Local Partnerships</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Stories of Transformation" subtitle="Traveler Voices" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review, idx) => (
              <motion.div 
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-zinc-50 p-8 rounded-3xl relative"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img src={review.avatar} alt={review.userName} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md grayscale hover:grayscale-0 transition-all" />
                  <div>
                    <h4 className="font-bold text-sm">{review.userName}</h4>
                    <span className="text-xs text-zinc-500">{review.location}</span>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-200'}`} />
                  ))}
                </div>
                <p className="text-zinc-600 text-sm leading-relaxed italic">"{review.comment}"</p>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center -rotate-12">
                  <MessageSquare className="w-6 h-6 text-amber-600" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-amber-600">
           <img 
            src="https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&q=80&w=1920" 
            alt="Desert" 
            className="w-full h-full object-cover opacity-30 mix-blend-multiply"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">Ready for your next chapter?</h2>
          <p className="text-xl text-white/80 mb-12 font-light">Join us in discovering the extraordinary. Your story is waiting to be written.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="bg-white text-zinc-950 px-10 py-4 rounded-full font-bold text-lg hover:bg-amber-100 transition-all transform hover:scale-105 shadow-xl">
              Start Planning Now
            </button>
            <button className="text-white font-bold underline underline-offset-8 hover:text-amber-200 transition-colors">
              Talk to a Travel Specialist
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const AIAdvisorSection = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setIsLoading(true);
    const res = await askTravelAdvisor(question);
    setResponse(res);
    setIsLoading(false);
  };

  return (
    <section className="bg-zinc-50 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-zinc-100">
          <div className="md:w-5/12 bg-brand-dark p-12 text-white flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-brand-gold rounded-2xl flex items-center justify-center mb-8 rotate-3 shadow-lg shadow-brand-gold/30">
                <Sparkles className="text-white w-7 h-7" />
              </div>
              <h3 className="text-4xl font-black mb-6 uppercase tracking-tighter leading-tight">Elite Spiritual Advisor</h3>
              <p className="text-zinc-400 text-sm font-medium leading-relaxed opacity-70 italic">
                Harnessing NUR Intelligence to craft your transcendent masterpiece of an itinerary.
              </p>
            </div>
            <div className="mt-16 space-y-6">
              <div className="flex items-center gap-4 text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-black">
                <div className="w-5 h-5 bg-brand-gold/20 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-brand-gold" /></div>
                <span>Curated Excellence</span>
              </div>
               <div className="flex items-center gap-4 text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-black">
                <div className="w-5 h-5 bg-brand-gold/20 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-brand-gold" /></div>
                <span>Metamorphosis Focused</span>
              </div>
            </div>
          </div>
          <div className="md:w-7/12 p-12 flex flex-col justify-center">
            <div className="mb-8">
              <label className="text-[10px] uppercase font-black tracking-[0.4em] text-zinc-400 block mb-3">Where will your soul wander?</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="The spiritual history of Cordoba..."
                  className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-[1.5rem] px-8 py-5 focus:outline-none focus:border-brand-gold transition-all text-sm font-medium"
                />
                <button 
                  onClick={handleAsk}
                  disabled={isLoading}
                  className="absolute right-3 top-3 bottom-3 bg-brand-dark text-white px-8 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-gold transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50"
                >
                  {isLoading ? 'Consulting...' : 'Seek Advice'}
                </button>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              {response && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-amber-400" />
                  <p className="text-sm text-zinc-600 leading-relaxed italic whitespace-pre-wrap">{response}</p>
                   <button 
                    onClick={() => setResponse(null)}
                    className="mt-4 text-xs font-bold text-amber-600 flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Clear Response <X className="w-3 h-3" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {!response && (
              <div className="grid grid-cols-2 gap-3 mt-4">
                {['Spiritual Retreats', 'Luxury Honeymoon', 'History Tours', 'Halal Food Guide'].map(tag => (
                  <button 
                    key={tag}
                    onClick={() => setQuestion(`I am looking for ${tag.toLowerCase()}...`)}
                    className="px-4 py-2 bg-zinc-50 border border-zinc-100 rounded-full text-[10px] font-bold text-zinc-400 hover:border-amber-200 hover:text-zinc-600 transition-all text-left"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const DestinationsPage = ({ onNavigate }: { onNavigate: (page: string, params?: any) => void }) => {
  const [filter, setFilter] = useState('all');
  
  const filteredTrips = filter === 'all' 
    ? TRIPS 
    : TRIPS.filter(t => t.theme === filter);

  return (
    <div className="pt-32 pb-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Journeys Beyond Borders" subtitle="Our Catalog" />
        
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-6 mb-20">
          {['all', 'spiritual', 'adventure', 'luxury', 'family'].map(t => (
            <button 
              key={t}
              onClick={() => setFilter(t)}
              className={`px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all border-2 ${filter === t ? 'bg-brand-dark text-white border-brand-dark shadow-2xl scale-105' : 'bg-transparent text-zinc-400 border-zinc-100 hover:border-brand-gold hover:text-brand-gold'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredTrips.map((trip) => (
            <motion.div 
              layout
              key={trip.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="group border border-zinc-100 rounded-[3rem] p-6 hover:shadow-2xl transition-all duration-500 bg-white cursor-pointer"
              onClick={() => onNavigate('trip', trip.id)}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] mb-8 shadow-inner">
                <img src={trip.heroImage} alt={trip.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute top-6 left-6">
                   <span className="bg-brand-gold text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">{trip.theme}</span>
                </div>
              </div>
              <div className="px-4 pb-4">
                 <div className="flex items-center gap-2 text-brand-gold text-[10px] font-black uppercase tracking-widest mb-3">
                    <MapPin className="w-3 h-3" />
                    <span>{trip.country}</span>
                 </div>
                 <h3 className="text-3xl font-black text-brand-dark mb-6 tracking-tighter uppercase leading-none">{trip.title}</h3>
                 <div className="flex justify-between items-center border-t border-zinc-50 pt-6">
                    <div>
                      <span className="text-[10px] uppercase font-black text-zinc-300 block tracking-widest mb-1">From</span>
                      <span className="text-2xl font-black tracking-tighter text-brand-dark">${trip.price}</span>
                    </div>
                    <button className="w-12 h-12 rounded-full bg-brand-dark text-white flex items-center justify-center hover:bg-brand-gold transition-all group">
                       <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TripDetailPage = ({ tripId, onNavigate }: { tripId: string, onNavigate: (page: string, params?: any) => void }) => {
  const trip = TRIPS.find(t => t.id === tripId) || TRIPS[0];
  const [activeDay, setActiveDay] = useState(trip.itinerary[0].day);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      <BookingModal trip={trip} isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      {/* Hero Header */}
      <section className="relative h-[80vh] flex items-end">
        <div className="absolute inset-0">
          <img src={trip.heroImage} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          <div className="absolute inset-0 bg-zinc-950/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-6 backdrop-blur-xl bg-white/10 w-fit px-6 py-2 rounded-full border border-white/20">
              <MapPin className="w-4 h-4 text-brand-gold shadow-sm" />
              <span className="text-[10px] uppercase font-black tracking-[0.4em]">{trip.destination}</span>
            </div>
            <h1 className="text-6xl md:text-[90px] font-black mb-8 text-white tracking-tighter uppercase leading-[0.85]">{trip.title}</h1>
            <div className="flex flex-wrap gap-12 text-[10px] items-center font-black uppercase tracking-[0.3em] opacity-80">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-brand-gold" />
                <span>{trip.duration}</span>
              </div>
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-brand-gold" />
                <span>{trip.theme}</span>
              </div>
               <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-brand-gold" />
                <span>Private Voyage</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Storytelling & Highlights */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-2/3">
             <div className="flex items-center gap-4 mb-4">
               <div className="h-[1px] w-12 bg-brand-gold"></div>
               <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.4em] block">The Narrative</span>
             </div>
             <h2 className="text-5xl font-black mb-12 tracking-tighter uppercase leading-none">The Story You <br /> Will Discover</h2>
             <div className="prose prose-zinc prose-lg">
                <p className="text-zinc-600 leading-relaxed first-letter:text-7xl first-letter:font-black first-letter:mr-4 first-letter:float-left first-letter:text-brand-dark italic mb-10 opacity-80 font-medium">
                  {trip.fullStory}
                </p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-20">
               <div className="bg-white p-12 rounded-[3.5rem] border border-zinc-100 shadow-xl">
                 <h3 className="font-black text-[10px] uppercase tracking-[0.3em] text-brand-gold mb-10">Meta-Voyage Highlights</h3>
                 <div className="space-y-6">
                   {trip.highlights.map(h => (
                     <div key={h} className="flex gap-4 group">
                       <div className="w-6 h-6 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"><Check className="w-3 h-3" /></div>
                       <span className="text-[11px] font-black uppercase tracking-tight text-zinc-500">{h}</span>
                     </div>
                   ))}
                 </div>
               </div>
               <div className="bg-brand-dark p-12 rounded-[3.5rem] flex flex-col justify-between relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Compass className="w-32 h-32 text-white" /></div>
                 <div className="relative z-10">
                   <h3 className="text-2xl font-black mb-6 text-white uppercase tracking-tighter leading-none italic">Elite Heritage Concierge</h3>
                   <p className="text-xs text-white/50 leading-relaxed mb-8 uppercase font-bold tracking-tight">"Our spiritual voyages are tailored for the unique. Seek your specific journey, and our masters will weave it."</p>
                 </div>
                 <button className="bg-brand-gold text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 relative z-10 shadow-2xl active:scale-95 transition-all">
                   <MessageSquare className="w-4 h-4" /> Book Discovery Call
                 </button>
               </div>
             </div>
          </div>

          <div className="lg:w-1/3">
            <div className="sticky top-32 bg-white rounded-[3rem] border border-zinc-100 p-10 shadow-2xl">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <span className="text-[10px] uppercase font-black text-zinc-400 tracking-[0.3em] block mb-2">Total Sovereignty</span>
                  <div className="text-5xl font-black tracking-tight-extreme">${trip.price} <span className="text-[10px] uppercase font-bold text-zinc-300 ml-1">/ seat</span></div>
                </div>
                <div className="bg-brand-gold/10 text-brand-gold px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-brand-gold/20">
                  {trip.spotsLeft} Available
                </div>
              </div>

              <div className="space-y-8 mb-12">
                <div className="flex items-center gap-5 text-zinc-600">
                  <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center shadow-inner"><Plane className="w-6 h-6 text-brand-dark" /></div>
                  <div className="text-[10px] uppercase tracking-widest font-black">
                    <span className="text-brand-dark block mb-0.5">Air Bridge Included</span>
                    Premium Class Available
                  </div>
                </div>
                <div className="flex items-center gap-5 text-zinc-600">
                  <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center shadow-inner"><ShieldCheck className="w-6 h-6 text-brand-gold" /></div>
                  <div className="text-[10px] uppercase tracking-widest font-black">
                    <span className="text-brand-dark block mb-0.5">Protected Intent</span>
                    Flexible Re-scheduling
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsBookingOpen(true)}
                className="w-full bg-brand-dark text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.3em] hover:bg-brand-gold transition-all shadow-xl flex items-center justify-center gap-4 mb-6 group active:scale-95"
              >
                Secure Your Place <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-center text-[9px] text-zinc-300 uppercase tracking-[0.3em] font-black">Concierge Service Guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Itinerary */}
      <section className="bg-zinc-50 py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="The Daily Rhythm" subtitle="Itinerary Overview" />
          
          <div className="space-y-8">
            {trip.itinerary.map((day) => (
              <div 
                key={day.day} 
                className={`overflow-hidden rounded-[2.5rem] border-2 transition-all cursor-pointer group ${activeDay === day.day ? 'bg-white border-brand-gold shadow-2xl' : 'bg-transparent border-zinc-100 opacity-40 hover:opacity-100'}`}
                onClick={() => setActiveDay(day.day)}
              >
                <div className="p-10">
                  <div className="flex items-center gap-8 mb-4">
                    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-xl font-black transition-all ${activeDay === day.day ? 'bg-brand-dark text-white' : 'bg-white text-brand-dark'}`}>
                      {day.day}
                    </div>
                    <div>
                      <h4 className="text-2xl font-black uppercase tracking-tighter leading-none">{day.title}</h4>
                      {activeDay === day.day && (
                        <motion.p 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="text-xs font-bold uppercase tracking-tight text-zinc-400 mt-4 leading-relaxed max-w-2xl"
                        >
                          {day.description}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [page, setPage] = useState('home');
  const [params, setParams] = useState<any>(null);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasShownExitIntent, setHasShownExitIntent] = useState(false);

  const navigate = (p: string, param?: any) => {
    setPage(p);
    setParams(param);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownExitIntent) {
        setShowExitIntent(true);
        setHasShownExitIntent(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseOut);
    return () => document.removeEventListener('mouseleave', handleMouseOut);
  }, [hasShownExitIntent]);

  return (
    <div className="min-h-screen font-sans bg-white selection:bg-amber-200 selection:text-zinc-950">
      <Navbar onNavigate={navigate} />
      
      <main>
        {page === 'home' && <Home onNavigate={navigate} />}
        {page === 'destinations' && <DestinationsPage onNavigate={navigate} />}
        {page === 'trip' && <TripDetailPage tripId={params} onNavigate={navigate} />}
      </main>

      <Footer />

      {/* Exit Intent Modal */}
      <AnimatePresence>
        {showExitIntent && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md"
              onClick={() => setShowExitIntent(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="relative bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              <div className="md:w-1/2 bg-brand-gold p-12 flex flex-col justify-center">
                <div className="w-16 h-16 bg-brand-dark rounded-2xl flex items-center justify-center mb-6 rotate-6 shadow-lg">
                  <Sparkles className="text-white w-8 h-8" />
                </div>
                <h3 className="text-4xl font-black text-brand-dark mb-4 tracking-tighter uppercase leading-[0.9]">Wait, your story <br />isn't over.</h3>
                <p className="text-brand-dark text-[10px] font-black uppercase tracking-widest leading-relaxed opacity-60">
                  Join our 'NUR' inner circle and get a $100 legacy credit for your first spiritual voyage.
                </p>
              </div>
              <div className="md:w-1/2 p-12 flex flex-col justify-center">
                <button onClick={() => setShowExitIntent(false)} className="absolute top-6 right-6 text-zinc-400 hover:text-brand-dark transition-colors">
                  <X className="w-6 h-6" />
                </button>
                <div className="space-y-4 text-center">
                  <input 
                    type="email" 
                    placeholder="Enter your legacy email..."
                    className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm focus:outline-none focus:border-brand-gold"
                  />
                  <button className="w-full bg-brand-dark text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-brand-gold transition-all shadow-xl">
                    Claim Your Legacy Credit
                  </button>
                  <p className="text-[9px] text-zinc-400 font-black uppercase tracking-[0.3em]">Exclusive to 50 pilgrims this month</p>
                  <button 
                    onClick={() => setShowExitIntent(false)}
                    className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest hover:text-brand-dark transition-colors"
                  >
                    No thanks, I'll wander alone
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>



    </div>
  );
}
