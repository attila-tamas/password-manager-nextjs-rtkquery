import styles from "./login.module.scss";
// react
import { FormEvent, useRef } from "react";
// next
import Link from "next/link";
import { useRouter } from "next/router";
// @hooks
import {
	useDispatchLogin,
	useEffectOnMount,
	useEffectOnUpdate,
	useFormInput,
	useLiveValidation,
	useMutation,
	useShowPasswordIcon,
	useSuccess,
	useToggle,
	useValidation,
} from "@hooks/index";
// @redux
import { useLoginMutation } from "@redux/auth/authApiSlice";
import { useValidateLoginEmailMutation } from "@redux/validation/validationApiSlice";
// @components
import { Button, Error, Icon, Input, Logo } from "@components/index";
// @util
import { pixelToEm, pixelToRem, routes } from "@util/index";

// page module for "/login" route
export default function Login() {
	const router = useRouter();
	const dispatchLogin = useDispatchLogin();

	let accessToken = "";

	const loginMutation = useMutation(useLoginMutation());

	// email
	const email = useFormInput("");

	const emailValidation = useLiveValidation(
		email.value,
		useValidateLoginEmailMutation()
	);

	const emailInputRef = useRef<HTMLInputElement>(null);
	useEffectOnMount(() => emailInputRef.current?.focus());
	//

	// password
	const password = useFormInput("");

	const showPassword = useToggle(false);
	const showPasswordIcon = useShowPasswordIcon(showPassword.value);

	const passwordValidation = useValidation(
		password.value, //
		loginMutation
	);

	const passwordInputRef = useRef<HTMLInputElement>(null);
	useEffectOnUpdate(() => {
		if (passwordValidation.isError) passwordInputRef.current?.focus();
	}, [passwordValidation.isError]);
	//

	function isSubmitButtonDisabled(): boolean {
		return !password.value || !emailValidation.isSuccess;
	}

	async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
		event.preventDefault(); // prevent page reload

		accessToken = await loginMutation.trigger({
			email: email.value,
			password: password.value,
		});
	}

	useSuccess(() => {
		dispatchLogin({
			accessToken,
			email: email.value,
			persist: true,
		});

		router.replace(routes.vault);
	}, loginMutation);

	return (
		<div className={styles["login-module"]}>
			<Logo size={pixelToRem(20)} />

			<p className="title">Sign in</p>

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
						reference={passwordInputRef}
						validation={passwordValidation}
						autocomplete="current-password"
					>
						<Icon
							icon={showPasswordIcon}
							size={pixelToEm(24)}
							className="interactable"
							onClick={showPassword.toggleValue}
						/>
					</Input>

					<Error message={passwordValidation.errorMsg} />

					<Link
						href={routes.requestPasswordChange}
						className={`
							${styles["form__field__forgot-password"]}
							interactable
						`}
					>
						Forgot password?
					</Link>
				</div>

				<Button
					className={styles["form__button"]}
					type="submit"
					text="Sign in"
					color="primary"
					flex
					disabled={isSubmitButtonDisabled()}
					loading={loginMutation.isLoading}
				/>

				<p className={styles["form__hint"]}>
					New to keystone?&nbsp;
					<Link href={routes.register} className="interactable">
						Create account
					</Link>
				</p>
			</form>
		</div>
	);
}
