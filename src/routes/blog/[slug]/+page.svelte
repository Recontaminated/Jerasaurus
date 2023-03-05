<script lang="ts">
    import "$lib/styles/style.scss"
    import Header from "$lib/components/Header.svelte";

    export let data = {
        content: ''
    };
</script>
<Header />
<div class="content-container">
<div style="padding-top: 6rem">{@html data.content}</div>
</div>
