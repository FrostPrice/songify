import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useAlbumsStore = defineStore("albums", () => {
  const errors = ref({});
  const albums = ref([]);

  function setAlbums(albumsData) {
    albums.value = albumsData;
    errors.value = {};
  }

  function setError(error) {
    errors.value = { ...error };
  }

  function getAlbums() {
    return axios
      .get("api/albums")
      .then(({ data }) => {
        setAlbums(data);
      })
      .catch(({ response }) => {
        if (!response?.data) {
          setError({ message: response.statusText });
        } else {
          setError(response.data);
        }
      });
  }

  function insertAlbum(album) {
    return axios
      .post("api/albums", album)
      .then(({ data }) => {
        setAlbums(data);
      })
      .catch(({ response }) => {
        if (!response?.data) {
          setError({ message: response.statusText });
        } else {
          setError(response.data);
        }
      });
  }

  function updateAlbum(album) {
    return axios
      .put("api/albums/" + album.id, { ...album })
      .then()
      .catch(({ response }) => {
        if (!response?.data) {
          setError({ message: response.statusText });
        } else {
          setError(response.data);
        }
      });
  }

  function deleteAlbum(album) {
    return axios
      .delete("api/albums/" + album.id)
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
    albums,
    getAlbums,
    insertAlbum,
    updateAlbum,
    deleteAlbum,
  };
});
