<template>
  <q-page flex justify-center items-center>
    <div m-width-400px flex flex-col items-center>
      <h1 text-30px color="primary">INICIAR SESIÓN</h1>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
        flex
        flex-col
        items-center
        mb-20px
      >
        <q-input
          filled
          v-model="email"
          label="Correo"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please type a valid e-mail',
          ]"
        />
        <q-input
          filled
          type="password"
          v-model="password"
          label="Contraseña"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please type your password ',
          ]"
        />

        <div>
          <q-btn label="Iniciar" type="submit" color="primary" />
          <q-btn
            label="Borrar datos"
            type="reset"
            color="primary"
            outline
            class="q-ml-sm"
          />
        </div>
      </q-form>
      <q-separator w-full mb-20px></q-separator>
      <p text-center mb-10px>¿Aún no tienes una cuenta?</p>
      <q-btn
        color="primary"
        mx-auto
        label="Regístrate"
        outline
        :to="
          router.currentRoute.value.query.next
            ? `register/?next=${router.currentRoute.value.query.next}`
            : '/'
        "
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/stores/auth';

const auth = useAuthStore();
const q = useQuasar();
const router = useRouter();

const email = ref<string | null>('');
const password = ref<string | null>('');

async function onSubmit() {
  const errorMessage = await auth.login(email.value, password.value);

  if (!errorMessage) {
    q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Bienvenido',
      position: 'top',
    });
    const goTo = router.currentRoute.value.query.next?.toString();
    router.replace(goTo ?? '/');
  } else {
    console.log(errorMessage);
    alert(errorMessage);
  }
}

function onReset() {
  email.value = null;
  password.value = null;
}
</script>

<route lang="yaml">
meta:
  layout: auth
  authRequired: false
</route>
