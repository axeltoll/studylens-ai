"use client";

import { useState, useRef } from "react";
import { 
  Search, 
  Upload, 
  FileText, 
  Paperclip, 
  Send, 
  Bot, 
  Mic, 
  Link as LinkIcon, 
  BookOpen, 
  X, 
  ChevronRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useUsage } from "@/lib/hooks/useUsage";

export default function DeepResearchPage() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; type: string; size: string }[]>([]);
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);
  const { isProUser } = useUsage();
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  
  // This would be connected to the Deepgram API in a real implementation
  const startRecording = () => {
    setIsRecording(true);
    // In a real app, this would start recording audio
    setTimeout(() => {
      setIsRecording(false);
      setTranscription("This is a sample transcription of audio that would be processed through Deepgram's API to convert speech to text accurately. The actual implementation would use the Web Audio API with Deepgram's real-time transcription capabilities.");
    }, 3000);
  };
  
  const stopRecording = () => {
    setIsRecording(false);
    // In a real app, this would stop recording and process the audio
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleAudioUploadClick = () => {
    audioInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files).map(file => ({
        name: file.name,
        type: file.type.split('/')[1].toUpperCase(),
        size: formatFileSize(file.size)
      }));
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };
  
  const formatFileSize = (bytes: number): string => {
    const kb = bytes / 1024;
    if (kb < 1024) {
      return `${kb.toFixed(1)} KB`;
    } else {
      return `${(kb / 1024).toFixed(1)} MB`;
    }
  };
  
  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };
  
  // This would call the Perplexity model API in a real implementation
  const handleSearch = async () => {
    if (!query.trim() && !transcription && uploadedFiles.length === 0) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Sample research results
      setSearchResults([
        {
          title: "Comprehensive Analysis on " + (query || transcription || uploadedFiles[0]?.name || "the Topic"),
          content: "This detailed analysis explores key aspects and provides in-depth insights based on multiple academic sources and recent research papers.",
          sources: [
            { name: "Research Journal A", url: "#", year: "2023" },
            { name: "Academic Database B", url: "#", year: "2022" },
            { name: "University Publication C", url: "#", year: "2023" }
          ]
        },
        {
          title: "Key Concepts and Fundamental Principles",
          content: "An exploration of the core theories and principles relevant to the query, with historical context and contemporary applications.",
          sources: [
            { name: "Educational Resource D", url: "#", year: "2021" },
            { name: "Expert Publication E", url: "#", year: "2023" }
          ]
        },
        {
          title: "Recent Developments and Future Directions",
          content: "Analysis of emerging trends, recent breakthroughs, and potential future developments in this field of study.",
          sources: [
            { name: "Conference Proceedings F", url: "#", year: "2023" },
            { name: "Industry Report G", url: "#", year: "2022" },
            { name: "Research Paper H", url: "#", year: "2023" }
          ]
        }
      ]);
      setIsLoading(false);
    }, 3000);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <BookOpen className="mr-2 h-6 w-6 text-blue-600 dark:text-blue-400" />
          AI Deep Topic Research
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Conduct comprehensive research using AI to analyze documents, transcribe audio, and generate in-depth reports with citations
        </p>
      </div>
      
      {/* Main Research Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Research Input</h2>
            
            {/* Text Query Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Research Query
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your research question or topic..."
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900 dark:text-gray-100"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleSearch}
                  disabled={isLoading}
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* File Upload Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upload Documents for Analysis
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  multiple
                />
                <button
                  onClick={handleUploadClick}
                  className="inline-flex items-center justify-center p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3"
                >
                  <Upload className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </button>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Drag and drop your files here or click to browse
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Supports PDF, DOCX, TXT (Max 25MB per file)
                </p>
              </div>
              
              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Uploaded Files ({uploadedFiles.length})
                  </p>
                  {uploadedFiles.map((file, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-3"
                    >
                      <div className="flex items-center">
                        <div className="p-2 bg-gray-200 dark:bg-gray-800 rounded-md mr-3">
                          <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{file.type} • {file.size}</p>
                        </div>
                      </div>
                      <button 
                        className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Voice Input Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Voice Input
              </label>
              <div className="flex items-center gap-4">
                <button
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                    isRecording 
                      ? "bg-red-500 text-white" 
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}
                  onClick={isRecording ? stopRecording : startRecording}
                >
                  <Mic className="h-5 w-5" />
                  <span>{isRecording ? "Stop Recording" : "Start Recording"}</span>
                </button>
                
                <div className="relative">
                  <input
                    type="file"
                    ref={audioInputRef}
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button
                    onClick={handleAudioUploadClick}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center gap-2 text-gray-800 dark:text-gray-200"
                  >
                    <Paperclip className="h-5 w-5" />
                    <span>Upload Audio</span>
                  </button>
                </div>
              </div>
              
              {/* Transcription Result */}
              {transcription && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Transcription:
                  </p>
                  <p className="text-gray-800 dark:text-gray-200 text-sm">{transcription}</p>
                  <div className="flex justify-end mt-2">
                    <button 
                      className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center"
                      onClick={() => setQuery(transcription)}
                    >
                      Use as Query
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Research Results */}
          {isLoading ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-600 dark:text-gray-300">
                  Analyzing {query ? "your query" : uploadedFiles.length > 0 ? "your documents" : "your input"}...
                </p>
                <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                  Using multiple AI models to gather comprehensive research
                </p>
              </div>
            </div>
          ) : searchResults ? (
            <div className="space-y-6">
              {searchResults.map((result, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {result.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {result.content}
                    </p>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Sources ({result.sources.length})
                      </h4>
                      {result.sources.map((source: any, sIndex: number) => (
                        <div key={sIndex} className="flex items-center">
                          <LinkIcon className="h-4 w-4 text-blue-500 mr-2" />
                          <a 
                            href={source.url} 
                            className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            {source.name} ({source.year})
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        
        {/* Right Sidebar */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Research Tools</h2>
            <div className="space-y-4">
              <button className="w-full flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-3">
                  <Bot className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">AI Research Assistant</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Ask specific questions</p>
                </div>
              </button>
              
              <button className="w-full flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
                  <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Citation Generator</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Generate formatted citations</p>
                </div>
              </button>
              
              <button className="w-full flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                  <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Export to Document</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Save research as PDF or DOCX</p>
                </div>
              </button>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-md p-6 text-white">
            <h3 className="text-lg font-bold mb-2">Pro Research Features</h3>
            <p className="text-blue-100 text-sm mb-4">
              Get access to advanced research capabilities and unlimited AI assistance.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full inline-flex items-center justify-center bg-blue-500 mr-2">
                  <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm">Unlimited research sessions</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full inline-flex items-center justify-center bg-blue-500 mr-2">
                  <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm">Access to academic journals</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full inline-flex items-center justify-center bg-blue-500 mr-2">
                  <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm">Advanced data visualization</span>
              </li>
            </ul>
            <Link 
              href="/dashboard/pro" 
              className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              {isProUser ? "Manage Subscription" : "Upgrade to Pro"}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 