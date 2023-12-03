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
          <h5 class="card-title">Albuns</h5>
          <p class="card-text">Listagem de Albuns cadastrados no sistema.</p>
        </div>
        <div>
          <button
            class="btn btn-primary"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#albumsModal"
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
            <th scope="col">Duração</th>
            <th scope="col">Data de Lançamento</th>
            <th scope="col">Artistas</th>
            <th scope="col">Opções</th>
          </tr>
        </thead>
        <tbody>
          <div v-if="tableData.length === 0">Nenhum Album Cadastrado!</div>
          <tr v-else v-for="album in tableData" :key="album.id" scope="row">
            <td>{{ album.id }}</td>
            <td>{{ album.name }}</td>
            <td>{{ album.duration }}</td>
            <td>{{ formateDatetimeCalendar(album.releaseDate) }}</td>
            <td>{{ album.artists }}</td>
            <td>
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                data-bs-toggle="modal"
                data-bs-target="#albumsUpdateModal"
                @click="
                  () => {
                    editAlbum = album;
                  }
                "
              >
                Editar
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                @click="onDelete(album)"
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
  <div class="modal" id="albumsModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="albumsModalLabel">
            Adicionar Album
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
            id="kt_album_form"
            @submit="onSubmit"
            :validation-schema="albumScheme"
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
                  >Duração</label
                >
                <!--end::Label-->
              </div>
              <!--end::Wrapper-->

              <!--begin::Input-->
              <Field
                tabindex="2"
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="duration"
                autocomplete="off"
              />
              <!--end::Input-->
              <div class="fv-plugins-message-container">
                <div class="text-danger">
                  <ErrorMessage name="duration" />
                </div>
              </div>
            </div>
            <div class="fv-row mb-10">
              <!--begin::Wrapper-->
              <div class="d-flex flex-stack mb-2">
                <!--begin::Label-->
                <label class="form-label fw-bold text-dark fs-6 mb-0"
                  >Data de Lançamento</label
                >
                <!--end::Label-->
              </div>
              <!--end::Wrapper-->

              <!--begin::Input-->
              <Field
                tabindex="2"
                class="form-control form-control-lg form-control-solid"
                type="date"
                name="releaseDate"
                autocomplete="off"
              />
              <!--end::Input-->
              <div class="fv-plugins-message-container">
                <div class="text-danger">
                  <ErrorMessage name="releaseDate" />
                </div>
              </div>
            </div>
            <div class="fv-row mb-10">
              <!--begin::Wrapper-->
              <div class="d-flex flex-stack mb-2">
                <!--begin::Label-->
                <label class="form-label fw-bold text-dark fs-6 mb-0"
                  >Músicas</label
                >
                <!--end::Label-->
              </div>
              <!--end::Wrapper-->

              <!--begin::Input-->
              <Field
                tabindex="2"
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="musics"
                autocomplete="off"
              />
              <!--end::Input-->
              <div class="fv-plugins-message-container">
                <div class="text-danger">
                  <ErrorMessage name="musics" />
                </div>
              </div>
            </div>
            <div class="fv-row mb-10">
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
                name="artistName"
                autocomplete="off"
              />
              <!--end::Input-->
              <div class="fv-plugins-message-container">
                <div class="text-danger">
                  <ErrorMessage name="artistName" />
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

  <div class="modal" id="albumsUpdateModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="albumsUpdateModalLabel">
            Atualizando Album
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
            id="kt_album_update_form"
            @submit="onUpdate"
            :validation-schema="albumScheme"
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
                :model-value="editAlbum.name"
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
                  >Duração</label
                >
                <!--end::Label-->
              </div>
              <!--end::Wrapper-->

              <!--begin::Input-->
              <Field
                tabindex="2"
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="duration"
                autocomplete="off"
                :model-value="editAlbum.duration"
              />
              <!--end::Input-->
              <div class="fv-plugins-message-container">
                <div class="text-danger">
                  <ErrorMessage name="duration" />
                </div>
              </div>
            </div>
            <div class="fv-row mb-10">
              <!--begin::Wrapper-->
              <div class="d-flex flex-stack mb-2">
                <!--begin::Label-->
                <label class="form-label fw-bold text-dark fs-6 mb-0"
                  >Data de Lançamento</label
                >
                <!--end::Label-->
              </div>
              <!--end::Wrapper-->

              <!--begin::Input-->
              <Field
                tabindex="2"
                class="form-control form-control-lg form-control-solid"
                type="date"
                name="releaseDate"
                autocomplete="off"
                :model-value="formateDatetimeCalendar(editAlbum.releaseDate)"
              />
              <!--end::Input-->
              <div class="fv-plugins-message-container">
                <div class="text-danger">
                  <ErrorMessage name="releaseDate" />
                </div>
              </div>
            </div>
            <div class="fv-row mb-10">
              <!--begin::Wrapper-->
              <div class="d-flex flex-stack mb-2">
                <!--begin::Label-->
                <label class="form-label fw-bold text-dark fs-6 mb-0"
                  >Músicas</label
                >
                <!--end::Label-->
              </div>
              <!--end::Wrapper-->

              <!--begin::Input-->
              <Field
                tabindex="2"
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="musics"
                autocomplete="off"
                :model-value="editAlbum.musics"
              />
              <!--end::Input-->
              <div class="fv-plugins-message-container">
                <div class="text-danger">
                  <ErrorMessage name="musics" />
                </div>
              </div>
            </div>
            <div class="fv-row mb-10">
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
                name="artistName"
                autocomplete="off"
              />
              <!--end::Input-->
              <div class="fv-plugins-message-container">
                <div class="text-danger">
                  <ErrorMessage name="artistName" />
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
import { useAlbumsStore } from "../stores/albums";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import Swal from "sweetalert2";
import * as Yup from "yup";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "albums",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const storeAlbums = useAlbumsStore();
    const pageLoading = ref(true);
    const datatableLoading = ref(false);
    const submiting = ref(false);
    const editAlbum = ref({});

    //Create form validation object
    const albumScheme = Yup.object().shape({
      name: Yup.string().required("Nome é obrigatório").label("name"),
      duration: Yup.number().required("Duração é obrigatória").label("age"),
      releaseDate: Yup.date()
        .required("Data de Lançamento é obrigatória!")
        .label("releaseDate"),
      musics: Yup.string().label("musics"),
      artistName: Yup.string().label("artistName"),
    });

    onBeforeMount(async () => {
      await storeAlbums.getAlbums();
      pageLoading.value = false;
    });

    // Form submit function
    const onSubmit = async (values) => {
      submiting.value = true;
      values = values;

      if (values.musics) {
        const musics_array = values.musics.split(",");
        values.musics = musics_array;
      }

      if (values.artistName) {
        const artistName_array = values.artistName.split(",");
        values.artistName = artistName_array;
      }

      // Send login request
      await storeAlbums.insertAlbum(values);
      const error = Object.values(storeAlbums.errors);

      if (error.length === 0) {
        Swal.fire({
          text: "Album registrado com sucesso",
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
          storeAlbums.errors = {};
        });
      }

      submiting.value = false;

      datatableLoading.value = true;
      await storeAlbums.getAlbums();
      datatableLoading.value = false;
    };

    const onDelete = async (album) => {
      await storeAlbums.deleteAlbum(album);
      const error = Object.values(storeAlbums.errors);

      if (error.length === 0) {
        Swal.fire({
          text: "Album deletado com sucesso",
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
          storeAlbums.errors = {};
        });
      }

      submiting.value = false;

      datatableLoading.value = true;
      await storeAlbums.getAlbums();
      datatableLoading.value = false;
    };

    const onUpdate = async (value) => {
      submiting.value = true;

      if (value?.musics) {
        const musics_array = value.musics.split(",");
        value.musics = musics_array;
      }

      await storeAlbums.updateAlbum({ id: editAlbum.value.id, ...value });
      const error = Object.values(storeAlbums.errors);

      if (error.length === 0) {
        Swal.fire({
          text: "Album atualizado com sucesso",
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
          storeAlbums.errors = {};
        });
      }

      submiting.value = false;

      datatableLoading.value = true;
      await storeAlbums.getAlbums();
      datatableLoading.value = false;
    };

    // Computed
    const computedAlbumsRowData = computed(() => {
      let albumsRowData = [];

      storeAlbums.albums.forEach((album) => {
        let firstArtistName = album.Artista?.[0]?.name;

        const albumData = {
          id: album.id ? album.id : "Error",
          name: album.name ? album.name : "Error",
          duration: album.duration ? album.duration : "Error",
          releaseDate: album.releaseDate ? album.releaseDate : "Error",
          artists: firstArtistName ? firstArtistName : "",
        };
        albumsRowData.push(albumData);
      });

      return albumsRowData;
    });

    const tableData = ref(computedAlbumsRowData);

    const formateDatetimeCalendar = (date) => {
      if (!date) return "";
      let formatedDate = new Date(date);
      formatedDate = formatedDate.toISOString().split("T")[0];
      return formatedDate;
    };

    return {
      tableData,
      pageLoading,
      datatableLoading,
      onSubmit,
      albumScheme,
      submiting,
      onDelete,
      onUpdate,
      editAlbum,
      formateDatetimeCalendar,
    };
  },
});
</script>
