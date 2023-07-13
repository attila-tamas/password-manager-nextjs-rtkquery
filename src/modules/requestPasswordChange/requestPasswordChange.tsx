import styles from "./requestPasswordChange.module.scss";
// next
import Image from "next/image";
import { useRouter } from "next/router";
// npm
import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
// @hooks
import {
	useEffectOnMount,
	useEffectOnUpdate,
	useFormInput,
	useLiveValidation,
	useMutation,
	useSuccess,
} from "@hooks/index";
// @redux
import {
	useRequestPasswordChangeMutation,
	useResendVerificationEmailMutation,
} from "@redux/user/userApiSlice";
import {
	useValidateLoginEmailMutation,
	useValidateOtpMutation,
} from "@redux/validation/validationApiSlice";
import { FormEvent, useRef, useState } from "react";
// @public
import enterEmailGraphic from "@public/enterEmailGraphic.svg";
import verifyEmailGraphic from "@public/verifyEmailGraphic.svg";
// @components
import { Button, Error, Input, Logo, Spinner } from "@components/index";
// @util
import { selectCurrentEmail, setCurrentEmail } from "@redux/user/userSlice";
import { pixelToRem, routes } from "@util/index";

export default function RequestPasswordChange() {
	const router = useRouter();
	const dispatch = useDispatch();

	// email
	const email = useFormInput("");

	const emailInputRef = useRef<HTMLInputElement>(null);
	useEffectOnMount(() => emailInputRef.current?.focus());

	const emailValidation = useLiveValidation(
		email.value,
		useValidateLoginEmailMutation()
	);

	const currentEmail = useSelector(selectCurrentEmail);

	function onNextButtonClicked(): void {
		dispatch(setCurrentEmail({ email: email.value }));
	}
	//

	// form submit
	const requestPasswordChangeMutation = useMutation(
		useRequestPasswordChangeMutation()
	);

	async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
		event.preventDefault(); // prevent page reload

		await requestPasswordChangeMutation.trigger(email.value);

		setErrorMsg("");
	}
	//

	// otp
	const otp = useFormInput("");

	const otpInputRef = useRef<HTMLInputElement>(null);
	useEffectOnMount(() => otpInputRef.current?.focus());

	const otpValidation = useLiveValidation(
		otp.value,
		useValidateOtpMutation()
	);

	useSuccess(() => {
		router.replace(`${routes.changePassword}/${email.value}/${otp.value}`);
	}, otpValidation);
	//

	// resend verification email
	const resendEmailMutation = useMutation(
		useResendVerificationEmailMutation()
	);

	async function onResendClicked(): Promise<void> {
		await resendEmailMutation.trigger(email.value);
	}

	function resendButton(): JSX.Element {
		if (resendEmailMutation.isLoading) return <Spinner size={16} />;
		return (
			<span className="interactable" onClick={onResendClicked}>
				Resend
			</span>
		);
	}

	useSuccess(() => {
		enqueueSnackbar("Email sent", { variant: "success" });
	}, resendEmailMutation);
	//

	// error message
	const [errorMsg, setErrorMsg] = useState("");

	useEffectOnUpdate(() => {
		setErrorMsg(emailValidation.errorMsg);
	}, [emailValidation.errorMsg]);

	useEffectOnUpdate(() => {
		setErrorMsg(otpValidation.errorMsg);
	}, [otpValidation.errorMsg]);

	useEffectOnUpdate(() => {
		setErrorMsg(resendEmailMutation.errorMsg);
	}, [resendEmailMutation.errorMsg]);
	//

	if (currentEmail) {
		return (
			<div className={styles["request-password-change-module"]}>
				<Logo size={pixelToRem(20)} />

				<Image
					className="unselectable"
					src={verifyEmailGraphic}
					alt="Verify email graphic"
				/>

				<p className="title">Verify email address</p>

				<p>
					A verification code has been sent to
					<br />
					<span className={styles["email"]}>{currentEmail}</span>
				</p>

				<div className={styles["field"]}>
					<Input
						type="text"
						placeholder="Enter the verification code"
						value={otp.value}
						onChange={otp.onChange}
						reference={otpInputRef}
						validation={otpValidation}
						autocomplete="off"
					/>

					<Error message={errorMsg} />
				</div>

				<div className={styles["hint"]}>
					<p className={styles["hint__body"]}>
						Did not get the email?&nbsp;
						{resendButton()}
					</p>
					<p className={styles["hint__footer"]}>
						Make sure to check the spam folder as well
					</p>
				</div>
			</div>
		);
	} else {
		return (
			<div className={styles["request-password-change-module"]}>
				<Logo size={pixelToRem(20)} />

				<Image
					className="unselectable"
					src={enterEmailGraphic}
					alt="Enter email graphic"
				/>

				<h1 className="title">Request password change</h1>

				<p>
					Enter your account&apos;s email address to receive your
					verification code
				</p>

				<form className={styles["form"]} onSubmit={onSubmit}>
					<div className={styles["form__field"]}>
						<label
							className={styles["form__field__label"]}
							htmlFor="email"
						>
							Email
						</label>

						<Input
							className={styles["form__field__input"]}
							id="email"
							type="text"
							value={email.value}
							onChange={email.onChange}
							reference={emailInputRef}
							validation={emailValidation}
							autocomplete="email"
						/>

						<Error message={errorMsg} />
					</div>

					<Button
						text="Next"
						type="submit"
						color="primary"
						flex
						disabled={!emailValidation.isSuccess}
						loading={requestPasswordChangeMutation.isLoading}
						onClick={onNextButtonClicked}
					/>
				</form>
			</div>
		);
	}
}
