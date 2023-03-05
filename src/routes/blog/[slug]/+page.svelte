<script lang="ts">
    import Header from "$lib/components/Header.svelte";

    export let data = {
        content: ''
    };
</script>
<Header />
<div style="padding-top: 6rem">{@html data.content}</div>

