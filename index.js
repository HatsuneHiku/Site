// Theme Switching
function initTheme() {
    const themeSelect = document.getElementById('theme-select');
    const themeLink = document.getElementById('theme-link');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply saved theme
    applyTheme(savedTheme, themeLink);
    themeSelect.value = savedTheme;
    
    // Listen for theme changes
    themeSelect.addEventListener('change', function() {
        applyTheme(this.value, themeLink);
        localStorage.setItem('theme', this.value);
    });
}

function applyTheme(theme, themeLink) {
    themeLink.href = `themes/${theme}.css`;
}

// Add interactive hover effects
document.querySelectorAll('.tag, .genre-tag, .game-item, .social-link').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Status update animation
const statusBoxes = document.querySelectorAll('.status-box');
statusBoxes.forEach((box, index) => {
    box.style.animation = `fadeIn 0.5s ease-in-out ${index * 0.1}s`;
});

// Watch items animation
const watchItems = document.querySelectorAll('.watch-item');
watchItems.forEach((item, index) => {
    item.style.animation = `fadeIn 0.5s ease-in-out ${index * 0.1}s`;
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize theme on page load
window.addEventListener('DOMContentLoaded', initTheme);
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
} else {
    initTheme();
}