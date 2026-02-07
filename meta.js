// Dynamic Meta Tag Manager
// Updates Open Graph and Twitter Card meta tags with current status and activity

class MetaManager {
    constructor() {
        this.statusEmojis = {
            online: '🟢',
            idle: '⏾',
            dnd: '🔴',
            offline: '⚫'
        };
        
        this.status = localStorage.getItem('userStatus') || 'idle';
        this.currentGame = localStorage.getItem('currentGame') || null;
        this.currentMusic = localStorage.getItem('currentMusic') || null;
        
        this.updateMetaTags();
        this.setupStatusToggle();
    }
    
    updateMetaTags() {
        const description = this.buildDescription();
        
        // Update Open Graph tags
        this.setMetaTag('property', 'og:description', description);
        
        // Update Twitter Card tags
        this.setMetaTag('name', 'twitter:description', description);
        
        // Update main description
        this.setMetaTag('name', 'description', `HatsuneHiku's profile - ${description}`);
    }
    
    buildDescription() {
        const emoji = this.statusEmojis[this.status] || this.statusEmojis.idle;
        let description = `${emoji} ${this.status.charAt(0).toUpperCase() + this.status.slice(1)}`;
        
        if (this.currentGame) {
            description += ` - Playing: ${this.currentGame}`;
        }
        if (this.currentMusic) {
            description += ` - Listening: ${this.currentMusic}`;
        }
        
        if (!this.currentGame && !this.currentMusic) {
            description += ' - Speedrunner | Gamer';
        }
        
        return description;
    }
    
    setMetaTag(attrName, attrValue, content) {
        let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
        if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute(attrName, attrValue);
            document.head.appendChild(tag);
        }
        tag.content = content;
    }
    
    setStatus(newStatus) {
        if (this.statusEmojis[newStatus]) {
            this.status = newStatus;
            localStorage.setItem('userStatus', newStatus);
            this.updateMetaTags();
        }
    }
    
    setCurrentGame(game) {
        this.currentGame = game;
        if (game) {
            localStorage.setItem('currentGame', game);
        } else {
            localStorage.removeItem('currentGame');
        }
        this.updateMetaTags();
    }
    
    setCurrentMusic(song) {
        this.currentMusic = song;
        if (song) {
            localStorage.setItem('currentMusic', song);
        } else {
            localStorage.removeItem('currentMusic');
        }
        this.updateMetaTags();
    }
    
    setupStatusToggle() {
        // Create a simple status widget if not already present
        const existingWidget = document.getElementById('status-widget');
        if (existingWidget) return;
        
        const widget = document.createElement('div');
        widget.id = 'status-widget';
        widget.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            background: #2f3136;
            border: 2px solid rgb(0, 120, 135);
            border-radius: 8px;
            padding: 12px 16px;
            display: flex;
            gap: 10px;
            align-items: center;
            font-size: 0.9rem;
            color: #dbdee1;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        
        const statusButton = document.createElement('button');
        statusButton.style.cssText = `
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            font-size: 1.2rem;
            padding: 0;
            transition: transform 0.2s;
        `;
        statusButton.textContent = this.statusEmojis[this.status];
        statusButton.title = 'Click to change status';
        
        const statusText = document.createElement('span');
        statusText.textContent = this.status;
        statusText.style.cssText = 'min-width: 60px;';
        
        statusButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const statuses = Object.keys(this.statusEmojis);
            const currentIndex = statuses.indexOf(this.status);
            const nextStatus = statuses[(currentIndex + 1) % statuses.length];
            this.setStatus(nextStatus);
            statusButton.textContent = this.statusEmojis[nextStatus];
            statusText.textContent = nextStatus;
        });
        
        widget.appendChild(statusButton);
        widget.appendChild(statusText);
        document.body.appendChild(widget);
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.metaManager = new MetaManager();
    });
} else {
    window.metaManager = new MetaManager();
}
