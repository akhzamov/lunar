<script lang="ts" setup>
defineComponent({
  name: "UiInput",
});
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});
const inputActive = ref(false);
const inputType = ref("password");
const emit = defineEmits(["update:modelValue"]);
const changeInputType = () => {
  if (inputType.value == "text") {
    inputType.value = "password";
  } else {
    inputType.value = "text";
  }
};
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div
    class="flex items-center h-[44px] b-bg rounded-lg outline-none overflow-hidden"
    :class="[
      { 'border-[1px] border-c-primary-500': inputActive },
      { 'b-border-300': !inputActive },
    ]"
  >
    <input
      :value="props.modelValue"
      @input="onInput"
      :type="inputType"
      class="h-full outline-none border-none bg-transparent flex-grow px-[8px]"
      @focusin="inputActive = true"
      @focusout="inputActive = false"
    />
    <div
      @click="changeInputType()"
      :class="[
        { 'border-c-primary-500 text-c-primary-500': inputActive },
        {
          'border-c-gray-t-300 dark:border-c-gray-t-600': !inputActive,
        },
      ]"
      class="w-[54px] flex items-center justify-center border-l-[1px] cursor-pointer"
    >
      <IconEye v-if="inputType == 'text'" />
      <IconEyeSlash v-if="inputType == 'password'" />
    </div>
  </div>
</template>

<style scoped></style>
