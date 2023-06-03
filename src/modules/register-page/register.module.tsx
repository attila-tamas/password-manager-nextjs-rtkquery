import styles from "./register.module.scss";

import { useEffect, useRef, useState } from "react";

import { useRegisterMutation } from "@redux/auth/authApiSlice";
import { setEmailToVerify } from "@redux/user/userSlice";
import { useDispatch } from "react-redux";

import Link from "next/link";
import router from "next/router";

import routes from "@util/routes";

import Button from "@components/button-component/button";
import Checkbox from "@components/checkbox-component/checkbox";
import Input from "@components/input-component/input";
import Logo from "@components/logo-component/logo";

export default function Register() {
	const dispatch = useDispatch();

	const emailRef = useRef<HTMLDivElement>(null);
	const errorRef = useRef<HTMLDivElement>(null);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPwd, setShowPwd] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const [register, { isLoading, isSuccess }] = useRegisterMutation();

	useEffect(() => {
		emailRef.current?.focus();
	}, []);

	useEffect(() => {
		setErrorMsg("");
	}, [email, password]);

	const handleSubmit = async (e: any) => {
		e.preventDefault(); // prevent page reload

		try {
			await register({ email, password }).unwrap();

			dispatch(setEmailToVerify({ email }));

			router.push({
				pathname: routes.verifyEmail,
				query: { email: email },
			});
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

			<p className={styles.container__title}>Create account</p>

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
					Password
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
						text={isLoading ? "Creating account..." : "Create account"}
						color="primary"
						type="submit"
						flex
					/>
					<p>
						I have an account.
						<Link href="/login" className="link">
							{" "}
							Sign in
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
}
