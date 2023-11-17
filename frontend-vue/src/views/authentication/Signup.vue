<template>
  <!--begin::Wrapper-->
  <div class="p-10">
    <!--begin::Form-->

    <VForm
      class="form w-100"
      id="kt_signup_form"
      @submit="onSubmitSignup"
      :validation-schema="signup"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h1 class="text-dark mb-3">Cadastro</h1>
        <!--end::Title-->
      </div>
      <!--begin::Heading-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="form-label fs-6 fw-bold text-dark">Usuário</label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          tabindex="1"
          class="form-control form-control-lg form-control-solid"
          type="text"
          name="username"
          autocomplete="off"
          model-value="admin"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="text-danger">
            <ErrorMessage name="username" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Wrapper-->
        <div class="d-flex flex-stack mb-2">
          <!--begin::Label-->
          <label class="form-label fw-bold text-dark fs-6 mb-0">Senha</label>
          <!--end::Label-->
        </div>
        <!--end::Wrapper-->

        <!--begin::Input-->
        <Field
          tabindex="2"
          class="form-control form-control-lg form-control-solid"
          type="password"
          name="password"
          autocomplete="off"
          model-value="1234"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="text-danger">
            <ErrorMessage name="password" />
          </div>
        </div>
      </div>
      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Wrapper-->
        <div class="d-flex flex-stack mb-2">
          <!--begin::Label-->
          <label class="form-label fw-bold text-dark fs-6 mb-0">E-mail</label>
          <!--end::Label-->
        </div>
        <!--end::Wrapper-->

        <!--begin::Input-->
        <Field
          tabindex="2"
          class="form-control form-control-lg form-control-solid"
          type="text"
          name="email"
          autocomplete="off"
          model-value="admin@email.com"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="text-danger">
            <ErrorMessage name="email" />
          </div>
        </div>
      </div>
      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Wrapper-->
        <div class="d-flex flex-stack mb-2">
          <!--begin::Label-->
          <label class="form-label fw-bold text-dark fs-6 mb-0">Idade</label>
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
          model-value="20"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="text-danger">
            <ErrorMessage name="age" />
          </div>
        </div>
      </div>

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Wrapper-->
        <div class="d-flex flex-stack mb-2">
          <!--begin::Label-->
          <label class="form-label fw-bold text-dark fs-6 mb-0"
            >Preferência Musical</label
          >
          <!--end::Label-->
        </div>
        <!--end::Wrapper-->

        <!--begin::Input-->
        <Field
          tabindex="2"
          class="form-control form-control-lg form-control-solid"
          type="text"
          name="musical_preference"
          autocomplete="off"
          model-value="Rock"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="text-danger">
            <ErrorMessage name="musical_preference" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Wrapper-->
        <div class="d-flex flex-stack mb-2">
          <!--begin::Label-->
          <label class="form-label fw-bold text-dark fs-6 mb-0"
            >Permissões</label
          >
          <!--end::Label-->
        </div>
        <!--end::Wrapper-->

        <!--begin::Input-->
        <Field
          tabindex="2"
          class="form-control form-control-lg form-control-solid"
          type="text"
          name="roles"
          autocomplete="off"
          model-value="admin"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="text-danger">
            <ErrorMessage name="roles" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="text-center mt-5">
        <!--begin::Submit button-->
        <button
          tabindex="3"
          type="submit"
          ref="submitButton"
          id="kt_signup_submit"
          class="btn btn-lg btn-primary w-100 mb-5"
        >
          <span class="indicator-label" v-if="!submiting"> Continue </span>
          <span class="indicator-progress" v-else>
            Por favor, aguarde...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
        <!--end::Submit button-->
      </div>
      <!--end::Actions-->
    </VForm>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script>
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore } from "../../stores/auth";
import Swal from "sweetalert2";
import * as Yup from "yup";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "signup",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const store = useAuthStore();
    const submitButton = ref(null);
    const submiting = ref(false);

    //Create form validation object
    const signup = Yup.object().shape({
      username: Yup.string()
        .required("Usuário é obrigatório")
        .label("Username"),
      password: Yup.string()
        .min(4)
        .required("Senha é obrigatória")
        .label("Password"),
      email: Yup.string()
        .email("Email inválido")
        .required("Email é obrigatório")
        .label("Email"),
      age: Yup.number().required("Idade é obrigatória").label("Age"),
      musical_preference: Yup.string(),
      roles: Yup.string()
        .oneOf(
          ["admin", "artist", "user"],
          "Permissão precisa ser admin, artist ou user"
        )
        .required("Permissão é obrigatória")
        .label("Roles"),
    });

    //Form submit function
    const onSubmitSignup = async (values) => {
      submiting.value = true;
      values = values;
      const tempRoles = values.roles;
      values.roles = [tempRoles];

      // Clear existing errors
      store.logout();

      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value.disabled = true;
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }

      // Send login request
      await store.signup(values);
      const error = Object.values(store.errors);

      if (error.length === 0) {
        Swal.fire({
          text: "Conta criada com sucesso",
          icon: "success",
          confirmButtonText: "Ok!",
          heightAuto: false,
        });
      } else {
        Swal.fire({
          text: error[0],
          icon: "error",
          confirmButtonText: "Tente novamente!",
          heightAuto: false,
        }).then(() => {
          store.errors = {};
        });
      }

      //Deactivate indicator
      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value.disabled = false;
      submiting.value = false;
    };

    return {
      onSubmitSignup,
      signup,
      submitButton,
      submiting,
    };
  },
});
</script>
