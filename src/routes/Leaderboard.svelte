<script>
  import { onMount } from "svelte";
  import io from "socket.io-client";
  let loading = true;
  let ranks = [];
  $: {
    if (ranks.length > 0) {
      loading = false;
    }
  }
  onMount(async () => {
    loading = true;
    let socket = io("http://localhost:5000");
    socket.on("leaderboard", (m) => {
      console.log(m);
      if (m.rank) {
        ranks = m.rank;
      }
    });
  });
</script>

<section
  class="min-h-screen w-screen overflow-hidden flex flex-col  min-w-full h-full bg-black"
>
  <div class=" border-b-2">
    <div class="float p-5 ">
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

  <div class="">
    <div class="p-7 text-3xl">Leaderboard</div>

    {#if loading}
      <div class="animate-pulse text-blue-50 text-center">Loading...</div>
    {:else}
      <table class="w-full text-center">
        <thead>
          <tr>
            <th
              class="border bg-lime-300 text-black border-black p-3 border-l-0"
              >Rank</th
            >
            <th class="border bg-lime-300 text-black border-black p-3">Team</th>
            <th class="border bg-lime-300 text-black border-black p-3">Score</th
            >
            <th
              class="border bg-lime-300 text-black border-black p-3 border-r-0"
              >Time</th
            >
          </tr>
        </thead>
        <tbody class="text-sm ">
          {#each ranks as r}
            <tr class="">
              <td class="border p-3  border-l-0">{r.rank}</td>
              <td class="border p-3">{r.teamID}</td>
              <td class="border p-3">{r.level}</td>
              <td class="border p-3  border-r-0"
                >{r.completionTime ? r.completionTime : "-"}</td
              >
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
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

  @keyframes floatText {
    to {
      transform: translateX(-100%);
    }
  }
</style>
