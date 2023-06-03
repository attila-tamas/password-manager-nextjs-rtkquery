import styles from "./login.module.scss";

import Link from "next/link";
import router from "next/router";
import { useEffect, useRef, useState } from "react";

import routes from "@util/routes";

import useLocalStorage from "@hooks/useLocalStorage";
import { useLoginMutation } from "@redux/auth/authApiSlice";
import { setCredentials } from "@redux/auth/authSlice";
import { useDispatch } from "react-redux";

import Button from "@components/button-component/button";
import Checkbox from "@components/checkbox-component/checkbox";
import Input from "@components/input-component/input";
import Logo from "@components/logo-component/logo";

export default function Login() {
	const dispatch = useDispatch();

	const emailRef = useRef<HTMLDivElement>(null);
	const errorRef = useRef<HTMLDivElement>(null);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [persist, setPersist] = useLocalStorage("persist", "false");
	const [showPwd, setShowPwd] = useState(false);

	const [login, { isLoading }] = useLoginMutation();

	useEffect(() => {
		emailRef.current?.focus();
	}, []);

	useEffect(() => {
		setErrorMsg("");
	}, [email, password]);

	const handleSubmit = async (e: any) => {
		e.preventDefault(); // prevent page reload

		try {
			const { accessToken } = await login({ email, password }).unwrap();
			dispatch(setCredentials({ accessToken }));

			setPersist("true");

			router.push(routes.vault);
		} catch (error: any) {
			setErrorMsg(error.data?.message);

			errorRef.current?.focus();
		}
	};

	const handleEmailInput = (e: any) => setEmail(e.target.value);
	const handlePwdInput = (e: any) => setPassword(e.target.value);

	const handleShowPwdToggle = () => setShowPwd((prev: boolean) => !prev);

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
				<label className={styles.container__form__inputContainer}>
					Email
					<Input
						type="text"
						reference={emailRef}
						value={email}
						onChange={handleEmailInput}
					/>
				</label>

				<label className={styles.container__form__inputContainer}>
					<span className={styles.container__form__inputContainer__textContainer}>
						Password
						<a
							className={`link ${styles.container__form__inputContainer__textContainer__link}`}>
							Forgot password?
						</a>
					</span>
					<Input
						type="password"
						show={showPwd}
						value={password}
						onChange={handlePwdInput}
					/>
					<Checkbox
						label="Show Password"
						checked={showPwd}
						onChange={handleShowPwdToggle}
					/>
				</label>

				<div className={styles.container__form__buttonGroup}>
					<Button
						text={isLoading ? "Signing in..." : "Sign in"}
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
