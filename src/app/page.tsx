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
      
      {/* Basic header */}
      <header className="py-4 sticky top-0 z-50 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center bg-white rounded-2xl py-3 px-6 shadow-lg">
            <div className="flex items-center">
              <h1 className="font-bold text-xl">StudyLens AI</h1>
            </div>
            <div>
              <button onClick={handleGetStarted} className="bg-blue-600 text-white px-4 py-2 rounded-xl">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Basic hero section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Instant, Expert AI Homework Helper</h1>
          <p className="text-lg mb-8">Get instant, accurate answers and step-by-step explanations for all your homework questions.</p>
          <button onClick={handleGetStarted} className="bg-blue-600 text-white px-6 py-3 rounded-xl">
            Get Started Free
          </button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p>Copyright © {new Date().getFullYear()}, StudyLens AI</p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCheck({ text }: { text: string }) {
  return (
    <div className="flex items-center">
      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
      <span className="text-gray-700">{text}</span>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="py-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left font-medium text-lg px-6"
      >
        {question}
        <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="mt-3 px-6 text-gray-600">
          {answer}
        </div>
      )}
    </div>
  );
}
