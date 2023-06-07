import styles from "./change-password.module.scss";

import { useEffect, useRef, useState } from "react";

import { useChangePasswordMutation } from "@/redux/user/userApiSlice";

import Image from "next/image";
import Link from "next/link";
import router from "next/router";

import routes from "@util/routes";

import changePasswordGraphic from "@public/change-password-graphic.svg";

import Button from "@components/button-component/button";
import Checkbox from "@components/checkbox-component/checkbox";
import Input from "@components/input-component/input";

export default function ChangePassword() {
	const passwordRef = useRef<HTMLDivElement>(null);

	const [password, setPassword] = useState("");
	const [showPwd, setShowPwd] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [countDownInSeconds, setCountDownInSeconds] = useState(3);

	const [changePassword, { isLoading, isSuccess, isError, error }] = useChangePasswordMutation();

	useEffect(() => {
		passwordRef.current?.focus();
	}, []);

	const handlePwdInput = (e: any) => setPassword(e.target.value);
	const handleShowPwdToggle = () => setShowPwd((prev: boolean) => !prev);

	const handleSubmit = async (e: any) => {
		e.preventDefault(); // prevent page reload

		if (router.query.credentials) {
			const id = router.query.credentials[0];
			const token = router.query.credentials[1];

			await changePassword({ id, token, password });
		}
	};

	useEffect(() => {
		if (isLoading) {
			console.log("loading...");
		}
	}, [isLoading]);

	useEffect(() => {
		if (isSuccess) {
			console.log("new password set");
		}
	}, [isSuccess]);

	useEffect(() => {
		if (isError) {
			const errorObj = error as any;
			setErrorMsg(errorObj.data?.message);
		}
	}, [isError, error]);

	useEffect(() => {
		setErrorMsg("");
	}, [password]);

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

	return (
		<div className={styles.container}>
			<Image
				className="unselectable"
				src={changePasswordGraphic}
				alt="Account activated graphic"
			/>

			{isSuccess ? (
				<>
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

						<Button text="Set new password" color="primary" type="submit" flex />
					</form>

					{errorMsg && <p className="error">{errorMsg}</p>}
				</>
			)}
		</div>
	);
}
