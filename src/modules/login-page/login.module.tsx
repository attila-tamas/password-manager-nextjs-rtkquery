import styles from "./login.module.scss";

import Link from "next/link";
import router from "next/router";
import { useEffect, useRef, useState } from "react";

import routes from "@util/routes";

import { setCredentials } from "@redux/auth/authSlice";
import { selectEmail, setCurrentEmail, setPersist } from "@redux/user/userSlice";

import { useLoginMutation } from "@redux/auth/authApiSlice";
import { useDispatch, useSelector } from "react-redux";

import { useRequestPasswordChangeMutation } from "@/redux/user/userApiSlice";
import Button from "@components/button-component/button";
import Checkbox from "@components/checkbox-component/checkbox";
import Input from "@components/input-component/input";
import Logo from "@components/logo-component/logo";

export default function Login() {
	const dispatch = useDispatch();

	const currentEmail = useSelector(selectEmail);

	const [
		requestPasswordChange,
		{ isLoading: isPasswordChangeRequestLoading, isSuccess, isError, error },
	] = useRequestPasswordChangeMutation();

	const emailRef = useRef<HTMLDivElement>(null);
	const passwordRef = useRef<HTMLDivElement>(null);
	const errorRef = useRef<HTMLDivElement>(null);

	const [email, setEmail] = useState(currentEmail || "");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [showPwd, setShowPwd] = useState(false);

	const [login, { isLoading: isLoginLoading }] = useLoginMutation();

	useEffect(() => {
		if (!email) {
			emailRef.current?.focus();
		} else {
			passwordRef.current?.focus();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setErrorMsg("");
	}, [email, password]);

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

	const handleEmailInput = (e: any) => setEmail(e.target.value);
	const handlePwdInput = (e: any) => setPassword(e.target.value);

	const handleShowPwdToggle = () => setShowPwd((prev: boolean) => !prev);

	useEffect(() => {
		if (isError) {
			const errorObj = error as any;
			setErrorMsg(errorObj.data.message);
		}
	}, [error, isError]);

	const onForgotPasswordClicked = async () => {
		if (!email) {
			emailRef.current?.focus();
			setErrorMsg("The email address must not be empty");
		} else {
			await requestPasswordChange(email);
		}
	};

	useEffect(() => {
		if (isSuccess) {
			setErrorMsg("");
		}
	}, [isSuccess]);

	return (
		<div className={styles.container}>
			<Logo width="130" />

			<p className={styles.container__title}>Sign in</p>

			{/* temp */}
			{errorMsg && (
				<p ref={errorRef} className="error" aria-live="assertive">
					{errorMsg}
				</p>
			)}
			{/* temp */}

			<form className={styles.container__form} onSubmit={handleSubmit}>
				<div className={styles.container__form__inputContainer}>
					<label htmlFor="email">Email</label>
					<Input
						type="text"
						id="email"
						reference={emailRef}
						value={email}
						onChange={handleEmailInput}
					/>
				</div>

				<div className={styles.container__form__inputContainer}>
					<span className={styles.container__form__inputContainer__textContainer}>
						<label htmlFor="password">Password</label>

						<span
							className={`link ${styles.container__form__inputContainer__textContainer__link}`}
							onClick={onForgotPasswordClicked}>
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

				<div className={styles.container__form__buttonGroup}>
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
			</form>
		</div>
	);
}
