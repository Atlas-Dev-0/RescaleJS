<template>
  <main>

    <!-- Uploading files -->
    <!-- get the names, details, sizes -->
    <h1>Rescaler JS</h1>
    <label for="fileUpload">Upload file</label>
    <input type="file" id="fileUpload" @change="handleFileUpload" multiple />
    <h3>Selected Images</h3>
    <ul>
      <li v-for="file in uploadedFiles" :key="index">
        File Name: {{ file.name }} <br>
        Size: {{ file.size }} <br>
        Type: {{ file.type }} <br>
      </li>
    </ul>

    <div class=" flex container class my-5">
      <label>width</label>
      <button class=" bg-blue-500 rounded text-white w-5 mx-1" @click="width++">+</button>
      <input placeholder="width" v-model="width" class="text-center bg-sky-200 rounded w-10" min="0" max="100">
      <button class="bg-blue-500 rounded text-white w-5 mx-1" @click="width--">-</button>
    </div>

    <div class=" flex container my-5">
      <label>
        height
      </label>
      <button class="bg-blue-500 rounded text-white w-5 mx-1" @click="height++">
        +
      </button>
      <input id="height" placeholder="height" v-model="height" class="text-center bg-sky-200 rounded w-10" min="1"
        max="100">
      <button class="bg-blue-500 rounded text-white w-5 mx-1" @click="height--">
        -
      </button>
    </div>

  </main>
</template>

<script>
import { ref } from 'vue';
export default {

  //TODO:
  // Get all the files
  // Get the name of the files
  // render the files as a list
  setup() {

    const heigth = ref(0);
    const width = ref(0);
    const uploadedFiles = ref([]);

    const handleFileUpload = (event) => {
      const selectedFiles = event.target.files;
      uploadedFiles.value.push(...selectedFiles);
    }

    return {
      uploadedFiles,
      handleFileUpload,
      width,
      height,
    }
  }
}
</script>

<style>
input[type="number"] {
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
