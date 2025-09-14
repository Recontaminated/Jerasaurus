<script lang="ts">
  import { onMount } from 'svelte';

  export let delay = 0;
  export let duration = 800;

  let visible = false;
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
  <slot />
</div>


