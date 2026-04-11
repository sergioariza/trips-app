<template>
  <v-container class="d-flex align-center justify-center" style="height:100%">
    <v-card width="400">
      <v-card-title>
        {{ isRegister ? "Sign Up" : "Login" }}
      </v-card-title>

      <v-card-text>
        <v-text-field v-model="email" label="Email" />
        <v-text-field v-model="password" label="Password" type="password" />
      </v-card-text>

      <v-card-actions class="d-flex justify-space-between">
        <v-btn variant="text" @click="toggleMode">
          {{ isRegister ? "Login" : "Sign Up" }}
        </v-btn>

        <v-btn color="primary" @click="handleSubmit">
          {{ isRegister ? "Register" : "Login" }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar-queue v-model="messages" closable />
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const isRegister = ref(false);
const messages = ref([]);

const auth = useAuthStore();
const router = useRouter();

const toggleMode = () => {
  isRegister.value = !isRegister.value;
};

const handleSubmit = async () => {
  try {
    if (isRegister.value) {
      await auth.register(email.value, password.value);
    } else {
      await auth.login(email.value, password.value);
    }

    router.push("/dashboard");
  } catch (err) {
    messages.value.push({
      color: "error",
      text: "Error during authentication",
      timeout: 3000,
    });
  }
};
</script>
