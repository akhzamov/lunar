<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    default: "Button",
  },
  textColor: {
    type: String,
  },
  bgColor: {
    type: String,
    default: "b-bg",
  },
  borderHide: {
    type: Boolean,
    default: false,
  },
  hoverBgColor: {
    type: String,
  },
  p: {
    type: String,
    default: "p-2",
  },
  py: {
    type: String,
  },
  px: {
    type: String,
  },
});
</script>

<template>
  <button
    class="button rounded-lg outline-none overflow-hidden cursor-pointer"
    :class="[bgColor, { 'b-border': !borderHide }]"
  >
    <div class="block w-full h-full relative" :class="[px, py, p]">
      <div class="flex items-center justify-center gap-2 relative z-10">
        <slot name="icon"></slot>
        <p class="text-16-semi" :class="textColor" v-if="text.length > 0">
          {{ text }}
        </p>
        <slot name="icon-r"></slot>
      </div>
      <div
        class="hover-block w-full block h-full absolute top-0 left-0 p-1 z-[0]"
      >
        <div
          class="w-full h-full block rounded-[4px]"
          :class="hoverBgColor"
        ></div>
      </div>
    </div>
  </button>
</template>

<style>
.hover-block {
  opacity: 0;
  transition: all 150ms linear;
}
.button:hover .hover-block {
  opacity: 1;
}
</style>
