// styles
import styles from "./activate-account.module.scss";
// react
import { useEffect, useState } from "react";
// next.js
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// @redux
import { useActivateAccountMutation } from "@redux/user/userApiSlice";
// @util
import routes from "@util/routes";
// @public
import SpinnerIcon from "@/components/icon-components/spinner-icon";
import accountActivatedGraphic from "@public/account-activated-graphic.svg";

// page module for "/activate-account" route
export default function ActivateAccount() {
	const router = useRouter();

	// state for the countdown timer
	const [countDownInSeconds, setCountDownInSeconds] = useState(3);

	// api hook
	const [activateAccount, { isLoading, isSuccess }] = useActivateAccountMutation();

	// usEffect hooks
	// when the user visits the account activation link sent by email
	// get the token from the query and send an API call on page load to activate the account
	useEffect(() => {
		const token = router.query.token;

		const activate = async () => {
			await activateAccount(token);
		};

		if (token) {
			activate();
		}
	}, [activateAccount, router.query.token]);

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
	//

	return (
		<>
			{isSuccess ? (
				<div className={styles.container}>
					<Image
						className="unselectable"
						src={accountActivatedGraphic}
						alt="Account activated graphic"
					/>

					<p className={styles.title}>
						{isSuccess
							? "Your account has been activated"
							: "Account already activated"}
					</p>

					<p>
						You will be redirected to the login page in {countDownInSeconds}...
						<br />
						<Link href={routes.login} className="link">
							Go now
						</Link>
					</p>
				</div>
			) : (
				// display a spinner while waiting for the account activation response
				<SpinnerIcon fullScreen />
			)}
		</>
	);
}
