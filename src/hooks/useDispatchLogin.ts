import { setAccessToken } from "@redux/auth/authSlice";
import { setCurrentEmail, setPersist } from "@redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function useDispatchLogin() {
	const dispatch = useDispatch();

	function invokeDispatch({
		accessToken,
		email,
		persist,
	}: {
		accessToken: string;
		email: string;
		persist: boolean;
	}): void {
		dispatch(setAccessToken({ accessToken }));
		dispatch(setCurrentEmail({ email }));
		dispatch(setPersist({ persist }));
	}

	return invokeDispatch;
}
