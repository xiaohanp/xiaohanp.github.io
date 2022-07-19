import { createStore } from "vuex";
import { getArtworkDetails, searchArtwork } from "@/artSource";
import { callAuthorization, getToken } from "@/musicSource";
import { client_id, client_secret, TOKEN } from "@/clientSecretSpotifyConfig";
import { availableMoodTypes } from "@/availableMoodTypes";

const store = createStore({
  state() {
    return {
      user: {
        loggedIn: false,
        data: null,
      },
      artPromiseState: {
        loading: false,
        data: [],
        error: null,
      },
      musicPromiseState: { loading: false, data: [], error: null },
      moodType: "",
      artString: "",
      musicString: "",
      chosenMoodType: "",
      artIdList: [],
      playlistIdList: [],
      likeArtBtnColor: "black",
      likePlaylistBtnColor: "black",
      currentArtId: "",
      currentPlaylistId: "",
    };
  },
  mutations: {
    setMood(state, chosenMoodType) {
      state.chosenMoodType = chosenMoodType;
      if (chosenMoodType === "miserable") {
        state.moodType = availableMoodTypes[0];
      } else if (chosenMoodType === "sad") {
        state.moodType = availableMoodTypes[1];
      } else if (chosenMoodType === "okay") {
        state.moodType = availableMoodTypes[2];
      } else if (chosenMoodType === "happy") {
        state.moodType = availableMoodTypes[3];
      } else if (chosenMoodType === "ecstatic") {
        state.moodType = availableMoodTypes[4];
      }
    },

    // This method is for reading data in firebase and update in state
    // So the chosenMoodType can be saved when refreshing webpage
    setChosenMoodType(state, chosenMoodType) {
      state.chosenMoodType = chosenMoodType;
    },

    // This method is for reading data in firebase and update in state
    // So the moodType can be saved when refreshing webpage
    setCorrespondingMoody(state, moodType) {
      state.moodType = moodType;
    },

    setMusicString(state, musicString) {
      state.musicString = musicString;
    },

    setArtString(state, artString) {
      state.artString = artString;
    },

    setCurrentPlaylist(state, playlistId) {
      state.currentPlaylistId = playlistId;
    },

    setCurrentArt(state, artId) {
      state.currentArtId = artId;
    },

    setArtData(state, data) {
      state.artPromiseState.data = data;
    },

    setArtLoading(state, loading) {
      state.artPromiseState.loading = loading;
    },

    setArtError(state, error) {
      state.artPromiseState.error = error;
    },

    setMusicData(state, data) {
      state.musicPromiseState.data = data;
    },

    setMusicLoading(state, loading) {
      state.musicPromiseState.loading = loading;
    },

    setMusicError(state, error) {
      state.musicPromiseState.error = error;
    },

    addLikedArt(state, addedArtId) {
      state.artIdList = [...state.artIdList, addedArtId];
    },

    removeLikedArt(state, removedArtId) {
      state.artIdList = state.artIdList.filter((e) => e !== removedArtId);
    },

    addLikedPlaylist(state, addedPlaylistId) {
      state.playlistIdList = [...state.playlistIdList, addedPlaylistId];
    },

    removeLikedPlaylist(state, removedPlaylistId) {
      state.playlistIdList = state.playlistIdList.filter(
        (e) => e !== removedPlaylistId
      );
    },

    changeBtnColor(state, likeArtBtnColor) {
      state.likeArtBtnColor = likeArtBtnColor;
    },

    changePlaylistBtnColor(state, likePlaylistBtnColor) {
      state.likePlaylistBtnColor = likePlaylistBtnColor;
    },

    setLoggedIn(state, value) {
      state.user.loggedIn = value;
    },

    setUser(state, data) {
      state.user.data = data;
    },

    setCurrentArtIdList(state, list) {
      state.artIdList = list;
    },

    setCurrentPlaylistIdList(state, list) {
      state.playlistIdList = list;
    },
  },
  getters: {
    user(state) {
      return state.user;
    },

    getCurrentArt(state) {
      return state.currentArtId;
    },

    getCurrentPlaylist(state) {
      return state.currentPlaylistId;
    },

    getArtIdList(state) {
      return state.artIdList;
    },

    getPlaylistIdList(state) {
      return state.playlistIdList;
    },
  },
  actions: {
    setMood: ({ commit }, chosenMoodType) => {
      commit("setMood", chosenMoodType);
    },

    setChosenMoodType: ({ commit }, chosenMoodType) => {
      commit("setChosenMoodType", chosenMoodType);
    },

    setCorrespondingMoody: ({ commit }, mood) => {
      commit("setCorrespondingMoody", mood);
    },

    keepMusicString: ({ commit }, string) => {
      commit("setMusicString", string);
    },

    setMusicString({ commit, state }) {
      let random = Math.floor(Math.random() * state.moodType.music.length);
      commit("setMusicString", state.moodType.music[random]);
    },

    setArtString({ commit, state }) {
      let random = Math.floor(Math.random() * state.moodType.art.length);
      commit("setArtString", state.moodType.art[random]);
    },

    async doSearch({ commit, state }, params) {
      commit("setArtLoading", true);
      commit("setMusicLoading", true);
      try {
        const data = await Promise.all([
          searchArtwork(params),
          callAuthorization(params, TOKEN, client_id, client_secret),
        ]);
        commit("setArtData", data[0]);
        commit("setMusicData", data[1]);
        commit("setCurrentArt", data[0].imageId);
        commit("setCurrentPlaylist", data[1].id);
        if (state.artIdList.find((artId) => artId === data[0].imageId)) {
          commit("changeBtnColor", "pink");
        } else {
          commit("changeBtnColor", "black");
        }
        if (
          state.playlistIdList.find((playlistId) => playlistId === data[1].id)
        ) {
          commit("changePlaylistBtnColor", "pink");
        } else {
          commit("changePlaylistBtnColor", "black");
        }
      } catch (error) {
        /* commit(
          "setMusicError",
          "Invalid search, try another search word. Error Message: " +
            error.message
        ); */
        commit(
          "setArtError",
          "Invalid search, try another search word. Error Message: " +
            error.message
        );
      } finally {
        commit("setArtLoading", false);
        commit("setMusicLoading", false);
      }
    },

    async generateArtwork({ commit, state, dispatch }) {
      dispatch("setArtString");
      commit("setArtLoading", true);
      try {
        const artData = await searchArtwork(state.artString);
        commit("setArtData", artData);
        commit("setCurrentArt", artData.imageId);
        if (state.artIdList.find((artId) => artId === artData.imageId)) {
          commit("changeBtnColor", "pink");
        } else {
          commit("changeBtnColor", "black");
        }
        if (state.artPromiseState.error != null) {
          commit("setArtError", null);
        }
      } catch (error) {
        commit("setArtError", error.message);
      } finally {
        commit("setArtLoading", false);
      }
    },

    async generateMusicPlaylist({ state, commit, dispatch }) {
      dispatch("setMusicString");
      commit("setMusicLoading", true);
      try {
        const musicData = await callAuthorization(
          state.musicString,
          TOKEN,
          client_id,
          client_secret
        );
        if (
          state.playlistIdList.find((playlistId) => playlistId === musicData.id)
        ) {
          commit("changePlaylistBtnColor", "pink");
        } else {
          commit("changePlaylistBtnColor", "black");
        }
        commit("setMusicData", musicData);
        commit("setCurrentPlaylist", musicData.id);

        if (state.musicPromiseState.error != null) {
          commit("setMusicError", null);
        }
      } catch (error) {
        commit("setMusicError", error);
        throw error;
      } finally {
        commit("setMusicLoading", false);
      }
    },

    async retrieveArtwork({ commit, state }, artId) {
      if (artId !== null) {
        commit("setCurrentArt", artId);
        commit("setArtLoading", true);
        try {
          const artData = await getArtworkDetails(artId);
          commit("setArtData", artData);
          if (state.artIdList.find((id) => id === artId)) {
            commit("changeBtnColor", "pink");
          } else {
            commit("changeBtnColor", "black");
          }
          if (state.artPromiseState.error != null) {
            commit("setArtError", null);
          }
        } catch (error) {
          commit("setArtError", error.message);
        } finally {
          commit("setArtLoading", false);
        }
      }
    },

    async retrievePlaylist({ commit, state }, playlistId) {
      if (playlistId !== null) {
        commit("setCurrentPlaylist", playlistId);
        commit("setMusicLoading", true);
        try {
          const musicData = await getToken(
            playlistId,
            TOKEN,
            client_id,
            client_secret
          );
          commit("setMusicData", musicData);
          if (state.playlistIdList.find((id) => id === playlistId)) {
            commit("changePlaylistBtnColor", "pink");
          } else {
            commit("changePlaylistBtnColor", "black");
          }
          if (state.musicPromiseState.error != null) {
            commit("setMusicError", null);
          }
        } catch (error) {
          commit("setMusicError", error.message);
        } finally {
          commit("setMusicLoading", false);
        }
      }
    },

    async generateArtAndPlaylist({ dispatch }) {
      await dispatch("generateArtwork");
      await dispatch("generateMusicPlaylist");
    },

    afterClickLikeArtBtn({ commit, state }) {
      if (
        state.artIdList.find(
          (artId) => artId === state.artPromiseState.data.imageId
        )
      ) {
        commit("removeLikedArt", state.artPromiseState.data.imageId);
        commit("changeBtnColor", "black");
      } else {
        commit("addLikedArt", state.artPromiseState.data.imageId);
        commit("changeBtnColor", "pink");
      }
    },

    afterVisitorClickLike({ commit }) {
      commit("changeBtnColor", "black");
      alert("Hey, you have to log in/sign up to LIKE!");
    },

    afterClickLikePlaylistBtn({ commit, state }) {
      if (
        state.playlistIdList.find(
          (playlistId) => playlistId === state.musicPromiseState.data.id
        )
      ) {
        commit("removeLikedPlaylist", state.musicPromiseState.data.id);
        commit("changePlaylistBtnColor", "black");
      } else {
        commit("addLikedPlaylist", state.musicPromiseState.data.id);
        commit("changePlaylistBtnColor", "pink");
      }
    },

    fetchUser({ commit }, user) {
      commit("setLoggedIn", user !== null);
      if (user) {
        commit("setUser", {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        });
      } else {
        commit("setUser", null);
      }
    },

    setUserData({ commit }, payload) {
      commit("setCorrespondingMoody", payload.mood);
      commit("setChosenMoodType", payload.moodType);
      commit("setMusicString", payload.musicString);
      commit("setCurrentArt", payload.currentArtId);
      commit("setCurrentPlaylist", payload.currentPlaylistId);
    },

    setFavArt({ commit }, saved_art) {
      commit("setCurrentArtIdList", saved_art);
    },

    setFavPlaylist({ commit }, saved_playlist) {
      commit("setCurrentPlaylistIdList", saved_playlist);
    },
  },
  modules: {},
});

export default store;
