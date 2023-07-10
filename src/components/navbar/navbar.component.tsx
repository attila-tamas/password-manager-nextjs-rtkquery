import styles from "./navbar.module.scss";
// next
import { useRouter } from "next/router";
// @hooks
import { useDispatchLogout, useMutation, useSuccess } from "@hooks/index";
// @redux
import { useSendLogoutMutation } from "@redux/auth/authApiSlice";
// @components
import { Icon, icons, Logo, Nav } from "@components/index";
// @util
import { pixelToEm, pixelToRem } from "@util/pixelConverter";
import { navLinks, routes } from "@util/routes";

export default function Navbar() {
	const router = useRouter();

	// logout
	const dispatchLogout = useDispatchLogout();
	const logoutMutation = useMutation(useSendLogoutMutation());

	async function onLogoutClicked(): Promise<void> {
		await logoutMutation.trigger();
	}

	useSuccess(() => {
		dispatchLogout({ persist: false });
		router.replace(routes.home);
	}, logoutMutation);
	//

	return (
		<div className={styles["navbar"]}>
			<Logo size={pixelToRem(20)} className={styles["navbar__logo"]} />
			<Nav navLinks={navLinks} />
			<Icon
				icon={icons.logout}
				size={pixelToEm(32)}
				className={`interactable ${styles["navbar__logout"]}`}
				onClick={onLogoutClicked}
			/>
		</div>
	);
}
