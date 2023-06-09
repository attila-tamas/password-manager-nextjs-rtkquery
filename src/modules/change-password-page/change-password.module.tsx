// styles
import styles from "./change-password.module.scss";
// react
import { useEffect, useRef, useState } from "react";
// next.js
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
// @redux
import { useChangePasswordMutation } from "@redux/user/userApiSlice";
// @util
import routes from "@util/routes";
// @public
import changePasswordGraphic from "@public/change-password-graphic.svg";
// @components
import Button from "@components/button-component/button";
import Checkbox from "@components/checkbox-component/checkbox";
import Input from "@components/input-component/input";

// page module for "change-password" route
export default function ChangePassword() {
	// ref
	const passwordRef = useRef<HTMLDivElement>(null);

	// states
	const [password, setPassword] = useState("");
	const [showPwd, setShowPwd] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [countDownInSeconds, setCountDownInSeconds] = useState(3);
	//

	// api hook
	const [changePassword, { isLoading, isSuccess, isError, error }] = useChangePasswordMutation();

	// useEffect hooks
	// focus the password input on page load
	useEffect(() => {
		passwordRef.current?.focus();
	}, []);

	// set a timer for 3 seconds before redirecting
	// to give feedback to the user that the new password has been set
	useEffect(() => {
		if (isSuccess) {
			if (countDownInSeconds > 0) {
				const interval = setInterval(() => {
					setCountDownInSeconds(countDownInSeconds - 1);
				}, 1000);

				return () => clearInterval(interval);
			} else {
				router.replace(routes.login);
			}
		}
	}, [isSuccess, countDownInSeconds]);

	// set the error message if there is an error to display it to the user
	useEffect(() => {
		if (isError) {
			const errorObj = error as any;
			setErrorMsg(errorObj.data?.message);
		}
	}, [isError, error]);

	// clear the error message when the password input value changes
	useEffect(() => {
		setErrorMsg("");
	}, [password]);
	//

	// handler functions
	// input handlers
	const handlePwdInput = (e: any) => setPassword(e.target.value);
	const handleShowPwdToggle = () => setShowPwd((prev: boolean) => !prev);

	// form submit handler
	const handleSubmit = async (e: any) => {
		e.preventDefault(); // prevent page reload

		if (router.query.credentials) {
			const id = router.query.credentials[0];
			const token = router.query.credentials[1];

			await changePassword({ id, token, password });
		}
	};
	//

	return (
		<div className={styles.container}>
			<Image
				className="unselectable"
				src={changePasswordGraphic}
				alt="Account activated graphic"
			/>

			{isSuccess ? (
				<>
					{/* when the change password request was successful and the new password has been set */}

					<p className={styles.title}>New password set</p>

					<p className={styles.desc}>
						You will be redirected to the login page in {countDownInSeconds}...
						<br />
						<Link href={routes.login} className="link">
							Go now
						</Link>
					</p>
				</>
			) : (
				<>
					{/* when the new password has not been set yet */}

					<p className={styles.title}>Change password</p>

					<form className={styles.form} onSubmit={handleSubmit}>
						<div className={styles.form__inputContainer}>
							<label htmlFor="password">Password</label>

							<Input
								type="password"
								id="password"
								reference={passwordRef}
								show={showPwd}
								value={password}
								onChange={handlePwdInput}
							/>

							<Checkbox
								label="Show Password"
								checked={showPwd}
								onChange={handleShowPwdToggle}
							/>
						</div>

						<Button
							text={isLoading ? "Setting new password..." : "Set new password"}
							color="primary"
							type="submit"
							flex
							disabled={isLoading}
						/>
					</form>

					{errorMsg && <p className="error">{errorMsg}</p>}
				</>
			)}
		</div>
	);
}
