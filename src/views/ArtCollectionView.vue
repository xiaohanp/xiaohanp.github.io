<template>
  <div v-if="user.loggedIn" class="q-pa-md row items-start q-gutter-md">
    <q-card
      class="transparent artworkImage rounded mx-auto d-block text-center"
      v-for="art in savedArtworks"
      :key="art.imageId"
    >
      <q-card-section class="px-xs-5 d-block py-2">
        <div class="text-h6">{{ art.title }}</div>
        <div class="text-subtitle2">{{ art.artist_display }}</div>
      </q-card-section>

      <a :href="`${art.imageUrl}`">
        <img style="width: 30%" v-bind:src="art.imageUrl" />
      </a>

      <q-card-section class="px-xs-5 d-block py-2">
        Type of artwork: {{ art.artwork_type_title }}
      </q-card-section>

      <q-card-section class="px-xs-5 d-block py-2">
        Place of origin: {{ art.place_of_origin }}
      </q-card-section>

      <q-card-section class="px-xs-5 d-block py-2">
        Credit: {{ art.credit_line }}
      </q-card-section>
    </q-card>
  </div>
  <div v-else>
    <h4>
      Hey, to view your loved art and music, you have to
      <a class="btn" href="/sign-in"><h3>Log in</h3></a> first!
    </h4>
  </div>
</template>

<script>
export default {
  props: ["savedArtworks", "user"],
};
</script>
<style>
@import "bootstrap/dist/css/bootstrap.min.css";
@import "https://fonts.googleapis.com/css2?family=Fira+Sans+Extra+Condensed:wght@300;400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@500;600&family=Noto+Sans&family=Open+Sans:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap";
@import "../stylesheet/style.css";
</style>
