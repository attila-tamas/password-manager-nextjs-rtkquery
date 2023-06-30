import styles from "./navbar.module.scss";
// next
import { useRouter } from "next/router";
// @hooks
import useDispatchLogout from "@hooks/useDispatchLogout";
import useMutation from "@hooks/useMutation";
// @redux
import { useSendLogoutMutation } from "@redux/auth/authApiSlice";
// @components
import { Icon, icons, Logo, Nav } from "@components/index";
// @util
import { pixelToEm, pixelToRem } from "@util/pixelConverter";
import { navLinks, routes } from "@util/routes";

export default function Navbar() {
	const router = useRouter();

	const dispatchLogout = useDispatchLogout();
	const logoutMutation = useMutation(useSendLogoutMutation());

	function onLogoutClicked(): void {
		logoutMutation.trigger();
		dispatchLogout({ persist: false });
		router.replace(routes.home);
	}

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
