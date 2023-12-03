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
          <h5 class="card-title">Musicas</h5>
          <p class="card-text">Listagem de Musicas cadastrados no sistema.</p>
        </div>
        <div>
          <button
            class="btn btn-primary"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#musicsModal"
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
            <th scope="col">Gẽnero</th>
            <th scope="col">Opções</th>
          </tr>
        </thead>
        <tbody>
          <div v-if="tableData.length === 0">Nenhuma Musica Cadastrado!</div>
          <tr v-else v-for="music in tableData" :key="music.id" scope="row">
            <td>{{ music.id }}</td>
            <td>{{ music.name }}</td>
            <td>{{ music.duration }}</td>
            <td>{{ formateDatetimeCalendar(music.releaseDate) }}</td>
            <td>{{ music.genre }}</td>
            <td>
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                data-bs-toggle="modal"
                data-bs-target="#musicsUpdateModal"
                @click="
                  () => {
                    editMusic = music;
                  }
                "
              >
                Editar
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                @click="onDelete(music)"
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
  <div class="modal" id="musicsModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="musicsModalLabel">
            Adicionar Musica
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
            id="kt_music_form"
            @submit="onSubmit"
            :validation-schema="musicScheme"
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
                  >Estilo musical</label
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
            <div class="fv-row mb-10">
              <!--begin::Wrapper-->
              <div class="d-flex flex-stack mb-2">
                <!--begin::Label-->
                <label class="form-label fw-bold text-dark fs-6 mb-0"
                  >Nome do Álbum</label
                >
                <!--end::Label-->
              </div>
              <!--end::Wrapper-->

              <!--begin::Input-->
              <Field
                tabindex="2"
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="albumName"
                autocomplete="off"
              />
              <!--end::Input-->
              <div class="fv-plugins-message-container">
                <div class="text-danger">
                  <ErrorMessage name="albumName" />
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

  <div class="modal" id="musicsUpdateModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="musicsUpdateModalLabel">
            Atualizando Musica
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
            id="kt_music_update_form"
            @submit="onUpdate"
            :validation-schema="musicScheme"
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
                :model-value="editMusic.name"
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
                :model-value="editMusic.duration"
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
                :model-value="formateDatetimeCalendar(editMusic.releaseDate)"
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
                  >Estilo musical</label
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
            <div class="fv-row mb-10">
              <!--begin::Wrapper-->
              <div class="d-flex flex-stack mb-2">
                <!--begin::Label-->
                <label class="form-label fw-bold text-dark fs-6 mb-0"
                  >Nome do Álbum</label
                >
                <!--end::Label-->
              </div>
              <!--end::Wrapper-->

              <!--begin::Input-->
              <Field
                tabindex="2"
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="albumName"
                autocomplete="off"
                :model-value="editMusic.musics"
              />
              <!--end::Input-->
              <div class="fv-plugins-message-container">
                <div class="text-danger">
                  <ErrorMessage name="albumName" />
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
import { useMusicsStore } from "../stores/musics";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import Swal from "sweetalert2";
import * as Yup from "yup";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "musics",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const storeMusics = useMusicsStore();
    const pageLoading = ref(true);
    const datatableLoading = ref(false);
    const submiting = ref(false);
    const editMusic = ref({});

    //Create form validation object
    const musicScheme = Yup.object().shape({
      name: Yup.string().required("Nome é obrigatório").label("name"),
      duration: Yup.number().required("Duração é obrigatória").label("age"),
      releaseDate: Yup.date()
        .required("Data de Lançamento é obrigatória!")
        .label("releaseDate"),
      genre: Yup.string().label("genre"),
      albumName: Yup.string().label("albumName"),
    });

    onBeforeMount(async () => {
      await storeMusics.getMusics();
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
      await storeMusics.insertMusic(values);
      const error = Object.values(storeMusics.errors);

      if (error.length === 0) {
        Swal.fire({
          text: "Musica registrada com sucesso",
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
          storeMusics.errors = {};
        });
      }

      submiting.value = false;

      datatableLoading.value = true;
      await storeMusics.getMusics();
      datatableLoading.value = false;
    };

    const onDelete = async (album) => {
      await storeMusics.deleteMusic(album);
      const error = Object.values(storeMusics.errors);

      if (error.length === 0) {
        Swal.fire({
          text: "Musica deletada com sucesso",
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
          storeMusics.errors = {};
        });
      }

      submiting.value = false;

      datatableLoading.value = true;
      await storeMusics.getMusics();
      datatableLoading.value = false;
    };

    const onUpdate = async (value) => {
      submiting.value = true;

      if (value?.musics) {
        const musics_array = value.musics.split(",");
        value.musics = musics_array;
      }

      await storeMusics.updateMusic({ id: editMusic.value.id, ...value });
      const error = Object.values(storeMusics.errors);

      if (error.length === 0) {
        Swal.fire({
          text: "Musica atualizada com sucesso",
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
          storeMusics.errors = {};
        });
      }

      submiting.value = false;

      datatableLoading.value = true;
      await storeMusics.getMusics();
      datatableLoading.value = false;
    };

    // Computed
    const computedMusicsRowData = computed(() => {
      let musicsRowData = [];

      storeMusics.musics.forEach((music) => {
        const musicData = {
          id: music.id ? music.id : "Error",
          name: music.name ? music.name : "Error",
          duration: music.duration ? music.duration : "Error",
          releaseDate: music.releaseDate ? music.releaseDate : "Error",
          genre: music.genre ? music.genre : "Unknown",
        };
        musicsRowData.push(musicData);
      });

      return musicsRowData;
    });

    const tableData = ref(computedMusicsRowData);

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
      musicScheme,
      submiting,
      onDelete,
      onUpdate,
      editMusic,
      formateDatetimeCalendar,
    };
  },
});
</script>
