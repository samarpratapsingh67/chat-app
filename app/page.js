'use client';

import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { motion, useSpring, useTransform, useScroll, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
import {
  MessageSquare, Users, Lock, BotMessageSquare, FileImage, Mic, Sparkles, ShieldCheck, Zap,
  ArrowRight, Star, Globe, Layers, Cpu, Shield, Rocket, Eye, Heart, Download, ChevronDown
} from "lucide-react";

// Utility function for className merging
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Enhanced Card Components with glassmorphism
const Card = React.forwardRef(({ className, children, glassy = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border shadow-sm transition-all duration-300",
      glassy 
        ? "bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl" 
        : "bg-card text-card-foreground",
      className,
    )}
    {...props}
  >
    {children}
  </div>
));
Card.displayName = "Card";

// Advanced Particle System
function ParticleSystem({ count = 50, className = "" }) {
  const particles = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      color: ['emerald', 'sage', 'forest', 'amber', 'teal'][Math.floor(Math.random() * 5)],
    })), [count]
  );

  const getParticleColor = (color) => {
    const colorMap = {
      emerald: 'from-emerald-400 to-emerald-600',
      sage: 'from-green-400 to-green-600',
      forest: 'from-green-600 to-green-800',
      amber: 'from-amber-400 to-amber-600',
      teal: 'from-teal-400 to-teal-600',
    };
    return colorMap[color] || colorMap.emerald;
  };

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={cn("absolute rounded-full bg-gradient-to-r", getParticleColor(particle.color))}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            x: [0, particle.speedX * 100, 0],
            y: [0, particle.speedY * 100, 0],
            opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}

// Enhanced Spotlight with multiple colors
function EnhancedSpotlight({ className, size = 200, color = "emerald", intensity = 0.6 }) {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [parentElement, setParentElement] = useState(null);

  const mouseX = useSpring(0, { bounce: 0 });
  const mouseY = useSpring(0, { bounce: 0 });

  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

  const colors = {
    emerald: 'from-emerald-500 via-emerald-400/50 to-emerald-300/10',
    sage: 'from-green-500 via-green-400/50 to-green-300/10',
    forest: 'from-green-700 via-green-600/50 to-green-500/10',
    amber: 'from-amber-600 via-amber-500/50 to-amber-400/10',
    teal: 'from-teal-500 via-teal-400/50 to-teal-300/10',
  };

  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        parent.style.position = 'relative';
        parent.style.overflow = 'hidden';
        setParentElement(parent);
      }
    }
  }, []);

  const handleMouseMove = useCallback(
    (event) => {
      if (!parentElement) return;
      const { left, top } = parentElement.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    },
    [mouseX, mouseY, parentElement]
  );

  useEffect(() => {
    if (!parentElement) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    parentElement.addEventListener('mousemove', handleMouseMove);
    parentElement.addEventListener('mouseenter', handleMouseEnter);
    parentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      parentElement.removeEventListener('mousemove', handleMouseMove);
      parentElement.removeEventListener('mouseenter', handleMouseEnter);
      parentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [parentElement, handleMouseMove]);

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'pointer-events-none absolute rounded-full blur-2xl transition-all duration-300',
        'bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops),transparent_70%)]',
        colors[color],
        isHovered ? `opacity-${Math.round(intensity * 100)}` : 'opacity-0',
        className
      )}
      style={{
        width: size,
        height: size,
        left: spotlightLeft,
        top: spotlightTop,
      }}
    />
  );
}

