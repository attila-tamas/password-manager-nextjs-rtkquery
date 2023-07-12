// react
import { useState } from "react";
// next
import { useRouter } from "next/router";
// npm
import { useSelector } from "react-redux";
// @hooks
import { useEffectOnMount } from "@hooks/index";
// @redux
import { useRefreshMutation } from "@redux/auth/authApiSlice";
import { selectCurrentToken } from "@redux/auth/authSlice";
import { selectPersist } from "@redux/user/userSlice";
// @components
import { Spinner } from "@components/index";
// @util
import { routes } from "@util/index";

// used to keep the user signed in on page reload
export default function PersistLogin({ children }: any) {
	const router = useRouter();

	const token = useSelector(selectCurrentToken);
	const persist = useSelector(selectPersist);

	const [trueSuccess, setTrueSuccess] = useState(false);

	const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
		useRefreshMutation();

	// verify the refresh token on page load
	// when there is no token but a user is logged in
	useEffectOnMount(() => {
		const verifyRefreshToken = async () => {
			try {
				await refresh("");

				// make sure we only render the data when the query is finished
				setTrueSuccess(true);
			} catch (err) {
				console.log(err);
			}
		};

		if (!token && persist) {
			verifyRefreshToken();
		} else if (!token && !persist) {
			// redirect the user to the login page
			// if they are not logged in and they have no token
			router.replace(routes.login);
		}
	});
	//

	let content = <></>;

	if (isLoading) {
		content = <Spinner fullScreen />;
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
