'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import {
  MessageSquare, Users, Lock, BotMessageSquare, FileImage, Mic, Sparkles, ShieldCheck, Zap
} from "lucide-react";

// Utility function for className merging
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Card Components
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className,
    )}
    {...props}
  />
));

// Spotlight Component
function Spotlight({ className, size = 200, springOptions = { bounce: 0 } }) {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [parentElement, setParentElement] = useState(null);

  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);

  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

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
        'pointer-events-none absolute rounded-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops),transparent_80%)] blur-xl transition-opacity duration-200',
        'from-white via-white/50 to-white/10',
        isHovered ? 'opacity-100' : 'opacity-0',
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

// Mock Spline component since we can't import the actual one
function MockSpline({ scene, className }) {
  return (
    <div className={cn("w-full h-full bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg flex items-center justify-center", className)}>
      <div className="text-white/60 text-center">
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}

// Hero Section Component
function HeroSection() {
  return (
    <Card className="w-full h-screen relative overflow-hidden border-none">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-900/50 via-transparent to-purple-900/50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%),radial-gradient(circle_at_40%_40%,rgba(120,200,255,0.2),transparent_50%)]"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 z-1">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-20 z-1">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }}></div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
      
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        size={300}
      />
      
      <div className="absolute inset-0 z-0">
        <MockSpline scene="https://prod.spline.design/4d5nMMo-iN0pTPiL/scene.splinecode" />
      </div>
     
      {/* Dynamic overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-purple-900/20 z-10"></div>

      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <div style={{ perspective: 1200 }} className="relative">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black relative z-10">
            {"SparkTalk".split("").map((letter, index) => (
              <motion.span
                key={index}
                className="inline-block relative"
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
                  duration: 1.5, 
                  ease: [0.175, 0.885, 0.32, 1.275],
                  type: "spring",
                  stiffness: 60,
                  damping: 12,
                  delay: index * 0.08
                }}
                style={{
                  transformStyle: "preserve-3d",
                  background: index < 5 
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)"
                    : "linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0 0 30px rgba(102, 126, 234, 0.5), 0 0 60px rgba(245, 87, 108, 0.3)",
                  filter: "drop-shadow(0 4px 20px rgba(102, 126, 234, 0.4))"
                }}
                whileHover={{
                  scale: 1.1,
                  rotateY: 15,
                  transition: { duration: 0.3 }
                }}
              >
                {letter}
              </motion.span>
            ))}
          </h1>
          
          {/* Glow effect background */}
          <motion.div
            className="absolute inset-0 blur-3xl opacity-30 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              SparkTalk
            </div>
          </motion.div>
        </div>
        <motion.p
          className="mt-6 text-lg md:text-2xl max-w-2xl text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Experience the future of conversation. Seamless, intelligent, and built for connection.
        </motion.p>
      </div>
    </Card>
  );
}

// Visual Showcase Component
function VisualShowcase() {
  return (
    <Card className="w-full border-none py-24 px-4 relative overflow-hidden">
      {/* Creative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-900 to-slate-900">
        {/* Animated blobs */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/15 rounded-full blur-3xl"
          animate={{
            scale: [0.8, 1.3, 0.8],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      <Spotlight
        className="top-10 right-10"
        size={400}
      />
      
      <div className="container mx-auto max-w-6xl text-center relative z-10">
        <motion.h2
          className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-4"
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          Intuitive By Design
        </motion.h2>
        <motion.p
          className="text-lg text-gray-400 mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Every pixel is crafted for clarity and effortless interaction, making your conversations more engaging than ever.
        </motion.p>
        <motion.div
          className="relative group"
          initial={{ opacity: 0, scale: 0.95 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-1000"></div>
          <div className="relative w-full h-96 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <p className="text-gray-400">Chat Interface Preview</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Card>
  );
}

// Feature Card Component
function FeatureCard({ icon: Icon, title, description, delay = 0, className = "", iconBg = "bg-purple-500/20", iconColor = "text-purple-400" }) {
  return (
    <motion.div
      className={cn("bg-white/5 p-8 rounded-2xl border border-white/10 shadow-lg relative overflow-hidden", className)}
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5, delay }}
    >
      <Spotlight size={150} />
      <div className={cn("w-12 h-12 flex items-center justify-center rounded-lg mb-4", iconBg)}>
        <Icon className={cn("w-6 h-6", iconColor)} />
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}

// Features Section Component
function FeaturesSection() {
  return (
    <Card className="w-full border-none py-24 px-4 relative overflow-hidden">
      {/* Geometric background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        {/* Animated geometric shapes */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-white/20"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                borderRadius: Math.random() > 0.5 ? '50%' : '0%',
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
        
        {/* Hexagon pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpolygon points='30 0 60 15 60 45 30 60 0 45 0 15'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 text-center mb-16"
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          More Than Just a Chat App
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={BotMessageSquare}
            title="AI-Powered Assistance"
            description="Leverage smart replies and automatic summaries from our integrated AI assistant to supercharge your conversations."
            className="md:col-span-2"
            iconBg="bg-purple-500/20"
            iconColor="text-purple-400"
          />
          
          <FeatureCard
            icon={ShieldCheck}
            title="Total Privacy"
            description="End-to-end encryption is on by default. Your conversations are yours alone."
            delay={0.1}
            iconBg="bg-green-500/20"
            iconColor="text-green-400"
          />
          
          <FeatureCard
            icon={Zap}
            title="Blazing Fast"
            description="Built on a modern stack for instant, real-time messaging without the lag."
            iconBg="bg-cyan-500/20"
            iconColor="text-cyan-400"
          />
          
          <FeatureCard
            icon={Sparkles}
            title="Vibrant Communities"
            description="From dynamic group chats with advanced admin tools to public forums, find your space and connect with others."
            className="md:col-span-2"
            delay={0.1}
            iconBg="bg-pink-500/20"
            iconColor="text-pink-400"
          />
        </div>
      </div>
    </Card>
  );
}

// CTA Section Component
function CTASection() {
  return (
    <Card className="w-full border-none py-24 px-4 text-center relative overflow-hidden">
      {/* Futuristic background */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-blue-900 to-slate-900">
        {/* Scanning lines effect */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-20"
            animate={{
              y: ['-20px', '100vh'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400/10 to-transparent h-20"
            animate={{
              y: ['-20px', '100vh'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              delay: 1.5
            }}
          />
        </div>
        
        {/* Circuit pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M0 10 L10 10 L10 0 M10 10 L20 10 M10 20 L10 10" stroke="white" strokeWidth="0.5" fill="none"/>
                <circle cx="10" cy="10" r="1" fill="white"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)"/>
          </svg>
        </div>
      </div>
      <Spotlight
        className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        size={600}
      />
      
      <div className="container mx-auto max-w-3xl relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-6">
          Ignite Your Spark.
        </h2>
        <p className="text-lg text-gray-400 mb-10">
          Sign up today and be the first to experience the future of communication. It's free, fast, and full of possibilities.
        </p>
        <a
          href="#"
          className="bg-white text-black font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 transform hover:bg-gray-200 hover:scale-105"
        >
          Sign Up Now
        </a>
      </div>
    </Card>
  );
}

// Main App Component
const App = () => {
  return (
    <div className="bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-gray-200 font-sans antialiased">
      <HeroSection />
      <VisualShowcase />
      <FeaturesSection />
      <CTASection />
      
      <footer className="py-12 px-4 border-t border-white/10 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} SparkTalk Corporation. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;