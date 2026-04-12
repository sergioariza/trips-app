<template>
  <v-container max-width="1200">
    <div class="d-flex justify-end">
      <v-btn class="mr-4" color="primary" @click="openDialog()">{{ $t("dashboard.create") }}</v-btn>
      <v-btn @click="logout">{{ $t("dashboard.logout") }}</v-btn>
    </div>
    <v-data-table :items="trips" :headers="headers">
      <template #item.departure="{ item }">
        {{ new Date(item.departure).toLocaleDateString() }}
      </template>
      <template #item.returnDate="{ item }">
        {{ new Date(item.returnDate).toLocaleDateString() }}
      </template>
      <template #item.isWorkTrip="{ item }">
        {{ item.isWorkTrip ? t("dashboard.columns.yes") : t("dashboard.columns.no") }}
      </template>
      <template #item.actions="{ item }">
        <v-btn variant="text" class="mr-3" icon @click="edit(item)">✏️</v-btn>
        <v-btn variant="text" icon @click="remove(item.id)">🗑️</v-btn>
      </template>
    </v-data-table>
    <TripDialog
      :modelValue="dialog"
      :trip="selectedTrip"
      @close="dialog = false"
      @save="saveTrip"
    />
    <v-snackbar-queue v-model="messages" closable />
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useTripStore } from "../stores/trips";
import { useAuthStore } from "../stores/auth";
import TripDialog from "../components/TripDialog.vue";
import { useRouter } from "vue-router"; 

const { t } = useI18n();

const tripStore = useTripStore();
const auth = useAuthStore();
const router = useRouter();

const dialog = ref(false);
const selectedTrip = ref(null);
const messages = ref([]);

const trips = computed(() => tripStore.trips);
const headers = computed(() => [
  { title: t("dashboard.columns.origin"), key: "origin" },
  { title: t("dashboard.columns.destination"), key: "destination" },
  { title: t("dashboard.columns.departure"), key: "departure" },
  { title: t("dashboard.columns.return"), key: "returnDate" },
  { title: t("dashboard.columns.price"), key: "price" },
  { title: t("dashboard.columns.workTrip"), key: "isWorkTrip" },
  { title: t("dashboard.columns.actions"), key: "actions" },
]);

onMounted(() => {
  tripStore.fetchTrips();
});

const openDialog = () => {
  selectedTrip.value = null;
  dialog.value = true;
};

const edit = (trip) => {
  selectedTrip.value = trip;
  dialog.value = true;
};

const saveTrip = async (data) => {
  try {
    if (data.id) {
      await tripStore.updateTrip(data.id, data);
      messages.value.push({
        color: "success",
        text: t("dashboard.tripUpdated"),
        timeout: 3000,
      });
    } else {
      await tripStore.createTrip(data);
      messages.value.push({
        color: "success",
        text: t("dashboard.tripCreated"),
        timeout: 3000,
      });
    }
  } catch (err) {
    messages.value.push({
      color: "error",
      text: data.id ? t("dashboard.errorUpdating") : t("dashboard.errorCreating"),
      timeout: 3000,
    });
  } finally {
    dialog.value = false;
  }
};

const remove = async (id) => {
  try {
    await tripStore.deleteTrip(id);
    messages.value.push({
      color: "success",
      text: t("dashboard.tripDeleted"),
      timeout: 3000,
    });
  } catch (err) {
    messages.value.push({
      color: "error",
      text: t("dashboard.errorDeleting"),
      timeout: 3000,
    });
  }
};

const logout = () => {
  auth.logout();
  router.push("/");
};
</script>
