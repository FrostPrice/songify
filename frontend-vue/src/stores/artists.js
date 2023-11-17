import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useArtistsStore = defineStore("artists", () => {
  const errors = ref({});
  const artists = ref([]);

  function setArtists(artistsData) {
    artists.value = artistsData;
    errors.value = {};
  }

  function setError(error) {
    errors.value = { ...error };
  }

  function getArtists() {
    return axios
      .get("api/artists")
      .then(({ data }) => {
        setArtists(data);
      })
      .catch(({ response }) => {
        if (!response?.data) {
          setError({ message: response.statusText });
        } else {
          setError(response.data);
        }
      });
  }

  function insertArtist(artist) {
    return axios
      .post("api/artists", artist)
      .then(({ data }) => {
        setArtists(data);
      })
      .catch(({ response }) => {
        if (!response?.data) {
          setError({ message: response.statusText });
        } else {
          setError(response.data);
        }
      });
  }

  function updateArtist(artist) {
    return axios
      .put("api/artists/" + artist.id, { ...artist })
      .then()
      .catch(({ response }) => {
        if (!response?.data) {
          setError({ message: response.statusText });
        } else {
          setError(response.data);
        }
      });
  }

  function deleteArtist(artist) {
    return axios
      .delete("api/artists/" + artist.id)
      .then(() => {})
      .catch(({ response }) => {
        if (!response?.data) {
          setError({ message: response.statusText });
        } else {
          setError(response.data);
        }
      });
  }

  return {
    errors,
    artists,
    getArtists,
    insertArtist,
    updateArtist,
    deleteArtist,
  };
});
