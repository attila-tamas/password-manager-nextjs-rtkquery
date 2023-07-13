import styles from "./verifyEmail.module.scss";
// next
import Image from "next/image";
import { useRouter } from "next/router";
// npm
import { enqueueSnackbar } from "notistack";
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
	useActivateAccountMutation,
	useResendVerificationEmailMutation,
} from "@redux/user/userApiSlice";
import { selectCurrentEmail, setCurrentEmail } from "@redux/user/userSlice";
import { useValidateOtpMutation } from "@redux/validation/validationApiSlice";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// @public
import verifyEmailGraphic from "@public/verifyEmailGraphic.svg";
// @components
import { Error, Input, Logo, Spinner } from "@components/index";
// @util
import { setIsActive } from "@redux/auth/authSlice";
import { pixelToRem, routes } from "@util/index";

// page module for "/verify-email" route
export default function VerifyEmail() {
	const router = useRouter();
	const dispatch = useDispatch();

	const currentEmail = useSelector(selectCurrentEmail);

	// otp
	const otp = useFormInput("");

	const otpInputRef = useRef<HTMLInputElement>(null);
	useEffectOnMount(() => otpInputRef.current?.focus());

	const otpValidation = useLiveValidation(
		otp.value,
		useValidateOtpMutation()
	);
	//

	// activate account
	const activateAccountMutation = useMutation(
		useActivateAccountMutation() //
	);

	useSuccess(async () => {
		await activateAccountMutation.trigger({
			email: currentEmail,
			token: otp.value,
		});
	}, otpValidation);

	useSuccess(() => {
		enqueueSnackbar("Account activated", { variant: "success" });
		dispatch(setCurrentEmail({ email: null }));
		dispatch(setIsActive({ isActive: true }));
		router.replace(routes.vault);
	}, activateAccountMutation);
	//

	// resend email
	const resendEmailMutation = useMutation(
		useResendVerificationEmailMutation()
	);

	async function onResendClicked(): Promise<void> {
		await resendEmailMutation.trigger(currentEmail);
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
		enqueueSnackbar("New email sent", { variant: "success" });
	}, resendEmailMutation);
	//

	// error message
	const [errorMsg, setErrorMsg] = useState("");

	useEffectOnUpdate(() => {
		setErrorMsg(otpValidation.errorMsg);
	}, [otpValidation.errorMsg]);

	useEffectOnUpdate(() => {
		setErrorMsg(resendEmailMutation.errorMsg);
	}, [resendEmailMutation.errorMsg]);
	//

	return (
		<div className={styles["verify-email-module"]}>
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
}
