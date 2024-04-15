document.addEventListener('DOMContentLoaded', (event) => {
    const notepad = document.getElementById('notepad');

    // Load saved data from localStorage
    notepad.value = localStorage.getItem('notepadContent') || 'Start typing!\n\nContent will persist automatically, even after closing your browser (as long as you don\'t clear your brower\'s history)';
    
    // Auto-save content to localStorage whenever it changes
    notepad.addEventListener('input', () => {
        localStorage.setItem('notepadContent', notepad.value);      
    });

    // Update content if localStorage is changed by another tab
    window.addEventListener('storage', (event) => {
        if (event.key === 'notepadContent') {
            notepad.value = event.newValue;
        }
    });

    notepad.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            var start = this.selectionStart;
            var end = this.selectionEnd;
            
            // Define the number of spaces for a tab (e.g., 4 spaces)
            var tab = "    "; // 4 non-breaking spaces

            // Set textarea value to: text before caret + tab + text after caret
            this.value = this.value.substring(0, start) + tab + this.value.substring(end);

            // Move caret to right after the inserted tab
            this.selectionStart = this.selectionEnd = start + tab.length;
        }
    });

    // Automatically focus the textarea when the page loads
    notepad.focus();
});