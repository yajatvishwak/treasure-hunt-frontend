<script>
  import axios from "axios";
  import { push, replace } from "svelte-spa-router";
  import swal from "sweetalert";
  let fincode = "";
  let loading = false;

  async function submit() {
    loading = true;
    if (localStorage.getItem("token") && localStorage.getItem("teamID")) {
      let res = await axios.post(
        import.meta.env.VITE_BASEURL + "/game/checkFincode",
        { fincode: fincode },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(res.data);
      if (res.data && res.data.status === "FS") {
        push("/leaderboard");
      } else if (res.data && res.data.status === "GNF") {
        replace("/game");
      } else {
        swal("Oops...", "Check your code again", "error");
      }
    } else {
      replace("/");
    }

    loading = false;
  }
</script>

<section
  class={`min-h-screen  w-screen overflow-hidden flex flex-col  min-w-full h-full bg-black `}
>
  <div class="p-5 border-b-2">
    <div class="float">
      <span class="mx-2">Initium 2k22</span>
      <span class="mx-2">Initium 2k22</span>
      <span class="mx-2">Initium 2k22</span>
      <span class="mx-2">Initium 2k22</span>
      <span class="mx-2">Initium 2k22</span>
      <span class="mx-2">Initium 2k22</span>
      <span class="mx-2">Initium 2k22</span>
      <span class="mx-2">Initium 2k22</span>
    </div>
  </div>

  <div class="flex items-center justify-center py-10  border-b-2 ">
    <div class="text-[2em] font-black text-center">
      //{localStorage.getItem("teamID")}
    </div>
  </div>
  <div class="flex flex-col justify-center items-center mt-10 p-6   ">
    <div class="text-center">
      You were asked to remember a few codes when ever you solved a level.
    </div>
    <div class="mt-10 text-green-300 mb-6">Enter all your final codes</div>
    <form class="w-full">
      <textarea
        rows="10"
        bind:value={fincode}
        type="text"
        placeholder="enter codes here "
        class="p-3 bg-transparent border-2 w-full outline-lime-300 "
        name=""
        id=""
      />
    </form>
  </div>

  <button
    disabled={loading}
    on:click={submit}
    class="bg-lime-300 text-black p-5 text-center mt-auto"
  >
    {loading ? "Loading..." : "Submit"}
  </button>
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

  @keyframes floatText {
    to {
      transform: translateX(-100%);
    }
  }
</style>
