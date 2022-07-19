<template>
  <div class="px-2">
    <div class="row">
      <div class="col-md-12 col-12 px-xs-5 d-block py-2">
        <div class="row">
          <div class="col-md-12 col-12 py-2">
            <a :href="`${artwork.imageUrl}`">
              <img
                class="artworkImage rounded mx-auto d-block"
                v-bind:src="artwork.imageUrl"
                style="max-height: 85vh"
              />
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 col-6 px-xs-5 d-block py-2">
        <h4>{{ artwork.title }}</h4>
        <h6>{{ artwork.artist_display }}</h6>
      </div>
      <div class="col-md-3 col-3 px-xs-5 d-block py-2">
        <button
          v-if="user.loggedIn"
          @click="clickLikeButton"
        ></button>
        <button
          v-else
          @click="nonUserClick"
        ></button>
      </div>
      <div class="col-md-3 col-3 px-xs-5 d-block py-2">
        <button
          type="button"
          class="btn btn-outline-dark float-right"
          v-on:click="randomize"
        >
          <i class="fa fa-refresh"></i>
          Try Another Art
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-md-4 col-4 px-xs-1 d-block py-1">
            <small>Type of artwork:</small>
            <p>
              {{ artwork.artwork_type_title }}
            </p>
          </div>
          <div class="col-md-4 col-4 px-xs-1 d-block py-1">
            <small>Place of origin:</small>
            <p>
              {{ artwork.place_of_origin }}
            </p>
          </div>
          <div class="col-md-4 col-4 px-xs-1 d-block py-1">
            <small>Credit:</small>
            <p>
              {{ artwork.credit_line }}
            </p>
          </div>
        </div>
      </div>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control border-dark bg-transparent"
          placeholder="Search specific artwork and music..."
          aria-label="Search"
          aria-describedby="button-addon2"
          v-on:input="changeText"
          v-on:keyup.enter="search"
        />
        <button
          class="btn btn-outline-dark"
          type="button"
          id="button-addon2"
          v-on:click="search"
        >
          Search
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["artwork", "likeArtBtnColor", "user"],
  emits: [
    "onSearchCustomEvt",
    "onChangeTextCustom",
    "onRandomizeCustomEvt",
    "onClickLikeButton",
    "onNonUserClick",
  ],
  methods: {
    search() {
      this.$emit("onSearchCustomEvt");
    },
    changeText(evt) {
      this.$emit("onChangeTextCustom", evt.target.value);
    },
    randomize() {
      this.$emit("onRandomizeCustomEvt");
    },
    clickLikeButton() {
      this.$emit("onClickLikeButton");
    },
    nonUserClick() {
      this.$emit("onNonUserClick");
    },
  },
};
</script>
<style>
@import "bootstrap/dist/css/bootstrap.min.css";
@import "https://fonts.googleapis.com/css2?family=Fira+Sans+Extra+Condensed:wght@300;400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@500;600&family=Noto+Sans&family=Open+Sans:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap";
@import "../stylesheet/style.css";
</style>