// Magnetic Button Component
function MagneticButton({ children, className, magneticStrength = 0.3, ...props }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = useCallback((event) => {
    if (!ref.current || !isHovered) return;
    
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const deltaX = (event.clientX - centerX) * magneticStrength;
    const deltaY = (event.clientY - centerY) * magneticStrength;
    
    x.set(deltaX);
    y.set(deltaY);
  }, [isHovered, magneticStrength, x, y]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }, [x, y]);

  useEffect(() => {
    if (isHovered) {
      document.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered, handleMouseMove]);

  return (
    <motion.button
      ref={ref}
      className={cn(
        "relative overflow-hidden transition-all duration-300 transform-gpu",
        className
      )}
      style={{ x, y }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 transition-opacity duration-300"
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// 3D Tilt Card Component
function TiltCard({ children, className, tiltMaxAngle = 25, glareEffect = true }) {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseMove = useCallback((event) => {
    if (!ref.current || !isHovered) return;

    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (event.clientX - left) / width;
    const y = (event.clientY - top) / height;

    const rotateX = (y - 0.5) * tiltMaxAngle;
    const rotateY = (x - 0.5) * -tiltMaxAngle;

    setRotation({ x: rotateX, y: rotateY });
  }, [isHovered, tiltMaxAngle]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={ref}
      className={cn("relative transform-gpu", className)}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {glareEffect && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 pointer-events-none rounded-xl"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      {children}
    </motion.div>
  );
}

// Enhanced Hero Section with scroll indicator
function EnhancedHeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <Card className="w-full h-screen relative overflow-hidden border-none">
      {/* Multi-layered animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-emerald-950 to-stone-950">
          <div className="absolute inset-0 bg-gradient-to-tl from-green-900/60 via-transparent to-amber-900/40"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.4),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(120,113,108,0.3),transparent_50%),radial-gradient(circle_at_40%_40%,rgba(16,185,129,0.2),transparent_50%)]"></div>
        </div>
      </div>
      
      {/* Enhanced particle system */}
      <ParticleSystem count={80} />
      
      {/* Animated mesh gradient */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, #22c55e 0%, transparent 50%), radial-gradient(circle at 80% 20%, #10b981 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, #16a34a 0%, transparent 50%), radial-gradient(circle at 20% 80%, #84cc16 0%, transparent 50%)",
            "radial-gradient(circle at 25% 60%, #059669 0%, transparent 50%), radial-gradient(circle at 75% 30%, #d97706 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, #22c55e 0%, transparent 50%), radial-gradient(circle at 80% 20%, #10b981 0%, transparent 50%)",
          ]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Enhanced grid with animation */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(34,197,94,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}></div>
      </motion.div>
      
      <EnhancedSpotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        size={400}
        color="emerald"
        intensity={0.8}
      />
      
      <EnhancedSpotlight
        className="top-40 right-0 md:right-60"
        size={300}
        color="sage"
        intensity={0.6}
      />

      {/* Content */}
      <motion.div 
        className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4"
        style={{ opacity }}
      >
        <div style={{ perspective: 1200 }} className="relative">
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-black relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {"SparkTalk".split("").map((letter, index) => (
              <motion.span
                key={index}
                className="inline-block relative cursor-pointer"
                initial={{ 
                  opacity: 0, 
                  y: -300, 
                  z: -800,
                  scale: 3,
                  rotateX: 90,
                  rotateY: 20,
                  filter: "blur(10px)"
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  z: 0,
                  scale: 1,
                  rotateX: 0,
                  rotateY: 0,
                  filter: "blur(0px)"
                }}
                transition={{ 
                  duration: 1.8, 
                  ease: [0.175, 0.885, 0.32, 1.275],
                  type: "spring",
                  stiffness: 60,
                  damping: 12,
                  delay: index * 0.1
                }}
                style={{
                  transformStyle: "preserve-3d",
                  background: index < 5 
                    ? "linear-gradient(135deg, #22c55e 0%, #10b981 50%, #84cc16 100%)"
                    : "linear-gradient(135deg, #16a34a 0%, #d97706 50%, #059669 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 6px 30px rgba(34, 197, 94, 0.6))"
                }}
                whileHover={{
                  scale: 1.15,
                  rotateY: 15,
                  filter: "drop-shadow(0 8px 40px rgba(34, 197, 94, 0.8))",
                  transition: { duration: 0.3 }
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
          
          {/* Enhanced glow effect */}
          <motion.div
            className="absolute inset-0 blur-3xl opacity-40 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1, duration: 2 }}
          >
            <div className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-lime-400 bg-clip-text text-transparent">
              SparkTalk
            </div>
          </motion.div>
        </div>
        
        <motion.p
          className="mt-8 text-lg md:text-2xl max-w-3xl text-gray-300 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
        >
          Experience the future of conversation. Seamless, intelligent, and built for connection.
        </motion.p>

        {/* Enhanced CTA buttons */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2, ease: "easeOut" }}
        >
          <MagneticButton className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white font-bold py-4 px-8 rounded-full shadow-2xl border-0">
            Get Started Free
            <ArrowRight className="inline ml-2 w-5 h-5" />
          </MagneticButton>
          
          <MagneticButton className="bg-white/10 backdrop-blur-md text-white font-bold py-4 px-8 rounded-full border border-white/30 shadow-2xl hover:border-emerald-400/50 transition-all duration-300">
            Watch Demo
            <Eye className="inline ml-2 w-5 h-5" />
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-white/60" />
      </motion.div>
    </Card>
  );
}

// Enhanced Feature Card with 3D effects
function EnhancedFeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0, 
  className = "", 
  iconBg = "bg-emerald-500/20", 
  iconColor = "text-emerald-400",
  stats = null 
}) {
  return (
    <TiltCard className={cn("h-full", className)}>
      <motion.div
        className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden h-full"
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay }}
        whileHover={{ 
          backgroundColor: "rgba(255,255,255,0.08)",
          transition: { duration: 0.3 }
        }}
      >
        <EnhancedSpotlight size={200} color="emerald" intensity={0.4} />
        
        {/* Animated icon container */}
        <motion.div 
          className={cn("w-14 h-14 flex items-center justify-center rounded-xl mb-6 relative", iconBg)}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <Icon className={cn("w-7 h-7", iconColor)} />
          
          {/* Icon glow effect */}
          <motion.div
            className={cn("absolute inset-0 rounded-xl blur-lg opacity-50", iconBg)}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        
        <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{title}</h3>
        <p className="text-gray-400 mb-6 leading-relaxed">{description}</p>
        
        {stats && (
          <div className="flex items-center space-x-4 text-sm text-emerald-300">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>{stats.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{stats.users}</span>
            </div>
          </div>
        )}

        {/* Hover effect overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-teal-600/10 opacity-0 rounded-2xl"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </TiltCard>
  );
}

// Enhanced Features Section
function EnhancedFeaturesSection() {
  return (
    <Card className="w-full border-none py-32 px-4 relative overflow-hidden">
      {/* Complex background */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-emerald-950 to-stone-950">
        {/* Animated orbs */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-emerald-500/25 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            x: [0, -80, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-lime-500/15 rounded-full blur-3xl"
          animate={{
            scale: [0.8, 1.4, 0.8],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-amber-600/15 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 0.9, 1.1],
            rotate: [0, 270, 540],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-6"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            More Than Just Chat
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 mb-8 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover powerful features that transform how you connect, collaborate, and communicate.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <EnhancedFeatureCard
            icon={BotMessageSquare}
            title="AI-Powered Assistant"
            description="Leverage advanced AI for smart replies, automatic summaries, and intelligent conversation insights that enhance every interaction."
            className="lg:col-span-2"
            iconBg="bg-emerald-500/20"
            iconColor="text-emerald-400"
            stats={{ rating: "4.9", users: "10K+" }}
          />
          
          <EnhancedFeatureCard
            icon={ShieldCheck}
            title="Military-Grade Security"
            description="End-to-end encryption with zero-knowledge architecture ensures your privacy is never compromised."
            delay={0.2}
            iconBg="bg-green-500/20"
            iconColor="text-green-400"
            stats={{ rating: "5.0", users: "50K+" }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <EnhancedFeatureCard
            icon={Zap}
            title="Lightning Speed"
            description="Built on modern infrastructure for instant messaging with sub-100ms latency worldwide."
            iconBg="bg-lime-500/20"
            iconColor="text-lime-400"
            stats={{ rating: "4.8", users: "25K+" }}
          />
          
          <EnhancedFeatureCard
            icon={Globe}
            title="Global Reach"
            description="Connect with anyone, anywhere with real-time translation and cross-platform compatibility."
            delay={0.2}
            iconBg="bg-teal-500/20"
            iconColor="text-teal-400"
            stats={{ rating: "4.7", users: "100K+" }}
          />

          <EnhancedFeatureCard
            icon={Sparkles}
            title="Smart Communities"
            description="Create vibrant spaces with intelligent moderation, dynamic topics, and engagement analytics."
            delay={0.4}
            iconBg="bg-amber-500/20"
            iconColor="text-amber-400"
            stats={{ rating: "4.9", users: "75K+" }}
          />
        </div>
      </div>
    </Card>
  );
}

// Enhanced CTA Section
function EnhancedCTASection() {
  const [email, setEmail] = useState('');

  return (
    <Card className="w-full border-none py-32 px-4 text-center relative overflow-hidden">
      {/* Futuristic background with animations */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-emerald-950 to-stone-950">
        {/* Pulsing rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-emerald-400/20 rounded-full"
              style={{
                width: 200 + i * 150,
                height: 200 + i * 150,
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
        
        {/* Data stream effect */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={cn(
                "absolute w-1 h-20 bg-gradient-to-b to-transparent",
                i % 5 === 0 ? "from-emerald-400/40" : 
                i % 5 === 1 ? "from-green-400/40" : 
                i % 5 === 2 ? "from-teal-400/40" : 
                i % 5 === 3 ? "from-lime-400/40" : "from-amber-400/40"
              )}
              style={{
                left: `${5 + i * 4.5}%`,
                top: '-20px',
              }}
              animate={{
                y: ['0vh', '110vh'],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </div>

      <EnhancedSpotlight
        className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        size={800}
        color="emerald"
        intensity={0.4}
      />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-6">
            Ready to Spark?
          </h2>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto">
            Join thousands of users who&apos;ve already transformed their communication experience. Start your journey today.
          </p>

          {/* Stats display */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              { number: "500K+", label: "Active Users" },
              { number: "99.9%", label: "Uptime" },
              { number: "150+", label: "Countries" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Email signup form */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
            />
            <MagneticButton className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white font-bold py-4 px-8 rounded-full shadow-2xl border-0 whitespace-nowrap">
              Get Started
              <Rocket className="inline ml-2 w-5 h-5" />
            </MagneticButton>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-amber-400" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Loved by 500K+ users</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Card>
  );
}

// Enhanced Visual Showcase Section
function EnhancedVisualShowcase() {
  return (
    <Card className="w-full border-none py-32 px-4 relative overflow-hidden">
      {/* Dynamic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-emerald-950 to-stone-950">
        {/* Morphing shapes */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <radialGradient id="morphGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(34,197,94,0.3)" />
              <stop offset="100%" stopColor="rgba(34,197,94,0)" />
            </radialGradient>
          </defs>
          <motion.path
            fill="url(#morphGradient)"
            initial={{ d: "M20,50 Q50,20 80,50 Q50,80 20,50 Z" }}
            animate={{ 
              d: [
                "M20,50 Q50,20 80,50 Q50,80 20,50 Z",
                "M30,40 Q70,30 80,60 Q40,70 30,40 Z",
                "M25,60 Q60,25 85,45 Q45,85 25,60 Z",
                "M20,50 Q50,20 80,50 Q50,80 20,50 Z"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
      
      <EnhancedSpotlight
        className="top-10 right-10"
        size={500}
        color="emerald"
        intensity={0.6}
      />
      
      <div className="container mx-auto max-w-6xl text-center relative z-10">
        <motion.h2
          className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-6"
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          Intuitive By Design
        </motion.h2>
        <motion.p
          className="text-xl text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Every pixel is crafted for clarity and effortless interaction, making your conversations more engaging than ever before.
        </motion.p>
        
        {/* Interactive showcase */}
        <TiltCard className="max-w-4xl mx-auto">
          <motion.div
            className="relative group"
            initial={{ opacity: 0, scale: 0.9 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Glowing border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000 animate-pulse"></div>
            
            {/* Main showcase */}
            <div className="relative w-full h-96 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
              {/* Mock interface elements */}
              <div className="absolute inset-0 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  </div>
                  <MessageSquare className="w-6 h-6 text-emerald-400" />
                </div>
                
                {/* Chat preview */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Sparkles className="w-10 h-10 text-white" />
                    </motion.div>
                    <p className="text-gray-300 text-lg">Beautiful Conversations</p>
                    <p className="text-gray-500 text-sm">Start chatting now</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </TiltCard>
      </div>
    </Card>
  );
}
const Page = () => {
  return (
    <div className="bg-gradient-to-b from-stone-950 via-emerald-950 to-stone-950 text-gray-200 font-sans antialiased overflow-x-hidden">
      <EnhancedHeroSection />
      <EnhancedVisualShowcase />
      <EnhancedFeaturesSection />
      <EnhancedCTASection />

      {/* Enhanced Footer */}
      <motion.footer 
        className="py-16 px-4 border-t border-white/10 bg-stone-900/80 backdrop-blur-xl relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">
                SparkTalk
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                The future of communication is here. Join millions of users who trust SparkTalk for secure, intelligent conversations.
              </p>
              <div className="flex space-x-4">
                <motion.div
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(34,197,94,0.2)" }}
                >
                  <Globe className="w-5 h-5" />
                </motion.div>
                <motion.div
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(34,197,94,0.2)" }}
                >
                  <MessageSquare className="w-5 h-5" />
                </motion.div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Features</li>
                <li className="hover:text-white cursor-pointer transition-colors">Security</li>
                <li className="hover:text-white cursor-pointer transition-colors">Integrations</li>
                <li className="hover:text-white cursor-pointer transition-colors">API</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">About</li>
                <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-white cursor-pointer transition-colors">Press</li>
                <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} SparkTalk Corporation. All Rights Reserved.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Page;