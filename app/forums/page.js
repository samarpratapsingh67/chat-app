'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code2, DatabaseZap, Fingerprint, CloudCog, Braces, BrainCircuit, PlusCircle, MessageSquare, X } from 'lucide-react';

const initialTopics = [
    {
        text: "Python",
        Icon: Code2,
        iconColor: "from-emerald-400 to-lime-500",
        desc: "Discuss everything from Django and Flask to data analysis with Pandas, NumPy, and machine learning.",
        slug: "Python",
        shadowColor: "shadow-emerald-500/40"
    },
    {
        text: "JavaScript",
        Icon: Braces,
        iconColor: "from-lime-400 to-amber-500",
        desc: "Explore web development, front-end frameworks like React, Node.js for backend, and the entire JS ecosystem.",
        slug: "JavaScript",
        shadowColor: "shadow-lime-500/40"
    },
    {
        text: "Java",
        Icon: DatabaseZap,
        iconColor: "from-amber-400 to-orange-500",
        desc: "Discuss enterprise applications, Android development, Spring Boot, and the intricacies of the JVM.",
        slug: "Java",
        shadowColor: "shadow-amber-500/40"
    },
    {
        text: "Data Science",
        Icon: BrainCircuit,
        iconColor: "from-teal-400 to-cyan-500",
        desc: "Dive into machine learning, data analysis, visualization, and big data technologies like Hadoop and Spark.",
        slug: "Data-Science",
        shadowColor: "shadow-teal-500/40"
    },
    {
        text: "Cloud Computing",
        Icon: CloudCog,
        iconColor: "from-sage-400 to-emerald-500",
        desc: "Explore AWS, Azure, GCP, serverless architecture, and managing scalable cloud environments.",
        slug: "Cloud-Computing",
        shadowColor: "shadow-sage-500/40"
    },
    {
        text: "Cybersecurity",
        Icon: Fingerprint,
        iconColor: "from-emerald-500 to-green-600",
        desc: "Talk about network security, ethical hacking, data privacy, digital forensics, and protecting against cyber threats.",
        slug: "Cybersecurity",
        shadowColor: "shadow-emerald-500/40"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
};

// Card component for the 3D grid layout
const TopicCard = ({ topic }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20;
    const y = (e.clientY - top - height / 2) / 20;
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.05)`;
    cardRef.current.style.transition = 'transform 0.1s ease-out';
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
    cardRef.current.style.transition = 'transform 0.4s ease-in-out';
  };
  
  const duration = Math.random() * 2 + 3;

  return (
    <motion.div
      key={topic.slug}
      variants={itemVariants}
      layout
      animate={{ y: ["-6px", "6px"] }}
      transition={{ duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      className="group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        style={{ transformStyle: "preserve-3d" }}
        className={`relative w-full h-full p-8 bg-green-900/30 backdrop-blur-md rounded-2xl border border-emerald-800/80 shadow-2xl ${topic.shadowColor} flex flex-col items-center text-center transition-all duration-300 group-hover:border-emerald-500 group-hover:shadow-[0_0_25px_-5px_var(--tw-shadow-color)]`}
      >
        <div
          className="mb-6 transform transition-transform duration-300 group-hover:scale-110"
          style={{ transform: "translateZ(50px)" }}
        >
          <div className="w-20 h-20 flex items-center justify-center bg-green-900/60 rounded-full border-2 border-emerald-700 group-hover:border-lime-400 transition-colors duration-300">
            <div className={`w-12 h-12 bg-gradient-to-br ${topic.iconColor} rounded-lg flex items-center justify-center`}>
              <topic.Icon className="w-8 h-8 text-white/90" />
            </div>
          </div>
        </div>
        <h2 style={{ transform: "translateZ(30px)" }} className="text-3xl font-bold text-white mb-3 break-words">
          {topic.text}
        </h2>
        <p style={{ transform: "translateZ(20px)" }} className="text-green-300/70 text-base mb-6 flex-grow">
          {topic.desc}
        </p>
        <Link href={`/forum/${topic.slug}`} className="mt-auto w-full" style={{ transform: "translateZ(40px)" }}>
            <motion.button whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} className="group/button w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300">
              <span>Join Discussion</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/button:translate-x-1" />
            </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

const Chat = () => {
    const [topics, setTopics] = useState(initialTopics);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newChannelName, setNewChannelName] = useState("");

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setNewChannelName("");
    };

    const handleCreateChannel = (e) => {
        e.preventDefault();
        if (newChannelName.trim() === "") return;

        const newChannel = {
            text: newChannelName,
            Icon: MessageSquare,
            iconColor: "from-sky-400 to-cyan-500",
            desc: `A user-created channel for discussing ${newChannelName}.`,
            slug: newChannelName.trim().replace(/\s+/g, '-'),
            shadowColor: "shadow-cyan-500/40",
        };

        setTopics([...topics, newChannel]);
        closeModal();
    };

    return (
        <>
            <div className="relative min-h-screen w-full overflow-hidden bg-[#0c1a14]">
                 <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(132,204,22,0.3),rgba(255,255,255,0))] opacity-20"></div>
                <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 w-[500px] h-[500px] bg-gradient-to-br from-[#16a34a] to-[#14b8a6] rounded-full blur-[150px] opacity-20 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[500px] h-[500px] bg-gradient-to-tl from-[#d97706] to-[#84cc16] rounded-full blur-[150px] opacity-20 animate-pulse animation-delay-4000"></div>

                <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="max-w-7xl mx-auto text-center"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-black text-white mb-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#84cc16] to-[#10b981]">
                                Join the Conversation
                            </span>
                        </motion.h1>
                        <motion.p variants={itemVariants} className="text-green-200/80 text-lg mb-16 max-w-2xl mx-auto">
                            Welcome to our community! Select a topic to dive into discussions, share your knowledge, and connect with fellow developers.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        {topics.map((topic) => (
                           <TopicCard topic={topic} key={topic.slug} />
                        ))}
                        
                        <motion.div
                            variants={itemVariants}
                            layout
                            className="group relative flex items-center justify-center min-h-[350px]"
                        >
                            <button 
                                onClick={openModal}
                                className="w-full h-full p-8 bg-green-900/10 backdrop-blur-sm rounded-2xl border-2 border-dashed border-emerald-800/80 flex flex-col items-center justify-center text-center text-green-300/70 hover:border-emerald-500 hover:text-white transition-all duration-300"
                            >
                                <PlusCircle className="w-16 h-16 mb-4 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" />
                                <span className="text-2xl font-bold">Create New Channel</span>
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Modal Component */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-gray-800/90 border border-emerald-700 rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl shadow-lime-500/20"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-white">Create a New Channel</h2>
                                <button onClick={closeModal} className="text-gray-400 hover:text-white">
                                    <X size={24} />
                                </button>
                            </div>
                            <form onSubmit={handleCreateChannel}>
                                <label htmlFor="channelName" className="block text-sm font-medium text-green-200/80 mb-2">
                                    Channel Name
                                </label>
                                <input
                                    type="text"
                                    id="channelName"
                                    value={newChannelName}
                                    onChange={(e) => setNewChannelName(e.target.value)}
                                    className="w-full bg-gray-900/70 border border-emerald-800 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 focus:shadow-[0_0_15px_theme(colors.lime.500/0.5)] outline-none transition-all duration-300"
                                    placeholder="e.g., 'React Native Devs'"
                                    autoFocus
                                />
                                <div className="mt-6 flex justify-end gap-4">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="py-2 px-6 bg-gray-700 text-white font-semibold rounded-full hover:bg-gray-600 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="py-2 px-6 bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white font-semibold rounded-full hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={!newChannelName.trim()}
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chat;