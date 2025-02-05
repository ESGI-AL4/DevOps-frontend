<script setup lang="ts">
import * as zod from '@primevue/forms/resolvers/zod';
import { type Ref, ref } from 'vue';
import { z } from 'zod';
import { useToast } from 'primevue';
import type { FormSubmitEvent } from '@primevue/forms';
import TitleWithBackButton from '@/components/TitleWithBackButton.vue';
import { useRouter } from 'vue-router';
import type { CreateArticleApi } from '@/models/ArticleApi';
import CONFIG from '@/config';

const toast = useToast();

const router = useRouter();

const loading = ref(false);

const navigateBack = () => {
  if (router.getRoutes().length > 0) {
    router.back();
    return;
  }

  router.push('/');
};

const initialValues: Ref<{ title: string; subtitle: string; summary: string }> = ref({
  title: '',
  subtitle: '',
  summary: '',
});

const resolver = ref(
  zod.zodResolver(
    z.object({
      title: z.string().min(1, { message: 'Title is required' }),
      subtitle: z.string().min(1, { message: 'Subtitle is required' }),
      summary: z.string().min(1, { message: 'Summary is required' }),
    }),
  ),
);

const onFormSubmit = (event: FormSubmitEvent) => {
  const createArticle = async () => {
    try {
      const response = await fetch(`${CONFIG.backendUrl}/articles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: event.values.title,
          subtitle: event.values.subtitle,
          summary: event.values.summary,
        } as CreateArticleApi),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw Error(`Error while creating the article : ${errorBody}`);
      }
      toast.add({ severity: 'success', summary: 'Article added successfully !', life: 3000 });
      await router.push('/');
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
        toast.add({ severity: 'error', summary: e.message, life: 5000 });
      } else {
        console.error('Unknown error.', e);
        toast.add({ severity: 'error', summary: 'Unknown error', life: 5000 });
      }
    }
  };

  if (event.valid) {
    createArticle();
  }
};
</script>

<template>
  <div id="write-articles-title">
    <TitleWithBackButton title="Add an article" :back-button-callback="navigateBack" />
  </div>
  <div id="write-articles">
    <PrimeForm
      v-slot="$form"
      :initial-values="initialValues"
      :resolver="resolver"
      @submit="onFormSubmit"
    >
      <div class="input-with-error">
        <PrimeFloatLabel variant="in">
          <PrimeInputText id="title" name="title" type="text" />
          <label for="title">Title</label>
        </PrimeFloatLabel>
        <PrimeMessage v-if="$form.title?.invalid" severity="error" size="small" variant="simple">{{
          $form.title.error?.message
        }}</PrimeMessage>
      </div>
      <div class="input-with-error">
        <PrimeFloatLabel variant="in">
          <PrimeInputText id="subtitle" name="subtitle" type="text" />
          <label for="subtitle">Subtitle</label>
        </PrimeFloatLabel>
        <PrimeMessage
          v-if="$form.subtitle?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.subtitle.error?.message }}</PrimeMessage
        >
      </div>
      <div class="input-with-error">
        <PrimeFloatLabel variant="in">
          <PrimeTextArea id="summary" name="summary" type="text" />
          <label for="summary">Summary</label>
        </PrimeFloatLabel>
        <PrimeMessage
          v-if="$form.summary?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.summary.error?.message }}</PrimeMessage
        >
      </div>
      <PrimeButton :disabled="loading" :loading type="submit" data-cy-role="submit-add-article">Submit</PrimeButton>
    </PrimeForm>
  </div>
</template>

<style scoped>
#write-articles-title {
  margin-bottom: 25px;
}

.input-with-error {
  display: flex;
  flex-direction: column;
  gap: 1px;

  & > span > * {
    width: 100%;
  }
}

#write-articles > form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
</style>
