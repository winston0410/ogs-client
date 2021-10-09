<script context="module" lang="ts">
	import Button from '$lib/Button.svelte';
	import Heading from '$lib/Heading.svelte';
	import { createForm } from 'felte';
	import * as yup from 'yup';
	import { validator } from '@felte/validator-yup';
	import { svelteReporter, ValidationMessage } from '@felte/reporter-svelte';
	export const router = false;
	export async function load({ session }) {
		const isAdmin = !!parseInt(session.isAdmin);

		if (new Date().getTime() >= parseInt(session.expiresIn)) {
			return {};
		}

		if (session.accessToken) {
			if (isAdmin) {
				return { redirect: '/admin', status: 302 };
			} else {
				return { redirect: '/lobby', status: 302 };
			}
		}

		return {};
	}
</script>

<script lang="ts">
	const schema = yup.object({
		name: yup.string().required(),
		password: yup.string().required()
	});

	let submitError = '';

	const { form, createSubmitHandler } = createForm({
		onSubmit: async (values) => {
			fetch(`/endpoints/callback`, {
				method: 'POST',
				body: JSON.stringify(values)
			})
				.then((res) => {
					if (res.ok) {
						//  goto doesn't work here, as getSession requires a request from server.
						//  redirect to the current page, and let __layout.svelte to take over to redirection
						window.location.href = '/';
						return;
					}

					if (res.status >= 400 && res.status < 500) {
						submitError = '你嘅用戶名或者密碼唔啱喎，麻煩你再試多次。';
					} else {
						submitError = '我哋嘅服務有啲問題，麻煩你之後再試過啦。';
					}
				})
				.catch((err) => {
					console.log(err);
					submitError = '你嘅網絡有啲問題，麻煩你之後再試多次啦。';
				});
		},
		extend: [validator, svelteReporter],
		validateSchema: schema
	});

	const handleSubmit = createSubmitHandler({});

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.code === 'Enter') {
			handleSubmit();
		}
	};
</script>

<svelte:head>
	<title>妙手棋院 比賽報到網站</title>
	<meta name="description" content="妙手棋院 比賽報到網站" />
</svelte:head>

<svelte:body on:keydown={handleKeydown} />

<div class="login">
	<Heading tag={'h1'}>妙手棋院 比賽報到網站</Heading>
	<form class="login-form" use:form>
		<div class="validation">
			<label class="login-form-label">
				<span>用戶名</span>
				<input id="name" type="text" name="name" />
			</label>
			<ValidationMessage for="name" let:messages={message}>
				<span id="name-validation" class="validation-message" aria-live="polite">
					{message ? '你未填用戶名喎。' : ''}
				</span>
			</ValidationMessage>
		</div>
		<div class="validation">
			<label class="login-form-label">
				<span>密碼</span>
				<input type="password" id="password" name="password" />
			</label>
			<ValidationMessage for="password" let:messages={message}>
				<span id="password-validation" class="validation-message" aria-live="polite">
					{message ? '你未填密碼喎。' : ''}
				</span>
			</ValidationMessage>
		</div>
		<!--  TODO: Handle submittion with enter  -->
		<Button type={'submit'}>登入</Button>
		<div class="validation">
			<span class="form-validation-message">{submitError}</span>
		</div>
	</form>
</div>

<style>
	.login {
		height: 100vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 var(--sm-space);
		flex-direction: column;
	}

	.login-form {
		display: flex;
		justify-content: center;
		flex-direction: column;
		width: 100%;
		max-width: 568px;
		margin-left: auto;
		margin-right: auto;
		background-color: #eee;
		padding: var(--xxl-space);
		border-radius: var(--sm-radius);
	}

	input {
		border: 2px solid var(--highlight-color);
		border-radius: var(--sm-radius);
		outline: none;
	}

	input:focus {
		border-color: var(--highlight-color-tint1);
	}

	.login-form-label {
		display: flex;
		flex-direction: column;
		font-size: var(--sm-font);
	}

	.validation,
	.validation-message {
		--validation-message-height: var(--xxl-space);
	}

	.validation {
		position: relative;
		margin-bottom: var(--validation-message-height);
	}

	.validation-message,
	.form-validation-message {
		height: var(--validation-message-height);
		position: absolute;
		top: 100%;
		left: 0%;
		color: red;
	}

	.form-validation-message {
		transform: translateY(50%);
	}
</style>
