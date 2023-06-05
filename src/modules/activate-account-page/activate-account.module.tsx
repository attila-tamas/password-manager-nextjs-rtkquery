import styles from "./activate-account.module.scss";

import { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import routes from "@util/routes";

import accountActivatedGraphic from "@public/account-activated-graphic.svg";
import accountActivationFailedGraphic from "@public/account-activation-failed-graphic.svg";

import { useActivateAccountMutation } from "@/redux/user/userApiSlice";
export default function ActivateAccount() {
	const router = useRouter();

	const [errorMsg, setErrorMsg] = useState("");

	const [activateAccount, { isLoading, isSuccess, isError, error }] =
		useActivateAccountMutation();

	useEffect(() => {
		const token = router.query.token;

		const activate = async () => {
			try {
				await activateAccount(token);
			} catch (error) {
				console.log(error);
			}
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
		if (isSuccess) {
			router.prefetch(routes.login);

			setTimeout(() => {
				router.replace(routes.login);
			}, 3000);
		}
	}, [isSuccess, router]);

	useEffect(() => {
		if (isError) {
			const errorObj = error as any;
			setErrorMsg(errorObj.data.message);
		}
	}, [isError, error]);

	return (
		<div className={styles.container}>
			{true ? (
				<>
					<Image
						className="unselectable"
						src={accountActivatedGraphic}
						alt="Account activated graphic"
					/>

					<p className={styles.container__title}>Your account has been activated</p>

					<p className={styles.container__desc}>
						You will be redirected to the login page shortly.
					</p>
				</>
			) : (
				<>
					<Image
						className="unselectable"
						src={accountActivationFailedGraphic}
						alt="Account activation failed graphic"
					/>

					<p className={styles.container__title}>{errorMsg}</p>
				</>
			)}
		</div>
	);
}
