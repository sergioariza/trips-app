<template>
  <v-dialog v-model="internalDialog">
    <v-card>
      <v-card-title>
        {{ form.id ? $t("tripDialog.titleEdit") : $t("tripDialog.titleCreate") }}
      </v-card-title>

      <v-card-text>
        <v-text-field v-model="form.origin" :label="$t('tripDialog.origin')" />
        <v-text-field v-model="form.destination" :label="$t('tripDialog.destination')" />
        <v-date-input
          v-model="form.departure"
          input-format="dd-mm-yyyy"
          :label="$t('tripDialog.departureDate')"
          prepend-icon=""
        />
        <v-date-input
          v-model="form.returnDate"
          input-format="dd-mm-yyyy"
          :label="$t('tripDialog.returnDate')"
          prepend-icon=""
        />
        <v-text-field v-model="form.price" :label="$t('tripDialog.price')" type="number" />
        <v-checkbox v-model="form.isWorkTrip" :label="$t('tripDialog.workTrip')" />
      </v-card-text>

      <v-card-actions>
        <v-btn @click="$emit('close')">{{ $t("tripDialog.cancel") }}</v-btn>
        <v-btn color="primary" @click="submit">{{ $t("tripDialog.save") }}</v-btn>
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
