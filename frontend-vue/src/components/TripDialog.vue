<template>
  <v-dialog v-model="internalDialog">
    <v-card>
      <v-card-title>
        {{ props.trip?.id ? $t("tripDialog.titleEdit") : $t("tripDialog.titleCreate") }}
      </v-card-title>

      <form @submit.prevent="submit">
        <v-card-text>
          <v-text-field
            v-model="origin"
            :label="$t('tripDialog.origin')"
            :error-messages="originError"
          />
          <v-text-field
            v-model="destination"
            :label="$t('tripDialog.destination')"
            :error-messages="destinationError"
          />
          <v-date-input
            v-model="departure"
            input-format="dd-mm-yyyy"
            :label="$t('tripDialog.departureDate')"
            :error-messages="departureError"
            prepend-icon=""
          />
          <v-date-input
            v-model="returnDate"
            input-format="dd-mm-yyyy"
            :label="$t('tripDialog.returnDate')"
            :error-messages="returnDateError"
            prepend-icon=""
          />
          <v-text-field
            v-model="price"
            :label="$t('tripDialog.price')"
            type="number"
            :error-messages="priceError"
          />
          <v-checkbox v-model="isWorkTrip" :label="$t('tripDialog.workTrip')" />
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn @click="$emit('close')">{{ $t("tripDialog.cancel") }}</v-btn>
          <v-btn type="submit" color="primary">{{ $t("tripDialog.save") }}</v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { useField, useForm } from "vee-validate";
import { useI18n } from "vue-i18n";

const props = defineProps(["modelValue", "trip"]);
const emit = defineEmits(["close", "save"]);

const { t } = useI18n();

const internalDialog = ref(false);

const { handleSubmit, resetForm } = useForm();

const { value: origin, errorMessage: originError } = useField("origin", (v) =>
  v ? true : t("validation.required")
);
const { value: destination, errorMessage: destinationError } = useField("destination", (v) =>
  v ? true : t("validation.required")
);
const { value: departure, errorMessage: departureError } = useField("departure", (v) =>
  v ? true : t("validation.required")
);
const { value: returnDate, errorMessage: returnDateError } = useField("returnDate", (v) =>
  v ? true : t("validation.required")
);
const { value: price, errorMessage: priceError } = useField("price", (v) => {
  if (v === "" || v === null || v === undefined) return t("validation.required");
  if (Number(v) < 0) return t("validation.minPrice");
  return true;
});
const { value: isWorkTrip } = useField("isWorkTrip");

watch(
  () => props.modelValue,
  (v) => {
    internalDialog.value = v;
    if (v) {
      resetForm({
        values: props.trip
          ? { ...props.trip }
          : {
              origin: "",
              destination: "",
              departure: "",
              returnDate: "",
              price: undefined,
              isWorkTrip: false
            }
      });
    }
  }
);

watch(
  () => props.trip,
  (trip) => {
    resetForm({
      values: trip
        ? { ...trip }
        : {
            origin: "",
            destination: "",
            departure: "",
            returnDate: "",
            price: undefined,
            isWorkTrip: false
          }
    });
  }
);

const submit = handleSubmit((values) => {
  emit("save", values);
});
</script>
