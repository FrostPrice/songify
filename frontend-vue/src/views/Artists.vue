<template>
  <!-- Begin::Loading_Screen -->
  <div v-if="pageLoading" class="d-flex flex-column flex-center">
    <span class="spinner-border text-primary" role="status"></span>
    <span class="text-gray-800 fs-6 fw-semibold mt-5">Carregando...</span>
  </div>
  <!-- End::Loading_Screen -->
  <div v-else class="card">
    <div class="card-body">
      <div class="d-flex align-items-center justify-content-between">
        <div>
          <h5 class="card-title">Artistas</h5>
          <p class="card-text">Listagem de Artistas cadastrados no sistema.</p>
        </div>
        <div>
          <button
            class="btn btn-primary"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#artistsModal"
          >
            Adicionar
          </button>
        </div>
      </div>

      <div v-if="datatableLoading">Carregando tabela...</div>
      <table v-else class="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Idade</th>
            <th scope="col">Gênero Musical</th>
            <th scope="col">Opções</th>
          </tr>
        </thead>
        <tbody>
          <div v-if="tableData.length === 0">Nenhum Artista Cadastrado!</div>
          <tr v-else v-for="artist in tableData" :key="artist.id" scope="row">
            <td>{{ artist.id }}</td>
            <td>{{ artist.name }}</td>
            <td>{{ artist.age }}</td>
            <td>{{ artist.genre }}</td>
            <td>
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                data-bs-toggle="modal"
                data-bs-target="#artistsUpdateModal"
                @click="
                  () => {
                    editArtist = artist;
                  }
                "
              >
                Editar
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                @click="onDelete(artist)"
              >
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Modal-Insert -->
  <div class="modal" id="artistsModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="artistsModalLabel">
            Adicionar Artista
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
            id="kt_artist_form"
            @submit="onSubmit"
            :validation-schema="artistScheme"
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
                  >Idade</label
                >
                <!--end::Label-->
              </div>
              <!--end::Wrapper-->

              <!--begin::Input-->
              <Field
                tabindex="2"
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="age"
                autocomplete="off"
              />
              <!--end::Input-->
              <div class="fv-plugins-message-container">
                <div class="text-danger">
                  <ErrorMessage name="age" />
                </div>
              </div>
            </div>
            <div class="fv-row mb-10">
              <!--begin::Wrapper-->
              <div class="d-flex flex-stack mb-2">
                <!--begin::Label-->
                <label class="form-label fw-bold text-dark fs-6 mb-0"
                  >Genêro Musical</label
                >
                <!--end::Label-->
              </div>
              <!--end::Wrapper-->

              <!--begin::Input-->
              <Field
                tabindex="2"
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="genre"
                autocomplete="off"
              />
              <!--end::Input-->
              <div class="fv-plugins-message-container">
                <div class="text-danger">
                  <ErrorMessage name="genre" />
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

  <div class="modal" id="artistsUpdateModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="artistsUpdateModalLabel">
            Atualizando Artista
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
            id="kt_artist_update_form"
            @submit="onUpdate"
            :validation-schema="artistScheme"
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
                :model-value="editArtist.name"
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
                  >Idade</label
                >
                <!--end::Label-->
              </div>
              <!--end::Wrapper-->

              <!--begin::Input-->
              <Field
                tabindex="2"
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="age"
                autocomplete="off"
                :model-value="editArtist.age"
              />
              <!--end::Input-->
              <div class="fv-plugins-message-container">
                <div class="text-danger">
                  <ErrorMessage name="age" />
                </div>
              </div>
            </div>
            <div class="fv-row mb-10">
              <!--begin::Wrapper-->
              <div class="d-flex flex-stack mb-2">
                <!--begin::Label-->
                <label class="form-label fw-bold text-dark fs-6 mb-0"
                  >Genêro Musical</label
                >
                <!--end::Label-->
              </div>
              <!--end::Wrapper-->

              <!--begin::Input-->
              <Field
                tabindex="2"
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="genre"
                autocomplete="off"
                :model-value="editArtist.musicPreference"
              />
              <!--end::Input-->
              <div class="fv-plugins-message-container">
                <div class="text-danger">
                  <ErrorMessage name="genre" />
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
import { useArtistsStore } from "../stores/artists";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import Swal from "sweetalert2";
import * as Yup from "yup";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "artists",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const storeArtists = useArtistsStore();
    const pageLoading = ref(true);
    const datatableLoading = ref(false);
    const submiting = ref(false);
    const editArtist = ref({});

    //Create form validation object
    const artistScheme = Yup.object().shape({
      name: Yup.string().required("Nome é obrigatório").label("name"),
      age: Yup.number().required("Idade é obrigatória").label("age"),
      genre: Yup.string(),
    });

    onBeforeMount(async () => {
      await storeArtists.getArtists();
      pageLoading.value = false;
    });

    // Form submit function
    const onSubmit = async (values) => {
      submiting.value = true;
      values = values;

      // Send login request
      await storeArtists.insertArtist(values);
      const error = Object.values(storeArtists.errors);

      if (error.length === 0) {
        Swal.fire({
          text: "Artista registrado com sucesso",
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
          storeArtists.errors = {};
        });
      }

      submiting.value = false;

      datatableLoading.value = true;
      await storeArtists.getArtists();
      datatableLoading.value = false;
    };

    const onDelete = async (artist) => {
      await storeArtists.deleteArtist(artist);
      const error = Object.values(storeArtists.errors);

      if (error.length === 0) {
        Swal.fire({
          text: "Artista deletado com sucesso",
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
          storeArtists.errors = {};
        });
      }

      datatableLoading.value = true;
      await storeArtists.getArtists();
      datatableLoading.value = false;
    };

    const onUpdate = async (value) => {
      submiting.value = true;

      await storeArtists.updateArtist({ id: editArtist.value.id, ...value });
      const error = Object.values(storeArtists.errors);

      if (error.length === 0) {
        Swal.fire({
          text: "Artista atualizado com sucesso",
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
          storeArtists.errors = {};
        });
      }

      submiting.value = false;

      datatableLoading.value = true;
      await storeArtists.getArtists();
      datatableLoading.value = false;
    };

    // Computed
    const computedArtistsRowData = computed(() => {
      let artistsRowData = [];

      storeArtists.artists.forEach((artist) => {
        const artistData = {
          id: artist.id ? artist.id : "Error",
          name: artist.name ? artist.name : "Error",
          age: artist.age ? artist.age : "Error",
          genre: artist.genre ? artist.genre : "Error",
        };
        artistsRowData.push(artistData);
      });

      return artistsRowData;
    });

    const tableData = ref(computedArtistsRowData);

    return {
      tableData,
      pageLoading,
      datatableLoading,
      onSubmit,
      artistScheme,
      submiting,
      onDelete,
      onUpdate,
      editArtist,
    };
  },
});
</script>
