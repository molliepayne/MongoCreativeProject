<template>
  <div class="gallery">
    <div class="gallery-panel"
         v-for="photo in photos"
         :key="photo.id">
      <img :src="thumbUrl(photo.filename)">
    </div>
  </div>
</template>