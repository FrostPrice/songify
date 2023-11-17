import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useMusicsStore = defineStore("musics", () => {
  const errors = ref({});
  const musics = ref([]);

  function setMusics(musicData) {
    musics.value = musicData;
    errors.value = {};
  }

  function setError(error) {
    errors.value = { ...error };
  }

  function getMusics() {
    return axios
      .get("api/musics")
      .then(({ data }) => {
        setMusics(data);
      })
      .catch(({ response }) => {
        if (!response?.data) {
          setError({ message: response.statusText });
        } else {
          setError(response.data);
        }
      });
  }

  function insertMusic(music) {
    return axios
      .post("api/musics", music)
      .then(({ data }) => {
        setMusics(data);
      })
      .catch(({ response }) => {
        if (!response?.data) {
          setError({ message: response.statusText });
        } else {
          setError(response.data);
        }
      });
  }

  function updateMusic(music) {
    return axios
      .put("api/musics/" + music.id, { ...music })
      .then()
      .catch(({ response }) => {
        if (!response?.data) {
          setError({ message: response.statusText });
        } else {
          setError(response.data);
        }
      });
  }

  function deleteMusic(music) {
    return axios
      .delete("api/musics/" + music.id)
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
    musics,
    getMusics,
    insertMusic,
    updateMusic,
    deleteMusic,
  };
});
