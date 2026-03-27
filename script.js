document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // Hero Canvas Animation (Abstract System/Flow)
    const canvas = document.createElement('canvas');
    const container = document.getElementById('hero-canvas-container');
    if (container) {
        container.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        let width, height, particles;

        function init() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles = [];
            for (let i = 0; i < 50; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(draw);
    }

        window.addEventListener('resize', init);
        init();
        draw();
    }

    // THCMAP12 Nodes Animation
    const thcmapContainer = document.getElementById('thcmap-animation');
    if (thcmapContainer) {
        const tCanvas = document.createElement('canvas');
        thcmapContainer.appendChild(tCanvas);
        const tCtx = tCanvas.getContext('2d');
        let tWidth, tHeight, nodes = [];

        function tInit() {
            tWidth = tCanvas.width = 400;
            tHeight = tCanvas.height = 400;
            nodes = [];
            const radius = 150;
            const centerX = tWidth / 2;
            const centerY = tHeight / 2;

            for (let i = 0; i < 12; i++) {
                const angle = (i / 12) * Math.PI * 2;
                nodes.push({
                    baseX: centerX + Math.cos(angle) * radius,
                    baseY: centerY + Math.sin(angle) * radius,
                    x: 0,
                    y: 0,
                    phase: Math.random() * Math.PI * 2
                });
            }
        }

        function tDraw() {
            tCtx.clearRect(0, 0, tWidth, tHeight);
            const time = Date.now() * 0.002;

            tCtx.strokeStyle = 'rgba(0, 113, 227, 0.4)';
            tCtx.lineWidth = 1;

            nodes.forEach((n, i) => {
                n.x = n.baseX + Math.cos(time + n.phase) * 10;
                n.y = n.baseY + Math.sin(time + n.phase) * 10;
            });

            // Draw connections
            tCtx.beginPath();
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    tCtx.moveTo(nodes[i].x, nodes[i].y);
                    tCtx.lineTo(nodes[j].x, nodes[j].y);
                }
            }
            tCtx.stroke();

            // Draw nodes
            nodes.forEach(n => {
                tCtx.beginPath();
                tCtx.arc(n.x, n.y, 4, 0, Math.PI * 2);
                tCtx.fillStyle = '#0071e3';
                tCtx.fill();
                tCtx.closePath();
                
                // Outer glow
                tCtx.beginPath();
                tCtx.arc(n.x, n.y, 8, 0, Math.PI * 2);
                tCtx.strokeStyle = 'rgba(0, 113, 227, 0.3)';
                tCtx.stroke();
            });

            requestAnimationFrame(tDraw);
        }

        tInit();
        tDraw();
    }
});
