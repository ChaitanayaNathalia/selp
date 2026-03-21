document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // 1. Check if the user already chose dark mode
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerText = 'Light Mode';
    }

    // 2. Listen for clicks
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // 3. Save choice and update text WITHOUT emojis
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerText = 'Light Mode';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerText = 'Dark Mode';
        }
    });
});