import { defineRule } from 'vee-validate';
import * as yup from 'yup';

export default defineNuxtPlugin(() => {
    // Регистрация кастомных правил валидации (при необходимости)
    defineRule('required', (value: any) => {
        return value ? true : 'Это поле обязательно для заполнения';
    });
});