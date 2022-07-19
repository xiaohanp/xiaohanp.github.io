<template>
  <HomeView
    :user="user"
    :moodNotChosen="moodNotChosen"
    @changeMoodNotChosen="changeMoodNotChosen"
    @setMood="setMood"
    @generateArtAndPlaylist="generateArtAndPlaylist"
  />
</template>

<script>
import HomeView from "../views/HomeView.vue";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  components: { HomeView },
  data() {
    return {
      moodNotChosen: true,
    };
  },
  methods: {
    ...mapActions(["setMood"]),

    changeMoodNotChosen() {
      this.moodNotChosen = this.moodType === {};
    },

    generateArtAndPlaylist() {
      this.$store.dispatch("generateArtAndPlaylist");
      this.$router.push("/art-music");
    },
  },
  computed: {
    ...mapState(["moodType"]),
    ...mapGetters({ user: "user" }),
  },
};
</script>

<style scoped></style>
