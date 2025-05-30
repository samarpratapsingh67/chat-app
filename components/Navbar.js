"use client"
import { UserButton } from '@clerk/nextjs';
import React, { useState } from 'react';
// Define the Navbar component

const Navbar= () => {
  // State for Navbar mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State for AI Idea Generator section visibility
  const [showIdeaGenerator, setShowIdeaGenerator] = useState(false);
  // State for the user's prompt for idea generation
  const [ideaPrompt, setIdeaPrompt] = useState('');
  // State to store the generated ideas from the LLM
  const [generatedIdeas, setGeneratedIdeas] = useState('');
  // State to indicate if the LLM is currently generating ideas
  const [isLoading, setIsLoading] = useState(false);
  // State to store any error messages during API calls
  const [error, setError] = useState('');

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close the idea generator if the menu is toggled
    setShowIdeaGenerator(false);
  };

  // Function to toggle the AI Idea Generator section
  const toggleIdeaGenerator = () => {
    setShowIdeaGenerator(!showIdeaGenerator);
    // Close the mobile menu if the idea generator is opened
    setIsMenuOpen(false);
    // Clear previous results when opening the generator
    setGeneratedIdeas('');
    setIdeaPrompt('');
    setError('');
  };

  // Function to call the Gemini API and generate ideas
  const generateIdeas = async () => {
    if (!ideaPrompt.trim()) {
      setError('Please enter a prompt to generate ideas.');
      return;
    }

    setIsLoading(true);
    setGeneratedIdeas('');
    setError('');

    try {
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: `Generate ideas for: ${ideaPrompt}` }] });

      const payload = { contents: chatHistory };
      const apiKey = ""; // Canvas will provide this at runtime
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setGeneratedIdeas(text);
      } else {
        setError('Failed to generate ideas. Please try again.');
        console.error('Gemini API response structure unexpected:', result);
      }
    } catch (err) {
      console.error('Error calling Gemini API:', err);
      setError('An error occurred while connecting to the AI. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="antialiased font-sans"> 

      {/* Navbar Component */}
      {/* Removed my-2 and changed rounded-lg to rounded-b-none */}
      <nav className="bg-gray-800 p-1 shadow-md rounded-b-none mx-1">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo or Brand Name */}
          <div className="text-white text-2xl font-bold">
            SparkTalk
          </div>

          {/* Desktop Navigation Links - Converted to styled "link tabs" */}
          <div className="hidden md:flex space-x-2 items-center"> {/* Reduced space-x for tabs */}
            <a href="/" className="px-4 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out">Home</a>
            <a href="/forums" className="px-4 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out">Forums</a>
            <a href="/userchat" className="px-4 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out">UserChat</a>
            <a href="#" className="px-4 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out">Contact</a>
            <div><UserButton /></div>
            {/* AI Ideas Button for Desktop */}
            <button
              onClick={toggleIdeaGenerator}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              ✨ AI Ideas
            </button>
          </div>

          {/* Mobile Menu Button (Hamburger Icon) */}
          <div className="md:hidden flex items-center">
            {/* AI Ideas Button for Mobile (appears next to hamburger) */}
            <button
              onClick={toggleIdeaGenerator}
              className="mr-4 px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              ✨ AI Ideas
            </button>
            <button onClick={toggleMenu} className="text-gray-300 hover:text-white focus:outline-none focus:text-white">
              {/* Hamburger icon using SVG */}
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  // Close icon (X) when menu is open
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  // Hamburger icon when menu is closed
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Links (conditionally rendered) - Converted to styled "link tabs" */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <a href="#" className="block text-gray-300 hover:text-white px-4 py-2 rounded-md transition duration-300 ease-in-out bg-gray-700">Home</a>
            <a href="/" className="block text-gray-300 hover:text-white px-4 py-2 rounded-md transition duration-300 ease-in-out bg-gray-700">About</a>
            <a href="#" className="block text-gray-300 hover:text-white px-4 py-2 rounded-md transition duration-300 ease-in-out bg-gray-700">Services</a>
            <a href="#" className="block text-gray-300 hover:text-white px-4 py-2 rounded-md transition duration-300 ease-in-out bg-gray-700">Contact</a>
            
          </div>
        )}
      </nav>

      {/* AI Idea Generator Section */}
      {showIdeaGenerator && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">✨ AI Idea Generator</h2>
            <button
              onClick={toggleIdeaGenerator}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times; {/* Close button (X icon) */}
            </button>

            <div className="mb-4">
              <label htmlFor="ideaPrompt" className="block text-gray-700 text-sm font-bold mb-2">
                What kind of ideas do you need?
              </label>
              <textarea
                id="ideaPrompt"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y min-h-[80px]"
                placeholder="e.g., 'slogans for a new tech startup', 'marketing strategies for a fitness app'"
                value={ideaPrompt}
                onChange={(e) => setIdeaPrompt(e.target.value)}
                rows="4"
              ></textarea>
            </div>

            <button
              onClick={generateIdeas}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate Ideas'}
            </button>

            {error && (
              <p className="text-red-500 text-sm mt-4">{error}</p>
            )}

            {generatedIdeas && (
              <div className="mt-6 p-4 bg-gray-100 border border-gray-200 rounded-md max-h-60 overflow-y-auto">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Generated Ideas:</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{generatedIdeas}</p>
              </div>
            )}
          </div>
        </div>
      )}
       </div>
  )}
   

export default Navbar;