'use client';

import React from 'react';
// No longer need Image from next/image
import Link from 'next/link';
import { motion } from 'framer-motion';
// Import the new icons we'll be using
import { ArrowRight, Code2, DatabaseZap, Fingerprint, CloudCog, Braces, BrainCircuit } from 'lucide-react';

const topics = [
    {
        text: "Python",
        // Replaced 'img' with 'Icon' component and 'iconColor'
        Icon: Code2,
        iconColor: "from-cyan-400 to-blue-500",
        desc: "Discuss everything from Django and Flask to data analysis with Pandas, NumPy, and machine learning.",
        slug: "Python",
        shadowColor: "shadow-cyan-500/50"
    },
    {
        text: "JavaScript",
        Icon: Braces,
        iconColor: "from-yellow-400 to-amber-500",
        desc: "Explore web development, front-end frameworks like React, Node.js for backend, and the entire JS ecosystem.",
        slug: "JavaScript",
        shadowColor: "shadow-yellow-500/50"
    },
    {
        text: "Java",
        Icon: DatabaseZap,
        iconColor: "from-red-400 to-orange-500",
        desc: "Discuss enterprise applications, Android development, Spring Boot, and the intricacies of the JVM.",
        slug: "Java",
        shadowColor: "shadow-red-500/50"
    },
    {
        text: "Data Science",
        Icon: BrainCircuit,
        iconColor: "from-blue-400 to-sky-500",
        desc: "Dive into machine learning, data analysis, visualization, and big data technologies like Hadoop and Spark.",
        slug: "Data-Science",
        shadowColor: "shadow-blue-500/50"
    },
    {
        text: "Cloud Computing",
        Icon: CloudCog,
        iconColor: "from-indigo-400 to-purple-500",
        desc: "Explore AWS, Azure, GCP, serverless architecture, and managing scalable cloud environments.",
        slug: "Cloud-Computing",
        shadowColor: "shadow-indigo-500/50"
    },
    {
        text: "Cybersecurity",
        Icon: Fingerprint,
        iconColor: "from-green-400 to-emerald-500",
        desc: "Talk about network security, ethical hacking, data privacy, digital forensics, and protecting against cyber threats.",
        slug: "Cybersecurity",
        shadowColor: "shadow-green-500/50"
    }
];


const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};


const Chat = () => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-slate-900">
            {/* Animated Aurora Background */}
            <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 w-[500px] h-[500px] bg-gradient-to-br from-purple-600 to-blue-500 rounded-full blur-[150px] opacity-30 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[500px] h-[500px] bg-gradient-to-tl from-pink-600 to-red-500 rounded-full blur-[150px] opacity-30 animate-pulse animation-delay-4000"></div>

            <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-7xl mx-auto text-center"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-6xl font-black text-white mb-6"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-cyan-400">
                            Join the Conversation
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-slate-300 text-lg mb-16 max-w-2xl mx-auto"
                    >
                        Welcome to our community! Select a topic to dive into discussions, share your knowledge, and connect with fellow developers.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {topics.map((topic) => {
                        const duration = Math.random() * 2 + 3;

                        return (
                            <motion.div
                                key={topic.text}
                                variants={itemVariants}
                                whileHover="hover"
                                className="group relative"
                                animate={{
                                    y: ["-8px", "8px"],
                                }}
                                transition={{
                                    duration,
                                    repeat: Infinity,
                                    repeatType: "mirror",
                                    ease: "easeInOut",
                                }}
                            >
                                <motion.div
                                    style={{
                                        transformStyle: "preserve-3d",
                                        transform: "perspective(1000px)"
                                    }}
                                    className={`relative w-full h-full p-8 bg-slate-800/60 backdrop-blur-md rounded-2xl border border-slate-700/80 shadow-2xl ${topic.shadowColor} flex flex-col items-center text-center transition-all duration-300 group-hover:border-slate-500`}
                                >
                                    <motion.div
                                        className="mb-6 transform-gpu"
                                        style={{ transform: "translateZ(50px)" }}
                                        variants={{ hover: { scale: 1.2, rotate: 10 } }}
                                    >
                                        {/* --- THIS IS THE ELEGANT REPLACEMENT --- */}
                                        <div className="w-20 h-20 flex items-center justify-center bg-slate-900/70 rounded-full border-2 border-slate-600 group-hover:border-purple-500 transition-colors duration-300">
                                            <div className={`w-12 h-12 bg-gradient-to-br ${topic.iconColor} rounded-lg flex items-center justify-center`}>
                                                <topic.Icon className="w-8 h-8 text-white/90" />
                                            </div>
                                        </div>
                                    </motion.div>
                                    <motion.h2
                                        style={{ transform: "translateZ(30px)" }}
                                        className="text-3xl font-bold text-white mb-3"
                                    >
                                        {topic.text}
                                    </motion.h2>
                                    <motion.p
                                        style={{ transform: "translateZ(20px)" }}
                                        className="text-slate-400 text-base mb-6 flex-grow"
                                    >
                                        {topic.desc}
                                    </motion.p>
                                    <Link href={`/forum/${topic.slug}`} className="mt-auto w-full">
                                        <motion.button
                                            style={{ transform: "translateZ(40px)" }}
                                            whileHover={{ scale: 1.05, y: -5 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="group/button w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
                                        >
                                            <span>Join Discussion</span>
                                            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/button:translate-x-1" />
                                        </motion.button>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
};

export default Chat;