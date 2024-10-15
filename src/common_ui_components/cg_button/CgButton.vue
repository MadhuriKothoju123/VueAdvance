<template>
    <button
      :class="buttonClasses"
      :disabled="disabled || loading"
      :style="buttonStyles "
      v-bind="$attrs"
      v-on="listeners"
      @click="handleClick"
    >
      <template v-if="loading">
        <span class="loading-spinner"></span>
      </template>
      <slot></slot>
    </button>
  </template>
  
  <script lang="ts" setup>
  import { computed, defineProps, useAttrs, defineEmits, CSSProperties } from "vue";
import { ButtonProps}  from '../../types/button'
  const props = withDefaults(defineProps<ButtonProps>(), {
    absolute: false,
    activeClass: "btn",
    block: false,
    color: 'inherit',
    disabled: false,
    fab: false,
    fixed: false,
    icon: false,
    large: false,
    left: false,
    loading: false,
    outline: false,
    right: false,
    round: false,
    small: false,
    top: false
  });
  
  const buttonClasses = computed(() => [
    props.activeClass,
    {
      "btn--block": props.block,
      "btn--fab": props.fab,
      "btn--icon": props.icon,
      "btn--large": props.large,
      "btn--small": props.small,
      "btn--outline": props.outline,
      "btn--round": props.round,
      "btn--loading": props.loading,
      "btn--disabled": props.disabled || props.loading,
      "btn--top": props.top,
      "btn--left": props.left,
      "btn--right": props.right,
    },
  ]);
  
  const listeners = useAttrs();
  
  const emit = defineEmits(["click"]);
  
  const handleClick = (event: any) => {
    if (!props.disabled && !props.loading) {
      emit("click", event);
    }
  };
  const buttonStyles = computed((): CSSProperties => {
    const styles: CSSProperties = {
      position: props.absolute ? "absolute" : props.fixed ? "fixed" : "relative",
    };
  
    if (props.color!== 'inherit' || props.outline) {
      styles.color = props.outline ? props.color : "white";
      styles.backgroundColor = props.outline ? "inherit" : props.color;
    }
  
    return styles;
  });
  </script>
  
  <style scoped  lang="scss">
  @import "../../assets/scss/button.scss";
  
  .loading-spinner {
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top-color: #fff;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 1s infinite linear;
    display: inline-block;
  }
  </style>
  