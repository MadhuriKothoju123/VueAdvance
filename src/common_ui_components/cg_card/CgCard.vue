<template>
    <div
      :class="['card', elevationClass, roundedClass]"
      :style="cardStyles"
    >
      <!-- Title Slot -->
      <div v-if="$slots.title" class="card-title">
        <slot name="title"></slot>
      </div>
  
      <!-- Subtitle Slot -->
      <div v-if="$slots.subtitle" class="card-subtitle">
        <slot name="subtitle"></slot>
      </div>
  
      <!-- Card Content Slot -->
      <div class="card-content">
        <slot></slot>
      </div>
  
      <!-- Card Actions Slot -->
      <div v-if="$slots.actions" class="card-actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
import { CardProps } from '../../types/card';
  const props = withDefaults(defineProps<CardProps>(), {
  elevation: 2,
  rounded: true,
  width: '100%',
  height: 'auto',
  minHeight: '150px',
});
  
  const elevationClass = computed(() => `elevation-${props.elevation}`);
  
  const roundedClass = computed(() => {
    if (props.rounded === true) {
      return 'rounded';
    }
    if (typeof props.rounded === 'string') {
      return `rounded-${props.rounded}`;
    }
    return '';
  });
  
  const cardStyles = computed(() => ({
    width: typeof props.width === 'number' ? `${props.width}px` : props.width,
    height: typeof props.height === 'number' ? `${props.height}px` : props.height,
    minHeight:
      typeof props.minHeight === 'number'
        ? `${props.minHeight}px`
        : props.minHeight,
  }));
  </script>
  
  <style scoped  lang="scss">
  @import "../../assets/scss/card.scss";

  </style>
  