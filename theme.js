document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // 1. Check if the user already chose dark mode in the past
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerText = '☀️ Light Mode';
    }

    // 2. Listen for clicks on the button
    themeToggle.addEventListener('click', () => {
        // Toggle the class on and off
        body.classList.toggle('dark-mode');
        
        // 3. Save the choice to local storage and change the button text
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerText = '☀️ Light Mode';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerText = '🌙 Dark Mode';
        }
    });
});