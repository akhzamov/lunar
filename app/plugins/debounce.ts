export default defineNuxtPlugin(() => {
  return {
    provide: {
      debounce<T extends (...args: any[]) => void>(
        func: T,
        wait: number
      ): (this: ThisParameterType<T>, ...args: Parameters<T>) => void {
        let timeout: ReturnType<typeof setTimeout>;
        return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
          clearTimeout(timeout);
          timeout = setTimeout(() => func.apply(this, args), wait);
        };
      },
    },
  };
});
