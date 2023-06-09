// styles
import styles from "./verify-email.module.scss";
// react
import { useEffect, useState } from "react";
// next.js
import Image from "next/image";
// npm
import { useSelector } from "react-redux";
// @redux
// api hooks
import { useResendVerificationEmailMutation } from "@redux/user/userApiSlice";
// selectors
import { selectCurrentEmail } from "@redux/user/userSlice";
//
// @public
import verifyEmailGraphic from "@public/verify-email-graphic.svg";
// @components
import Button from "@components/button-component/button";

// page module for "/verify-email" route
export default function VerifyEmail() {
	const resendDelayInSeconds = 30;

	const email = useSelector(selectCurrentEmail);

	// states
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [countDownInSeconds, setCountDownInSeconds] = useState(0);
	const [errorMsg, setErrorMsg] = useState("");
	//

	// api hook
	const [resendEmail, { isLoading, isSuccess, isError, error }] =
		useResendVerificationEmailMutation();

	// useEffect hooks
	// set the error message if there is an error to display it to the user
	useEffect(() => {
		if (isError) {
			const errorObj = error as any;
			setErrorMsg(errorObj.data.message);
		}
	}, [error, isError]);

	// set a resend countdown timer if the API call was successful
	useEffect(() => {
		if (isSuccess) {
			setCountDownInSeconds(resendDelayInSeconds);
		}
	}, [isSuccess]);

	// set the countdown timer display and disable the resend email button when the timer is not finished
	// this can be bypassed by reloading the page, but it is also handled on the backend by a rate limiter
	useEffect(() => {
		if (countDownInSeconds > 0) {
			setIsButtonDisabled(true);

			const interval = setInterval(() => {
				setCountDownInSeconds(countDownInSeconds => {
					return countDownInSeconds - 1;
				});
			}, 1000);

			return () => clearInterval(interval);
		} else {
			setIsButtonDisabled(false);
			setErrorMsg("");
		}
	}, [countDownInSeconds]);
	//

	// handler functions
	// resend button handler
	const onResendButtonClicked = async () => {
		try {
			await resendEmail(email);
		} catch (error: any) {
			setErrorMsg(error.data?.message);
		}
	};

	// button text handler
	const getButtonText = () => {
		if (isLoading) {
			// when the API call is loading
			return "Resending...";
		} else if (countDownInSeconds > 0) {
			// when there is a countdown timer going
			return countDownInSeconds;
		}

		// default button text
		return "Resend email";
	};
	//

	return (
		<div className={styles.container}>
			<Image className="unselectable" src={verifyEmailGraphic} alt="Verify email graphic" />

			<p className={styles.title}>Verify email</p>

			<p className={styles.desc}>
				An email containing a verification link has been sent to your email address. Click
				the link to gain access to your account.
			</p>

			<div className={styles.button}>
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
