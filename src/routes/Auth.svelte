<script>
  import swal from "sweetalert";
  import axios from "axios";
  import { push } from "svelte-spa-router";
  import { onMount } from "svelte";
  let p1 = "";
  let p2 = "";
  let p3 = "";
  let p4 = "";
  onMount(() => {
    if (localStorage.getItem("token") && localStorage.getItem("teamID"))
      return push("/game");
  });
  async function submit() {
    if (localStorage.getItem("token") && localStorage.getItem("teamID"))
      return push("/game");

    let teamMembers = [p1, p2, p3, p4];
    teamMembers = teamMembers.filter((item) => {
      if (item.trim()) return item.trim();
    });
    let res = await axios.post(
      import.meta.env.VITE_BASEURL + "/game/registerTeam",
      { teamMembers }
    );
    if (res.data) {
      localStorage.setItem("teamID", res.data.teamID);
      localStorage.setItem("token", res.data.accessToken);
      push("/game");
    } else {
      swal("Oops...", "Could not log you in", "error");
    }
  }
</script>

<section
  class="min-h-screen w-screen overflow-hidden flex flex-col justify-between min-w-full h-full bg-black  "
>
  <div class="mb-4 pt-7">
    <div class="float ">
      <span class="mx-2 text-yellow-400">Initium 2k22</span>
      <span class="mx-2 text-red-400">OnePiece</span>
      <span class="mx-2">Initium 2k22</span>
      <span class="mx-2">OnePiece</span>
      <span class="mx-2 text-yellow-400">Initium 2k22</span>
      <span class="mx-2 text-red-400">OnePiece</span>
      <span class="mx-2">Initium 2k22</span>
      <span class="mx-2">OnePiece</span>
    </div>
  </div>
  <hr />
  <div class="p-5">
    <div class="font-black text-[4em] my-3">Welcome Players</div>
    <form on:submit|preventDefault={submit} class="flex flex-col my-10 gap-4">
      <div class="text-3xl">dare to continue?</div>
      <input
        type="text"
        class="p-3 bg-transparent border outline-red-400"
        placeholder="player 1 name"
      />
      <input
        type="text"
        class="p-3 bg-transparent border outline-red-400"
        placeholder="player 2 name"
      />
      <input
        type="text"
        class="p-3 bg-transparent border outline-red-400"
        placeholder="player 3 name"
      />
      <input
        type="text"
        class="p-3 bg-transparent border outline-red-400"
        placeholder="player 4 name"
      />
      <button
        type="submit"
        class="p-5 bg-red-400 text-black font-bold hover:bg-black hover:border text-center text-3xl  hover:border-red-400 transition-all hover:text-white"
      >
        Log on
      </button>
    </form>
  </div>
  <hr />
  <div class="mt-4 pb-7">
    <div class="float2 ">
      <span class="mx-2 text-yellow-400">Initium 2k22</span>
      <span class="mx-2 text-red-400">OnePiece</span>
      <span class="mx-2">Initium 2k22</span>
      <span class="mx-2">OnePiece</span>
      <span class="mx-2 text-yellow-400">Initium 2k22</span>
      <span class="mx-2 text-red-400">OnePiece</span>
      <span class="mx-2">Initium 2k22</span>
      <span class="mx-2">OnePiece</span>
    </div>
  </div>
</section>

<style>
  .float {
    text-transform: uppercase;
    font-size: 4vw;
    display: inline-block;
    white-space: nowrap;
    animation: floatText 15s infinite linear;
    padding-left: 100%; /*Initial offset, which places the text off-screen*/
  }
  .float2 {
    text-transform: uppercase;
    font-size: 4vw;
    display: inline-block;
    white-space: nowrap;
    animation: floatText 18s infinite linear;
    padding-left: 100%; /*Initial offset, which places the text off-screen*/
  }
  @keyframes floatText {
    to {
      transform: translateX(-100%);
    }
  }
</style>
