export default defineNuxtPlugin(() => {
  return {
    provide: {
      toHandle(value: string): string {
        return value
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");
      },
    },
  };
});
