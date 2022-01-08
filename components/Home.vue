<template>
  <div class="relative flex flex-col items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">
    <div class="grid grid-cols-2 max-w-screen-xl">
      <div class="pr-8">
        <div>
          <h2 class="text-2xl font-bold">
            20 UNIQUE ALGORITHMS-GENERATED COLLECTIBLE NFTS ON NEO 3 BLOCKCHAIN
          </h2>
          <h4 class="text-xl font-medium">
            Collect your unique bitmap NFT
          </h4>
        </div>
        <div class="mt-8 space-y-2">
          <p>
            <strong>Max Supply</strong>
            <br>
            <span>20</span>
          </p>
          <p>
            <strong>Minting Fee:</strong>
            <br>
            <span>2 GAS</span>
          </p>
          <p>
            <strong>Attributes:</strong>
            <br>
            <span>No attributes. Cuz I'm too lazy in working on it.</span>
          </p>
        </div>

        <vs-button
          id="mint_button"
          gradient
          size="large"
          @click="mintNFT"
        >
          <span class="font-medium">Mint with 2.00 GAS (Testnet)</span>
        </vs-button>
      </div>
      <div>
        <img
          src="@/assets/homelogo.png"
          alt="Project image"
          width="256"
          class="mx-auto"
        >
      </div>
    </div>

    <!-- NFT images showcase -->
    <div class="w-full max-w-screen-xl my-8">
      <div
        v-for="index in 20"
        :key="index"
        class="inline-block mr-2"
      >
        <img
          :src="require(`/assets/nft/images/${index}.png`)"
          width="128px"
        >
      </div>
    </div>

    <!-- Why you do this section -->
    <div class="bg-white w-full flex justify-center py-24">
      <div class="grid grid-cols-2 max-w-screen-xl w-full">
        <div>
          <img
            src="@/assets/homelogo.png"
            alt="Project image"
            width="256"
            class="mr-auto"
          >
        </div>
        <div>
          <h2 class="text-2xl font-bold">
            Why you do this? What is your purpose?
          </h2>
          <ul class="pt-8 text-lg">
            <li>📃 To learn deeper about NEO Blockchain.</li>
            <li>🧑‍💻 Learn to write smart contract on NEO Blockchain.</li>
            <li>🤤 Help people who having urges on minting NFT.</li>
            <li>🎒 For school project reporting.</li>
            <li>🚀 Bla bla bla...</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- I have no money section -->
    <div class="w-full flex justify-center pt-24">
      <div class="max-w-screen-xl w-full">
        <h2 class="text-2xl font-bold">
          But I have no GAS...😭
        </h2>
        <span class="text-lg">You can get free testnet GAS and NEO for free by click this link.</span>
        <vs-button size="xl">
          <a
            href="https://neowish.ngd.network/#/"
            target="_blank"
          ><span class="font-medium">NEO Testnet Faucet 🚀</span></a>
        </vs-button>
      </div>
    </div>

    <!-- Open source section -->
    <div class="w-full flex justify-center py-24">
      <div class="max-w-screen-xl w-full">
        <h2 class="text-2xl font-bold">
          Is your project open source❓
        </h2>
        <span class="text-lg">Of course, feel free to take a look.</span>
        <vs-button size="xl">
          <a
            href="https://github.com/qvanphong/bit-nft-frontend"
            target="_blank"
          ><span class="font-medium">Frontend source code on Github🐙</span></a>
        </vs-button>
        <vs-button size="xl" color="#0d1117">
          <a
            href="https://github.com/qvanphong/bit-nft-smart-contract"
            target="_blank"
          ><span class="font-medium">Smart contract code on Github🐙</span></a>
        </vs-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  methods: {
    mintNFT () {
      if (this.$store.getters.isWalletConnected) {
        this.$neolineService.sendGasToContractAddress()
      } else {
        this.$neolineService.getAccount()
      }
    }
  }
}
</script>

<style>
#mint_button {
  margin-top: 1rem !important;
  margin-left: 0px !important;
}
</style>
