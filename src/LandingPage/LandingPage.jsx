import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-scroll";
import { FaMusic, FaRing, FaBriefcase } from "react-icons/fa";

// Komponen Ikon
const ChevronDown = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);
const HamburgerIcon = (props) => (
  <svg {...props} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path></svg>
);
const CloseIcon = (props) => (
    <svg {...props} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
);

// Komponen Animasi Teks
const AnimatedWords = ({ text, className }) => {
  const words = text.split(" ");
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };
  const child = {
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 20, transition: { type: "spring", damping: 12, stiffness: 100 } },
  };

  return (
    <motion.h1 className={className} variants={container} initial="hidden" animate="visible">
      {words.map((word, index) => (
        <motion.span key={index} variants={child} style={{ marginRight: "0.5em" }}>
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};

const LandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero'); 
  const aboutControls = useAnimation();
  const servicesControls = useAnimation();
  const galleryControls = useAnimation();

  useEffect(() => {
    const startAnimation = (controls) => {
      controls.start("visible");
    };
    if (activeSection === 'about') startAnimation(aboutControls);
    if (activeSection === 'services') startAnimation(servicesControls);
    if (activeSection === 'gallery') startAnimation(galleryControls);
  }, [activeSection, aboutControls, servicesControls, galleryControls]);

  const resetAnimation = (controls) => {
    controls.start("hidden");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  return (
    <div 
      className="font-['Poppins'] text-white overflow-x-hidden relative aurora-background"
      style={{
        '--spotlight-x': `${mousePosition.x}px`,
        '--spotlight-y': `${mousePosition.y}px`,
      }}
    >
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        style={{
          background: `radial-gradient(600px at var(--spotlight-x) var(--spotlight-y), rgba(249, 115, 22, 0.15), transparent 80%)`
        }}
      />
      
      <div className="relative z-10">
        <motion.header 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/50 border-b border-orange-500/20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
            <Link to="hero" smooth={true} duration={500} className="cursor-pointer" onClick={() => setIsMenuOpen(false)}>
              <img src="/logo.png" alt="Giant Logo" className="h-10 md:h-12 w-auto" />
            </Link>
            
            <nav className="space-x-8 hidden md:flex text-sm font-medium">
              <Link activeClass="text-orange-400" to="about" spy={true} smooth={true} offset={-80} duration={500} className="text-gray-300 hover:text-orange-400 transition-colors duration-300 cursor-pointer" onSetActive={() => setActiveSection('about')} onSetInactive={() => resetAnimation(aboutControls)}>Tentang Kami</Link>
              <Link activeClass="text-orange-400" to="services" spy={true} smooth={true} offset={-80} duration={500} className="text-gray-300 hover:text-orange-400 transition-colors duration-300 cursor-pointer" onSetActive={() => setActiveSection('services')} onSetInactive={() => resetAnimation(servicesControls)}>Layanan</Link>
              <Link activeClass="text-orange-400" to="gallery" spy={true} smooth={true} offset={-80} duration={500} className="text-gray-300 hover:text-orange-400 transition-colors duration-300 cursor-pointer" onSetActive={() => setActiveSection('gallery')} onSetInactive={() => resetAnimation(galleryControls)}>Galeri</Link>
              <Link activeClass="text-orange-400" to="contact" spy={true} smooth={true} offset={-80} duration={500} className="text-gray-300 hover:text-orange-400 transition-colors duration-300 cursor-pointer">Kontak</Link>
            </nav>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white text-2xl z-50 relative">
                {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
              </button>
            </div>
          </div>

          <motion.div
            initial={false}
            animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full bg-black/90 backdrop-blur-lg md:hidden"
            style={{ paddingTop: '80px' }}
          >
            <nav className="flex flex-col items-center space-y-8 py-8 text-lg">
              <Link onClick={() => setIsMenuOpen(false)} activeClass="text-orange-400" to="about" spy={true} smooth={true} offset={-80} duration={500} className="text-gray-300 hover:text-orange-400 transition-colors duration-300 cursor-pointer">Tentang Kami</Link>
              <Link onClick={() => setIsMenuOpen(false)} activeClass="text-orange-400" to="services" spy={true} smooth={true} offset={-80} duration={500} className="text-gray-300 hover:text-orange-400 transition-colors duration-300 cursor-pointer">Layanan</Link>
              <Link onClick={() => setIsMenuOpen(false)} activeClass="text-orange-400" to="gallery" spy={true} smooth={true} offset={-80} duration={500} className="text-gray-300 hover:text-orange-400 transition-colors duration-300 cursor-pointer">Galeri</Link>
              <Link onClick={() => setIsMenuOpen(false)} activeClass="text-orange-400" to="contact" spy={true} smooth={true} offset={-80} duration={500} className="text-gray-300 hover:text-orange-400 transition-colors duration-300 cursor-pointer">Kontak</Link>
            </nav>
          </motion.div>
        </motion.header>

        <section 
          id="hero" 
          className="h-screen w-full relative flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(/bg.jpg)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="relative z-10 text-center px-4">
            <AnimatedWords text="Elevating Moments Creating Memories" className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg flex flex-wrap justify-center" />
            <motion.p initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 1.5, duration: 0.8}} className="mt-6 text-base md:text-xl text-gray-200 max-w-lg md:max-w-2xl mx-auto font-light">
              Giant Production: Solusi event organizer premium untuk setiap acara tak terlupakan Anda.
            </motion.p>
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 1.8, duration: 0.8}}>
              <Link to="contact" smooth={true} offset={-80} duration={500} className="mt-8 md:mt-10 group relative inline-block overflow-hidden rounded-full bg-orange-500 px-6 py-3 md:px-8 text-sm md:text-base font-bold text-black shadow-lg shadow-orange-500/20 transition-all duration-300 hover:scale-105">
                <span className="absolute top-0 left-0 -translate-x-full w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-40 transition-all duration-700 group-hover:translate-x-full" />
                Diskusikan Proyek Anda
              </Link>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: 20 }} transition={{ delay: 2.5, duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} className="absolute bottom-10">
            <Link to="about" smooth={true} offset={-80} duration={500}>
              <ChevronDown className="w-8 h-8 text-white/50 cursor-pointer hover:text-white transition-colors" />
            </Link>
          </motion.div>
        </section>

        <section id="about" className="py-20 md:py-32 bg-[#111111]">
          <motion.div 
            className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-10 md:gap-16 items-center"
            initial="hidden"
            animate={aboutControls}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                We Are <span className="text-orange-500">Giant Production</span>
              </h2>
              <div className="w-24 h-1 bg-orange-500 rounded-full mb-6"></div>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6">Berpengalaman dalam menangani berbagai jenis acara, kami menggabungkan kreativitas tanpa batas dengan eksekusi presisi untuk memberikan hasil yang melebihi ekspektasi.</p>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">Dari konser megah hingga acara korporat yang intim, tim kami berdedikasi untuk kesempurnaan di setiap detail.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl relative p-1 bg-gradient-to-br from-orange-500 via-transparent to-black">
              <div className="w-full h-full rounded-xl overflow-hidden">
                  <img src="/about-image.jpg" alt="Tim Giant Production" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section id="services" className="py-20 md:py-32 bg-[#0a0a0a] text-center">
            <motion.div 
              className="max-w-6xl mx-auto px-4 sm:px-6"
              initial="hidden"
              animate={servicesControls}
              variants={containerVariants}
            >
              <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-white mb-4">
                Layanan <span className="text-orange-500">Premium</span> Kami
              </motion.h2>
              <motion.p variants={itemVariants} className="text-gray-400 mb-12 md:mb-16 max-w-2xl mx-auto text-base md:text-lg">
                Kami menyediakan solusi menyeluruh untuk memastikan acara Anda berjalan lancar dan spektakuler.
              </motion.p>
              <motion.div 
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6"
              >
                {[
                  { title: "Event Konser", desc: "Produksi panggung, suara, dan pencahayaan skala besar.", icon: <FaMusic className="text-3xl text-orange-400" />, area: "md:col-span-2" },
                  { title: "Wedding Organizer", desc: "Merancang hari bahagia Anda dengan sentuhan elegan dan personal.", icon: <FaRing className="text-3xl text-orange-400" />, area: "" },
                  { title: "Corporate Events", desc: "Gala dinner, peluncuran produk, hingga konferensi profesional.", icon: <FaBriefcase className="text-3xl text-orange-400" />, area: "md:col-span-3" }
                ].map((service) => (
                  <motion.div
                    key={service.title}
                    variants={itemVariants}
                    className={`group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/0 p-8 rounded-2xl border border-white/10 text-left cursor-pointer ${service.area}`}
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="mb-4">{service.icon}</div>
                      <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                      <p className="text-gray-300 font-light">{service.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
        </section>
        
        <section id="gallery" className="py-20 md:py-32 bg-[#111111]">
          <motion.div 
            className="max-w-7xl mx-auto px-4 sm:px-6 text-center"
            initial="hidden"
            animate={galleryControls}
            variants={containerVariants}
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-white mb-12 md:mb-16"
            >
              Momen yang <span className="text-orange-500">Kami Ciptakan</span>
            </motion.h2>
            
            <motion.div 
              variants={containerVariants}
              className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6"
            >
              {["g1.jpg", "g2.jpg", "g3.jpg", "g4.jpg", "g5.jpg", "g6.jpg"].map((img) => (
                <motion.div 
                  key={img} 
                  variants={itemVariants}
                  className="overflow-hidden rounded-xl shadow-lg group border-2 border-transparent hover:border-orange-500/50 transition-all duration-300"
                >
                  <img src={`/${img}`} alt={`Galeri Acara ${img}`} className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section id="contact" className="py-20 md:py-24 bg-cover bg-center" style={{ backgroundImage: `url('/cta-bg.jpg')` }}>
          <div className="bg-black/80 py-16 md:py-20">
              <motion.div 
                className="max-w-3xl mx-auto px-4 sm:px-6 text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
                variants={itemVariants}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Wujudkan Acara Impian Anda</h2>
                <p className="mb-8 text-base md:text-lg text-gray-300">
                  Jangan ragu untuk berbicara dengan kami. Tim kami siap membantu merealisasikan konsep acara Anda menjadi kenyataan yang spektakuler.
                </p>
                <a
                  href="https://wa.me/6281931201945"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-block overflow-hidden rounded-full bg-white px-8 py-3 font-bold text-orange-500 shadow-lg hover:scale-105 transition-transform duration-300 text-sm md:text-base"
                >
                  <span className="absolute top-0 left-0 -translate-x-full w-full h-full bg-gradient-to-r from-transparent via-black/20 to-transparent opacity-40 transition-all duration-700 group-hover:translate-x-full" />
                  Hubungi Kami Sekarang
                </a>
              </motion.div>
          </div>
        </section>

        <footer className="bg-black text-gray-500 text-center py-8">
          <p>&copy; {new Date().getFullYear()} Giant Production. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;