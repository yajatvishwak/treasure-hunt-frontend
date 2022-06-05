<script>
  import swal from "sweetalert";
  let drawerOpen = false;
  import QrScanner from "qr-scanner";
  let vid;
</script>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my-modal" class="modal-toggle" />
<div class="modal">
  <div class="modal-box text-black bg-white">
    <div class="modal-header">
      <label for="my-modal" class="modal-close-btn">&#10006;</label>
      <h2 class="text-2xl font-bold">Scan QR Code</h2>
      <video bind:this={vid}> <track kind="captions" /></video>
    </div>
    <div class="modal-action">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label
        on:click={() => {
          const qrScanner = new QrScanner(vid, (result) =>
            console.log("decoded qr code:", result)
          );
          qrScanner.start();
        }}
        class="btn">Start Scanning</label
      >
      <label for="my-modal" class="btn">Yay!</label>
    </div>
  </div>
</div>

<div
  class={`${
    drawerOpen
      ? "bg-lime-300  z-10 p-3 absolute bottom-0 w-full  h-4/5  text-black "
      : "hidden"
  }`}
>
  <div on:click={() => (drawerOpen = !drawerOpen)} class="absolute right-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
  </div>
  <div class="text-2xl mt-5 font-bold">Captcha Question</div>
  <div class="my-4 max-h-[70%] overflow-auto">
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero excepturi
    laboriosam eos? Quo tempore repudiandae iure dicta quia itaque impedit
    provident illum iste eius consequatur, nulla blanditiis deleniti praesentium
    tempora. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    Accusantium, repellendus ratione. Eius commodi laudantium adipisci nulla.
    Facilis delectus inventore officiis dolores exercitationem aliquam
    architecto quis eius tenetur. Libero, repudiandae eum. Lorem ipsum dolor sit
    amet consectetur adipisicing elit. Illo voluptate, perferendis, eum
    repellendus aperiam temporibus quia voluptas ab odit repudiandae ipsam. Sed
    quaerat rerum, Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    Vero excepturi laboriosam eos? Quo tempore repudiandae iure dicta quia
    itaque impedit provident illum iste eius consequatur, nulla blanditiis
    deleniti praesentium tempora. Lorem ipsum dolor sit, amet consectetur
    adipisicing elit. Accusantium, repellendus ratione. Eius commodi laudantium
    adipisci nulla. Facilis delectus inventore officiis dolores exercitationem
    aliquam architecto quis eius tenetur. Libero, repudiandae eum. Lorem ipsum
    dolor sit amet consectetur adipisicing elit. Illo voluptate, perferendis,
    eum repellendus aperiam temporibus quia voluptas ab odit repudiandae ipsam.
    Sed quaerat rerum, doloribus ea architecto nisi dolorem mollitia?Lorem ipsum
    dolor sit amet, consectetur adipisicing elit. Optio animi, itaque excepturi
    aperiam at voluptatem recusandae tempora! Vitae praesentium consequatur nam,
    quasi velit dolores molestiae qui maxime, recusandae inventore eum.
    doloribus ea architecto nisi dolorem mollitia?Lorem ipsum dolor sit amet,
    consectetur adipisicing elit. Optio animi, itaque excepturi aperiam at
    voluptatem recusandae tempora! Vitae praesentium consequatur nam, quasi
    velit dolores molestiae qui maxime, recusandae inventore eum.
  </div>
  <form
    on:submit|preventDefault={() => {
      swal({
        title: "Good job!",
        closeOnClickOutside: true,
        text: "Welcome",
      });
      drawerOpen = false;
    }}
  >
    <div class="flex justify-between flex-col gap-3">
      <input
        class="w-full p-2 border-2 focus:outline-none bg-transparent border-black"
        type="text"
        placeholder="Answer"
      />
      <button
        class="bold py-2 px-4 bg-black hover:border-2 border-black hover:text-black hover:bg-transparent text-white"
        type="submit"
      >
        Submit
      </button>
    </div>
  </form>
</div>

<section
  class={`min-h-screen  w-screen overflow-hidden flex flex-col  min-w-full h-full bg-black ${
    drawerOpen ? "blur-sm" : ""
  } `}
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
    <div class="text-[3em] font-black">//team-name</div>
  </div>

  <div class="grid grid-cols-2 items-center justify-center  border-b-2 ">
    <div
      class=" flex flex-col gap-2 justify-center items-center border-r-2 flex-1 py-4 font-black"
    >
      <div class="text-5xl font-thin">0/10</div>
      <div class="text-lime-400">solved</div>
    </div>

    <div
      class=" flex flex-col gap-2 justify-center items-center flex-1 py-4 font-black"
    >
      <div class="text-5xl text-lime-300">#2</div>
      <div class="">rank</div>
    </div>
  </div>

  <div class="p-7">
    <div class="font-black text-3xl text-lime-400">Solving Question #1</div>
    <div class="mt-5">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
      perferendis architecto, atque, inventore et culpa vero fugit quisquam
      excepturi iure voluptatem aliquam sequi. A, officia. Quibusdam id
      excepturi
    </div>
  </div>

  <div class="flex  mt-auto border-t-2 ">
    <div
      on:click={() => (drawerOpen = !drawerOpen)}
      class="flex justify-center p-5  flex-1"
    >
      Answer
    </div>
    <label
      for="my-modal"
      class="flex justify-center p-5 text-black  bg-lime-400 flex-1"
    >
      Scan
    </label>
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
