<script setup lang="ts">

import UserCard from "@/components/UserCard.vue";
import {useInfiniteScroll} from '@/composables/useInfiniteScroll'
import {useUserPagination} from "@/composables/useUserPagination";
import {onMounted} from "vue";

/** Pagination setup */
const {users, page, loading, loadPageUsers} = useUserPagination()

/** Load next page of users */
const loadNextPage = () =>{
  page.value++
}

/** Infinite scrolling */
useInfiniteScroll(loadNextPage,50,200)

/** Initial data download. Gets the URL and substitutes it into page if not, substitutes 1.
 * After that it executes the download request
 */
onMounted(async () => {
  const currentUrl = new URL(window.location.href);
  const pageUrlQuery = Number(currentUrl.searchParams.get("page")) || 1;
  page.value = pageUrlQuery;

  await loadPageUsers(page.value)
});
</script>

<template>
   <section class="block" :class="{'block-loading':loading}">
     <UserCard v-for="user in users"
             :key="user.id"
             :user="user"
             class="block__item"
     />
   </section>
   <p v-if="loading" class="loader-item" />
</template>

<style scoped>
.block{
  max-width: 1000px;
  margin: 30px auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 16px;
  row-gap: 20px;
}

@media (max-width: 1024px) {
  .block {
    grid-template-columns: repeat(2, 1fr);
  }
}

.block-loading{
  opacity: 0.3;
}

.block__item{
  grid-column: 1 span;
}

.loader-item{
  margin: 0;
  border: 8px solid var(--color-black);
  border-top: 8px solid transparent;
  border-radius: 100px;
  width: 80px;
  height: 80px;
  animation: animateLoader 1.5s infinite;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1;
}

@keyframes animateLoader {
  0%{
    transform: translate(-50%,-50%)rotate(0deg);
  }

  100%{
    transform: translate(-50%,-50%)rotate(360deg);
  }
}
</style>
