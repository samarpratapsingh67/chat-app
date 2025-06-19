import React from 'react'
import Image from 'next/image'

import Link from 'next/link'
import { Button } from '../../components/ui/button'
const topics = [
    {
        text: "Python",
        img: "/images/python.png", // Assuming images are in public/images
        desc: "Let's discuss everything related to Python, from web development with Django and Flask to data analysis with Pandas and NumPy, and even machine learning",
        slug:"Python"
    },

    {
        "text": "JavaScript",
        "img": "/images/javascript.png",
        "desc": "Explore web development, front-end frameworks like React and Angular, Node.js for backend, and dive deep into the ecosystem of JavaScript.",
        slug:"JavaScript"
    },
    {
        "text": "Java",
        "img": "/images/java.png",
        "desc": "Discuss enterprise applications, Android development, Spring Boot, and the intricacies of the Java Virtual Machine (JVM).",
        slug:"Java"
    },
    {
        "text": "Data Science",
        "img": "/images/data_science.png",
        "desc": "Dive into machine learning algorithms, data analysis techniques, effective data visualization, and big data technologies like Hadoop and Spark.",
        slug:"Data-Science"
    },
    {
        "text": "Cloud Computing",
        "img": "/images/cloud.png",
        "desc": "Explore AWS, Azure, Google Cloud Platform, serverless architecture, infrastructure as code, and managing scalable cloud environments.",
        slug:"Cloud-Computing"
    },
    {
        "text": "Cybersecurity",
        "img": "/images/cybersecurity.png",
        "desc": "Talk about network security, ethical hacking, data privacy regulations, digital forensics, and protecting against evolving cyber threats.",
        "slug":"Cybersecurity"
    }
]

const Chat = () => {
    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl font-extrabold text-center text-white mb-12 drop-shadow-lg">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                        Discussion Forums
                    </span>
                </h1>

                <p className="text-center text-gray-300 text-lg mb-16 max-w-2xl mx-auto">
                    Welcome to our community discussion forums! Choose a topic below to dive into conversations, ask questions, and share your expertise.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {topics.map((topic) => (
                        <div
                            key={topic.text} // Using text as key, assuming it's unique
                            className="bg-gray-800 rounded-xl shadow-2xl p-8 transform transition duration-500 hover:scale-105 hover:shadow-purple-500/50 flex flex-col items-center text-center border border-gray-700"
                        >
                            <div className="mb-6">
                                <Image
                                    src={topic.img}
                                    alt={topic.text}
                                    width={80} // Increased size for better visual appeal
                                    height={80}
                                    className="rounded-full border-4 border-purple-500 shadow-lg"
                                />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-3">
                                {topic.text}
                            </h2>
                            <p className="text-gray-400 text-base mb-6 flex-grow">
                                {topic.desc}
                            </p>
                            <Link href={`forum/${topic.slug}`}>
                            <Button className="mt-auto bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:from-purple-700 hover:to-pink-600 transition duration-300 transform hover:-translate-y-1">
                                Join Discussion
                            </Button>
                            </Link>
                            
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Chat