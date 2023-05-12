import styles from "./login.module.scss";

import React, { useState } from "react";
import Link from "next/link";

import Button from "@components/button-component/button";
import Logo from "@components/logo-component/logo";
import Input from "@components/input-component/input";
import Checkbox from "@components/checkbox-component/checkbox";

export default function Login() {
	const [checked, setChecked] = useState(true);

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

				<Checkbox
					label="Remember me"
					defaultChecked={checked}
					onChange={(event: any) => setChecked(event.target.checked)}
				/>

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
