<template>
      <div  v-if="isOpen" class="dialog" :class="dialogClasses">
        <div  class="dialog-header">
            <slot class="dialog-title"  name="title"></slot>
          <button v-if="closeIcon"  @click="handleClose" class="close-button">X</button>
        </div>
        <div class="dialog-content">
          <slot></slot>
        </div>
        <div v-if="$slots.actions" class="dialog-actions">
          <slot name="actions"></slot>
        </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { DialogProps } from '../../types/dialog';
import { ref, watch, defineProps, defineEmits } from 'vue';
  
  // Define the props
  const props = withDefaults(defineProps<DialogProps>(), {
  disableEscapeKeyDown: false,
  fullScreen: false,
  fullWidth: false,
  maxWidth: 'sm', 
  closeIcon: false
});
  
  const emit = defineEmits<{
    (e: 'close'): void;
  }>();
  
  const dialogClasses = ref(['dialog-default']);
  if (props.fullScreen) {
    dialogClasses.value.push('full-screen');
  }
  if (props.fullWidth) {
    dialogClasses.value.push('full-width');
  }
  if (props.maxWidth) {
    dialogClasses.value.push(`max-width-${props.maxWidth}`);
  }
  
  const handleClose = () => {
    emit('close');
  };
  
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && !props.disableEscapeKeyDown) {
      handleClose();
    }
  };
  
  watch(() => props.isOpen, (newVal) => {
    if (newVal) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }
  });
  </script>
  
  <style lang="scss" scoped>
  
  @import '../../assets/scss/dialog.scss';
 
  </style>
  