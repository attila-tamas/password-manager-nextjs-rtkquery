import React from "react";
import styles from "./login.module.scss";
import Button from "../button-component/button";
import Logo from "../logo-component/logo";
import Input from "../input-component/input";

export default function Login() {
	return (
		<div className={styles.container}>
			<Logo width="130" />

			<p className={styles.container__title}>Sign in</p>

			<form className={styles.container__form}>
				<label className={styles.container__form__inputContainer}>
					Email
					<Input type="text" />
				</label>

				<label className={styles.container__form__inputContainer}>
					<span className={styles.container__form__inputContainer__textContainer}>
						Password
						<a
							className={`link ${styles.container__form__inputContainer__textContainer__link}`}>
							Forgot password?
						</a>
					</span>
					<Input type="password" />
				</label>

				<label className={styles.container__form__rememberContainer}>
					<Input type="checkbox" checked />
					Remember me
				</label>

				<div className={styles.container__form__buttonGroup}>
					<Button text="Sign in" color="success" type="submit" flex />
					<p>
						New to keystone?
						<a className="link"> Create account</a>
					</p>
				</div>
			</form>
		</div>
	);
}
