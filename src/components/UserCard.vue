<script setup lang="ts">
import type {IUserCompact} from '@/type/User'
import {ref} from "vue";
/** Receiving props from a parent */
defineProps<{user: IUserCompact }>()

/** Tracking image loading status */
const imageLoaded = ref<boolean>(false);
/** Tracking the status of an error when loading an image */
const imageError = ref<boolean>(false);
/** Silent picture */
const defaultImage:string = '/not_user.webp';
</script>

<template>
  <div class="user-card">
    <div v-if="!imageLoaded" class="skeleton" />
    <img
        class="user-card__image"
         :src="imageError ? defaultImage : user?.picture || defaultImage"
         :alt="user?.name"
         @load="imageLoaded = true"
         @error="imageError = true"
    />
    <div>
      <h3 class="user-card__name">{{ user?.name }}</h3>
      <a class="user-card__email" :href="`mailto:${user?.email}`">{{user?.email }}</a>
    </div>
  </div>
</template>

<style scoped>
.user-card{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-card-border);
  border-radius: 12px;
  padding: 12px;
  transition: border 0.3s;
}

.user-card:hover{
  border-color: var(--color-card-border-dark);
}

.user-card__image{
  object-fit: cover;
  object-position: center;
  aspect-ratio: 1/1;
  border-radius: 100px;
  width: 128px;
  height: 128px;
}

.user-card__name{
  text-align: center;
  margin-bottom: 3px;
  color: var(--color-main-text);
  font-size: 17px;
  line-height: 24px;
}

.user-card__email{
  text-align: center;
  color: var(--color-main-text);
  text-decoration: none;
  font-size: 15px;
  line-height: 20px;
  font-weight: 400;
  transition: color 0.3s;
}

.skeleton {
  position: absolute;
  top: 12px;
  border-radius: 100px;
  width: 128px;
  height: 128px;
  background-color: #ddd;
  animation: skeleton-animation 1.2s infinite ease-in-out;
}

.user-card__email:hover{
  color: var(--color-linke-hover);
}


@keyframes skeleton-animation {
  0% {
    background-color: #e0e0e0;
  }
  50% {
    background-color: #c0c0c0;
  }
  100% {
    background-color: #e0e0e0;
  }
}
</style>
