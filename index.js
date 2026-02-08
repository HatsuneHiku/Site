class VertexBackground {
    constructor() {
        this.canvas = document.getElementById('vertex-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;
        this.particleCount = 50;
        
        this.init();
        this.setupEventListeners();
        this.animate();
    }
    
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.particles = [];
        
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                size: Math.random() * 3 + 2,
                opacity: Math.random() * 0.4 + 0.15
            });
        }
    }
    
    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        window.addEventListener('resize', () => {
            this.init();
        });
    }
    
    update() {
        for (let particle of this.particles) {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            
            for (let other of this.particles) {
                if (other === particle) continue;
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 80 && distance > 0) {
                    const force = (80 - distance) / 80;
                    particle.vx += (dx / distance) * force * 0.08;
                    particle.vy += (dy / distance) * force * 0.08;
                }
            }
        }
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];
            
            for (let j = i + 1; j < this.particles.length; j++) {
                const other = this.particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 300) {
                    const opacity = (1 - distance / 300) * 0.15;
                    this.ctx.strokeStyle = `rgba(150, 150, 150, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.stroke();
                }
            }
            
            this.drawTriangle(particle);
        }
    }
    
    drawTriangle(particle) {
        const size = particle.size * 4;
        const angle = Math.atan2(particle.vy, particle.vx);
        
        this.ctx.save();
        this.ctx.translate(particle.x, particle.y);
        this.ctx.rotate(angle);
        this.ctx.fillStyle = `rgba(150, 150, 150, ${particle.opacity})`;
        this.ctx.strokeStyle = `rgba(150, 150, 150, ${particle.opacity * 0.8})`;
        this.ctx.lineWidth = 1;
        
        this.ctx.beginPath();
        this.ctx.moveTo(size, 0);
        this.ctx.lineTo(-size / 2, -size / 2);
        this.ctx.lineTo(-size / 2, size / 2);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
        
        this.ctx.restore();
    }
    
    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 768;
};

if (!isMobile()) {
    const vertexBg = new VertexBackground();
}

document.querySelectorAll('.tag, .genre-tag, .game-item, .social-link').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

const statusBoxes = document.querySelectorAll('.status-box');
statusBoxes.forEach((box, index) => {
    box.style.animation = `fadeIn 0.5s ease-in-out ${index * 0.1}s`;
});

const watchItems = document.querySelectorAll('.watch-item');
watchItems.forEach((item, index) => {
    item.style.animation = `fadeIn 0.5s ease-in-out ${index * 0.1}s`;
});

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

