<template>
  <PromiseNoData :promiseState="promiseState">
    <ArtCollection :savedArtworks="promiseState.data" :user="user" />
  </PromiseNoData>
</template>

<script>
import ArtCollection from "../views/ArtCollectionView.vue";
import { mapState } from "vuex";
import { getArtworkDetails } from "@/artSource";
import PromiseNoData from "../views/PromiseNoData.vue";

export default {
  name: "ArtCollectionPresenter",
  components: {
    ArtCollection,
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
    artIdList() {
      if (this.artIdList.length !== 0) {
        this.getArt();
      }
    },
  },

  async created() {
    if (this.artIdList.length !== 0) {
      this.promiseState.loading = true;
      try {
        this.promiseState.data = await Promise.all(
          this.artIdList.map(async function (id) {
            const data = await getArtworkDetails(id);
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
    async getArt() {
      this.promiseState.loading = true;
      try {
        this.promiseState.data = await Promise.all(
          this.artIdList.map(async function (id) {
            const data = await getArtworkDetails(id);
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
    ...mapState(["artIdList", "user"]),
  },
};
</script>
