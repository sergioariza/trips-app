<template>
  <v-container max-width="1200">
    <div class="d-flex justify-end">
      <v-btn class="mr-4" color="primary" @click="openDialog()">Create</v-btn>
      <v-btn @click="logout">Logout</v-btn>
    </div>
    <v-data-table :items="trips" :headers="headers">
      <template #item.departure="{ item }">
        {{ new Date(item.departure).toLocaleDateString() }}
      </template>
      <template #item.returnDate="{ item }">
        {{ new Date(item.returnDate).toLocaleDateString() }}
      </template>
      <template #item.actions="{ item }">
        <v-btn class="mr-3" icon @click="edit(item)">✏️</v-btn>
        <v-btn icon @click="remove(item.id)">🗑️</v-btn>
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
import { useTripStore } from "../stores/trips";
import { useAuthStore } from "../stores/auth";
import TripDialog from "../components/TripDialog.vue";
import { useRouter } from "vue-router";

const tripStore = useTripStore();
const auth = useAuthStore();
const router = useRouter();

const dialog = ref(false);
const selectedTrip = ref(null);
const messages = ref([]);
const trips = computed(() => tripStore.trips);

const headers = [
  { title: "Origin", key: "origin" },
  { title: "Destination", key: "destination" },
  { title: "Departure", key: "departure" },
  { title: "Return", key: "returnDate" },
  { title: "Price", key: "price" },
  { title: "Work Trip", key: "isWorkTrip" },
  { title: "Actions", key: "actions" }
];

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
        text: "Trip updated successfully",
        timeout: 3000,
      });
    } else {
      await tripStore.createTrip(data);
      messages.value.push({
        color: "success",
        text: "Trip created successfully",
        timeout: 3000,
      });
    }
  } catch (err) {
    messages.value.push({
      color: "error",
      text: data.id ? "Error updating trip" : "Error creating trip",
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
      text: "Trip deleted successfully",
      timeout: 3000,
    });
  } catch (err) {
    messages.value.push({
      color: "error",
      text: "Error deleting trip",
      timeout: 3000,
    });
  }
};

const logout = () => {
  auth.logout();
  router.push("/");
};
</script>
