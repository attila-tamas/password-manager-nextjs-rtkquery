// styles
import styles from "./activateAccount.module.scss";
// react
import { useEffect } from "react";
// next.js
import { useRouter } from "next/router";
// npm
import { enqueueSnackbar } from "notistack";
// @redux
import { useActivateAccountMutation } from "@redux/user/userApiSlice";
// @util
import routes from "@util/routes";
// @components
import SpinnerIcon from "@components/spinner/spinner.component";

// page module for "/activate-account" route
export default function ActivateAccount() {
	const router = useRouter();

	// api hook
	const [activateAccount, { isSuccess, isError, error }] = useActivateAccountMutation();

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

	// upon successful activation redirect the user and display a success snackbar as feedback
	useEffect(() => {
		if (isSuccess) {
			router.replace(routes.login);
			enqueueSnackbar("Account activated", { variant: "success" });
		}
	}, [isSuccess, router]);

	useEffect(() => {
		if (isError) {
			const errorObj = error as any;
			router.replace(routes.login);
			enqueueSnackbar(errorObj.data?.message, { variant: "error" });
		}
	}, [isError, error, router]);
	//

	return (
		// give feedback to the user while waiting for the activation response
		// the user will be automatically redirected if the activation is successful
		// therefore the loading feedback is the only content we need to display
		<div className={styles.container}>
			<SpinnerIcon />
			<p>Your account is being activated. Please&nbsp;wait...</p>
		</div>
	);
}
