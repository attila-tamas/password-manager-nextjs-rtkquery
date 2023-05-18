import styles from "./login.module.scss";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import router from "next/router";

import routes from "@util/routes";

import { useDispatch } from "react-redux";
import { setCredentials } from "@redux/auth/authSlice";
import { useLoginMutation } from "@redux/auth/authApiSlice";
import useLocalStorage from "@hooks/useLocalStorage";

import Button from "@components/button-component/button";
import Logo from "@components/logo-component/logo";
import Input from "@components/input-component/input";

export default function Login() {
	const userRef = useRef<HTMLDivElement>(null);
	const errorRef = useRef<HTMLDivElement>(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [persist, setPersist] = useLocalStorage("persist", "false");

	const dispatch = useDispatch();

	const [login, { isLoading }] = useLoginMutation();

	useEffect(() => {
		userRef.current?.focus();
	}, []);

	useEffect(() => {
		setErrorMsg("");
	}, [email, password]);

	const handleSubmit = async (e: any) => {
		e.preventDefault(); // prevent page reload

		try {
			const { accessToken } = await login({ email, password }).unwrap();
			dispatch(setCredentials({ accessToken }));

			setEmail("");
			setPassword("");
			setPersist("true");

			router.push(routes.vault);
		} catch (error: any) {
			setErrorMsg(error.data?.message);

			errorRef.current?.focus();
		}
	};

	const handleEmailInput = (e: any) => setEmail(e.target.value);
	const handlePwdInput = (e: any) => setPassword(e.target.value);

	if (isLoading) return <p>Loading...</p>;

	return (
		<div className={styles.container}>
			<Logo width="130" />

			<p className={styles.container__title}>Sign in</p>

			{/* temp */}
			<p
				ref={errorRef}
				className={errorMsg ? styles.error : styles.offscreen}
				aria-live="assertive">
				{errorMsg}
			</p>
			{/* temp */}

			<form className={styles.container__form} onSubmit={handleSubmit}>
				<label className={styles.container__form__inputContainer}>
					Email
					<Input
						type="text"
						reference={userRef}
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
					<Input type="password" value={password} onChange={handlePwdInput} />
				</label>

				<div className={styles.container__form__buttonGroup}>
					<Button text="Sign in" color="primary" type="submit" flex />
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
