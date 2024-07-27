<template>

  <main>
    <!-- Uploading files -->
    <!-- get the names, details, sizes -->
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
    const uploadedFiles = ref([]);

    const handleFileUpload = (event) => {
      const selectedFiles = event.target.files;
      uploadedFiles.value.push(...selectedFiles);
    }
    return {
      uploadedFiles,
      handleFileUpload,
    }
  }
}


</script>
