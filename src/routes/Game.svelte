<script>
  import swal from "sweetalert";
  import axios from "axios";
  import QrScanner from "qr-scanner";
  import { onMount } from "svelte";
  import { push, replace } from "svelte-spa-router";
  import io from "socket.io-client";

  let drawerOpen = false;
  let qrOpen = false;
  let vid;
  let qrScanner;
  let loading = true;
  let loadingSubmit = false;
  let fqrmemes = [
    "https://i.imgur.com/qz63qv1.jpeg",
    "https://i.imgur.com/HMibelo.jpeg",
    "https://i.imgur.com/itOjQqF.jpeg",
    "https://i.imgur.com/8LHRWDd.jpeg",
    "https://i.imgur.com/OxJxqiL.gif",
    "https://i.imgur.com/OQItmkw.jpeg",
    "https://i.imgur.com/oDDBsKq.jpeg",
    "https://i.imgur.com/qXjVXFe.jpeg",
    "https://i.imgur.com/HV3cO6b.jpeg",
    "https://i.imgur.com/ok65VgU.jpeg",
    "https://i.imgur.com/482sJy8.jpeg",
    "https://i.imgur.com/uWKmkfK.jpeg",
    "https://i.imgur.com/rCrGYKo.jpeg",
    "https://i.imgur.com/GMHfJeL.jpeg",
    "https://i.imgur.com/hVxoy1I.jpeg",
    "https://i.imgur.com/QiowRa3.jpeg",
  ];

  let current = -1;
  let rank = 0;
  let currScannedQR;
  let currCaptchaAnswer;
  let currlocationQuestion = "";
  let currCaptchaQuestion = "";
  let currCaptcha = false;

  onMount(async () => {
    let socket = io(import.meta.env.VITE_BASEURL);
    socket.on("leaderboard", (m) => {
      console.log("received");
      if (m.rank) {
        rank = m.rank.find(
          (item) => item.teamID === localStorage.getItem("teamID")
        ).rank;
      } else {
        rank = 0;
      }
    });
    if (localStorage.getItem("token") && localStorage.getItem("teamID")) {
      let res = await axios.get(
        import.meta.env.VITE_BASEURL + "/game/getQuestion",
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );

      if (res.data && res.data.status === "GNS") {
        let res2 = await axios.get(
          import.meta.env.VITE_BASEURL + "/game/getStartQuestion",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (res2.data) {
          console.log(res2.data);
          currlocationQuestion = res2.data.startQuestion;
          current = -1;
        }
      } else if (res.data && res.data.status === "CG") {
        replace("/fincode");
      } else if (res.data && res.data.status === "TNF") {
        localStorage.setItem("token", "");
        localStorage.setItem("teamID", "");
        replace("/");
      } else if (res.data && res.data.status === "FS") {
        replace("/leaderboard");
      } else {
        current = res.data.current;
        currlocationQuestion = res.data.question;
        currCaptchaQuestion = res.data.cquestion;
        currCaptcha = res.data.captcha;
      }
    } else {
      replace("/");
    }
    loading = false;
  });
  function fqr() {
    let link = fqrmemes[Math.floor(Math.random() * fqrmemes.length)];
    swal({
      content: {
        element: "img",
        attributes: {
          src: link,
        },
      },
    });
  }
  $: {
    console.log("scanned: ", currScannedQR);
    if (currScannedQR && currScannedQR.split("-")[0] === "http://fake") {
      currScannedQR = "";
      fqr();
    }
  }

  function processScannedCode(res) {
    currScannedQR = res;
    qrScanner.stop();
    qrOpen = false;
  }
  function wa(mode) {
    if (mode === "WQ")
      return swal(
        "Keep searching",
        "Wrong QR, but the captcha question is right!",
        "error"
      );
    if (mode === "WAQ") return swal("Oops...", "Wrong QR and Captcha", "error");
    if (mode === "WA")
      return swal(
        "Keep thinking",
        "Wrong Captcha answer, but the QR code is right!",
        "error"
      );
    swal("Oops...", "Wrong Answer", "error");
  }
  async function submitStartAnswer() {
    loadingSubmit = true;
    let res = await axios.post(
      import.meta.env.VITE_BASEURL + "/game/checkStartAnswer",
      { startAnswer: currCaptchaAnswer ? currCaptchaAnswer : "" },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    loadingSubmit = false;
    drawerOpen = false;
    currCaptchaAnswer = "";
    currScannedQR = "";
    if (res.data) {
      if (res.data.status && res.data.status === "GAS")
        return window.location.reload();
      if (res.data.status && res.data.status === "CA") {
        current = res.data.current;
        currlocationQuestion = res.data.nextQuestion;
        currCaptchaQuestion = res.data.nextCaptchaQuestion;
        currCaptcha = res.data.captcha;
        return;
      }
      return wa();
    }
  }
  async function submitAnswer() {
    loadingSubmit = true;
    let res = await axios.post(
      import.meta.env.VITE_BASEURL + "/game/checkAnswer",
      {
        captchaAnswer: currCaptchaAnswer ? currCaptchaAnswer : "",
        qrCodeSolution: currScannedQR ? currScannedQR : "",
        current,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    loadingSubmit = false;
    drawerOpen = false;
    currCaptchaAnswer = "";
    currScannedQR = "";
    if (res.data) {
      if (res.data.status && res.data.status === "GAS")
        return window.location.reload();
      if (res.data.status && res.data.status === "GNS")
        return window.location.reload();
      if (res.data.status && res.data.status === "WC")
        return window.location.reload();
      if (res.data.status && res.data.status === "CG") return push("/fincode");

      if (res.data.status && res.data.status === "CA") {
        current = res.data.current;
        currlocationQuestion = res.data.nextQuestion;
        currCaptchaQuestion = res.data.nextCaptchaQuestion;
        if (currCaptchaQuestion) currCaptcha = true;
        else currCaptcha = false;
        return swal({
          text: "You got that one, Good Job! Remember the above letter. (needs to be submitted in the end of the game, otherwise you will be disqualified)",
          closeOnClickOutside: false,
          closeOnEsc: false,
          icon: "success",
          title: res.data.finCode,
        });
      }
      if (res.data.status && res.data.status === "WA") return wa("WA");
      if (res.data.status && res.data.status === "WAQ") return wa("WAQ");
      if (res.data.status && res.data.status === "WQ") return wa("WQ");
      return wa();
    }
  }
</script>

{#if loading}
  <div class="flex justify-center items-center h-screen bg-black">
    <div class="w-full max-w-sm">
      <div class="text-center mb-6 text-4xl">
        <span class="text-red-500">One Piece</span> -
        <span class="text-yellow-200"> Initium 2022 </span>
      </div>
      <div class="text-gray-600 text-center">
        <p class="animate-pulse">Loading...</p>
      </div>
    </div>
  </div>
{:else}
  <!-- Put this part before </body> tag -->
  <input
    type="checkbox"
    bind:checked={qrOpen}
    id="my-modal"
    class="modal-toggle"
  />
  <div class="modal">
    <div class="modal-box text-black bg-white">
      <div class="modal-header">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold">Scan QR Code</h2>
          <label
            on:click={() => {
              if (qrScanner) qrScanner.stop();
            }}
            for="my-modal"
            class="modal-close-btn">&#10006;</label
          >
        </div>
        <video bind:this={vid}> <track kind="captions" /></video>
      </div>
      <div class="modal-action">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label
          on:click={() => {
            let qs = new QrScanner(vid, (result) => {
              console.log("decoded qr code:", result);
              if (qrScanner) processScannedCode(result);
            });
            qrScanner = qs;
            if (qrScanner) qrScanner.start();
          }}
          class="btn">Start Scanning</label
        >
      </div>
    </div>
  </div>

  <div
    class={`${
      drawerOpen
        ? "bg-red-400  z-10 p-3 absolute bottom-0 w-full h-full flex flex-col   text-black "
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
    {#if current === -1}
      <div class="text-2xl mt-5 font-bold">
        Submit your answer below to continue
      </div>
    {:else}
      <div class="text-2xl mt-5 font-bold">Captcha Question</div>
      <div class="my-4 max-h-[70%] overflow-auto">
        {currCaptchaQuestion
          ? currCaptchaQuestion
          : "You got lucky this round. There is no Captcha Question for you to answer. Submit your answer to continue."}
      </div>
    {/if}
    <form
      class="mt-auto"
      on:submit|preventDefault={() => {
        if (current === -1) {
          submitStartAnswer();
        } else {
          submitAnswer();
        }
      }}
    >
      <div class="flex justify-between flex-col gap-3">
        <input
          class="w-full p-2 border-2 border-black focus:outline-none bg-transparent text-black placeholder-slate-900"
          type="text"
          bind:value={currCaptchaAnswer}
          placeholder="type here..."
        />
        {#if loadingSubmit}
          <div class="text-center animate-pulse">Loading...</div>
        {:else}
          <button
            class="bold py-2 px-4 bg-black hover:border-2 border-black hover:text-black hover:bg-transparent text-white"
            type="submit"
          >
            Submit
          </button>
        {/if}
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

    <div class="flex items-center justify-center py-10  border-b-2 ">
      <div class="text-[2em] font-black text-center text-yellow-300">
        //{localStorage.getItem("teamID")}
      </div>
    </div>

    <div class="grid grid-cols-2 items-center justify-center  border-b-2 ">
      <div
        class=" flex flex-col gap-2 justify-center items-center border-r-2 flex-1 py-4 font-black"
      >
        <div class="text-5xl font-thin">{current + 1}/8</div>
        <div class="text-red-400">level</div>
      </div>

      <div
        on:click={() => {
          window.location.href = "/#/leaderboard";
        }}
        class=" flex flex-col gap-2 justify-center items-center flex-1 py-4 font-black"
      >
        <div class="text-5xl text-red-400">#{rank}</div>
        <div class="">rank</div>
      </div>
    </div>

    <div class="p-7 ">
      <div
        class="font-black text-2xl text-red-400 flex justify-between items-center"
      >
        <div>Solving Location Question #{current + 1}</div>
        {#if currCaptcha}
          <div class="tooltip tooltip-left" data-tip="Captcha required">
            <div>⚠️</div>
          </div>
        {/if}
      </div>
      <div class="mt-5">
        {currlocationQuestion}
      </div>
    </div>

    {#if current === -1}
      <div class="flex border-t-2  mt-auto">
        <div
          on:click={() => (drawerOpen = !drawerOpen)}
          class="flex justify-center p-5  flex-1"
        >
          Continue
        </div>
      </div>
    {:else}
      <div class="flex border-t-2  mt-auto">
        {#if currScannedQR}
          <div class="flex justify-center p-5 text-black  bg-red-400 flex-1">
            Scanned
          </div>
        {:else}
          <label
            for="my-modal"
            class="flex justify-center p-5 text-black  bg-red-400 flex-1"
          >
            Scan
          </label>
        {/if}
        <div
          on:click={() => (drawerOpen = !drawerOpen)}
          class="flex justify-center p-5  flex-1"
        >
          Continue
        </div>
      </div>
    {/if}
  </section>
{/if}

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
