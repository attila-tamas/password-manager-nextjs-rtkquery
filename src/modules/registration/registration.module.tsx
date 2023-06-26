import styles from "./registration.module.scss";
// react
import { FormEvent, useRef } from "react";
// next
import Link from "next/link";
// @hooks
import useEffectOnMount from "@hooks/useEffectOnMount";
import useFormInput from "@hooks/useFormInput";
import useLiveValidation from "@hooks/useLiveValidation";
import useMutation from "@hooks/useMutation";
import useShowPasswordIcon from "@hooks/useShowPasswordIcon";
import useToggle from "@hooks/useToggle";
import useValidationMessage from "@hooks/useValidationMessage";
import useValidationResult from "@hooks/useValidationResult";
// @redux
import { useRegisterMutation } from "@redux/auth/authApiSlice";
import {
	useValidateRegistrationEmailMutation,
	useValidateRegistrationPasswordMutation,
} from "@redux/validation/validationApiSlice";
// @components
import Button from "@components/button/button.component";
import Icon from "@components/icon/icon";
import Input from "@components/input/input.component";
import Logo from "@components/logo/logo.component";
// @util
import { pixelToEm } from "@util/pixelConverter";
import routes from "@util/routes";

// page module for "/register" route
export default function Registration() {
	const emailInputRef = useRef<HTMLInputElement>(null);
	useEffectOnMount(() => emailInputRef.current?.focus());

	const email = useFormInput("");
	const password = useFormInput("");

	const showPassword = useToggle(false);
	const showPasswordIcon = useShowPasswordIcon(showPassword.value);

	const registerMutation = useMutation(useRegisterMutation());

	const emailValidation = useLiveValidation(
		email.value,
		useValidateRegistrationEmailMutation()
	);
	const emailValidationResult = useValidationResult(emailValidation);
	const emailValidationMessage = useValidationMessage(emailValidation);

	const passwordValidation = useLiveValidation(
		password.value,
		useValidateRegistrationPasswordMutation()
	);
	const passwordValidationResult = useValidationResult(passwordValidation);
	const passwordValidationMessage = useValidationMessage(passwordValidation);

	function isSubmitButtonDisabled(): boolean {
		return (
			!email.value ||
			!password.value ||
			emailValidation.isError ||
			passwordValidation.isError
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
						error={emailValidation.isError}
						reference={emailInputRef}
					>
						{emailValidationResult}
					</Input>

					{emailValidationMessage}
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
						error={passwordValidation.isError}
					>
						<Icon
							icon={showPasswordIcon}
							size={pixelToEm(24)}
							className="interactable"
							onClick={showPassword.toggleValue}
						/>

						{passwordValidationResult}
					</Input>

					{passwordValidationMessage}
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
