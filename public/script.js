// Antar Anonymous Letters JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize character counter
    const textarea = document.getElementById('letterContent');
    const charCount = document.getElementById('charCount');
    const sendButton = document.getElementById('sendButton');
    
    // Update character count
    textarea.addEventListener('input', function() {
        const count = this.value.length;
        charCount.textContent = `${count}/1000`;
        
        if (count > 1000) {
            charCount.style.color = '#e53e3e';
        } else if (count > 900) {
            charCount.style.color = '#d69e2e';
        } else {
            charCount.style.color = '#718096';
        }
        
        sendButton.disabled = count === 0 || count > 1000;
    });
    
    // Load letters on page load
    loadLetters();
});

async function sendLetter() {
    const content = document.getElementById('letterContent').value.trim();
    const sendButton = document.getElementById('sendButton');
    
    if (!content) {
        alert('Please write something in your letter before sending.');
        return;
    }
    
    if (content.length > 1000) {
        alert('Your letter is too long. Please keep it under 1000 characters.');
        return;
    }
    
    // Disable button and show loading state
    sendButton.disabled = true;
    sendButton.textContent = 'Sending... ✉️';
    
    try {
        const response = await fetch('/api/letters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content })
        });
        
        if (response.ok) {
            // Clear the textarea
            document.getElementById('letterContent').value = '';
            document.getElementById('charCount').textContent = '0/1000';
            
            // Show success message
            showSuccessMessage();
            
            // Reload letters to show the new one
            await loadLetters();
        } else {
            const error = await response.json();
            alert('Error sending letter: ' + (error.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error sending letter:', error);
        alert('Error sending letter. Please check your connection and try again.');
    } finally {
        // Re-enable button
        sendButton.disabled = false;
        sendButton.textContent = 'Send Letter 📮';
    }
}

async function loadLetters() {
    const container = document.getElementById('lettersContainer');
    const refreshButton = document.getElementById('refreshButton');
    
    // Show loading state
    container.innerHTML = '<div class="loading">Loading letters...</div>';
    refreshButton.disabled = true;
    refreshButton.textContent = 'Loading... ⏳';
    
    try {
        const response = await fetch('/api/letters');
        
        if (response.ok) {
            const letters = await response.json();
            displayLetters(letters);
        } else {
            container.innerHTML = '<div class="loading">Error loading letters. Please try again.</div>';
        }
    } catch (error) {
        console.error('Error loading letters:', error);
        container.innerHTML = '<div class="loading">Error loading letters. Please check your connection.</div>';
    } finally {
        refreshButton.disabled = false;
        refreshButton.textContent = 'Refresh Letters 🔄';
    }
}

function displayLetters(letters) {
    const container = document.getElementById('lettersContainer');
    
    if (letters.length === 0) {
        container.innerHTML = '<div class="no-letters">No letters yet. Be the first to share your thoughts! 💭</div>';
        return;
    }
    
    // Sort letters by timestamp (newest first)
    letters.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    const letterElements = letters.map(letter => {
        const timestamp = new Date(letter.timestamp);
        const timeString = timestamp.toLocaleDateString() + ' at ' + timestamp.toLocaleTimeString();
        
        return `
            <div class="letter">
                <div class="letter-content">${escapeHtml(letter.content)}</div>
                <div class="letter-timestamp">${timeString}</div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = letterElements;
}

function showSuccessMessage() {
    const sendButton = document.getElementById('sendButton');
    sendButton.classList.add('success-animation');
    
    // Create temporary success message
    const successMsg = document.createElement('div');
    successMsg.textContent = '✅ Letter sent anonymously!';
    successMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #48bb78;
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        font-size: 1.1rem;
        z-index: 1000;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(successMsg);
    
    // Remove success message and animation after 2 seconds
    setTimeout(() => {
        document.body.removeChild(successMsg);
        sendButton.classList.remove('success-animation');
    }, 2000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}