import styles from "./registration.module.scss";
// react
import { FormEvent, useRef } from "react";
// next
import Link from "next/link";
// next
import { useRouter } from "next/router";
// @hooks
import {
	useDispatchLogin,
	useEffectOnMount,
	useFormInput,
	useLiveValidation,
	useMutation,
	useShowPasswordIcon,
	useSuccess,
	useToggle,
} from "@hooks/index";
// @redux
import {
	useLoginMutation,
	useRegisterMutation,
} from "@redux/auth/authApiSlice";
import {
	useValidateRegistrationEmailMutation,
	useValidateRegistrationPasswordMutation,
} from "@redux/validation/validationApiSlice";
// @components
import { Button, Error, Icon, Input, Logo } from "@components/index";
// @util
import { pixelToEm, pixelToRem, routes } from "@util/index";

// page module for "/register" route
export default function Registration() {
	const router = useRouter();
	const dispatchLogin = useDispatchLogin();

	const registerMutation = useMutation(useRegisterMutation());
	const loginMutation = useMutation(useLoginMutation());

	// email
	const email = useFormInput("");

	const emailValidation = useLiveValidation(
		email.value,
		useValidateRegistrationEmailMutation()
	);

	const emailInputRef = useRef<HTMLInputElement>(null);
	useEffectOnMount(() => emailInputRef.current?.focus());
	//

	// password
	const password = useFormInput("");

	const showPassword = useToggle(false);
	const showPasswordIcon = useShowPasswordIcon(showPassword.value);

	const passwordValidation = useLiveValidation(
		password.value,
		useValidateRegistrationPasswordMutation()
	);
	//

	function isSubmitButtonDisabled(): boolean {
		return !emailValidation.isSuccess || !passwordValidation.isSuccess;
	}

	function isSubmitButtonLoading(): boolean {
		return (
			registerMutation.isLoading ||
			registerMutation.isSuccess ||
			loginMutation.isLoading
		);
	}

	async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
		event.preventDefault(); // prevent page reload

		await registerMutation.trigger({
			email: email.value,
			password: password.value,
		});
	}

	// the user needs to be logged in first because
	// a jwt token is needed to visit the verify email page
	useSuccess(async () => {
		const { accessToken } = await loginMutation.trigger({
			email: email.value,
			password: password.value,
		});

		dispatchLogin({
			accessToken,
			email: email.value,
			persist: true,
		});

		router.replace(routes.verifyEmail);
	}, registerMutation);

	return (
		<div className={styles["registration-module"]}>
			<Logo size={pixelToRem(20)} />

			<p className="title">Create account</p>

			<form className={styles["form"]} onSubmit={onSubmit}>
				<div className={styles["form__field"]}>
					<label
						className={styles["form__field__label"]}
						htmlFor="email"
					>
						Email
					</label>

					<Input
						className={`${styles["form__field__input"]}`}
						id="email"
						type="text"
						value={email.value}
						onChange={email.onChange}
						reference={emailInputRef}
						validation={emailValidation}
						autocomplete="email"
					/>

					<Error message={emailValidation.errorMsg} />
				</div>

				<div className={styles["form__field"]}>
					<label
						className={styles["form__field__label"]}
						htmlFor="password"
					>
						Password
					</label>

					<Input
						className={styles["form__field__input"]}
						id="password"
						type="password"
						value={password.value}
						onChange={password.onChange}
						showPassword={showPassword.value}
						validation={passwordValidation}
						autocomplete="new-password"
					>
						<Icon
							icon={showPasswordIcon}
							size={pixelToEm(24)}
							className="interactable"
							onClick={showPassword.toggleValue}
						/>
					</Input>

					<Error message={passwordValidation.errorMsg} />
				</div>

				<Button
					className={styles["form__button"]}
					type="submit"
					text="Create account"
					color="primary"
					flex
					disabled={isSubmitButtonDisabled()}
					loading={isSubmitButtonLoading()}
				/>

				<p className={styles["form__hint"]}>
					I have an account.&nbsp;
					<Link href={routes.login} className="interactable">
						Sign in
					</Link>
				</p>
			</form>
		</div>
	);
}
