<template>
  <div class="container py-3">
    <header>
      <div class="p-3 pb-md-4 text-left row">
        <h2 class="col-6">Hi, I'm Xiaohan, 23y/o, <br>Human-Computer Interaction master student</h2>
        <img src="../assets/images/mosaic-cover-mobile-3.jpg" class="rounded float-right col-6 img-fluid" alt="Responsive image">
      </div>
    </header>

    <main>
      <h6 class="text-center">
        Let's start with your mood, how are you feeling today?
      </h6>
    </main>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  props: ["moodNotChosen", "user"],
  emits: ["setMood", "changeMoodNotChosen", "generateArtAndPlaylist"],
  methods: {
    setMood(evt) {
      this.$emit("setMood", evt.target.id);
      this.$emit("changeMoodNotChosen");
    },
    generateArtAndPlaylist() {
      this.$emit("generateArtAndPlaylist");
    },
  },
};
</script>
<style>
@import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
@import "https://fonts.googleapis.com/css2?family=Fira+Sans+Extra+Condensed:wght@300;400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@500;600&family=Noto+Sans&family=Open+Sans:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap";
@import "../stylesheet/style.css";
</style>
