import { useEffect, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import router from "next/router";

const PersistLogin = ({ children }: any) => {
	const token = useSelector(selectCurrentToken);

	const [trueSuccess, setTrueSuccess] = useState(false);

	const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
		useRefreshMutation();

	useEffect(() => {
		const verifyRefreshToken = async () => {
			console.log("verifying refresh token");
			try {
				await refresh("");
				setTrueSuccess(true);
			} catch (err) {
				console.error(err);
			}
		};

		if (!token && JSON.parse(localStorage.getItem("persist") as string)) {
			verifyRefreshToken();
		}

		// eslint-disable-next-line
	}, []);

	let content = <></>;
	if (isLoading) {
		console.log("loading");
		content = <p>Loading...</p>;
	} else if (isError) {
		// when trying to access a protected route without a token
		console.log("error");
		router.push("/");
	} else if (isSuccess && trueSuccess) {
		console.log("success");
		content = <>{children}</>;
	} else if (token && isUninitialized) {
		console.log("token and uninit");
		console.log(isUninitialized);
		content = <>{children}</>;
	}

	return content;
};
export default PersistLogin;
