<template>
  <PromiseNoData :promiseState="promiseState">
    <MusicCollection :savedPlaylists="promiseState.data" :user="user" />
  </PromiseNoData>
</template>

<script>
import MusicCollection from "../views/MusicCollectionView.vue";
import { mapState } from "vuex";
import { getToken } from "@/musicSource";
import { client_id, client_secret, TOKEN } from "@/clientSecretSpotifyConfig";
import PromiseNoData from "../views/PromiseNoData.vue";

export default {
  name: "MusicCollectionPresenter",
  components: {
    MusicCollection,
    PromiseNoData,
  },
  data() {
    return {
      promiseState: {
        loading: false,
        data: [],
        error: null,
      },
    };
  },

  watch: {
    playlistIdList() {
      if (this.playlistIdList.length !== 0) {
        this.getMusic();
      }
    },
  },

  async created() {
    if (this.playlistIdList.length !== 0) {
      this.promiseState.loading = true;
      try {
        this.promiseState.data = await Promise.all(
          this.playlistIdList.map(async function (id) {
            const data = await getToken(id, TOKEN, client_id, client_secret);
            return data;
          })
        );
      } catch (error) {
        this.promiseState.error = error;
      } finally {
        this.promiseState.loading = false;
      }
    }
  },

  methods: {
    async getMusic() {
      this.promiseState.loading = true;
      try {
        this.promiseState.data = await Promise.all(
          this.playlistIdList.map(async function (id) {
            const data = await getToken(id, TOKEN, client_id, client_secret);
            return data;
          })
        );
      } catch (error) {
        this.promiseState.error = error;
      } finally {
        this.promiseState.loading = false;
      }
    },
  },

  computed: {
    ...mapState(["playlistIdList", "user"]),
  },
};
</script>
