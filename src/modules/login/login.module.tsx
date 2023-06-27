import styles from "./login.module.scss";
// react
import { FormEvent, useRef } from "react";
// next
import Link from "next/link";
import { useRouter } from "next/router";
// @hooks
import {
	useEffectOnMount,
	useEffectOnUpdate,
	useFormInput,
	useLiveValidation,
	useMutation,
	useShowPasswordIcon,
	useToggle,
	useValidation,
} from "@hooks/index";
// @redux hooks
import { useLoginMutation } from "@redux/auth/authApiSlice";
import { useValidateLoginEmailMutation } from "@redux/validation/validationApiSlice";
import { useDispatch } from "react-redux";
// @redux actions
import { setCredentials } from "@redux/auth/authSlice";
import { setPersist } from "@redux/user/userSlice";
// @components
import Button from "@components/button/button.component";
import Error from "@components/error/error.component";
import Icon from "@components/icon/icon";
import Input from "@components/input/input.component";
import Logo from "@components/logo/logo.component";
// @util
import { pixelToEm } from "@util/pixelConverter";
import routes from "@util/routes";

// page module for "/login" route
export default function Login() {
	const dispatch = useDispatch();
	const router = useRouter();

	const email = useFormInput("");
	const password = useFormInput("");

	const showPassword = useToggle(false);
	const showPasswordIcon = useShowPasswordIcon(showPassword.value);

	const loginMutation = useMutation(useLoginMutation());

	const emailValidation = useLiveValidation(
		email.value,
		useValidateLoginEmailMutation()
	);
	const passwordValidation = useValidation(
		password.value, //
		loginMutation
	);

	const emailInputRef = useRef<HTMLInputElement>(null);
	useEffectOnMount(() => emailInputRef.current?.focus());

	const passwordInputRef = useRef<HTMLInputElement>(null);
	useEffectOnUpdate(() => {
		if (passwordValidation.isError) passwordInputRef.current?.focus();
	}, [passwordValidation.isError]);

	function isSubmitButtonDisabled(): boolean {
		return !email.value || !password.value || !emailValidation.isSuccess;
	}

	async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
		event.preventDefault(); // prevent page reload

		const { accessToken } = await loginMutation.trigger({
			email: email.value,
			password: password.value,
		});

		if (!loginMutation.isSuccess) return;

		dispatch(setCredentials({ accessToken }));
		dispatch(setPersist({ persist: true }));

		router.replace(routes.vault);
	}

	return (
		<div className={styles["login-module"]}>
			<Logo size="110" />

			<p className={"title"}>Sign in</p>

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

					<span
						className={`
							${styles["form__field__forgot-password"]}
							interactable
						`}
					>
						Forgot password?
					</span>

					<Input
						className={styles["form__field__input"]}
						id="password"
						type="password"
						value={password.value}
						onChange={password.onChange}
						showPassword={showPassword.value}
						reference={passwordInputRef}
						validation={passwordValidation}
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
					text="Sign in"
					color="primary"
					flex
					disabled={isSubmitButtonDisabled()}
					isLoading={loginMutation.isLoading}
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
