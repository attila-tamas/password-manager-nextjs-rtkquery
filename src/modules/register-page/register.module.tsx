import React from "react";
import styles from "./register.module.scss";
import Link from "next/link";

import Logo from "@components/logo-component/logo";
import Input from "@components/input-component/input";
import Button from "@components/button-component/button";

export default function Register() {
	return (
		<div className={styles.container}>
			<Logo width="130" />

			<p className={styles.container__title}>Create account</p>

			<form className={styles.container__form}>
				<label className={styles.container__form__inputContainer}>
					Email
					<Input type="text" />
				</label>

				<label className={styles.container__form__inputContainer}>
					Password
					<Input type="password" />
				</label>

				<div className={styles.container__form__buttonGroup}>
					<Button text="Create account" color="primary" type="submit" flex />
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
