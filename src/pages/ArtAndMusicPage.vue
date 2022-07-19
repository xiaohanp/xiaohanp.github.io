<template class="artAndMusic">
  <div>
    <NavBarPresenter />
    <div class="artAndMusic">
      <div class="container-fluid">
        <div class="row justify-content-between">
          <ArtImage />
        </div>
        <div>
          <MusicPlaylist />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArtImage from "../presenters/ArtImagePresenter.vue";
import MusicPlaylist from "../presenters/MusicPlaylistPresenter.vue";
import { ref } from "vue";
import NavBarPresenter from "@/presenters/NavBarPresenter";
export default {
  name: "ArtAndMusic",
  data() {
    return {};
  },
  setup() {
    return {
      tab: ref(""),
    };
  },
  components: {
    NavBarPresenter,
    ArtImage,
    MusicPlaylist,
  },
  methods: {},
};
</script>
