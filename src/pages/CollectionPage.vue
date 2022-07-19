<template class="artAndMusic">
  <div>
    <NavBarPresenter />
    <div class="artAndMusic">
      <div class="container-fluid">
        <div class="row justify-content-between">
          <div class="row justify-content-between">
            <div class="col-md-4 col-10">
              <q-btn
                no-caps
                size="lg"
                outline
                class="btn mx-1 col-md-3 col-xs-12"
                href="/art-music"
                ><q-icon name="mdi-arrow-left" />&nbsp;Back to Explore
                Page&nbsp;</q-btn
              >
            </div>
          </div>
          <div class="col-md-8 col-12 py-2">
            <ArtCollection />
          </div>
          <div class="col-md-4 col-12 py-2">
            <MusicCollection />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArtCollection from "../presenters/ArtCollectionPresenter.vue";
import MusicCollection from "../presenters/MusicCollectionPresenter.vue";
import NavBarPresenter from "@/presenters/NavBarPresenter";
export default {
  name: "CollectionPage",
  data() {
    return {};
  },
  components: {
    ArtCollection,
    MusicCollection,
    NavBarPresenter,
  },
};
</script>
