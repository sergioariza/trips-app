import { createVuetify } from "vuetify";
import { VDateInput } from "vuetify/labs/VDateInput";
import { en, es } from "vuetify/locale";

export default createVuetify({
  components: {
    VDateInput,
  },
  locale: {
    locale: "en",
    fallback: "en",
    messages: { en, es },
  },
});
