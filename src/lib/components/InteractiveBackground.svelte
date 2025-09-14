<script lang="ts">
    import { onMount } from 'svelte';

    let canvas: HTMLCanvasElement;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    interface Blob {
        x: number;
        y: number;
        radius: number;
        color: string;
        originalX: number;
        originalY: number;
        velocityX: number;
        velocityY: number;
    }

    const blobs: Blob[] = [
        { x: 0.7, y: 0.3, radius: 0.25, color: 'rgba(255, 20, 147, 0.08)', originalX: 0.7, originalY: 0.3, velocityX: 0, velocityY: 0 },
        { x: 0.3, y: 0.2, radius: 0.22, color: 'rgba(0, 255, 255, 0.1)', originalX: 0.3, originalY: 0.2, velocityX: 0, velocityY: 0 },
        { x: 0.5, y: 0.5, radius: 0.2, color: 'rgba(138, 43, 226, 0.06)', originalX: 0.5, originalY: 0.5, velocityX: 0, velocityY: 0 },
        { x: 0.8, y: 0.6, radius: 0.18, color: 'rgba(255, 215, 0, 0.04)', originalX: 0.8, originalY: 0.6, velocityX: 0, velocityY: 0 },
        { x: 0.2, y: 0.7, radius: 0.15, color: 'rgba(255, 20, 147, 0.05)', originalX: 0.2, originalY: 0.7, velocityX: 0, velocityY: 0 }
    ];

    onMount(() => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let mounted = true;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            targetX = (e.clientX - rect.left) / rect.width;
            targetY = (e.clientY - rect.top) / rect.height;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const rect = canvas.getBoundingClientRect();
                targetX = (e.touches[0].clientX - rect.left) / rect.width;
                targetY = (e.touches[0].clientY - rect.top) / rect.height;
            }
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const animate = () => {
            if (!mounted) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Smooth mouse follow
            mouseX += (targetX - mouseX) * 0.08;
            mouseY += (targetY - mouseY) * 0.08;

            // Apply filter for blur effect
            ctx.filter = 'blur(60px)';

            blobs.forEach((blob) => {
                // Calculate distance from mouse
                const dx = mouseX - blob.x;
                const dy = mouseY - blob.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Mouse repulsion effect
                const maxDistance = 0.25;
                const strength = 0.12;

                if (distance < maxDistance) {
                    const force = (1 - distance / maxDistance) * strength;
                    blob.velocityX -= (dx / distance) * force * 0.025;
                    blob.velocityY -= (dy / distance) * force * 0.025;
                }

                // Spring back to original position
                const springStrength = 0.015;
                blob.velocityX += (blob.originalX - blob.x) * springStrength;
                blob.velocityY += (blob.originalY - blob.y) * springStrength;

                // Add slight ambient movement
                blob.velocityX += Math.sin(Date.now() * 0.0001 + blob.originalX * 10) * 0.0001;
                blob.velocityY += Math.cos(Date.now() * 0.0001 + blob.originalY * 10) * 0.0001;

                // Damping
                blob.velocityX *= 0.94;
                blob.velocityY *= 0.94;

                // Update position
                blob.x += blob.velocityX;
                blob.y += blob.velocityY;

                // Draw blob
                const gradient = ctx.createRadialGradient(
                    blob.x * canvas.width,
                    blob.y * canvas.height,
                    0,
                    blob.x * canvas.width,
                    blob.y * canvas.height,
                    blob.radius * Math.min(canvas.width, canvas.height)
                );

                gradient.addColorStop(0, blob.color);
                gradient.addColorStop(0.6, blob.color.replace(/[\d.]+\)/, '0.02)'));
                gradient.addColorStop(1, 'transparent');

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            });

            animationId = requestAnimationFrame(animate);
        };

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);

        animate();

        return () => {
            mounted = false;
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    });
</script>

<canvas
    bind:this={canvas}
    class="pointer-events-none absolute inset-0 z-0"
    style="transform: translateZ(0);"
></canvas>