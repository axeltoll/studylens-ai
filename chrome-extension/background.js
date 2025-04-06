// Set up context menu items
chrome.runtime.onInstalled.addListener(() => {
  // Create context menu items for selection
  chrome.contextMenus.create({
    id: 'insightlens',
    title: 'InsightLens AI',
    contexts: ['selection']
  });
  
  chrome.contextMenus.create({
    id: 'summarize-selection',
    parentId: 'insightlens',
    title: 'Summarize Selection',
    contexts: ['selection']
  });
  
  chrome.contextMenus.create({
    id: 'ask-question',
    parentId: 'insightlens',
    title: 'Ask a Question',
    contexts: ['selection']
  });
  
  chrome.contextMenus.create({
    id: 'generate-flashcards',
    parentId: 'insightlens',
    title: 'Generate Flashcards',
    contexts: ['selection']
  });
  
  chrome.contextMenus.create({
    id: 'create-quiz',
    parentId: 'insightlens',
    title: 'Create Quiz',
    contexts: ['selection']
  });
  
  // Set badge text to indicate app is installed
  chrome.action.setBadgeText({ text: 'AI' });
  chrome.action.setBadgeBackgroundColor({ color: '#3b82f6' });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const { menuItemId, selectionText } = info;
  
  if (!selectionText) return;
  
  // Handle different context menu actions
  switch (menuItemId) {
    case 'summarize-selection':
      processSelectedText('summarize', selectionText, tab);
      break;
    case 'ask-question':
      processSelectedText('qna', selectionText, tab);
      break;
    case 'generate-flashcards':
      processSelectedText('flashcards', selectionText, tab);
      break;
    case 'create-quiz':
      processSelectedText('quiz', selectionText, tab);
      break;
    default:
      break;
  }
});

// Process the selected text based on action
function processSelectedText(action, text, tab) {
  // Save the selection and action to storage
  chrome.storage.local.set({
    currentSelection: {
      text,
      action,
      url: tab.url,
      title: tab.title,
      timestamp: Date.now()
    }
  }, () => {
    // Open the popup with this context
    chrome.action.openPopup();
  });
}

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'AUTHENTICATE') {
    // Handle authentication message from web app
    handleAuthentication(message.data, sendResponse);
    return true; // Indicate async response
  }
  
  if (message.type === 'PROCESS_CONTENT') {
    // Process content with AI (would call backend API in real implementation)
    processWithAI(message.action, message.content)
      .then(result => sendResponse({ success: true, data: result }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Indicate async response
  }
});

// Handle user authentication from the web app
function handleAuthentication(userData, sendResponse) {
  if (!userData) {
    sendResponse({ success: false, error: 'No user data provided' });
    return;
  }
  
  // Store user info in local storage
  chrome.storage.local.set({ user: userData }, () => {
    sendResponse({ success: true });
    
    // Update badge to indicate user is logged in
    chrome.action.setBadgeText({ text: 'ON' });
    chrome.action.setBadgeBackgroundColor({ color: '#10b981' });
  });
}

// Simulate AI processing (would call backend API in real implementation)
async function processWithAI(action, content) {
  // This is a mock implementation
  // In a real app, this would call your backend API
  return new Promise((resolve) => {
    setTimeout(() => {
      switch(action) {
        case 'summarize':
          resolve({
            summary: "This is a simulated summary of the content."
          });
          break;
        case 'qna':
          resolve({
            answer: "This is a simulated answer to your question."
          });
          break;
        case 'flashcards':
          resolve({
            flashcards: [
              { front: "Key term 1", back: "Definition 1" },
              { front: "Key term 2", back: "Definition 2" }
            ]
          });
          break;
        case 'quiz':
          resolve({
            questions: [
              {
                question: "Sample question 1?",
                options: ["Option A", "Option B", "Option C", "Option D"],
                answer: 0
              },
              {
                question: "Sample question 2?",
                options: ["Option A", "Option B", "Option C", "Option D"],
                answer: 2
              }
            ]
          });
          break;
        default:
          resolve({ message: "Unknown action" });
      }
    }, 1000);
  });
} 