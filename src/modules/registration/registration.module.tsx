import styles from "./registration.module.scss";
// react
import { FormEvent, useRef } from "react";
// next
import Link from "next/link";
// @hooks
import {
	useEffectOnMount,
	useFormInput,
	useLiveValidation,
	useMutation,
	useShowPasswordIcon,
	useToggle,
} from "@hooks/index";
// @redux
import { useRegisterMutation } from "@redux/auth/authApiSlice";
import {
	useValidateRegistrationEmailMutation,
	useValidateRegistrationPasswordMutation,
} from "@redux/validation/validationApiSlice";
// @components
import { Button, Error, Icon, Input, Logo } from "@components/index";
// @util
import { pixelToEm } from "@util/pixelConverter";
import routes from "@util/routes";

// page module for "/register" route
export default function Registration() {
	const email = useFormInput("");
	const password = useFormInput("");

	const showPassword = useToggle(false);
	const showPasswordIcon = useShowPasswordIcon(showPassword.value);

	const registerMutation = useMutation(useRegisterMutation());

	const emailValidation = useLiveValidation(
		email.value,
		useValidateRegistrationEmailMutation()
	);
	const passwordValidation = useLiveValidation(
		password.value,
		useValidateRegistrationPasswordMutation()
	);

	const emailInputRef = useRef<HTMLInputElement>(null);
	useEffectOnMount(() => emailInputRef.current?.focus());

	function isSubmitButtonDisabled(): boolean {
		return (
			!email.value ||
			!password.value ||
			!emailValidation.isSuccess ||
			!passwordValidation.isSuccess
		);
	}

	async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
		event.preventDefault(); // prevent page reload

		await registerMutation.trigger({
			email: email.value,
			password: password.value,
		});
	}

	return (
		<div className={styles["registration-module"]}>
			<Logo size="110" />

			<p className={"title"}>Create account</p>

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

					<Input
						className={styles["form__field__input"]}
						id="password"
						type="password"
						value={password.value}
						onChange={password.onChange}
						showPassword={showPassword.value}
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
					text="Create account"
					color="primary"
					flex
					disabled={isSubmitButtonDisabled()}
					isLoading={registerMutation.isLoading}
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
