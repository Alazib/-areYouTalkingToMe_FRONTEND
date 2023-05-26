<template>
  <q-page flex justify-center items-center>
    <div style="max-width: 400px">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="email"
          label="EMAIL"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please type a valid e-mail',
          ]"
        />

        <q-input
          filled
          type="password"
          v-model="password"
          label="PASSWORD"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please type your password ',
          ]"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
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

const email = ref<string | null>('');
const password = ref<string | null>('');

async function onSubmit() {
  await auth.login(email.value, password.value);

  // if (res.status === 200) {
  //   q.notify({
  //     color: 'green-4',
  //     textColor: 'white',
  //     icon: 'cloud_done',
  //     message: 'Submitted',
  //     position: 'center',
  //   });
  //
  // }

  const goTo = router.currentRoute.value.query.next?.toString();
  router.replace(goTo ?? '/');
}

function onReset() {
  email.value = null;
  password.value = null;
}
</script>

<route lang="yaml">
meta:
  layout: auth
</route>
