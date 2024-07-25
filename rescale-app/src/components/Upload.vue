<template>
  <main class="p-4 space-y-4">
    <!-- Inputs for dimensions and DPI -->
    <div class="space-y-2">
      <label class="block">
        Width (inches):
        <input type="number" v-model="width" class="border rounded p-2 w-full" />
      </label>
      <label class="block">
        Height (inches):
        <input type="number" v-model="height" class="border rounded p-2 w-full" />
      </label>
      <label class="block">
        DPI:
        <input type="number" v-model="dpi" class="border rounded p-2 w-full" />
      </label>
    </div>

    <!-- Upload button -->
    <div>
      <label for="fileUpload" class="block mb-2">Upload file</label>
      <input type="file" id="fileUpload" @change="handleFileUpload" multiple class="block w-full" />
    </div>

    <div class="flex space-x-4">
      <!-- Uploaded Images List -->
      <div class="w-1/2">
        <h3 class="text-lg font-semibold">Uploaded Images</h3>
        <ul class="space-y-2">
          <li v-for="(file, index) in uploadedFiles" :key="index" class="border p-2 rounded">
            <img :src="file.preview" alt="thumbnail" class="w-16 h-16 object-cover mb-2" />
            <div>File Name: {{ file.name }}</div>
            <div>Size: {{ file.size }} bytes</div>
            <div>Type: {{ file.type }}</div>
            <div>Original Size: {{ file.originalWidth }} x {{ file.originalHeight }}</div>
          </li>
        </ul>
      </div>

      <!-- Processed Images List -->
      <div class="w-1/2">
        <h3 class="text-lg font-semibold">Processed Images</h3>
        <ul class="space-y-2">
          <li v-for="(file, index) in processedFiles" :key="index" class="border p-2 rounded">
            <img :src="file.preview" alt="thumbnail" class="w-16 h-16 object-cover mb-2" />
            <div>File Name: {{ file.name }}</div>
            <div>Size: {{ file.size }} bytes</div>
            <div>Type: {{ file.type }}</div>

            <div>Resized to: {{ file.resizedWidth }} x {{ file.resizedHeight }}</div>
            <button @click="downloadFile(file)" class="bg-blue-500 text-white rounded px-4 py-2 mt-2">Download</button>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const width = ref(0);
    const height = ref(0);
    const dpi = ref(0);
    const uploadedFiles = ref([]);
    const processedFiles = ref([]);

    const handleFileUpload = (event) => {
      const selectedFiles = event.target.files;
      Array.from(selectedFiles).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            uploadedFiles.value.push({
              name: file.name,
              size: file.size,
              type: file.type,
              preview: e.target.result,
              originalWidth: img.width,
              originalHeight: img.height,
            });
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      });
    };

    const downloadFile = (file) => {
      const link = document.createElement('a');
      link.href = file.preview;
      link.download = file.name;
      link.click();
    };
    const convertToInches = (pixels, dpi) => {
      return dpi > 0 ? (pixels / dpi).toFixed(2) : 0;
    };

    return {
      width,
      height,
      dpi,
      uploadedFiles,
      processedFiles,
      handleFileUpload,
      downloadFile,
    };
  }
}
</script>
