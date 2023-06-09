// styles
import styles from "./login.module.scss";
// react
import { useEffect, useRef, useState } from "react";
// next.js
import Link from "next/link";
import router from "next/router";
// npm
import { useDispatch, useSelector } from "react-redux";
// @redux
// api hooks
import { useLoginMutation } from "@redux/auth/authApiSlice";
import { useRequestPasswordChangeMutation } from "@redux/user/userApiSlice";
// actions
import { setCredentials } from "@redux/auth/authSlice";
// selectors
import { selectCurrentEmail, setCurrentEmail, setPersist } from "@redux/user/userSlice";
//
// @util
import routes from "@util/routes";
// @components
import Button from "@components/button-component/button";
import Checkbox from "@components/checkbox-component/checkbox";
import Input from "@components/input-component/input";
import Logo from "@components/logo-component/logo";

// page module for "/login" route
export default function Login() {
	const dispatch = useDispatch();

	const currentEmail = useSelector(selectCurrentEmail);

	// refs
	const emailRef = useRef<HTMLDivElement>(null);
	const passwordRef = useRef<HTMLDivElement>(null);
	const errorRef = useRef<HTMLDivElement>(null);
	//

	// states
	const [email, setEmail] = useState(currentEmail || "");
	const [password, setPassword] = useState("");
	const [showPwd, setShowPwd] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	//

	// api hooks
	const [
		requestPasswordChange,
		{ isLoading: isPasswordChangeRequestLoading, isSuccess, isError, error },
	] = useRequestPasswordChangeMutation();

	const [login, { isLoading: isLoginLoading }] = useLoginMutation();
	//

	// useEffect hooks
	// focus the email input if it is empty, otherwise focus the password input on page load
	useEffect(() => {
		if (!email) {
			emailRef.current?.focus();
		} else {
			passwordRef.current?.focus();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// set the error message if there is an error to display it to the user
	useEffect(() => {
		if (isError) {
			const errorObj = error as any;
			setErrorMsg(errorObj.data.message);
		}
	}, [error, isError]);

	// clear the error message when the email or password input value changes
	useEffect(() => {
		setErrorMsg("");
	}, [email, password]);

	// clear the error message if the password change request was successful
	useEffect(() => {
		if (isSuccess) {
			setErrorMsg("");
		}
	}, [isSuccess]);
	//

	// handler functions
	// input handlers
	const handleEmailInput = (e: any) => setEmail(e.target.value);
	const handlePwdInput = (e: any) => setPassword(e.target.value);
	const handleShowPwdToggle = () => setShowPwd((prev: boolean) => !prev);

	// form submit handler
	const handleSubmit = async (e: any) => {
		e.preventDefault(); // prevent page reload

		try {
			const { accessToken } = await login({ email, password }).unwrap();
			dispatch(setCredentials({ accessToken }));

			dispatch(setPersist({ persist: true }));
			dispatch(setCurrentEmail({ email }));

			router.replace(routes.vault);
		} catch (error: any) {
			setErrorMsg(error.data?.message);
			errorRef.current?.focus();
		}
	};

	// forgot password handler
	const onForgotPasswordClicked = async () => {
		if (!email) {
			emailRef.current?.focus();
			setErrorMsg("The email address must not be empty");
		} else {
			await requestPasswordChange(email);
		}
	};
	//

	return (
		<div className={styles.container}>
			<Logo size="130" />

			<p className={styles.title}>Sign in</p>

			{/* error message display starts */}
			{errorMsg && (
				<p ref={errorRef} className="error" aria-live="assertive">
					{errorMsg}
				</p>
			)}
			{/* error message display ends  */}

			{/* login form starts */}
			<form onSubmit={handleSubmit} className={styles.form}>
				{/* email field starts */}
				<div className={styles.form__field}>
					<label htmlFor="email">Email</label>

					<Input
						type="text"
						id="email"
						reference={emailRef}
						value={email}
						onChange={handleEmailInput}
					/>
				</div>
				{/* email field ends */}

				{/* password field starts */}
				<div className={styles.form__field}>
					<span className={styles.form__field__textContainer}>
						<label htmlFor="password">Password</label>

						<span
							onClick={onForgotPasswordClicked}
							className={`link ${styles.form__field__textContainer__link}`}>
							{isPasswordChangeRequestLoading
								? "Sending email..."
								: "Forgot password?"}
						</span>
					</span>

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
				{/* password field ends */}

				{/* button group starts */}
				<div className={styles.form__buttonGroup}>
					<Button
						text={isLoginLoading ? "Signing in..." : "Sign in"}
						color="primary"
						type="submit"
						flex
					/>

					<p>
						New to keystone?
						<Link href="/register" className="link">
							{" "}
							Create account
						</Link>
					</p>
				</div>
				{/* button group ends */}
			</form>
			{/* login form ends */}
		</div>
	);
}
