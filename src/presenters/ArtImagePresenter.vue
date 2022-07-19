<template>
  <PromiseNoData :promiseState="artPromiseState" @onRefresh="refresh">
    <ArtImageView
      :user="user"
      :artwork="artPromiseState.data"
      :likeArtBtnColor="likeArtBtnColor"
      @onSearchCustomEvt="doSearch"
      @onChangeTextCustom="setSearchQuery"
      @onRandomizeCustomEvt="generateArtwork"
      @onClickLikeButton="afterClickLikeArtBtn"
      @onNonUserClick="nonUserClick"
    />
  </PromiseNoData>
</template>

<script>
import ArtImageView from "../views/ArtImageView.vue";
import PromiseNoData from "../views/PromiseNoData";
import { mapActions, mapState } from "vuex";
export default {
  name: "ArtPresenter",
  components: {
    ArtImageView,
    PromiseNoData,
  },
  data() {
    return {
      query: "",
    };
  },
  created() {
    if (!this.artPromiseState) {
      this.$store.dispatch("generateArtwork", {});
    }
  },
  methods: {
    refresh() {
      alert(this.artPromiseState.error);
    },
    nonUserClick() {
      alert("Sign in/Sign up to be able to save Art!");
    },

    ...mapActions([
      "generateArtwork",
      "addArtToLikeList",
      "removeLikedArt",
      "afterClickLikeArtBtn",
    ]),
    setSearchQuery(searchQuery) {
      this.query = searchQuery;
    },
    doSearch: function () {
      this.$store.dispatch("doSearch", this.query);
    },
  },
  computed: {
    ...mapState(["artPromiseState", "likeArtBtnColor", "user"]),
  },
};
</script>
