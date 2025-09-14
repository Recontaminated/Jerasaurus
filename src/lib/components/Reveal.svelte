<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    delay?: number;
    duration?: number;
    children?: import('svelte').Snippet;
  }

  let { delay = 0, duration = 800, children }: Props = $props();

  let visible = $state(false);
  onMount(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        visible = true;
      }, delay);
    });
  });
</script>

<div
  class="will-change-transform transition-[opacity,transform,filter] {visible ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-md translate-y-4'}"
  style="transition-duration: {duration}ms"
>
  {@render children?.()}
</div>


