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

    // Hero Background Animation (System Flow)
    const hCanvas = document.createElement('canvas');
    const hContainer = document.getElementById('hero-canvas');
    if (hContainer) {
        hContainer.appendChild(hCanvas);
        const ctx = hCanvas.getContext('2d');
        let w, h, particles = [];

        function initH() {
            w = hCanvas.width = window.innerWidth;
            h = hCanvas.height = window.innerHeight;
            particles = [];
            for (let i = 0; i < 40; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    r: Math.random() * 2 + 1
                });
            }
        }

        function drawH() {
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
            
            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                    if (dist < 200) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(drawH);
        }

        window.addEventListener('resize', initH);
        initH();
        drawH();
    }

    // THCMAP12 Interactive Nodes Animation
    const tContainer = document.getElementById('thcmap-animation');
    if (tContainer) {
        const tCanvas = document.createElement('canvas');
        tContainer.appendChild(tCanvas);
        const tCtx = tCanvas.getContext('2d');
        let tw, th, nodes = [];

        function initT() {
            tw = tCanvas.width = 400;
            th = tCanvas.height = 400;
            nodes = [];
            const radius = 150;
            const cx = tw / 2;
            const cy = th / 2;
            for (let i = 0; i < 12; i++) {
                const angle = (i / 12) * Math.PI * 2;
                nodes.push({
                    bx: cx + Math.cos(angle) * radius,
                    by: cy + Math.sin(angle) * radius,
                    x: 0, y: 0,
                    p: Math.random() * Math.PI * 2
                });
            }
        }

        function drawT() {
            tCtx.clearRect(0, 0, tw, th);
            const time = Date.now() * 0.002;
            
            nodes.forEach(n => {
                n.x = n.bx + Math.cos(time + n.p) * 8;
                n.y = n.by + Math.sin(time + n.p) * 8;
            });

            tCtx.strokeStyle = 'rgba(0, 113, 227, 0.4)';
            tCtx.lineWidth = 1;

            // Connections
            tCtx.beginPath();
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    tCtx.moveTo(nodes[i].x, nodes[i].y);
                    tCtx.lineTo(nodes[j].x, nodes[j].y);
                }
            }
            tCtx.stroke();

            // Nodes
            nodes.forEach(n => {
                tCtx.beginPath();
                tCtx.arc(n.x, n.y, 4, 0, Math.PI * 2);
                tCtx.fillStyle = '#0071e3';
                tCtx.fill();
                
                tCtx.beginPath();
                tCtx.arc(n.x, n.y, 10, 0, Math.PI * 2);
                tCtx.strokeStyle = 'rgba(0, 113, 227, 0.2)';
                tCtx.stroke();
            });

            requestAnimationFrame(drawT);
        }

        initT();
        drawT();
    }
});
