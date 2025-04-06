"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

export default function Library() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("summaries");

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If not loading and user is not authenticated, this will render briefly before redirect
  if (!user) {
    return null;
  }

  const libraryItems = {
    summaries: [
      {
        id: 1,
        title: "Introduction to Neural Networks",
        date: "Aug 15, 2023",
        description: "A comprehensive summary of neural network architecture and applications.",
        tags: ["AI", "Machine Learning"]
      },
      {
        id: 2,
        title: "Modern Physics Concepts",
        date: "Aug 14, 2023",
        description: "Summary of quantum mechanics and relativity theory fundamentals.",
        tags: ["Physics", "Science"]
      },
      {
        id: 3,
        title: "Machine Learning Fundamentals",
        date: "Aug 10, 2023",
        description: "Overview of core machine learning algorithms and applications.",
        tags: ["AI", "Data Science"]
      }
    ],
    flashcards: [
      {
        id: 1,
        title: "Biology 101 Flashcards",
        date: "Aug 13, 2023",
        cardCount: 20,
        description: "Key concepts from introductory biology course.",
        tags: ["Biology", "Science"]
      },
      {
        id: 2,
        title: "Spanish Vocabulary",
        date: "Aug 8, 2023",
        cardCount: 50,
        description: "Essential Spanish vocabulary for beginners.",
        tags: ["Spanish", "Language"]
      }
    ],
    quizzes: [
      {
        id: 1,
        title: "Data Structures Quiz",
        date: "Aug 12, 2023",
        questionCount: 15,
        description: "Test your knowledge of basic data structures and algorithms.",
        tags: ["Computer Science", "Programming"]
      },
      {
        id: 2,
        title: "World History Quiz",
        date: "Aug 5, 2023",
        questionCount: 10,
        description: "Questions covering major historical events from 1900-2000.",
        tags: ["History", "Education"]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Study Library</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex -mb-px">
              <button
                className={`py-4 px-6 text-center border-b-2 text-sm font-medium ${
                  activeTab === "summaries"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("summaries")}
              >
                Summaries
              </button>
              <button
                className={`py-4 px-6 text-center border-b-2 text-sm font-medium ${
                  activeTab === "flashcards"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("flashcards")}
              >
                Flashcards
              </button>
              <button
                className={`py-4 px-6 text-center border-b-2 text-sm font-medium ${
                  activeTab === "quizzes"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("quizzes")}
              >
                Quizzes
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Search and Filter Bar */}
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="Search library..."
                  className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                />
                <div className="absolute right-3 top-2.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              <div className="flex gap-2">
                <select className="border rounded-md px-3 py-2 text-gray-700 bg-white">
                  <option>Sort by Date</option>
                  <option>Sort by Name</option>
                  <option>Sort by Tags</option>
                </select>
                
                <button className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create New
                </button>
              </div>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeTab === "summaries" &&
                libraryItems.summaries.map(item => (
                  <div key={item.id} className="border rounded-lg hover:shadow-md transition-shadow">
                    <div className="p-5">
                      <h3 className="text-lg font-semibold mb-2 text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500 mb-3">{item.date}</p>
                      <p className="text-gray-700 mb-4">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map(tag => (
                          <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3 flex justify-between items-center border-t">
                      <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
                        View Summary
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}

              {activeTab === "flashcards" &&
                libraryItems.flashcards.map(item => (
                  <div key={item.id} className="border rounded-lg hover:shadow-md transition-shadow">
                    <div className="p-5">
                      <h3 className="text-lg font-semibold mb-2 text-gray-900">{item.title}</h3>
                      <div className="flex items-center mb-3">
                        <p className="text-sm text-gray-500">{item.date}</p>
                        <span className="mx-2 text-gray-300">•</span>
                        <p className="text-sm text-gray-500">{item.cardCount} cards</p>
                      </div>
                      <p className="text-gray-700 mb-4">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map(tag => (
                          <span key={tag} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3 flex justify-between items-center border-t">
                      <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
                        Review Cards
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}

              {activeTab === "quizzes" &&
                libraryItems.quizzes.map(item => (
                  <div key={item.id} className="border rounded-lg hover:shadow-md transition-shadow">
                    <div className="p-5">
                      <h3 className="text-lg font-semibold mb-2 text-gray-900">{item.title}</h3>
                      <div className="flex items-center mb-3">
                        <p className="text-sm text-gray-500">{item.date}</p>
                        <span className="mx-2 text-gray-300">•</span>
                        <p className="text-sm text-gray-500">{item.questionCount} questions</p>
                      </div>
                      <p className="text-gray-700 mb-4">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map(tag => (
                          <span key={tag} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3 flex justify-between items-center border-t">
                      <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
                        Take Quiz
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            {/* Empty State for each tab */}
            {activeTab === "summaries" && libraryItems.summaries.length === 0 && (
              <div className="text-center py-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No summaries yet</h3>
                <p className="text-gray-500 mb-4">Get started by summarizing a document or web page</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Create Your First Summary
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 