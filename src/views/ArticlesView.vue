<script setup lang="ts">
import MyArticle from '@/components/MyArticle.vue';
import { onMounted, ref } from 'vue';
import Article from '@/models/Article';
import TitleWithBackButton from '@/components/TitleWithBackButton.vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue';
import type { ArticleApi } from '@/models/ArticleApi';
import CONFIG from '@/config';

const isLoadingArticles = ref(true);
const articles = ref<Article[]>([]);

const router = useRouter();

const toast = useToast();

const navigateToArticlesForm = () => {
  router.push('add');
};

onMounted(() => {
  const fetchArticles = async () => {
    try {
      const response = await fetch(`${CONFIG.backendUrl}/articles`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const responseBody = await response.text();

        throw Error(`Error while fetching articles : ${responseBody}`);
      }

      const data = (await response.json()) as ArticleApi[];

      articles.value = data.map(
        (article) =>
          new Article({
            id: article.id,
            title: article.title,
            subtitle: article.subtitle,
            summary: article.summary,
          }),
      );
      isLoadingArticles.value = false;
    } catch (e: unknown) {
      isLoadingArticles.value = false;
      if (e instanceof Error) {
        console.error(e.message);
        toast.add({ severity: 'error', summary: e.message, life: 5000 });
      } else {
        console.error('Unknown error.', e);
        toast.add({ severity: 'error', summary: 'Unknown error', life: 5000 });
      }
    }
  };

  fetchArticles();
});
</script>

<template>
  <div id="articles-title">
    <TitleWithBackButton title="Articles" />
    <PrimeButton @click="navigateToArticlesForm" data-cy-role="add-article">Add an article</PrimeButton>
  </div>
  <template v-if="isLoadingArticles">
    <div style="display: flex; flex-direction: column; gap: 10px">
      <PrimeSkeleton width="100%" />
      <PrimeSkeleton width="85%" />
      <PrimeSkeleton width="93%" />
    </div>
  </template>
  <template v-if="!isLoadingArticles">
    <div id="articles-list">
      <MyArticle
        v-for="article in articles"
        :key="article.id"
        :title="article.title"
        :subtitle="article.subtitle"
        :summary="article.summary"
      />
    </div>
  </template>
</template>

<style scoped>
#articles-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
}

#articles-list {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  flex-wrap: wrap;

  & > * {
    flex-basis: 325px;
  }
}
</style>
