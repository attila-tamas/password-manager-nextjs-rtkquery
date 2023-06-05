import styles from "./verify-email.module.scss";

import { useEffect, useState } from "react";

import { useResendVerificationEmailMutation } from "@redux/user/userApiSlice";
import { selectEmail } from "@redux/user/userSlice";
import { useSelector } from "react-redux";

import Image from "next/image";

import verifyEmailGraphic from "@public/verify-email-graphic.svg";

import Button from "@components/button-component/button";

export default function VerifyEmail() {
	const email = useSelector(selectEmail);

	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [countDownInSeconds, setCountDownInSeconds] = useState(0);
	const [errorMsg, setErrorMsg] = useState("");

	const resendDelayInSeconds = 30;

	const [resendEmail, { isLoading, isSuccess, isError, error }] =
		useResendVerificationEmailMutation();

	useEffect(() => {
		if (isLoading) {
			console.log("loading...");
		}
	}, [isLoading]);

	useEffect(() => {
		if (isError) {
			const errorObj = error as any;
			setErrorMsg(errorObj.data.message);
		}
	}, [error, isError]);

	useEffect(() => {
		if (isSuccess) {
			console.log("new email sent");
		}
	}, [isSuccess]);

	useEffect(() => {
		if (countDownInSeconds > 0) {
			setIsButtonDisabled(true);

			const interval = setInterval(() => {
				setCountDownInSeconds(countDownInSeconds - 1);
			}, 1000);

			return () => clearInterval(interval);
		} else {
			setIsButtonDisabled(false);
			setErrorMsg("");
		}
	}, [countDownInSeconds]);

	const onResendButtonClicked = async () => {
		try {
			await resendEmail(email);
			setCountDownInSeconds(resendDelayInSeconds);
		} catch (error: any) {
			setErrorMsg(error.data?.message);
		}
	};

	const getButtonText = () => {
		if (isLoading) {
			return "Resending...";
		} else if (countDownInSeconds > 0) {
			return countDownInSeconds;
		}
		return "Resend email";
	};

	return (
		<div className={styles.container}>
			<Image className="unselectable" src={verifyEmailGraphic} alt="Verify email graphic" />

			<p className={styles.container__title}>Verify email</p>

			<p className={styles.container__desc}>
				An email containing a verification link has been sent to your email address. Click
				the link to gain access to your account.
			</p>

			<div className={styles.container__buttonContainer}>
				<Button
					text={getButtonText()}
					color="primary"
					flex
					disabled={isButtonDisabled}
					onClick={onResendButtonClicked}
				/>
			</div>

			{errorMsg && <p className="error">{errorMsg}</p>}
		</div>
	);
}
