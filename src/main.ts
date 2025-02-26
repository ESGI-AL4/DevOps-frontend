import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import {
  Button,
  Card,
  FloatLabel,
  InputText,
  Message,
  Skeleton,
  Textarea,
  ToastService,
} from 'primevue';
import { Form } from '@primevue/forms';
import { loadConfig } from '@/config';

const app = createApp(App);

app.use(router);
app.use(PrimeVue, { theme: { preset: Aura } });
app.use(ToastService);

app.component('PrimeButton', Button);
app.component('PrimeCard', Card);
app.component('PrimeForm', Form);
app.component('PrimeInputText', InputText);
app.component('PrimeMessage', Message);
app.component('PrimeTextArea', Textarea);
app.component('PrimeFloatLabel', FloatLabel);
app.component('PrimeSkeleton', Skeleton);

loadConfig().then(() => {
  app.mount('#app');
});
