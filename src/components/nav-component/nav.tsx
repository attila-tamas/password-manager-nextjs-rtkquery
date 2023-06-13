// styles
import styles from "./nav.module.scss";
// react
import { useEffect } from "react";
// next.js
import { useRouter } from "next/router";
// npm
import { useDispatch } from "react-redux";
// @redux
// api hooks
import { useSendLogoutMutation } from "@redux/auth/authApiSlice";
// actions
import { setPersist } from "@redux/user/userSlice";
//
// @util
import routes from "@util/routes";
// @components
import AccountIcon from "@components/icon-components/account-icon";
import GenerateIcon from "@components/icon-components/generate-icon";
import LogoutIcon from "@components/icon-components/logout-icon";
import VaultIcon from "@components/icon-components/vault-icon";
import Logo from "@components/logo-component/logo";
import NavItem from "@components/nav-item-component/nav-item";

// used in the layout component
export default function Nav() {
	const router = useRouter();
	const dispatch = useDispatch();

	// api hook
	const [sendLogout, { isLoading, isSuccess }] = useSendLogoutMutation();

	// redirect the user to the home page if the logout is successful
	useEffect(() => {
		if (isSuccess) {
			router.replace(routes.home);
		}
	}, [isSuccess, router]);

	// logout handler
	const onLogoutClicked = () => {
		// set persist to false as it is no longer need if there is no user logged in
		dispatch(setPersist({ persist: false }));
		// clear cookie and reset the API state
		sendLogout("");
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.logo}>
					<Logo size="130" />
				</div>

				{/* main content of the navigation starts */}
				<div className={styles.nav}>
					<div
						className={`
						${router.pathname == routes.vault && `${styles.nav__item__active}`}
						${styles.nav__item}
					`}>
						<NavItem text="Vault" to={routes.vault}>
							<VaultIcon size="26" />
						</NavItem>
					</div>

					<div
						className={`
						${router.pathname == routes.generate && `${styles.nav__item__active}`}
						${styles.nav__item}
					`}>
						<NavItem text="Generate" to={routes.generate}>
							<GenerateIcon size="26" />
						</NavItem>
					</div>

					<div
						className={`
						${router.pathname == routes.account && `${styles.nav__item__active}`}
						${styles.nav__item}
					`}>
						<NavItem text="Account" to={routes.account}>
							<AccountIcon size="26" />
						</NavItem>
					</div>
				</div>
				{/* main content of the navigation ends */}

				{/* logout button starts */}
				<div className={`${styles.nav__item} ${styles.logoutContainer}`}>
					<div className={styles.nav__item__logout} onClick={onLogoutClicked}>
						<span className={styles.nav__item__logout__icon}>
							<LogoutIcon size="26" />
						</span>
						<span>{isLoading ? "Logging out..." : "Logout"}</span>
					</div>
				</div>
				{/* logout button ends */}
			</div>
		</div>
	);
}
