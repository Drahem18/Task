<template>
  <div class="pagination">
    <button @click="prevPage" class="next" :disabled="currentPage === 1">
      <Icon name="ph:arrow-left-light" size="20" /> Previous
    </button>
    <div class="buttons">
      <button
        class="btns"
        v-for="page in pages"
        :key="page"
        @click="changePage(page)"
        :class="{ active: currentPage === page }"
      >
        {{ page }}
      </button>
    </div>
    <button
      class="next"
      @click="nextPage"
      :disabled="currentPage === totalPages"
    >
      Next <Icon name="ph:arrow-right-light" size="20" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from "vue";

interface Props {
  totalItems: number;
  itemsPerPage?: number;
}

const props = defineProps<Props>();
const emit = defineEmits(["page-changed"]);

const currentPage = ref(1);
const itemsPerPage = props.itemsPerPage ?? 10;

const totalPages = computed(() => Math.ceil(props.totalItems / itemsPerPage));
const pages = computed(() => {
  let startPage = Math.max(currentPage.value - 2, 1);
  let endPage = Math.min(startPage + 4, totalPages.value);

  if (endPage - startPage < 4) {
    startPage = Math.max(endPage - 4, 1);
  }

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
});

const changePage = (page: number) => {
  currentPage.value = page;
  emit("page-changed", currentPage.value);
};

const prevPage = () => {
  if (currentPage.value > 1) {
    changePage(currentPage.value - 1);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    changePage(currentPage.value + 1);
  }
};
</script>

<style scoped lang="scss">
.pagination {
  width: 100%;
  margin: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .buttons {
    .btns {
      padding: 10px 20px;
      border-radius: 8px;
      border: none;
      background-color: #f0f0f0;
      margin: 0 3px;
      cursor: pointer;
    }
  }
  .next {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0 5px;
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    background-color: #f0f0f0;
    cursor: pointer;
  }

  .active {
    background-color: #f5f5f5;
    color: #eb2e48;
  }
  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
button {
  transition: 0.1s ease-in-out;
}

button:hover {
  transform: scale(1.1);
}
</style>
