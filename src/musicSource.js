import { MUSIC_URL } from "./apiConfig";

function callAuthorization(mood, TOKEN, client_id, client_secret) {
  function treatHTTPResponseACB(response) {
    if (response.status !== 200) {
      throw "API Error !" + response.status;
    }
    return response.json();
  }

  function transformResultACB(jsObj) {
    let newJsObj = {};
    newJsObj.access_token = jsObj.access_token;
    newJsObj.mood = mood;
    return newJsObj;
  }

  return fetch(TOKEN, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(client_id + ":" + client_secret),
    },
    body: "grant_type=client_credentials",
  })
    .then(treatHTTPResponseACB)
    .then(transformResultACB)
    .then(getMusicDetails);
}

function getMusicDetails(jsObjToken) {
  let endpoint = "search?q=";
  let searchParams = new URLSearchParams(jsObjToken.mood);
  let type = "&type=playlist";
  let musicObject = {};

  function treatHTTPResponseACB(response) {
    if (response.status !== 200) {
      throw "API Error !" + response.status;
    }
    return response.json();
  }

  function transformResultACB(jsObj) {
    var generatedPlaylist =
      jsObj.playlists.items[
        Math.floor(Math.random() * jsObj.playlists.items.length)
      ];
    musicObject.id = generatedPlaylist.id;
    musicObject.description = generatedPlaylist.description;
    musicObject.image = generatedPlaylist.images[0].url;
    musicObject.name = generatedPlaylist.name;
    musicObject.externalUrl =
      "https://open.spotify.com/embed/playlist/" + generatedPlaylist.id;
    return musicObject;
  }

  return fetch(MUSIC_URL + endpoint + searchParams + type, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + jsObjToken.access_token,
    },
  })
    .then(treatHTTPResponseACB)
    .then(transformResultACB);
}

function getToken(playlistId, TOKEN, client_id, client_secret) {
  function treatHTTPResponseACB(response) {
    if (response.status !== 200) {
      throw "API Error !" + response.status;
    }
    return response.json();
  }

  function transformResultACB(jsObj) {
    let newJsObj = {};
    newJsObj.access_token = jsObj.access_token;
    newJsObj.playlistId = playlistId;
    return newJsObj;
  }

  return fetch(TOKEN, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(client_id + ":" + client_secret),
    },
    body: "grant_type=client_credentials",
  })
    .then(treatHTTPResponseACB)
    .then(transformResultACB)
    .then(getPlaylist);
}

function getPlaylist(jsObjToken) {
  let endpoint = "playlists/";

  function treatHTTPResponseACB(response) {
    if (response.status !== 200) {
      throw "API Error !" + response.status;
    }
    return response.json();
  }

  function transformResultACB(jsObj) {
    let musicObject = {};
    musicObject.id = jsObj.id;
    musicObject.description = jsObj.description;
    musicObject.image = jsObj.images[0].url;
    musicObject.name = jsObj.name;
    musicObject.externalUrl =
      "https://open.spotify.com/embed/playlist/" + jsObj.id;
    return musicObject;
  }

  return fetch(MUSIC_URL + endpoint + jsObjToken.playlistId, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + jsObjToken.access_token,
    },
  })
    .then(treatHTTPResponseACB)
    .then(transformResultACB);
}

export { callAuthorization, getToken, getPlaylist };
