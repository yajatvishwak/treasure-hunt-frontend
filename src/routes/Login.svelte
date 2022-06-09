<script>
  import axios from "axios";
  import { push } from "svelte-spa-router";
  import swal from "sweetalert";
  let masterpass, teamname;
</script>

<section class="bg-black h-screen">
  <div
    class="container mx-auto px-4 flex items-center justify-center border-2 h-full gap-10"
  >
    <div class="flex flex-col justify-center items-center gap-10">
      <div>
        <div class="text-white text-center text-4xl">
          <span class="font-bold">Initium</span>
          <span class="font-bold">2k22</span>
        </div>
        <div class="text-white text-center text-2xl">
          <span class="font-bold">OnePiece</span>
        </div>
      </div>
      <form
        class=" flex flex-col gap-4"
        on:submit|preventDefault={async () => {
          let res = await axios.post(
            import.meta.env.VITE_BASEURL + "/game/login",
            { masterpass: masterpass, teamID: teamname }
          );
          if (res.data.teamID && res.data.accessToken) {
            localStorage.setItem("teamID", res.data.teamID);
            localStorage.setItem("token", res.data.accessToken);
            push("/game");
          } else {
            swal("Oops...", "Could not log you in", "error");
          }
        }}
        action=""
      >
        <input
          class="p-5 bg-transparent border-2"
          placeholder="master-token"
          bind:value={masterpass}
          type="text"
        />
        <input
          class="p-5 bg-transparent border-2"
          placeholder="team-name"
          type="text"
          bind:value={teamname}
        />
        <button type="submit" class="w-full">Submit </button>
      </form>
    </div>
  </div>
</section>
