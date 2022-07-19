<template>
  <div v-if="user.loggedIn" class="container px-xs-5 pt-2 pb-3 d-flex">
    <div class="row py-2">
      <div class="row align-items-start">
        <div v-for="playlist in savedPlaylists" :key="playlist">
          <div class="col-md-8 col-xs-12 py-1">
            <h4>{{ playlist.name }}</h4>
          </div>
          <div class="embed-responsive embed-responsive-1by1">
            <iframe
              style="border-radius: 12px"
              class="embed-responsive-item iframe_container"
              v-bind:src="playlist.externalUrl"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["savedPlaylists", "user"],
};
</script>
<style>
@import "bootstrap/dist/css/bootstrap.min.css";
@import "https://fonts.googleapis.com/css2?family=Fira+Sans+Extra+Condensed:wght@300;400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@500;600&family=Noto+Sans&family=Open+Sans:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap";
@import "../stylesheet/style.css";
</style>
