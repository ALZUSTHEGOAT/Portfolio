const initConstellation = () => {
    const canvas = document.getElementById('constellation-bg');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    };

    const init = () => {
        particles = [];
        const numberOfParticles = (canvas.width * canvas.height) / 15000;
        
        for (let i = 0; i < numberOfParticles; i++) {
            const size = Math.random() * 2;
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const directionX = Math.random() * 2 - 1;
            const directionY = Math.random() * 2 - 1;
            
            particles.push({
                x,
                y,
                directionX,
                directionY,
                size,
                baseX: x,
                baseY: y
            });
        }
    };

    const connect = () => {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200) {
                    const opacity = 1 - (distance / 200);
                    ctx.strokeStyle = document.body.classList.contains('dark-mode')
                        ? `rgba(255, 255, 255, ${opacity * 0.2})`
                        : `rgba(0, 0, 0, ${opacity * 0.2})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.directionX * 0.3;
            particle.y += particle.directionY * 0.3;

            if (particle.x > canvas.width || particle.x < 0) {
                particle.directionX = -particle.directionX;
            }
            if (particle.y > canvas.height || particle.y < 0) {
                particle.directionY = -particle.directionY;
            }

            // Mouse interaction
            if (mouse.x !== null) {
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const directionX = dx / distance;
                    const directionY = dy / distance;
                    particle.x -= directionX * force * 2;
                    particle.y -= directionY * force * 2;
                }
            }

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = document.body.classList.contains('dark-mode') ? '#ffffff' : '#000000';
            ctx.fill();
        });

        connect();
        requestAnimationFrame(animate);
    };

    canvas.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();
};

document.addEventListener('DOMContentLoaded', initConstellation);
