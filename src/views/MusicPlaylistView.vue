<template>
  <div class="row align-items-between justify-content-between">
    <div class="col-md-6 col-xs-12 align-self-stretch">
      <div class="container-fluid px-xs-5 pt-2 my-auto">
        <h4 class="my-auto">
          <br />
          Hey there! Apart from the artwork above, we also prepare some
          {{ musicString }} songs for you,
          <b>{{ playlist.description }}</b> hope you like it! <br /><br />
        </h4>
      </div>
    </div>
    <div class="col-md-5 col-xs-12">
      <div class="container px-xs-5 pt-2 pb-3 d-flex">
        <div class="row py-2">
          <div class="col-md-8 col-xs-12 py-1">
            <h4>{{ playlist.name }} For You</h4>
          </div>
          <div class="col-md-4 col-xs-12 py-1">
            <button
              type="button"
              class="btn btn-outline-dark"
              v-on:click="clickGetPlaylistButton"
            >
              <i class="fa fa-refresh"></i>
              Try Another Playlist
            </button>
          </div>
          <div class="embed-responsive embed-responsive-1by1">
            <iframe
              style="border-radius: 12px"
              class="embed-responsive-item iframe_container"
              v-bind:src="playlist.externalUrl"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            ></iframe>
            <div class="q-pa-md q-gutter-sm full-width row justify-center">
              <q-btn
                v-if="user.loggedIn"
                align="center"
                round
                :color="likePlaylistBtnColor"
                icon="favorite"
                @click="clickLikeButton"
              ></q-btn>
              <q-btn
                v-else
                @click="nonUserClick"
                round
                color="black"
                icon="favorite"
              ></q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="px-5 pt-2 pb-3 d-flex">
      @Designed and coded by Arooj, Kawsar, Xiaohan and Xuni.
    </p>
  </div>
</template>

<script>
export default {
  props: ["user", "playlist", "musicString", "likePlaylistBtnColor"],
  emits: ["onClickGetPlaylistButton", "onClickLikeBtn", "onNonUserClick"],
  mounted() {},
  methods: {
    clickGetPlaylistButton() {
      this.$emit("onClickGetPlaylistButton");
    },
    clickLikeButton() {
      this.$emit("onClickLikeBtn");
    },
    nonUserClick() {
      this.$emit("onNonUserClick");
    },
  },
};
</script>
<style>
@import "../stylesheet/style.css";
</style>
