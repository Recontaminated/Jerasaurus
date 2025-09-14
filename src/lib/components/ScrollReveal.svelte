<script lang="ts">
  import { onMount } from 'svelte';

  export let delay = 0;
  export let duration = 800;
  export let bounce = true;

  let element: HTMLElement;
  let visible = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !visible) {
            setTimeout(() => {
              visible = true;
            }, delay);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  });
</script>

<div
  bind:this={element}
  class="will-change-transform transition-[opacity,transform,filter] {visible ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-md translate-y-8'} {visible && bounce ? 'animate-bounce-in' : ''}"
  style="transition-duration: {duration}ms"
>
  <slot />
</div>

<style>
  @keyframes bounce-in {
    0% {
      transform: translateY(8px);
      opacity: 0;
    }
    50% {
      transform: translateY(-4px);
      opacity: 1;
    }
    65% {
      transform: translateY(2px);
    }
    80% {
      transform: translateY(-1px);
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  :global(.animate-bounce-in) {
    animation: bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  }
</style>
