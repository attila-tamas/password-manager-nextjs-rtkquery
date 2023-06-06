import styles from "./activate-account.module.scss";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import routes from "@util/routes";

import accountActivatedGraphic from "@public/account-activated-graphic.svg";

import { useActivateAccountMutation } from "@/redux/user/userApiSlice";

export default function ActivateAccount() {
	const router = useRouter();

	const [countDownInSeconds, setCountDownInSeconds] = useState(3);

	const [activateAccount, { isLoading, isSuccess }] = useActivateAccountMutation();

	// get the token from the query
	// and send an API call on page load to activate the account
	useEffect(() => {
		const token = router.query.token;

		const activate = async () => {
			await activateAccount(token);
		};

		if (token) {
			activate();
		}
	}, [activateAccount, router.query.token]);

	useEffect(() => {
		if (isLoading) {
			console.log("loading...");
		}
	}, [isLoading]);

	// set a timer for 3 seconds before redirecting
	// to give feedback to the user that their account has been activated
	useEffect(() => {
		if (countDownInSeconds > 0) {
			const interval = setInterval(() => {
				setCountDownInSeconds(countDownInSeconds - 1);
			}, 1000);

			return () => clearInterval(interval);
		} else {
			router.replace(routes.login);
		}
	}, [countDownInSeconds, router]);

	return (
		<div className={styles.container}>
			<Image
				className="unselectable"
				src={accountActivatedGraphic}
				alt="Account activated graphic"
			/>

			<p className={styles.container__title}>
				{isSuccess ? "Your account has been activated" : "Account already activated"}
			</p>

			<p className={styles.container__desc}>
				You will be redirected to the login page in {countDownInSeconds}...
				<br />
				<Link href={routes.login} className="link">
					Go now
				</Link>
			</p>
		</div>
	);
}
