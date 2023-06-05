import router from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectPersist } from "../user/userSlice";
import { useRefreshMutation } from "./authApiSlice";
import { selectCurrentToken } from "./authSlice";

export default function PersistLogin({ children }: any) {
	const token = useSelector(selectCurrentToken);
	const persist = useSelector(selectPersist);

	const [trueSuccess, setTrueSuccess] = useState(false);

	const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
		useRefreshMutation();

	useEffect(() => {
		const verifyRefreshToken = async () => {
			try {
				await refresh("");
				setTrueSuccess(true);
			} catch (err) {
				console.error(err);
			}
		};

		if (!token && persist) {
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
}
