<script></script>

<section
  class="min-h-screen w-screen overflow-hidden flex flex-col justify-between min-w-full h-full bg-black p-5"
>
  <div class="mb-4">
    <div class="float ">
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
  <hr />
  <div class="font-black text-[4em]   my-3">Welcome Players</div>

  <form class="flex flex-col my-10 gap-4">
    <div class="text-3xl">dare to continue?</div>
    <input
      type="text"
      class="p-3 bg-transparent border outline-green-400"
      placeholder="player 1 name"
    />
    <input
      type="text"
      class="p-3 bg-transparent border outline-green-400"
      placeholder="player 2 name"
    />
    <input
      type="text"
      class="p-3 bg-transparent border outline-green-400"
      placeholder="player 3 name"
    />
    <input
      type="text"
      class="p-3 bg-transparent border outline-green-400"
      placeholder="player 4 name"
    />
    <div
      class="p-5 bg-green-400 text-black font-bold hover:bg-black hover:border text-center text-3xl  hover:border-green-400 transition-all hover:text-white"
    >
      Logon
    </div>
  </form>
  <hr />
  <div class="mt-4">
    <div class="float2 ">
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
