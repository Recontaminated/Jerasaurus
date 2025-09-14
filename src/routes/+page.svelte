<script lang="ts">
    import OverviewCards from '$lib/components/OverviewCards.svelte';
    import AboutSection from '$lib/components/AboutSection.svelte';
    import TechStack from '$lib/components/TechStack.svelte';
    import Reveal from '$lib/components/Reveal.svelte';
    import ScrollReveal from '$lib/components/ScrollReveal.svelte';
    const socials = [
        { href: 'https://github.com/recontaminated', label: 'GitHub', icon: 'github' },
        { href: 'https://x.com/', label: 'X', icon: 'x' },
        { href: 'https://www.linkedin.com/', label: 'LinkedIn', icon: 'linkedin' }
    ];

    function Icon({ name }: { name: string }) {
        if (name === 'github') {
            return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-6 w-6"><path fill-rule="evenodd" d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2c-3.22.7-3.9-1.55-3.9-1.55-.53-1.35-1.3-1.71-1.3-1.71-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.74 1.27 3.41.97.1-.76.41-1.27.74-1.56-2.57-.29-5.28-1.29-5.28-5.73 0-1.27.45-2.31 1.2-3.13-.12-.3-.52-1.51.12-3.15 0 0 .98-.31 3.2 1.19A11.12 11.12 0 0 1 12 6.8c1 0 2.01.13 2.95.38 2.21-1.5 3.19-1.19 3.19-1.19.64 1.64.24 2.85.12 3.15.75.82 1.2 1.86 1.2 3.13 0 4.45-2.71 5.43-5.3 5.72.42.36.79 1.07.79 2.16v3.2c0 .31.2.67.8.56A11.5 11.5 0 0 0 12 .5Z" clip-rule="evenodd"/></svg>`;
        }
        if (name === 'x') {
            return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-6 w-6"><path d="M18.36 2H21l-6.5 7.43L22 22h-6.8l-4.7-6.1L4.9 22H2.25l7.05-8.06L2 2h6.9l4.22 5.6L18.36 2Zm-1.19 18h1.89L7.01 4h-1.9L17.17 20Z"/></svg>`;
        }
        return `<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\" class=\"h-6 w-6\"><path d=\"M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8.5h4V23h-4V8.5Zm7 0h3.83v1.98h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.09V23h-4v-5.73c0-1.37-.02-3.13-1.91-3.13-1.92 0-2.21 1.5-2.21 3.03V23h-4V8.5Z\"/></svg>`;
    }
</script>

<section class="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
    <div class="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
            <div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur">
                <span class="relative flex h-2.5 w-2.5">
                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"></span>
                    <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
                </span>
                <span class="text-sm text-white/80">Available for work</span>
            </div>

            <h1 class="mt-6 text-5xl font-extrabold tracking-tight sm:text-7xl">Hi, I'm Jeremy</h1>
            <p class="mt-6 max-w-2xl text-lg leading-8 text-white/70">
                Full-stack developer and embedded systems engineer studying Mechanical Engineering at Stanford, bringing hardware and software together.
            </p>

            <div class="mt-10 flex items-center gap-3">
                {#each socials as s}
                    <a class="group inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 backdrop-blur transition hover:text-white hover:border-white/20" href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                        {@html Icon({ name: s.icon })}
                    </a>
                {/each}
                <a href="#overview" class="ml-2 text-white/60 hover:text-white" aria-label="Scroll down">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-6 w-6 animate-bounce" style="animation-delay: 5s"><path d="M12 5v14m0 0l-5-5m5 5l5-5"/></svg>
                </a>
            </div>
        </Reveal>

        <Reveal delay={120}>
            <div class="flex justify-center lg:justify-end">
                <div class="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl ring-1 ring-white/10 backdrop-blur">
                    <img src="/nice.jpg" alt="Portrait of Jeremy" class="h-72 w-72 object-cover object-[50%_10%] sm:h-80 sm:w-80 md:h-96 md:w-96" loading="lazy" decoding="async">
                </div>
            </div>
        </Reveal>
    </div>
</section>

<!-- Space for gradient to fade -->
<!-- <div class="h sm:h-48"></div> -->

<!-- About/Philosophy section -->
<AboutSection />

<!-- More space before cards -->
<div class="h-24"></div>

<!-- overview cards -->
<div id="overview" class="min-h-[300px]">
    <OverviewCards />
</div>

<!-- Tech Stack section -->
<div id="skills">
    <TechStack />
</div>

<!-- anchor sections -->
<section id="projects" class="mx-auto mt-24 max-w-6xl px-6">
    <ScrollReveal delay={100}>
        <h2 class="text-2xl font-semibold">Projects</h2>
        <p class="mt-3 text-white/70">Coming soon.</p>
        <div class="mt-6 h-40 rounded-3xl border border-white/10 bg-white/5"></div>
        <div class="mt-6 h-40 rounded-3xl border border-white/10 bg-white/5"></div>
    </ScrollReveal>
</section>

<section id="contact" class="mx-auto mt-24 mb-24 max-w-6xl px-6">
    <ScrollReveal delay={200}>
        <h2 class="text-2xl font-semibold">Contact</h2>
        <p class="mt-3 text-white/70">Reach out at jeremy@example.com</p>
        <div class="mt-6 h-24 rounded-3xl border border-white/10 bg-white/5"></div>
    </ScrollReveal>
</section>