class CursorAnimation {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor';
        document.body.appendChild(this.cursor);

        this.cursorBubble = document.createElement('div');
        this.cursorBubble.className = 'cursor-bubble';
        document.body.appendChild(this.cursorBubble);

        this.cursorX = 0;
        this.cursorY = 0;
        this.bubbleX = 0;
        this.bubbleY = 0;

        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.cursorX = e.clientX;
            this.cursorY = e.clientY;

            this.cursor.style.left = this.cursorX + 'px';
            this.cursor.style.top = this.cursorY + 'px';
        });

        this.animate();

        // Add hover effect for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .interactive, input, [role="button"]');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
            });
        });

        // Hide custom cursor when leaving the window
        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
            this.cursorBubble.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
            this.cursorBubble.style.opacity = '1';
        });
    }

    animate() {
        let dx = this.cursorX - this.bubbleX;
        let dy = this.cursorY - this.bubbleY;

        this.bubbleX += dx * 0.1;
        this.bubbleY += dy * 0.1;

        this.cursorBubble.style.left = this.bubbleX + 'px';
        this.cursorBubble.style.top = this.bubbleY + 'px';

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize cursor animation
document.addEventListener('DOMContentLoaded', () => {
    new CursorAnimation();
});
