<template>
  <q-page flex justify-center items-center>
    <div m-width-400px flex flex-col items-center>
      <h1 text-30px>REGISTRO</h1>
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
          v-model="name"
          label="Nombre"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please type a valid name',
          ]"
        />
        <q-input
          filled
          v-model="age"
          label="Edad"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please type a valid age',
          ]"
        />
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
        <q-input
          filled
          type="password"
          v-model="password2"
          label="Repite contraseña"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please type your password ',
          ]"
        />
        <div>
          <q-btn label="Enviar datos" type="submit" color="primary" />
          <q-btn
            label="Borrar datos"
            type="reset"
            color="primary"
            outline
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/stores/auth';

const auth = useAuthStore();
const q = useQuasar();
const router = useRouter();

const name = ref<string | null>('');
const age = ref<number | null>();
const email = ref<string | null>('');
const password = ref<string | null>('');
const password2 = ref<string | null>('');

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
