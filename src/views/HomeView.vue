<template>
  <div class="container py-3">
    <div v-if="!user.loggedIn" class="mx-2 my-2 float-right">
      <a class="btn btn-lg btn-outline-dark" href="/sign-in"> Sign in </a>
    </div>
    <header>
      <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
        <h2>Moody — Curated Art and Music Experience</h2>
      </div>
    </header>

    <main>
      <h6 class="text-center">
        Let's start with your mood, how are you feeling today?
      </h6>
      <div class="album py-3">
        <div class="container">
          <div
            class="row justify-center row-cols-2 row-cols-sm-2 row-cols-md-5 g-3"
          >
            <div class="col-md-2 col-xs-6">
              <div class="card shadow-sm">
                <button
                  role="button"
                  class="btn btn-link link-secondary text-decoration-none"
                  v-on:click="setMood"
                >
                  <svg
                    class="bd-placeholder-img card-img-top rounded"
                    width="100%"
                    height="225"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                    id="miserable"
                  >
                    <title>Placeholder</title>
                    ;
                  </svg>

                  <div class="card-body">
                    <p class="card-text">I'm in the dumps :(</p>
                  </div>
                </button>
              </div>
            </div>

            <div class="col-md-2 col-xs-6">
              <div class="card shadow-sm">
                <button
                  role="button"
                  class="btn btn-link link-secondary text-decoration-none"
                  v-on:click="setMood"
                >
                  <svg
                    class="bd-placeholder-img card-img-top rounded"
                    width="100%"
                    height="225"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                    id="sad"
                  >
                    <title>Placeholder</title>
                    ;
                  </svg>

                  <div class="card-body">
                    <p class="card-text">It's not my day...</p>
                  </div>
                </button>
              </div>
            </div>

            <div class="col-md-2 col-xs-6">
              <div class="card shadow-sm">
                <button
                  role="button"
                  class="btn btn-link link-secondary text-decoration-none"
                  v-on:click="setMood"
                >
                  <svg
                    class="bd-placeholder-img card-img-top rounded"
                    width="100%"
                    height="225"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                    id="okay"
                  >
                    <title>Placeholder</title>
                    ;
                  </svg>
                  <div class="card-body">
                    <p class="card-text">Well, I'm okay...</p>
                  </div>
                </button>
              </div>
            </div>

            <div class="col-md-2 col-xs-6">
              <div class="card shadow-sm">
                <button
                  role="button"
                  class="btn btn-link link-secondary text-decoration-none"
                  v-on:click="setMood"
                >
                  <svg
                    class="bd-placeholder-img card-img-top rounded"
                    width="100%"
                    height="225"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                    id="happy"
                  >
                    <title>Placeholder</title>
                    ;
                  </svg>

                  <div class="card-body">
                    <p class="card-text">Feeling good today!</p>
                  </div>
                </button>
              </div>
            </div>

            <div class="col-md-2 col-xs-6">
              <div class="card shadow-sm">
                <button
                  role="button"
                  class="btn btn-link link-secondary text-decoration-none"
                  v-on:click="setMood"
                >
                  <svg
                    class="bd-placeholder-img card-img-top rounded"
                    width="100%"
                    height="225"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                    id="ecstatic"
                  >
                    <title>Placeholder</title>
                    ;
                  </svg>

                  <div class="card-body">
                    <p class="card-text">Haha, I'm buzzing!</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div class="py-4 text-center">
            <button
              :disabled="moodNotChosen"
              class="btn btn-lg btn-outline-dark text-black transparent"
              type="button"
              v-on:click="generateArtAndPlaylist"
            >
              Generate Art and Music Fitting Your Mood!
            </button>
          </div>
        </div>
      </div>
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
