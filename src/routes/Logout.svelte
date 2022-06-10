<script>
  import { push } from "svelte-spa-router";
  import { onMount } from "svelte";
  onMount(() => {
    if(confirm("Are you sure")){
        localStorage.setItem("token","");
        localStorage.setItem("teamID","");
        push("/")
    }
  });
</script>


