import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useGenresStore = defineStore("genres", () => {
  const errors = ref({});
  const genres = ref([]);

  function setGenres(genresData) {
    genres.value = genresData;
    errors.value = {};
  }

  function setError(error) {
    errors.value = { ...error };
  }

  function getGenres() {
    return axios
      .get("api/genres")
      .then(({ data }) => {
        setGenres(data);
      })
      .catch(({ response }) => {
        if (!response?.data) {
          setError({ message: response.statusText });
        } else {
          setError(response.data);
        }
      });
  }

  function insertGenre(genre) {
    return axios
      .post("api/genres", genre)
      .then(({ data }) => {
        setGenres(data);
      })
      .catch(({ response }) => {
        if (!response?.data) {
          setError({ message: response.statusText });
        } else {
          setError(response.data);
        }
      });
  }

  function updateGenre(genre) {
    return axios
      .put("api/genres/" + genre.id, { ...genre })
      .then()
      .catch(({ response }) => {
        if (!response?.data) {
          setError({ message: response.statusText });
        } else {
          setError(response.data);
        }
      });
  }

  function deleteGenre(genre) {
    return axios
      .delete("api/genres/" + genre.id)
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
    genres,
    getGenres,
    insertGenre,
    updateGenre,
    deleteGenre,
  };
});
