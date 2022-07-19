<template>
  <PromiseNoData :promiseState="musicPromiseState">
    <MusicPlaylistView
      :user="user"
      :musicString="musicString"
      :playlist="musicPromiseState.data"
      :likePlaylistBtnColor="likePlaylistBtnColor"
      @onClickGetPlaylistButton="generateMusicPlaylist"
      @onClickLikeBtn="afterClickLikePlaylistBtn"
      @onNonUserClick="nonUserClick"
    />
  </PromiseNoData>
</template>

<script>
import MusicPlaylistView from "../views/MusicPlaylistView.vue";
import { mapActions, mapState } from "vuex";
import PromiseNoData from "../views/PromiseNoData";
export default {
  name: "MusicPresenter",
  components: {
    MusicPlaylistView,
    PromiseNoData,
  },
  created() {
    if (!this.musicPromiseState) {
      this.$store.dispatch("generateMusicPlaylist");
    }
  },
  methods: {
    nonUserClick() {
      alert("Sign in/Sign up to be able to save Playlist!");
    },

    ...mapActions([
      "generateMusicPlaylist",
      "afterClickLikePlaylistBtn",
      "afterVisitorClickLike",
    ]),
  },
  computed: {
    ...mapState([
      "user",
      "musicPromiseState",
      "musicString",
      "likePlaylistBtnColor",
    ]),
  },
};
</script>
