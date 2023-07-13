import { setPersist } from "@redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function useDispatchLogout() {
	const dispatch = useDispatch();

	function invokeDispatch({ persist }: { persist: boolean }): void {
		dispatch(setPersist({ persist }));
	}

	return invokeDispatch;
}
