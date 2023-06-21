// react
import { useEffect, useState } from "react";
// next.js
import router from "next/router";
// npm
import { useSelector } from "react-redux";
// @redux
// api hooks
import { useRefreshMutation } from "@redux/auth/authApiSlice";
// selectors
import { selectCurrentToken } from "@redux/auth/authSlice";
import { selectPersist } from "@redux/user/userSlice";
//
// @util
import SpinnerIcon from "@components/icons/spinner.icon";
import routes from "@util/routes";

// used to keep the user signed in on page reload
export default function PersistLogin({ children }: any) {
	const token = useSelector(selectCurrentToken);
	const persist = useSelector(selectPersist);

	const [trueSuccess, setTrueSuccess] = useState(false);

	const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
		useRefreshMutation();

	// verify the refresh token on page load when there is no token but a user is logged in
	useEffect(() => {
		const verifyRefreshToken = async () => {
			try {
				await refresh("");

				// make sure we only render the data when the query is finished
				setTrueSuccess(true);
			} catch (err) {
				console.error(err);
			}
		};

		if (!token && persist) {
			verifyRefreshToken();
		} else if (!token && !persist) {
			// redirect the user to the login page if they are not logged in and they have no token
			router.replace(routes.login);
		}

		// eslint-disable-next-line
	}, []);

	let content = <></>;

	if (isLoading) {
		// display a feedback when the page is loading
		content = <SpinnerIcon fullScreen />;
	} else if (isError) {
		console.log(error);
	} else if (isSuccess && trueSuccess) {
		// display the page content when the token is successfully verified
		content = <>{children}</>;
	} else if (token && isUninitialized) {
		// when the query does not have cached data
		content = <>{children}</>;
	}

	return content;
}
