<template>
  <v-dialog v-model="internalDialog">
    <v-card>
      <v-card-title>
        {{ form.id ? "Edit Trip" : "Create Trip" }}
      </v-card-title>

      <v-card-text>
        <v-text-field v-model="form.origin" label="Origin" />
        <v-text-field v-model="form.destination" label="Destination" />
        <v-date-input
          v-model="form.departure"
          input-format="dd-mm-yyyy"
          label="Departure Date"
          prepend-icon=""
        />
        <v-date-input
          v-model="form.returnDate"
          input-format="dd-mm-yyyy"
          label="Return Date"
          prepend-icon=""
        />
        <v-text-field v-model="form.price" label="Price" type="number" />
        <v-checkbox v-model="form.isWorkTrip" label="Work Trip" />
      </v-card-text>

      <v-card-actions>
        <v-btn @click="$emit('close')">Cancel</v-btn>
        <v-btn color="primary" @click="submit">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps(["modelValue", "trip"]);
const emit = defineEmits(["close", "save"]);

const internalDialog = ref(false);

const form = ref({
  origin: "",
  destination: "",
  departure: "",
  returnDate: "",
  price: 0,
  isWorkTrip: false
});

watch(() => props.modelValue, v => internalDialog.value = v);

watch(() => props.trip, (trip) => {
  form.value = trip
    ? { ...trip }
    : {
        origin: "",
        destination: "",
        departure: "",
        returnDate: "",
        price: 0,
        isWorkTrip: false
      };
});

const submit = () => {
  emit("save", form.value);
};
</script>
