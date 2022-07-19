<template>
  <div class="q-pa-md">
    <q-toolbar class="no-shadow py-1 row">
      <q-btn flat class="moodyLogo btn col-md-3 col-xs-12" href="/"
        ><h3>Moody</h3></q-btn
      >
      <q-space />
      <div class="row col-xs-12 col-md-9 align-items-md-stretch">
        <q-btn
          no-caps
          size="18px"
          flat
          id="rechoose-mood"
          class="btn mx-1 col-md-4 col-xs-12"
          href="/"
          >Rechoose&nbsp;Mood</q-btn
        >
        <q-btn
          no-caps
          size="18px"
          flat
          id="mycollection"
          class="btn mx-1 col-md-4 col-xs-12"
          v-on:click="getCollection"
        >
          My&nbsp;Collection</q-btn
        >
        <q-btn
          v-if="user.loggedIn"
          no-caps
          size="18px"
          flat
          id="signin"
          class="btn mx-1 col-md-3 col-xs-12"
          @click="logOut"
          >Sign&nbsp;out</q-btn
        >
        <q-btn
          v-else
          no-caps
          size="18px"
          flat
          class="btn mx-1 col-md-2 col-xs-12"
          href="/sign-in"
          >Sign&nbsp;in</q-btn
        >
      </div>
    </q-toolbar>
  </div>
</template>
<script>
export default {
  props: ["user"],
  name: "NavBarView",

  emits: ["onLogOut"],
  mounted() {},
  methods: {
    logOut() {
      this.$emit("onLogOut");
    },
    getCollection() {
      this.$router.push("/my-collection");
    },
  },
};
</script>
<style scoped></style>
