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

  let current = -1;
  let rank = 0;
  let currScannedQR;
  let currCaptchaAnswer;
  let currlocationQuestion = "";
  let currCaptchaQuestion = "";
  let currCaptcha = false;

  onMount(async () => {
    let socket = io("http://localhost:5000");
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
  $: {
    console.log("scanned: ", currScannedQR);
  }

  function processScannedCode(res) {
    currScannedQR = res;
    qrScanner.stop();
    qrOpen = false;
  }
  function wa() {
    swal("Oops...", "Wrong Answer", "error");
  }
  async function submitStartAnswer() {
    let res = await axios.post(
      import.meta.env.VITE_BASEURL + "/game/checkStartAnswer",
      { startAnswer: currCaptchaAnswer ? currCaptchaAnswer : "" },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    currCaptchaAnswer = "";
    currScannedQR = "";
    if (res.data) {
      if (res.data.status && res.data.status === "GAS")
        return window.location.reload();
      if (res.data.status && res.data.status === "CA") {
        current = res.data.current;
        currlocationQuestion = res.data.nextQuestion;
        currCaptchaQuestion = res.data.nextCaptchaQuestion;
        currCaptcha = false;
        return;
      }
      return wa();
    }
  }
  async function submitAnswer() {
    let res = await axios.post(
      import.meta.env.VITE_BASEURL + "/game/checkAnswer",
      {
        captchaAnswer: currCaptchaAnswer ? currCaptchaAnswer : "",
        qrCodeSolution: currScannedQR ? currScannedQR : "s5",
        current,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
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
        return swal(
          res.data.finCode,
          "Correct! Remember this Code (important)",
          "success"
        );
      }
      return wa();
    }
  }
</script>

{#if loading}
  <div class="flex justify-center items-center h-screen">
    <div class="w-full max-w-xs">
      <div class="text-center mb-6">
        <img src="/logo.svg" class="w-24" />
      </div>
      <div class="text-gray-600 text-center">
        <p>Loading...</p>
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
        ? "bg-lime-300  z-10 p-3 absolute bottom-0 w-full h-full flex flex-col   text-black "
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
      {currCaptchaQuestion
        ? currCaptchaQuestion
        : "No Captcha Question on this round, submit 🤙 ngl"}
    </div>
    <form
      class="mt-auto"
      on:submit|preventDefault={() => {
        if (current === -1) {
          submitStartAnswer();
        } else {
          submitAnswer();
        }
        drawerOpen = false;
      }}
    >
      <div class="flex justify-between flex-col gap-3">
        <input
          class="w-full p-2 border-2 focus:outline-none bg-transparent border-black"
          type="text"
          bind:value={currCaptchaAnswer}
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
      <div class="text-[2em] font-black text-center">
        //{localStorage.getItem("teamID")}
      </div>
    </div>

    <div class="grid grid-cols-2 items-center justify-center  border-b-2 ">
      <div
        class=" flex flex-col gap-2 justify-center items-center border-r-2 flex-1 py-4 font-black"
      >
        <div class="text-5xl font-thin">{current + 1}/10</div>
        <div class="text-lime-400">level</div>
      </div>

      <div
        class=" flex flex-col gap-2 justify-center items-center flex-1 py-4 font-black"
      >
        <div class="text-5xl text-lime-300">#{rank}</div>
        <div class="">rank</div>
      </div>
    </div>

    <div class="p-7 ">
      <div
        class="font-black text-2xl text-lime-400 flex justify-between items-center"
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
