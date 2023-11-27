<template>
  <!-- Begin::Loading_Screen -->
  <div v-if="pageLoading" class="d-flex flex-column flex-center">
    <span class="spinner-border text-primary" role="status"></span>
    <span class="text-gray-800 fs-6 fw-semibold mt-5">Carregando...</span>
  </div>
  <!-- End::Loading_Screen -->
  <div v-else>
    <div class="card">
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <h5 class="card-title">Recomendações</h5>
            <p class="card-text">
              Abaixo temos uma lista de musicas e artistas recomendados para
              você:
            </p>
          </div>
          <div>
            <button
              class="btn btn-primary"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#recommendationsModal"
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="datatableLoading">Carregando Recomendações...</div>
    <div v-else-if="tableData.length === 0">
      <div class="card mt-5">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between">
            Você não possui nenhuma recomendação
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      v-for="recommendation in tableData"
      :key="recommendation.id"
      :class="`card mt-5 border border-${computedColorType(
        recommendation.type
      )}`"
    >
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h5 class="card-title">{{ recommendation.name }}</h5>
          <div>
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary me-2"
              data-bs-toggle="modal"
              data-bs-target="#recommendationsUpdateModal"
              @click="
                () => {
                  editRecommendation = recommendation;
                }
              "
            >
              Editar
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              @click="onDelete(recommendation)"
            >
              Excluir
            </button>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <p class="card-text">
            Tipo: {{ computedTextType(recommendation.type) }}
            <br />
            {{ computedTextType(recommendation.type) }}s:
          </p>
        </div>

        <div class="d-flex gap-3 flex-wrap">
          <div
            v-if="recommendation.type === 'artist'"
            class="card"
            style="width: 16rem"
            v-for="artist in recommendation.artists"
            :key="artist.id"
          >
            <img
              src="../assets/artist_placeholder.jpg"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">{{ artist.name }}</h5>
              <p class="card-text">Idade: {{ artist.age }} <br /></p>
            </div>
          </div>
          <div
            v-else
            class="card"
            style="width: 16rem"
            v-for="music in recommendation.musics"
            :key="music.id"
          >
            <img
              src="../assets/music_placeholder.jpg"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">{{ music.name }}</h5>
              <p class="card-text">
                Duração: {{ music.duration }} <br />
                Ano de Lançamento:
                {{ formateYear(music.releaseDate) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal-Insert -->
  <div class="modal" id="recommendationsModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="recommendationsModalLabel">
            Adicionar Recommendation
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <VForm
            class="form"
            id="kt_recommendation_form"
            @submit="onSubmit"
            :validation-schema="recommendationScheme"
          >
            <div class="fv-row mb-10">
              <!--begin::Wrapper-->
              <div class="d-flex flex-stack mb-2">
                <!--begin::Label-->
                <label class="form-label fw-bold text-dark fs-6 mb-0"
                  >Nome</label
                >
                <!--end::Label-->
              </div>
              <!--end::Wrapper-->

              <!--begin::Input-->
              <Field
                tabindex="2"
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="name"
                autocomplete="off"
              />
              <!--end::Input-->
              <div class="fv-plugins-message-container">
                <div class="text-danger">
                  <ErrorMessage name="name" />
                </div>
              </div>
            </div>
            <div class="fv-row mb-10">
              <!--begin::Wrapper-->
              <div class="d-flex flex-stack mb-2">
                <!--begin::Label-->
                <label class="form-label fw-bold text-dark fs-6 mb-0"
                  >Tipo</label
                >
                <!--end::Label-->
              </div>
              <!--end::Wrapper-->

              <!--begin::Input-->
              <Field
                tabindex="2"
                class="form-control form-control-lg form-control-solid"
                name="type"
                as="select"
                v-model:model-value="recommendationTypeInput"
              >
                <option disabled default value="">
                  Selecione o tipo da recomendação
                </option>
                <option value="music">Musica</option>
                <option value="artist">Artista</option>
              </Field>
              <!--end::Input-->
              <div class="fv-plugins-message-container">
                <div class="text-danger">
                  <ErrorMessage name="type" />
                </div>
              </div>
            </div>
            <div
              class="fv-row mb-10"
              v-if="recommendationTypeInput === 'music'"
            >
              <!--begin::Wrapper-->
              <div class="d-flex flex-stack mb-2">
                <!--begin::Label-->
                <label class="form-label fw-bold text-dark fs-6 mb-0"
                  >Nome da Música</label
                >
                <!--end::Label-->
              </div>
              <!--end::Wrapper-->

              <!--begin::Input-->
              <Field
                tabindex="2"
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="music"
                autocomplete="off"
              />
              <!--end::Input-->
              <div class="fv-plugins-message-container">
                <div class="text-danger">
                  <ErrorMessage name="music" />
                </div>
              </div>
            </div>
            <div
              class="fv-row mb-10"
              v-else-if="recommendationTypeInput === 'artist'"
            >
              <!--begin::Wrapper-->
              <div class="d-flex flex-stack mb-2">
                <!--begin::Label-->
                <label class="form-label fw-bold text-dark fs-6 mb-0"
                  >Nome do Artista</label
                >
                <!--end::Label-->
              </div>
              <!--end::Wrapper-->

              <!--begin::Input-->
              <Field
                tabindex="2"
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="artist"
                autocomplete="off"
              />
              <!--end::Input-->
              <div class="fv-plugins-message-container">
                <div class="text-danger">
                  <ErrorMessage name="artist" />
                </div>
              </div>
            </div>
            <div class="modal-body d-flex justify-content-end">
              <button
                type="button"
                class="btn btn-secondary me-1"
                data-bs-dismiss="modal"
              >
                Fechar
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="submiting"
              >
                Adicionar
              </button>
            </div>
          </VForm>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" id="recommendationsUpdateModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="recommendationsUpdateModalLabel">
            Atualizando Recommendation
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <VForm
            class="form"
            id="kt_recommendation_update_form"
            @submit="onUpdate"
            :validation-schema="recommendationScheme"
          >
            <div class="fv-row mb-10">
              <!--begin::Wrapper-->
              <div class="d-flex flex-stack mb-2">
                <!--begin::Label-->
                <label class="form-label fw-bold text-dark fs-6 mb-0"
                  >Nome</label
                >
                <!--end::Label-->
              </div>
              <!--end::Wrapper-->

              <!--begin::Input-->
              <Field
                tabindex="2"
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="name"
                autocomplete="off"
              />
              <!--end::Input-->
              <div class="fv-plugins-message-container">
                <div class="text-danger">
                  <ErrorMessage name="name" />
                </div>
              </div>
            </div>
            <div class="fv-row mb-10">
              <!--begin::Wrapper-->
              <div class="d-flex flex-stack mb-2">
                <!--begin::Label-->
                <label class="form-label fw-bold text-dark fs-6 mb-0"
                  >Tipo</label
                >
                <!--end::Label-->
              </div>
              <!--end::Wrapper-->

              <!--begin::Input-->
              <Field
                tabindex="2"
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="type"
                autocomplete="off"
                :model-value="editRecommendation.type"
                disabled
              />
              <!--end::Input-->
              <div class="fv-plugins-message-container">
                <div class="text-danger">
                  <ErrorMessage name="type" />
                </div>
              </div>
            </div>

            <div class="modal-body d-flex justify-content-end">
              <button
                type="button"
                class="btn btn-secondary me-1"
                data-bs-dismiss="modal"
              >
                Fechar
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="submiting"
              >
                Adicionar
              </button>
            </div>
          </VForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onBeforeMount, computed } from "vue";
import { useRecommendationsStore } from "../stores/recommendations";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import Swal from "sweetalert2";
import * as Yup from "yup";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "home",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const storeRecommendations = useRecommendationsStore();
    const pageLoading = ref(true);
    const datatableLoading = ref(false);
    const submiting = ref(false);
    const editRecommendation = ref({});
    const recommendationTypeInput = ref("");

    // Create form validation object
    const recommendationScheme = Yup.object().shape({
      name: Yup.string().required("Nome é obrigatório").label("name"),
      type: Yup.string()
        .oneOf(["music", "artist"])
        .required("Tipo é obrigatório")
        .label("name"),
    });

    onBeforeMount(async () => {
      await storeRecommendations.getRecommendations();
      pageLoading.value = false;
    });

    // Form submit function
    const onSubmit = async (values) => {
      submiting.value = true;

      // Send login request
      await storeRecommendations.insertRecommendation(values);
      const error = Object.values(storeRecommendations.errors);

      if (error.length === 0) {
        Swal.fire({
          text: "Recomendação registrada com sucesso",
          icon: "success",
          confirmButtonText: "Ok!",
          heightAuto: false,
        });
      } else {
        Swal.fire({
          text: error,
          icon: "error",
          confirmButtonText: "Tente novamente!",
          heightAuto: false,
        }).then(() => {
          storeRecommendations.errors = {};
        });
      }

      submiting.value = false;

      datatableLoading.value = true;
      await storeRecommendations.getRecommendations();
      datatableLoading.value = false;
    };

    const onDelete = async (recommendation) => {
      await storeRecommendations.deleteRecommendation(recommendation);
      const error = Object.values(storeRecommendations.errors);

      if (error.length === 0) {
        Swal.fire({
          text: "Recomendação deletada com sucesso",
          icon: "success",
          confirmButtonText: "Ok!",
          heightAuto: false,
        });
      } else {
        Swal.fire({
          text: error,
          icon: "error",
          confirmButtonText: "Tente novamente!",
          heightAuto: false,
        }).then(() => {
          storeRecommendations.errors = {};
        });
      }

      submiting.value = false;

      datatableLoading.value = true;
      await storeRecommendations.getRecommendations();
      datatableLoading.value = false;
    };

    const onUpdate = async (value) => {
      submiting.value = true;

      await storeRecommendations.updateRecommendation({
        id: editRecommendation.value.id,
        name: value.name,
      });
      const error = Object.values(storeRecommendations.errors);

      if (error.length === 0) {
        Swal.fire({
          text: "Recomendação atualizada com sucesso",
          icon: "success",
          confirmButtonText: "Ok!",
          heightAuto: false,
        });
      } else {
        Swal.fire({
          text: error,
          icon: "error",
          confirmButtonText: "Tente novamente!",
          heightAuto: false,
        }).then(() => {
          storeRecommendations.errors = {};
        });
      }

      submiting.value = false;

      datatableLoading.value = true;
      await storeRecommendations.getRecommendations();
      datatableLoading.value = false;
    };

    // Computed
    const computedRecommendationsRowData = computed(() => {
      let recommendationsRowData = [];

      storeRecommendations.recommendations.forEach((recommendation) => {
        const recommendationData = {
          id: recommendation.id ? recommendation.id : "Error",
          name: recommendation.name ? recommendation.name : "Error",
          type: recommendation.type ? recommendation.type : "Error",
        };

        if (recommendation.type === "artist") {
          recommendationData.artists = recommendation.artists
            ? recommendation.artists
            : "Error";
        } else {
          recommendationData.musics = recommendation.musics
            ? recommendation.musics
            : "Error";
        }
        recommendationsRowData.push(recommendationData);
      });

      return recommendationsRowData;
    });
    const computedTextType = computed(() => {
      return (type) => {
        if (type === "music") {
          return "Música";
        } else if (type === "artist") {
          return "Artista";
        }
      };
    });
    const computedColorType = computed(() => {
      return (type) => {
        if (type === "music") {
          return "primary";
        } else if (type === "artist") {
          return "success";
        }
      };
    });

    const tableData = ref(computedRecommendationsRowData);

    const formateYear = (date) => {
      if (!date) return "";
      let formatedDate = new Date(date);
      return formatedDate.getFullYear();
    };

    return {
      tableData,
      pageLoading,
      datatableLoading,
      onSubmit,
      recommendationScheme,
      submiting,
      onDelete,
      onUpdate,
      editRecommendation,
      recommendationTypeInput,
      computedTextType,
      computedColorType,
      formateYear,
    };
  },
});
</script>
