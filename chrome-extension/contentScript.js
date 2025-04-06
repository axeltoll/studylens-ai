// Content script for InsightLens AI Chrome Extension

// Create and inject the floating action button
function createFloatingButton() {
  // Check if button already exists
  if (document.getElementById('insightlens-fab')) {
    return;
  }
  
  // Create floating button element
  const floatingButton = document.createElement('div');
  floatingButton.id = 'insightlens-fab';
  floatingButton.className = 'insightlens-fab';
  floatingButton.innerHTML = `
    <div class="insightlens-fab-icon">IL</div>
    <div class="insightlens-tooltip">InsightLens AI</div>
  `;
  
  // Create menu container
  const menuContainer = document.createElement('div');
  menuContainer.id = 'insightlens-menu';
  menuContainer.className = 'insightlens-menu';
  menuContainer.innerHTML = `
    <div class="insightlens-menu-header">
      <div class="insightlens-logo-sm">IL</div>
      <span>InsightLens AI</span>
    </div>
    <div class="insightlens-menu-items">
      <button class="insightlens-menu-item" data-action="summarize">
        <span class="insightlens-menu-icon">📝</span>
        <span>Summarize Page</span>
      </button>
      <button class="insightlens-menu-item" data-action="qna">
        <span class="insightlens-menu-icon">❓</span>
        <span>Ask Question</span>
      </button>
      <button class="insightlens-menu-item" data-action="flashcards">
        <span class="insightlens-menu-icon">🗂️</span>
        <span>Generate Flashcards</span>
      </button>
      <button class="insightlens-menu-item" data-action="quiz">
        <span class="insightlens-menu-icon">📊</span>
        <span>Create Quiz</span>
      </button>
    </div>
  `;
  
  // Append elements to document
  document.body.appendChild(floatingButton);
  document.body.appendChild(menuContainer);
  
  // Add event listeners
  floatingButton.addEventListener('click', toggleMenu);
  
  document.querySelectorAll('.insightlens-menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const action = e.currentTarget.getAttribute('data-action');
      handleAction(action);
      toggleMenu();
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    const menu = document.getElementById('insightlens-menu');
    const fab = document.getElementById('insightlens-fab');
    
    if (menu && menu.classList.contains('active') && 
        !menu.contains(e.target) && 
        !fab.contains(e.target)) {
      toggleMenu();
    }
  });
  
  // Add styles
  const styles = document.createElement('style');
  styles.textContent = `
    .insightlens-fab {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      z-index: 9999;
      font-family: Arial, sans-serif;
      transition: all 0.3s ease;
    }
    
    .insightlens-fab:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    }
    
    .insightlens-fab-icon {
      font-weight: bold;
      font-size: 16px;
    }
    
    .insightlens-tooltip {
      position: absolute;
      right: 60px;
      background-color: #1f2937;
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .insightlens-fab:hover .insightlens-tooltip {
      opacity: 1;
    }
    
    .insightlens-menu {
      position: fixed;
      bottom: 80px;
      right: 20px;
      width: 280px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      z-index: 9999;
      font-family: Arial, sans-serif;
      display: none;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.3s ease;
    }
    
    .insightlens-menu.active {
      display: block;
      opacity: 1;
      transform: translateY(0);
    }
    
    .insightlens-menu-header {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      background-color: #f9fafb;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .insightlens-logo-sm {
      width: 24px;
      height: 24px;
      background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 12px;
      margin-right: 8px;
    }
    
    .insightlens-menu-items {
      padding: 8px 0;
    }
    
    .insightlens-menu-item {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 10px 16px;
      background: none;
      border: none;
      text-align: left;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .insightlens-menu-item:hover {
      background-color: #f3f4f6;
    }
    
    .insightlens-menu-icon {
      margin-right: 12px;
      font-size: 16px;
    }
    
    .insightlens-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
    }
    
    .insightlens-modal-content {
      background-color: white;
      border-radius: 8px;
      width: 600px;
      max-width: 90vw;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }
    
    .insightlens-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .insightlens-modal-title {
      font-size: 18px;
      font-weight: 600;
    }
    
    .insightlens-modal-close {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 20px;
    }
    
    .insightlens-modal-body {
      padding: 16px;
    }
    
    .insightlens-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
    }
    
    .insightlens-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(59, 130, 246, 0.1);
      border-radius: 50%;
      border-top-color: #3b82f6;
      animation: spin 1s linear infinite;
      margin-bottom: 16px;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  
  document.head.appendChild(styles);
}

// Toggle menu visibility
function toggleMenu() {
  const menu = document.getElementById('insightlens-menu');
  menu.classList.toggle('active');
}

// Handle menu item click
function handleAction(action) {
  // Get selected text or page content
  const selectedText = window.getSelection().toString();
  const content = selectedText || document.body.innerText;
  
  // Create modal for displaying results
  showModal(action, content);
}

// Create and show modal
function showModal(action, content) {
  // Create modal elements
  const modal = document.createElement('div');
  modal.className = 'insightlens-modal';
  
  let title = '';
  switch(action) {
    case 'summarize': title = 'Summary'; break;
    case 'qna': title = 'Ask a Question'; break;
    case 'flashcards': title = 'Flashcards'; break;
    case 'quiz': title = 'Quiz'; break;
    default: title = 'InsightLens AI';
  }
  
  modal.innerHTML = `
    <div class="insightlens-modal-content">
      <div class="insightlens-modal-header">
        <h3 class="insightlens-modal-title">${title}</h3>
        <button class="insightlens-modal-close">&times;</button>
      </div>
      <div class="insightlens-modal-body">
        <div class="insightlens-loading">
          <div class="insightlens-spinner"></div>
          <p>Processing content with AI...</p>
        </div>
      </div>
    </div>
  `;
  
  // Add to document
  document.body.appendChild(modal);
  
  // Event listener for close button
  const closeButton = modal.querySelector('.insightlens-modal-close');
  closeButton.addEventListener('click', () => {
    document.body.removeChild(modal);
  });
  
  // Close when clicking outside modal content
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
  
  // Process the content
  processContent(action, content)
    .then(result => {
      const modalBody = modal.querySelector('.insightlens-modal-body');
      modalBody.innerHTML = renderResult(action, result);
      
      // Add event listeners for the rendered content
      if (action === 'qna') {
        const askButton = modalBody.querySelector('#insightlens-ask-btn');
        if (askButton) {
          askButton.addEventListener('click', () => {
            const question = modalBody.querySelector('#insightlens-question-input').value;
            if (question) {
              askQuestion(question, content, modalBody);
            }
          });
        }
      }
    })
    .catch(error => {
      const modalBody = modal.querySelector('.insightlens-modal-body');
      modalBody.innerHTML = `
        <div style="text-align: center; padding: 20px;">
          <p style="color: #ef4444; margin-bottom: 16px;">Error: ${error.message || 'Something went wrong'}</p>
          <button id="insightlens-retry-btn" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">Try Again</button>
        </div>
      `;
      
      const retryButton = modalBody.querySelector('#insightlens-retry-btn');
      retryButton.addEventListener('click', () => {
        document.body.removeChild(modal);
        showModal(action, content);
      });
    });
}

// Process content with InsightLens AI (simulated)
async function processContent(action, content) {
  // In a real implementation, this would call your backend API
  // For now, we'll simulate a delayed response
  return new Promise((resolve) => {
    setTimeout(() => {
      switch(action) {
        case 'summarize':
          resolve({
            summary: "This is a simulated summary of the content. In a real implementation, this would be an AI-generated summary of the page content or selected text."
          });
          break;
        case 'qna':
          resolve({
            message: "What would you like to know about this content?"
          });
          break;
        case 'flashcards':
          resolve({
            flashcards: [
              { front: "Key Term 1", back: "Definition 1" },
              { front: "Key Term 2", back: "Definition 2" },
              { front: "Key Term 3", back: "Definition 3" }
            ]
          });
          break;
        case 'quiz':
          resolve({
            questions: [
              {
                question: "Sample question about the content?",
                options: ["Option A", "Option B", "Option C", "Option D"],
                answer: 2
              },
              {
                question: "Another sample question?",
                options: ["Option A", "Option B", "Option C", "Option D"],
                answer: 0
              }
            ]
          });
          break;
        default:
          resolve({ message: "Feature not implemented yet" });
      }
    }, 2000);
  });
}

// Render result in modal based on action
function renderResult(action, result) {
  switch(action) {
    case 'summarize':
      return `
        <div style="padding: 16px;">
          <h4 style="margin-bottom: 12px; font-size: 16px; font-weight: 600;">Summary</h4>
          <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
            <p>${result.summary}</p>
          </div>
          <div style="display: flex; gap: 8px; justify-content: flex-end;">
            <button style="padding: 8px 16px; background-color: white; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">Copy</button>
            <button style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">Save</button>
          </div>
        </div>
      `;
      
    case 'qna':
      return `
        <div style="padding: 16px;">
          <div style="margin-bottom: 16px;">
            <input id="insightlens-question-input" type="text" placeholder="Type your question here..." style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 4px; margin-bottom: 8px;">
            <button id="insightlens-ask-btn" style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">Ask</button>
          </div>
          <div id="insightlens-answers-container" style="background-color: #f9fafb; padding: 16px; border-radius: 8px;">
            <p style="color: #6b7280;">${result.message}</p>
          </div>
        </div>
      `;
      
    case 'flashcards':
      return `
        <div style="padding: 16px;">
          <h4 style="margin-bottom: 12px; font-size: 16px; font-weight: 600;">Generated Flashcards</h4>
          <p style="margin-bottom: 16px; color: #6b7280;">Click on a card to see its answer.</p>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; margin-bottom: 16px;">
            ${result.flashcards.map((card, index) => `
              <div class="insightlens-flashcard" style="height: 160px; perspective: 1000px; cursor: pointer;" onclick="this.querySelector('.insightlens-flashcard-inner').style.transform = this.querySelector('.insightlens-flashcard-inner').style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)'">
                <div class="insightlens-flashcard-inner" style="position: relative; width: 100%; height: 100%; text-align: center; transition: transform 0.6s; transform-style: preserve-3d;">
                  <div class="insightlens-flashcard-front" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; display: flex; align-items: center; justify-content: center; padding: 16px;">
                    <p style="font-weight: 500;">${card.front}</p>
                  </div>
                  <div class="insightlens-flashcard-back" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; background-color: #eff6ff; border: 1px solid #dbeafe; border-radius: 8px; display: flex; align-items: center; justify-content: center; padding: 16px; transform: rotateY(180deg);">
                    <p>${card.back}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          <div style="display: flex; gap: 8px; justify-content: flex-end;">
            <button style="padding: 8px 16px; background-color: white; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">Download</button>
            <button style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">Save to Library</button>
          </div>
        </div>
      `;
      
    case 'quiz':
      return `
        <div style="padding: 16px;">
          <h4 style="margin-bottom: 12px; font-size: 16px; font-weight: 600;">Generated Quiz</h4>
          <div style="margin-bottom: 24px;">
            ${result.questions.map((q, qIndex) => `
              <div style="margin-bottom: 20px; background-color: #f9fafb; padding: 16px; border-radius: 8px;">
                <p style="font-weight: 500; margin-bottom: 12px;">${qIndex + 1}. ${q.question}</p>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${q.options.map((option, oIndex) => `
                    <label style="display: flex; align-items: center; gap: 8px; padding: 8px; border: 1px solid ${oIndex === q.answer ? '#bfdbfe' : '#e5e7eb'}; border-radius: 4px; background-color: ${oIndex === q.answer ? '#eff6ff' : 'white'}; cursor: pointer;">
                      <input type="radio" name="question-${qIndex}" value="${oIndex}" ${oIndex === q.answer ? 'checked' : ''}>
                      <span>${option}</span>
                    </label>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
          <div style="display: flex; gap: 8px; justify-content: flex-end;">
            <button style="padding: 8px 16px; background-color: white; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer;">Download</button>
            <button style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">Save to Library</button>
          </div>
        </div>
      `;
      
    default:
      return `<p style="padding: 16px; text-align: center;">${result.message || 'Feature not available'}</p>`;
  }
}

// Handle asking a question (simulated)
function askQuestion(question, context, modalBody) {
  // Show loading state
  const answersContainer = modalBody.querySelector('#insightlens-answers-container');
  answersContainer.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; padding: 20px;">
      <div class="insightlens-spinner" style="width: 24px; height: 24px; border: 3px solid rgba(59, 130, 246, 0.1); border-radius: 50%; border-top-color: #3b82f6; animation: spin 1s linear infinite; margin-right: 12px;"></div>
      <p>Generating answer...</p>
    </div>
  `;
  
  // Simulate AI response
  setTimeout(() => {
    answersContainer.innerHTML = `
      <div style="margin-bottom: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 16px;">
        <p style="font-weight: 500; margin-bottom: 8px;">Q: ${question}</p>
        <p>A: This is a simulated answer to your question. In a real implementation, this would be an AI-generated response based on the content of the page or selected text.</p>
      </div>
      <p style="color: #6b7280;">Ask another question above.</p>
    `;
  }, 2000);
}

// Initialize extension
createFloatingButton(); 