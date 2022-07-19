import { BASE_URL, IMAGE_URL } from "./apiConfig";
//search artwork
function searchArtwork(params) {
  let endPointSearch = "search?q=";
  let endPointPublic = "&query[term][is_public_domain]=true";
  let searchParams = new URLSearchParams(params);

  function treatHTTPResponseACB(response) {
    if (response.status !== 200) {
      throw "API Error !" + response.status;
    }
    return response.json();
  }

  function transformResultACB(jsObj) {
    return jsObj.data;
  }

  //Generate a random art from the search results
  function generateArtId(artArray) {
    return artArray[Math.floor(Math.random() * artArray.length)].id;
  }

  return fetch(BASE_URL + endPointSearch + searchParams + endPointPublic, {
    method: "GET",
  })
    .then(treatHTTPResponseACB)
    .then(transformResultACB)
    .then(generateArtId)
    .then(getArtworkDetails);
}

//Get the information of the art
function getArtworkDetails(artworkId) {
  let singleArtObject = {};
  let endPointObject = "";
  let endPointImage = "/full/843,/0/default.jpg";
  let endPointFields =
    "?fields=title,image_id,artist_display,place_of_origin,artwork_type_title,credit_line";

  function transformResultACB(jsObj) {
    singleArtObject.imageId = artworkId;
    singleArtObject.title = jsObj.data.title;
    singleArtObject.imageUrl = IMAGE_URL + jsObj.data.image_id + endPointImage;
    singleArtObject.artist_display = jsObj.data.artist_display;
    singleArtObject.artwork_type_title = jsObj.data.artwork_type_title;
    singleArtObject.place_of_origin = jsObj.data.place_of_origin;
    singleArtObject.credit_line = jsObj.data.credit_line;
    return singleArtObject;
  }

  function treatHTTPResponseACB(response) {
    if (response.status !== 200) {
      throw "API Error !" + response.status;
    }
    return response.json();
  }

  return fetch(BASE_URL + endPointObject + artworkId + endPointFields, {
    method: "GET",
  })
    .then(treatHTTPResponseACB)
    .then(transformResultACB);
}

export { searchArtwork, getArtworkDetails };
