"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, ChevronRight, Star, ExternalLink, ChevronDown, Brain, Sparkles, Code, Play, Zap, Camera, Clock, Check, Shield, Timer } from "lucide-react";
import LoginModal from "@/app/components/LoginModal";
import { useRouter } from 'next/navigation';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"login" | "signup">("signup");
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // Calculate time until April 20, 2025
  useEffect(() => {
    const calculateTimeLeft = () => {
      const deadline = new Date("April 20, 2025 23:59:59").getTime();
      const now = new Date().getTime();
      const difference = deadline - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Check login status
  useEffect(() => {
    // This is a placeholder - you would use your auth context or API to check login status
    const checkLoginStatus = () => {
      // For demo purposes, we'll use localStorage, but you should use your auth system
      const token = localStorage.getItem('auth_token');
      setIsLoggedIn(!!token);
    };
    
    checkLoginStatus();
  }, []);
  
  // Handle scroll event to change header opacity
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const platformLogos = [
    { 
      name: "Canvas", 
      url: "https://storage.googleapis.com/msgsndr/stBxTs2j8T3pmc3ZL1WH/media/67f1dd1e0e3202dd309346e7.png",
      small: false 
    },
    { 
      name: "Blackboard", 
      url: "https://storage.googleapis.com/msgsndr/stBxTs2j8T3pmc3ZL1WH/media/67f45fd30e320270369d6b15.png",
      small: false 
    },
    { 
      name: "Google Classroom",
      url: "https://storage.googleapis.com/msgsndr/stBxTs2j8T3pmc3ZL1WH/media/67f1dd1e0e3202da2f9346e6.png",
      small: false 
    },
    { 
      name: "Sakai", 
      url: "https://storage.googleapis.com/msgsndr/stBxTs2j8T3pmc3ZL1WH/media/67f1dd1e0e3202d9ae9346e8.png",
      small: false 
    },
    { 
      name: "Moodle", 
      url: "https://storage.googleapis.com/msgsndr/stBxTs2j8T3pmc3ZL1WH/media/67f45fe20e3202a3999d6b17.png",
      small: false 
    },
    { 
      name: "D2L", 
      url: "https://storage.googleapis.com/msgsndr/stBxTs2j8T3pmc3ZL1WH/media/67f1dd1ef10fee3a68b384d7.png",
      small: false 
    },
    { 
      name: "Schoology", 
      url: "https://storage.googleapis.com/msgsndr/stBxTs2j8T3pmc3ZL1WH/media/67f45ffcf10fee6d44b478fc.png",
      small: false 
    },
    { 
      name: "ClassMarker", 
      url: "https://storage.googleapis.com/msgsndr/stBxTs2j8T3pmc3ZL1WH/media/67f4603ce06ab0a3c3f7bffa.png",
      small: true 
    }
  ];

  // Updated logos without duplicates and higher quality images
  const updatedPlatformLogos = [
    "https://storage.googleapis.com/msgsndr/stBxTs2j8T3pmc3ZL1WH/media/67f1dd1e0e3202dd309346e7.png", // Canvas
    "https://storage.googleapis.com/msgsndr/stBxTs2j8T3pmc3ZL1WH/media/67f45fd30e320270369d6b15.png", // Blackboard (higher quality)
    "https://storage.googleapis.com/msgsndr/stBxTs2j8T3pmc3ZL1WH/media/67f1dd1e0e3202da2f9346e6.png", // Google Classroom
    "https://storage.googleapis.com/msgsndr/stBxTs2j8T3pmc3ZL1WH/media/67f1dd1e0e3202d9ae9346e8.png", // Sakai
    "https://storage.googleapis.com/msgsndr/stBxTs2j8T3pmc3ZL1WH/media/67f45fe20e3202a3999d6b17.png", // Moodle (higher quality)
    "https://storage.googleapis.com/msgsndr/stBxTs2j8T3pmc3ZL1WH/media/67f1dd1ef10fee3a68b384d7.png", // D2L
    "https://storage.googleapis.com/msgsndr/stBxTs2j8T3pmc3ZL1WH/media/67f45ffcf10fee6d44b478fc.png", // Schoology (higher quality)
    "https://storage.googleapis.com/msgsndr/stBxTs2j8T3pmc3ZL1WH/media/67f4603ce06ab0a3c3f7bffa.png"  // ClassMarker (higher quality)
  ];

  const testimonials = [
    {
      name: "Tobias Morris",
      location: "US",
      review: "best extension for students💯",
      date: "Sept 3, 2024",
      avatar: "/testimonials/avatar1.jpg",
      rating: 5,
      university: "Arizona State University"
    },
    {
      name: "Dylan Paul",
      location: "US",
      review: "I never have time to study and StudyLens AI comes in clutch every single time",
      date: "Aug 15, 2024",
      avatar: "/testimonials/avatar2.jpg",
      rating: 5,
      university: "University of California, San Diego"
    },
    {
      name: "Aila Singh",
      location: "US",
      review: "absolute lifesaver 💯",
      date: "Jul 19, 2024",
      avatar: "/testimonials/avatar3.jpg",
      rating: 5,
      university: "Pennsylvania State University"
    },
    {
      name: "Roman Stewart",
      location: "US",
      review: "great on macro graphs",
      date: "Jun 14, 2024",
      avatar: "/testimonials/avatar4.jpg",
      rating: 4,
      university: "University of Michigan"
    },
    {
      name: "Aubrie Miranda",
      location: "US",
      review: "Reliable compared to the other tools I used for assignments",
      date: "Jun 14, 2024",
      avatar: "/testimonials/avatar5.jpg",
      rating: 5,
      university: "Ohio State University"
    },
    {
      name: "Leah Duran",
      location: "US",
      review: "This extension is fantastic for studying",
      date: "Jun 14, 2024",
      avatar: "/testimonials/avatar6.jpg",
      rating: 5,
      university: "University of Texas"
    }
  ];

  const faqs = [
    {
      question: "With a subscription, will I have access to the suite of StudyLens AI products?",
      answer: "Yes, your subscription gives you unlimited access to all StudyLens AI products including our Chrome extension, mobile app, and web dashboard. Use them all to maximize your academic success."
    },
    {
      question: "Will my school be able to detect that I'm using this software?",
      answer: "StudyLens AI is designed with privacy in mind. Our software doesn't leave digital fingerprints and uses advanced technology to prevent detection by university monitoring systems."
    },
    {
      question: "What makes our AI tools stand out from our competitors?",
      answer: "We use state-of-the-art AI models specifically trained on academic content. Our tools provide not just answers but detailed explanations to help you understand the material, with 98% accuracy and support for 15+ languages."
    },
    {
      question: "Can I get a refund if I don't like it?",
      answer: "Yes! We offer a satisfaction guarantee. If you're not completely satisfied with our service, contact us within 7 days of purchase for a full refund."
    },
    {
      question: "Is my chat and personal information about me kept safe?",
      answer: "Absolutely. We employ enterprise-grade encryption and strict privacy policies. Your personal information and academic data are never shared with third parties."
    },
    {
      question: "Can the tools walk me through my homework questions?",
      answer: "Yes, our AI provides step-by-step solutions with detailed explanations for all subjects. Whether it's math, science, history, or programming, you'll receive comprehensive guidance."
    }
  ];

  const handleGetStarted = () => {
    setModalType("signup");
    setShowModal(true);
  };

  const handleDashboardClick = () => {
    if (isLoggedIn) {
      router.push('/dashboard');
    } else {
      setModalType("login");
      setShowModal(true);
    }
  };

  return (
    <main className="bg-white text-gray-900">
      {showModal && (
        <LoginModal 
          type={modalType}
          onClose={() => setShowModal(false)}
          onToggleType={() => setModalType(modalType === "login" ? "signup" : "login")}
        />
      )}
      
      {/* Header */}
      <header className="py-4 sticky top-0 z-50 bg-transparent">
        <div className="container mx-auto px-4">
          <div className={`flex justify-between items-center bg-white ${scrolled ? 'bg-opacity-70' : 'bg-opacity-100'} rounded-2xl py-3 px-6 shadow-lg shadow-gray-200/50`} style={{ boxShadow: '0 0 20px 0 rgba(0,0,0,0.1)' }}>
            <div className="flex items-center">
              <Link href="/" className="mr-8">
                <Image 
                  src="https://storage.googleapis.com/msgsndr/stBxTs2j8T3pmc3ZL1WH/media/67f1daade06ab05c3cf6a02c.png" 
                  alt="StudyLens AI" 
                  width={304} 
                  height={67}
                  className="h-14 w-auto"
                  priority
                  unoptimized
                />
              </Link>
              <div className="h-10 w-px bg-gray-200 mx-4 hidden md:block"></div>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <nav className="hidden md:flex items-center space-x-16">
                <Link href="#features" className="text-gray-700 hover:text-gray-900 transition-colors text-base">Features</Link>
                <Link href="#pricing" className="text-gray-700 hover:text-gray-900 transition-colors text-base">Pricing</Link>
                <Link href="#faq" className="text-gray-700 hover:text-gray-900 transition-colors text-base">FAQ</Link>
                <Link href="/chrome-extension" className="text-gray-700 hover:text-gray-900 transition-colors text-base">Chrome Extension</Link>
              </nav>
            </div>
            
            <div className="flex items-center">
              <div className="h-10 w-px bg-gray-200 mx-6 hidden md:block"></div>
              <button 
                onClick={handleDashboardClick}
                className={`hidden md:block px-10 py-2 border-3 border-transparent rounded-full relative mr-4 ${
                  scrolled ? 'bg-opacity-70' : 'bg-opacity-100'
                }`}
                style={{ 
                  background: 'linear-gradient(white, white) padding-box, linear-gradient(to right, #2563eb, #9333ea) border-box',
                  borderWidth: '3px'
                }}
              >
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium text-base">
                  Dashboard
                </span>
              </button>
              <button 
                onClick={handleGetStarted}
                className="px-10 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:opacity-90 transition-colors text-base"
              >
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 pl-0 md:pl-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Instant</span>, Expert AI Homework Helper
              </h1>
              <p className="text-lg text-gray-700 mb-6 max-w-3xl pr-4">
                Get instant, accurate answers and step-by-step explanations for all your homework questions. Our AI technology works with all major learning platforms.
              </p>
              
              {/* USP Features List */}
              <div className="mb-8 space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                  <span className="text-gray-800">Get instant step-by-step solutions for any subject</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                  <span className="text-gray-800">Undetectable by university monitoring systems</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                  <span className="text-gray-800">Works with all major learning platforms and question types</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                <button
                  onClick={handleGetStarted}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-10 py-3 rounded-full hover:shadow-lg transition-all flex items-center justify-center"
                >
                  Start with Free Plan
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <Link
                  href="https://chrome.google.com/webstore/detail/studylens-ai-ace-tests-qu/mdfigkhdcpobdbgccoidpojfhcnbmmkd"
                  target="_blank"
                  className="w-full sm:w-auto bg-white text-gray-900 border border-gray-300 font-medium px-10 py-3 rounded-full hover:shadow-lg transition-all flex items-center justify-center"
                >
                  Get Chrome Extension
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </div>
            
              {/* Badges */}
              <div className="bg-white p-4 rounded-lg shadow-lg max-w-fit mb-8" style={{ boxShadow: '0 0 20px 0 rgba(0,0,0,0.1)' }}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-1 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Satisfaction guaranteed</span>
                  </div>
                  <div className="hidden sm:block h-4 w-px bg-gray-300"></div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-1 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Cancel anytime</span>
                  </div>
                  <div className="hidden sm:block h-4 w-px bg-gray-300"></div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-1 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">24/7 customer support</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 relative pr-0 md:pr-4">
              <Image 
                src="https://storage.googleapis.com/msgsndr/stBxTs2j8T3pmc3ZL1WH/media/67f1efbb694f31d379480541.png" 
                alt="StudyLens AI Homework Helper Interface" 
                width={637} 
                height={455}
                className="rounded-lg shadow-2xl ml-auto mr-3"
              />
              <div className="absolute -left-4 top-3/4 mt-10 bg-white px-6 py-4 rounded-lg shadow-lg" style={{ width: "calc(100% * 0.62)", boxShadow: '0 0 20px 0 rgba(0,0,0,0.1)' }}>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">98%</div>
                    <div className="text-xs text-gray-500">Accurate</div>
                  </div>
                  <div className="h-10 w-px bg-gray-200"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">30M</div>
                    <div className="text-xs text-gray-500">Questions Solved</div>
                  </div>
                  <div className="h-10 w-px bg-gray-200"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">4.8</div>
                    <div className="text-xs text-gray-500">Rated by students</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Logo animation */}
      <div className="py-14 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-center text-3xl lg:text-4xl font-bold mb-8">
            Works with <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">All</span> Major Learning Platforms
          </h2>
          <div className="relative w-full overflow-hidden">
            <style jsx global>{`
              .logo-container {
                display: flex;
                justify-content: center;
                flex-wrap: nowrap;
                align-items: center;
                gap: 2rem;
                overflow-x: auto;
                padding: 1rem 0;
                width: 100%;
              }
              .logo-wrapper {
                height: 50px;
                display: flex;
                align-items: center;
                flex-shrink: 0;
              }
              .logo-image {
                height: 45px;
                width: auto;
                object-fit: contain;
                object-position: center;
              }
              .logo-image.small {
                height: 35px;
              }
            `}</style>
            <div className="logo-container">
              {platformLogos.map((logo, index) => (
                <div key={index} className="logo-wrapper">
                  <img 
                    src={logo.url} 
                    alt={logo.name} 
                    className={`logo-image ${logo.small ? 'small' : ''}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Chrome Extension Feature */}
      <section id="features" className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-4 bg-white/20 rounded-full mb-6">
              <Image 
                src="/chrome-icon.png" 
                alt="Chrome Extension" 
                width={48} 
                height={48}
              />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              One-click answers — without switching tabs
            </h2>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Get answers from wherever you are, and just ask with one click.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="mb-4">
                <ArrowRight className="h-10 w-10 p-2 bg-blue-600 rounded-full" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Accurate problem solving and guided reasoning</h3>
              <p className="text-white/90">
                Fully guided explanations and step-by-step reasoning to explain any subject.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="mb-4">
                <ExternalLink className="h-10 w-10 p-2 bg-blue-600 rounded-full" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Add context from your study materials</h3>
              <p className="text-white/90">
                Upload guidebooks or lecture PDFs before a test and get tailored-specific answers.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="mb-4">
                <Brain className="h-10 w-10 p-2 bg-blue-600 rounded-full" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Follow up with your personal AI</h3>
              <p className="text-white/90">
                Open the AI chat on any website and ask any question you have for deepened understanding!
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Link 
              href="/chrome-extension"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Learn more
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Mobile App Feature */}
      <section className="py-16 md:py-24 bg-gray-50 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12 order-2 md:order-1">
              <div className="inline-flex items-center justify-center p-3 bg-white rounded-lg mb-4 shadow-lg" style={{ boxShadow: '0 0 20px 0 rgba(0,0,0,0.1)' }}>
                <Image 
                  src="/chrome-icon.png" 
                  alt="Chrome Extension" 
                  width={24} 
                  height={24}
                  className="mr-2"
                />
                <span className="text-sm font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>Available in the Chrome Extension Store</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Scan & Solve All Subjects
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                Simply take a picture and get an answer instantly.
              </p>
              
              <div className="flex items-center mb-6">
                <div className="flex mr-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-medium">4.8</span>
                <span className="mx-2 text-gray-500">•</span>
                <span className="text-sm text-gray-600">on the App Store</span>
              </div>
              
              <div className="mb-8">
                <div className="text-2xl font-bold text-blue-600">20,000,000+</div>
                <div className="text-sm text-gray-600">questions answered</div>
              </div>
              
              <Link 
                href="/mobile-app"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Learn more
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            
            <div className="md:w-1/2 order-1 md:order-2 relative">
              <Image 
                src="https://storage.googleapis.com/msgsndr/stBxTs2j8T3pmc3ZL1WH/media/67f20bbdf10fee442fb3ae0c.png" 
                alt="StudyLens AI Mobile App" 
                width={500} 
                height={600}
                className="relative z-10 mx-auto"
                style={{ marginBottom: "-80px" }}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Study Chat Feature */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Study Chat for all your curricular needs
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-12">
            The #1 voted AI homework helper for students at any academic level. Breaks down math and complex subjects better than any chatbot.
          </p>
          
          <Link 
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-colors"
          >
            Explore Now
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
          
          <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-100 p-6 rounded-xl text-left shadow-lg" style={{ boxShadow: '0 0 20px 0 rgba(0,0,0,0.1)' }}>
              <div className="mb-4">
                <Sparkles className="h-10 w-10 p-2 bg-purple-100 text-purple-600 rounded-full" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Perfect Essays in a Click</h3>
              <p className="text-gray-700">
                Activate the AI Homework Helper's Essay Mode to generate essays in seconds. Create A+ essays instantly, with expert touch, smart suggestions, and perfect readability.
              </p>
            </div>
            
            <div className="bg-gray-100 p-6 rounded-xl text-left shadow-lg" style={{ boxShadow: '0 0 20px 0 rgba(0,0,0,0.1)' }}>
              <div className="mb-4">
                <Code className="h-10 w-10 p-2 bg-blue-100 text-blue-600 rounded-full" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Write, Run, Debug—All in One</h3>
              <p className="text-gray-700">
                Use the AI Homework Helper's Code Generator to create, run, and debug code. Instantly generate code, run it, and improve it with comments and logs.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* AI Tools Features */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            The last AI tools you'll ever need
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg" style={{ boxShadow: '0 0 20px 0 rgba(0,0,0,0.1)' }}>
              <div className="mb-4">
                <Shield className="h-10 w-10 p-2 bg-green-100 text-green-600 rounded-full" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Don't Get Caught</h3>
              <p className="text-gray-700">
                Our software prevents websites from detecting our AI-powered quiz extension for private academic assistance.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg" style={{ boxShadow: '0 0 20px 0 rgba(0,0,0,0.1)' }}>
              <div className="mb-4">
                <Zap className="h-10 w-10 p-2 bg-yellow-100 text-yellow-600 rounded-full" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Get step by step explanations</h3>
              <p className="text-gray-700">
                Reinforce your learning with detailed, step-by-step guidance for each question to build true understanding.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg" style={{ boxShadow: '0 0 20px 0 rgba(0,0,0,0.1)' }}>
              <div className="mb-4">
                <Brain className="h-10 w-10 p-2 bg-blue-100 text-blue-600 rounded-full" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Reliable Answer Accuracy</h3>
              <p className="text-gray-700">
                Backed by the latest generation of AI and custom trained models to bring near perfect answers to your questions.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center mb-12 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Trusted by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Thousands of</span> students worldwide
            </h2>
            
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
                <ChevronRight className="h-5 w-5 rotate-180" />
              </button>
              <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div key={index} className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg" style={{ boxShadow: '0 0 20px 0 rgba(0,0,0,0.1)' }}>
                <div className="flex items-center mb-4">
                  <Image 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    width={48} 
                    height={48}
                    className="rounded-full mr-3"
                  />
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <span className="mr-1">{testimonial.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-3">{testimonial.review}</p>
                
                <div className="text-sm text-gray-500 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{testimonial.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing */}
      <section id="pricing" className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Choose the Perfect Plan for You
          </h2>
          <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
            {/* Free Forever Plan */}
            <div className="flex-1 max-w-lg mx-auto md:mx-0 text-center p-8 rounded-2xl bg-white/10 backdrop-blur-sm shadow-lg" style={{ boxShadow: '0 0 30px 0 rgba(0,0,0,0.15)' }}>
              <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                <Timer className="h-4 w-4 inline-block mr-1" />
                No Credit Card Required
              </div>
              
              <h2 className="text-3xl font-bold mb-6">
                Free Forever
              </h2>
              <p className="text-xl mb-4">
                Basic access
              </p>
              
              <div className="bg-white/20 p-4 rounded-lg mb-8 shadow-lg" style={{ boxShadow: '0 0 15px 0 rgba(0,0,0,0.1)' }}>
                <p className="text-sm mb-2">Perfect for occasional help with homework</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold">$0</span>
                  <span>/month</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-8 text-left">
                <FeatureCheck text="5 generations per week" />
                <FeatureCheck text="Basic question answering" />
                <FeatureCheck text="Access to web app" />
                <FeatureCheck text="Works on multiple devices" />
                <div className="flex items-start opacity-50">
                  <Check className="h-5 w-5 text-white mr-2 flex-shrink-0 mt-0.5" />
                  <span>Deep research (Pro only)</span>
                </div>
                <div className="flex items-start opacity-50">
                  <Check className="h-5 w-5 text-white mr-2 flex-shrink-0 mt-0.5" />
                  <span>Custom curriculum knowledge (Pro only)</span>
                </div>
              </div>
              
              <button 
                onClick={handleGetStarted}
                className="w-full py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors mb-3"
              >
                Sign Up Free
              </button>
              
              <p className="text-sm text-white/80">
                No credit card required
              </p>
            </div>

            {/* 3 Day Free Trial */}
            <div className="flex-1 max-w-lg mx-auto md:mx-0 text-center p-8 rounded-2xl bg-white/10 backdrop-blur-sm shadow-lg" style={{ boxShadow: '0 0 30px 0 rgba(0,0,0,0.15)' }}>
              <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                <Clock className="h-4 w-4 inline-block mr-1" />
                Offer valid until April 20th, 2025
              </div>
              
              <h2 className="text-3xl font-bold mb-6">
                3 days FREE
              </h2>
              <p className="text-xl mb-4">
                Unlimited access
              </p>
              
              <div className="bg-white/20 p-4 rounded-lg mb-8 shadow-lg" style={{ boxShadow: '0 0 15px 0 rgba(0,0,0,0.1)' }}>
                <p className="text-sm mb-2">Lock in your special price of $9.95/month before it increases to $14.95/month after April 20, 2025</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg line-through opacity-70">$14.95</span>
                  <span className="text-3xl font-bold">$9.95</span>
                  <span>/month</span>
                </div>
              </div>
              
              {/* Countdown Timer moved below price box */}
              <div className="flex justify-center gap-4 mb-8">
                <div className="bg-white/10 rounded-lg p-3 w-16 text-center shadow-lg" style={{ boxShadow: '0 0 15px 0 rgba(0,0,0,0.1)' }}>
                  <div className="text-2xl font-bold">{timeLeft.days}</div>
                  <div className="text-xs">Days</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 w-16 text-center shadow-lg" style={{ boxShadow: '0 0 15px 0 rgba(0,0,0,0.1)' }}>
                  <div className="text-2xl font-bold">{timeLeft.hours}</div>
                  <div className="text-xs">Hours</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 w-16 text-center shadow-lg" style={{ boxShadow: '0 0 15px 0 rgba(0,0,0,0.1)' }}>
                  <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                  <div className="text-xs">Minutes</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 w-16 text-center shadow-lg" style={{ boxShadow: '0 0 15px 0 rgba(0,0,0,0.1)' }}>
                  <div className="text-2xl font-bold">{timeLeft.seconds}</div>
                  <div className="text-xs">Seconds</div>
                </div>
              </div>
              
              <div className="space-y-3 mb-8 text-left">
                <FeatureCheck text="Solve unlimited questions" />
                <FeatureCheck text="Auto-selects the correct answer" />
                <FeatureCheck text="Works anywhere" />
                <FeatureCheck text="Undetected by universities" />
                <FeatureCheck text="Accurate step-by-step solutions" />
                <FeatureCheck text="Works on graph & image questions" />
              </div>
              
              <button 
                onClick={handleGetStarted}
                className="w-full py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors mb-3"
              >
                Get Started Free
              </button>
              
              <p className="text-sm text-white/80">
                Cancel anytime | Renews at $9.95/month
              </p>
              
              <div className="flex justify-center gap-2 mt-6">
                <Image src="/images/payment/visa.png" alt="Visa" width={32} height={20} />
                <Image src="/images/payment/mastercard.png" alt="Mastercard" width={32} height={20} />
                <Image src="/images/payment/amex.png" alt="American Express" width={32} height={20} />
                <Image src="/images/payment/discover.png" alt="Discover" width={32} height={20} />
                <Image src="/images/payment/paypal.png" alt="PayPal" width={32} height={20} />
                <Image src="/images/payment/applepay.png" alt="Apple Pay" width={32} height={20} />
                <Image src="/images/payment/gpay.png" alt="Google Pay" width={32} height={20} />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto shadow-lg rounded-xl overflow-hidden" style={{ boxShadow: '0 0 20px 0 rgba(0,0,0,0.1)' }}>
            {faqs.map((faq, index) => (
              <FaqItem 
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 rounded-2xl shadow-xl" style={{ boxShadow: '0 0 30px 0 rgba(0,0,0,0.15)' }}>
            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <h2 className="text-3xl font-bold mb-6">
              Ready to fast-track your homework?
            </h2>
            <p className="text-xl mb-8">
              Save hours on homework and never worry about exams ever again.
            </p>
            <button
              onClick={handleGetStarted}
              className="px-10 py-3 bg-white text-blue-600 rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center mb-4">
                <Image 
                  src="https://storage.googleapis.com/msgsndr/stBxTs2j8T3pmc3ZL1WH/media/67f1dac9f10fee532eb38351.png" 
                  alt="StudyLens AI" 
                  width={45} 
                  height={45} 
                  className="mr-2" 
                />
                <div>
                  <div className="font-bold text-xl">StudyLens AI</div>
                  <div className="text-sm text-gray-400">Instant, Expert Homework Help.</div>
                </div>
              </div>
              <div className="flex gap-4 mb-6">
                <button 
                  onClick={handleGetStarted}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-colors"
                >
                  Get Started - It's Free
                </button>
              </div>
              <div className="flex gap-4">
                <Image src="/images/chrome-store-badge.png" alt="Chrome Web Store" width={120} height={40} />
                <Image src="/images/app-store-badge.png" alt="App Store" width={120} height={40} />
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</Link></li>
                <li><Link href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/help-center" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link></li>
                <li><Link href="/signup" className="text-gray-400 hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/acceptable-use" className="text-gray-400 hover:text-white transition-colors">Acceptable Use</Link></li>
                <li><Link href="/academic-honesty" className="text-gray-400 hover:text-white transition-colors">Academic Honesty</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="text-center text-gray-500 text-sm">
            <p>Copyright © {new Date().getFullYear()}, StudyLens AI</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCheck({ text }: { text: string }) {
  return (
    <div className="flex items-start">
      <Check className="h-5 w-5 text-white mr-2 flex-shrink-0 mt-0.5" />
      <span>{text}</span>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left font-medium text-lg px-6"
      >
        {question}
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''} ml-4 flex-shrink-0`} />
      </button>
      {isOpen && (
        <div className="mt-3 text-gray-600 px-6">
          {answer}
        </div>
      )}
    </div>
  );
}
