<!-- src/routes/blog/[id].svelte -->

<script>
    export let data;
    let content = data.json;
</script>

<h1>{JSON.stringify(content)}</h1>

<style>
   h1 {
      color: white;
   }
</style>

