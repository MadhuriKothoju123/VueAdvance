<template>
  <div v-if="visible" :class="['alert', alertType]" @click="closeAlert">
    <span class="alert-message">{{ message }}</span>
    <button class="alert-close" @click.stop="closeAlert">✖</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'info',
  },
});

const emit = defineEmits(['close']);

const visible = ref(true);

const alertType = computed(() => {
  return {
    info: 'alert-info',
    success: 'alert-success',
    warning: 'alert-warning',
    error: 'alert-error',
  }[props.type] || 'alert-info';
});

const closeAlert = () => {
  visible.value = false;
  emit('close');
};
</script>

<style scoped>
.alert {
  position: fixed;
  top: 1em;
  right: 1em;
  max-width: 300px;
  padding: 1em;
  display: flex;
  align-items: center;
  border-radius: 5px;
  transition: opacity 0.3s ease;
  z-index: 9999;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.alert-message {
  flex: 1;
  margin-right: 1em;
}

.alert-close {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
}

.alert-info {
  background-color: #e3f7fc;
  color: #31708f;
  border: 1px solid #b3e5fc;
}

.alert-success {
  background-color: #dff0d8;
  color: #3c763d;
  border: 1px solid #d6e9c6;
}

.alert-warning {
  background-color: #fcf8e3;
  color: #8a6d3b;
  border: 1px solid #faebcc;
}

.alert-error {
  background-color: #f2dede;
  color: #a94442;
  border: 1px solid #ebccd1;
}
</style>
