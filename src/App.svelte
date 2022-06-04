<script>
  import Router from "svelte-spa-router";
  import routes from "./routes";
</script>

<Router {routes} />

<style>
  @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap");
  :global(body) {
    margin: 0;
    padding: 0;
    color: white;
    font-family: "Orbitron", sans-serif;
  }
</style>
