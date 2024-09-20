<script lang="ts" setup>
	import { useForm, useField } from "vee-validate";
	import * as yup from "yup";

	const schema = yup.object({
		login: yup
			.string()
			.required("Введите имя")
			.min(4, "Не должно быть меньше 4-и символов"),
		password: yup
			.string()
			.required("Введите пароль")
			.min(6, "Не должно быть меньше 6-и символов"),
	});
	interface ISchemaForm {
		login: string;
		password: string;
	}
	const { handleSubmit } = useForm<ISchemaForm>({
		validationSchema: schema,
	});
	const { value: login, errorMessage: loginError } =
		useField<string>("login");
	const { value: password, errorMessage: passwordError } =
		useField<string>("password");
	const authCookie = useCookie("auth");
	const router = useRouter();

	const onSubmit = handleSubmit(async (values) => {
		authCookie.value = "auth";
		router.push("/");
	});

	const passwordShow = ref(false);
</script>

<template>
	<div class="w-full h-[100vh] flex items-center justify-center">
		<form
			@submit.prevent="onSubmit"
			class="b-bg b-border p-12 rounded-lg flex flex-col items-center justify-start"
		>
			<img
				src="/img/lunar-logo-dark.svg"
				alt=""
				class="w-[109px] mb-4 hidden dark:block"
			/>
			<img
				src="/img/lunar-logo.svg"
				alt=""
				class="w-[109px] mb-4 block dark:hidden"
			/>
			<h3 class="text-24-bold">Авторизация</h3>
			<div class="flex flex-col gap-2 mt-6">
				<label class="flex items-start gap-[2px]">
					<span class="text-14-med">Email почта</span>
					<span class="text-16-reg text-c-error-500">*</span>
				</label>
				<UiInput
					type="text"
					class="w-[415px] h-[37px]"
					v-model="login"
				/>
				<span
					class="text-12-exp text-c-error-500"
					v-if="loginError"
					>{{ loginError }}</span
				>
			</div>
			<div class="flex flex-col gap-2 mt-6">
				<label class="flex items-start gap-[2px]">
					<span class="text-14-med">Пароль</span>
					<span class="text-16-reg text-c-error-500">*</span>
				</label>
				<div
					class="w-max h-[37px] overflow-hidden flex items-center border border-c-gray-t-300 dark:border-c-gray-t-600 rounded-lg p-0"
				>
					<UiInputIcon
						:type="passwordShow ? 'text' : 'password'"
						v-model="password"
						class="w-[370px] h-[34px]"
					/>
					<button
						@click="passwordShow = !passwordShow"
						type="button"
						class="w-[45px] h-[34px] border-l b-bg border-c-gray-t-300 dark:border-c-gray-t-600 flex items-center justify-center"
					>
						<Icon
							v-if="!passwordShow"
							name="mdi-eye"
							class="text-c-gray-t-400 dark:text-c-gray-t-500 h-[20px] w-[20px]"
						/>
						<Icon
							v-if="passwordShow"
							name="mdi-eye-off"
							class="text-c-gray-t-400 dark:text-c-gray-t-500 h-[20px] w-[20px]"
						/>
					</button>
				</div>
				<span
					class="text-12-exp text-c-error-500"
					v-if="passwordError"
					>{{ passwordError }}</span
				>
			</div>
			<UiButton
				type="submit"
				class="w-full mt-6"
				text="Войти"
				text-color="text-c-gray-t-50"
				bg-color="bg-c-primary-600"
				:border-hide="true"
				hover-bg-color="bg-c-primary-700"
				px="px-4"
				py="py-[10px]"
			>
			</UiButton>
		</form>
	</div>
</template>

<style scoped></style>
