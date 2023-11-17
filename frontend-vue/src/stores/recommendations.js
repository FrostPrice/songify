import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useRecommendationsStore = defineStore("recommendations", () => {
  const errors = ref({});
  const recommendations = ref([]);

  function setRecommendations(recommendationsData) {
    recommendations.value = recommendationsData;
    errors.value = {};
  }

  function setError(error) {
    errors.value = { ...error };
  }

  function getRecommendations() {
    return axios
      .get("api/recommendations")
      .then(({ data }) => {
        setRecommendations(data);
      })
      .catch(({ response }) => {
        if (!response?.data) {
          setError({ message: response.statusText });
        } else {
          setError(response.data);
        }
      });
  }

  function insertRecommendation(recommendation) {
    return axios
      .post("api/recommendations", recommendation)
      .then(({ data }) => {
        setRecommendations(data);
      })
      .catch(({ response }) => {
        if (!response?.data) {
          setError({ message: response.statusText });
        } else {
          setError(response.data);
        }
      });
  }

  function updateRecommendation(recommendation) {
    return axios
      .put("api/recommendations/" + recommendation.id, { ...recommendation })
      .then()
      .catch(({ response }) => {
        if (!response?.data) {
          setError({ message: response.statusText });
        } else {
          setError(response.data);
        }
      });
  }

  function deleteRecommendation(recommendation) {
    return axios
      .delete("api/recommendations/" + recommendation.id)
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
    recommendations,
    getRecommendations,
    insertRecommendation,
    updateRecommendation,
    deleteRecommendation,
  };
});
