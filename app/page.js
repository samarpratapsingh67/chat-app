"use client";
import Image from "next/image";
import React, { useState } from "react";
// Import Spline component if you've wrapped it, or use the direct iframe/script approach
// import Spline from '@splinetool/react-spline'; // Example if using @splinetool/react-spline

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black text-gray-100 font-sans antialiased overflow-x-hidden relative">
      {/* Background Sphere/Orb - Conceptual for a 3D element */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-purple-800 rounded-full mix-blend-screen opacity-10 blur-3xl animate-pulse-slow z-0"></div>
      <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-indigo-700 rounded-full mix-blend-screen opacity-10 blur-3xl animate-pulse-slow animation-delay-2000 z-0"></div>
      <div className="absolute bottom-[10%] left-[5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-pink-700 rounded-full mix-blend-screen opacity-10 blur-3xl animate-pulse-slow animation-delay-4000 z-0"></div>

      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-red-800 py-24 md:py-36 lg:py-48 rounded-b-[60px] shadow-2xl mx-auto max-w-screen-2xl overflow-hidden mb-12">
        {/* Decorative elements / abstract shapes with animation */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float-spin z-0"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float-spin animation-delay-2000 z-0"></div>

        {/* Primary 3D object from Spline - CONCEPTUAL INTEGRATION */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          {/*
            To integrate Spline:
            1. Go to your Spline project.
            2. Click "Export" -> "Viewer" -> "Code".
            3. Choose "React" or "HTML".

            If React:
            <Spline scene="https://prod.spline.design/YOUR_SPLINE_ID/scene.splinecode" />
            (Requires npm install @splinetool/react-spline)
            Adjust w/h to fill its parent div.

            If HTML (iframe):
            <iframe
              src="https://prod.spline.design/YOUR_SPLINE_ID/index.html"
              frameBorder="0"
              width="100%"
              height="100%"
              className="absolute inset-0"
              title="Interactive 3D Scene"
            ></iframe>
          */}
          {/* Placeholder for your actual Spline component/iframe */}
          <div className="w-full h-full flex items-center justify-center">
            {/* Replace this div with your Spline component or iframe */}
            {/* For demonstration, imagine a floating, animated communication icon or a stylised phone */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-96 md:h-96 bg-gray-700 rounded-full opacity-60 flex items-center justify-center animate-pulse-medium scale-in-out pointer-events-auto">
                <span className="text-white text-4xl font-bold animate-bounce">Welcome</span>
                {/* This is where your Spline component or iframe would go */}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-8 text-white drop-shadow-2xl animate-fade-in-up">
            Connect, Share, Express with{" "}
            <span className="text-yellow-300 animate-pulse-light">SparkTalk</span>
          </h1>
          <p className="text-lg md:text-2xl lg:text-3xl mb-12 max-w-4xl mx-auto opacity-95 text-gray-200 animate-fade-in-up animation-delay-500">
            Experience seamless communication, vibrant communities, and crystal-clear connections that transcend boundaries.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-5 sm:space-y-0 sm:space-x-8">
            <a
              href="#"
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-4 px-10 rounded-full shadow-2xl hover:from-green-500 hover:to-blue-600 transition duration-500 ease-in-out transform hover:-translate-y-2 hover:scale-105 group text-lg relative overflow-hidden"
            >
              Get Started Free
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              <span className="ml-3 inline-block transition-transform group-hover:translate-x-2">→</span>
            </a>
            <a
              href="#"
              className="border-2 border-white text-white font-bold py-4 px-10 rounded-full shadow-2xl hover:bg-white hover:text-indigo-700 transition duration-500 ease-in-out transform hover:-translate-y-2 hover:scale-105 text-lg relative overflow-hidden"
            >
              Learn More
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            </a>
          </div>
        </div>
      </header>

      {/* Visual Showcase Section - Integrate rich images/illustrations */}
      <section className="py-20 bg-gray-900 rounded-3xl shadow-xl mx-auto max-w-screen-2xl -mt-16 relative z-10 p-8">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-16 animate-fade-in-up">
            Unleash the Power of <span className="text-purple-400">SparkTalk</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Feature Image 1 */}
            <div className="relative animate-slide-in-left">
              <Image
                src="/images/chat-interface.png" // Replace with a compelling, modern UI screenshot or illustration
                alt="SparkTalk Chat Interface"
                width={800}
                height={550}
                layout="responsive"
                className="rounded-3xl shadow-2xl border-4 border-purple-600 transform hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-indigo-500 rounded-full mix-blend-screen opacity-20 blur-xl animate-float-bubble"></div>
            </div>

            {/* Feature Description 1 */}
            <div className="text-left animate-fade-in-right">
              <h3 className="text-4xl font-bold text-white mb-5">
                Intuitive & Engaging Chat Experience
              </h3>
              <p className="text-gray-300 text-xl leading-relaxed">
                Dive into conversations that flow effortlessly. Our sleek, modern interface is designed
                for clarity and ease, making every interaction a pleasure. With rich media support and
                expressive emojis, your messages come alive.
              </p>
            </div>

            {/* Feature Description 2 */}
            <div className="text-right lg:order-last animate-fade-in-left">
              <h3 className="text-4xl font-bold text-white mb-5">
                Seamless Video Calls & Global Connectivity
              </h3>
              <p className="text-gray-300 text-xl leading-relaxed">
                Connect face-to-face with crystal-clear video and audio, no matter the distance.
                SparkTalk ensures you're always just a click away from friends, family, and colleagues
                across the globe.
              </p>
            </div>

            {/* Feature Image 2 */}
            <div className="relative animate-slide-in-right lg:order-first">
              <Image
                src="/images/video-call.png" // Replace with a high-quality video call screenshot/illustration
                alt="SparkTalk Video Call"
                width={800}
                height={550}
                layout="responsive"
                className="rounded-3xl shadow-2xl border-4 border-pink-600 transform hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute -top-8 -left-8 w-40 h-40 bg-pink-500 rounded-full mix-blend-screen opacity-20 blur-xl animate-float-bubble animation-delay-2500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Detailed */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-16 animate-fade-in-up">
            Core Features Designed for You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Feature Card 1 */}
            <div className="bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-3 hover:rotate-2 group border-t-8 border-indigo-600 flex flex-col items-center animate-fade-in animation-delay-100">
              <div className="text-indigo-400 text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-comments"></i>
              </div>
              <h3 className="text-3xl font-semibold text-white mb-3">Real-time Messaging</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Experience instant, reliable chat with read receipts and typing indicators. Never miss a beat.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-3 hover:rotate-2 group border-t-8 border-purple-600 flex flex-col items-center animate-fade-in animation-delay-200">
              <div className="text-purple-400 text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="text-3xl font-semibold text-white mb-3">Dynamic Group Chats</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Form communities, collaborate on projects, or just hang out with friends in tailored group conversations.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-3 hover:rotate-2 group border-t-8 border-pink-600 flex flex-col items-center animate-fade-in animation-delay-300">
              <div className="text-pink-400 text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-lock"></i>
              </div>
              <h3 className="text-3xl font-semibold text-white mb-3">End-to-End Encryption</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Your privacy is paramount. All communications are secured with industry-leading encryption.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-3 hover:rotate-2 group border-t-8 border-yellow-600 flex flex-col items-center animate-fade-in animation-delay-400">
              <div className="text-yellow-400 text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-robot"></i>
              </div>
              <h3 className="text-3xl font-semibold text-white mb-3">AI-Powered Assistance</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Leverage smart replies, content suggestions, and helpful insights from our integrated AI assistant.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-3 hover:rotate-2 group border-t-8 border-green-600 flex flex-col items-center animate-fade-in animation-delay-500">
              <div className="text-green-400 text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-file-alt"></i>
              </div>
              <h3 className="text-3xl font-semibold text-white mb-3">Rich Media Sharing</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Share photos, videos, documents, and more directly in your chats with robust previews.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-3 hover:rotate-2 group border-t-8 border-cyan-600 flex flex-col items-center animate-fade-in animation-delay-600">
              <div className="text-cyan-400 text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-microphone-alt"></i>
              </div>
              <h3 className="text-3xl font-semibold text-white mb-3">Expressive Voice Notes</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Communicate quickly and personally with high-quality voice messages on the go.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-br from-purple-800 to-indigo-700 text-white py-24 rounded-3xl shadow-2xl mx-auto max-w-screen-2xl my-20 relative overflow-hidden">
        {/* Abstract background shapes with animation */}
        <div className="absolute top-1/4 left-[5%] w-64 h-64 bg-pink-400 rounded-full mix-blend-screen opacity-15 blur-2xl animate-float-bubble z-0"></div>
        <div className="absolute bottom-1/4 right-[5%] w-80 h-80 bg-blue-400 rounded-full mix-blend-screen opacity-15 blur-2xl animate-float-bubble animation-delay-3000 z-0"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-10 leading-tight animate-fade-in-up">
            Join the Conversation.
            <br />
            Ignite Your <span className="text-yellow-300">Spark</span>.
          </h2>
          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto opacity-95 text-gray-200 animate-fade-in-up animation-delay-500">
            Sign up today and start experiencing the future of communication with SparkTalk. It's free, fast, and full of possibilities.
          </p>
          <a
            href="#"
            className="bg-white text-purple-800 font-extrabold py-5 px-16 rounded-full shadow-2xl hover:bg-gray-100 transition duration-500 ease-in-out transform hover:-translate-y-2 hover:scale-105 text-xl relative overflow-hidden"
          >
            Sign Up for SparkTalk Now!
            <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-12 rounded-t-[60px] mx-auto max-w-screen-2xl">
        <div className="container mx-auto px-6 text-center text-sm">
          <p className="mb-6 text-base">&copy; {new Date().getFullYear()} SparkTalk. All rights reserved.</p>
          <div className="flex justify-center space-x-8 text-base font-medium">
            <a href="#" className="hover:text-white transition duration-300 ease-in-out transform hover:scale-105">Privacy Policy</a>
            <span className="text-gray-600">|</span>
            <a href="#" className="hover:text-white transition duration-300 ease-in-out transform hover:scale-105">Terms of Service</a>
            <span className="text-gray-600">|</span>
            <a href="#" className="hover:text-white transition duration-300 ease-in-out transform hover:scale-105">Support</a>
            <span className="text-gray-600">|</span>
            <a href="#" className="hover:text-white transition duration-300 ease-in-out transform hover:scale-105">FAQ</a>
          </div>
          {/* Social Media Icons with larger size and hover */}
          <div className="mt-10 flex justify-center space-x-8">
            <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300 text-4xl transform hover:scale-125">
              <i className="fab fa-facebook-square"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300 text-4xl transform hover:scale-125">
              <i className="fab fa-twitter-square"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-500 transition duration-300 text-4xl transform hover:scale-125">
              <i className="fab fa-instagram-square"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-700 transition duration-300 text-4xl transform hover:scale-125">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-red-600 transition duration-300 text-4xl transform hover:scale-125">
              <i className="fab fa-youtube-square"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;