<template>
  <NavBarView :user="user" @onLogOut="logOut" />
</template>

<script>
import NavBarView from "@/views/NavBarView";
import { mapGetters } from "vuex";

export default {
  name: "NavBarPresenter",
  components: { NavBarView },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    logOut() {},
  },
};
</script>

<style scoped></style>
