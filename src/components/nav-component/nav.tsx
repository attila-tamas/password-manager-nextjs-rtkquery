import styles from "./nav.module.scss";

import { useRouter } from "next/router";
import { useEffect } from "react";

import routes from "@util/routes";

import { useSendLogoutMutation } from "@redux/auth/authApiSlice";

import { setPersist } from "@/redux/user/userSlice";
import AccountIcon from "@components/icon-components/account-icon";
import GenerateIcon from "@components/icon-components/generate-icon";
import LogoutIcon from "@components/icon-components/logout-icon";
import VaultIcon from "@components/icon-components/vault-icon";
import Logo from "@components/logo-component/logo";
import NavItem from "@components/nav-item-component/nav-item";
import { useDispatch } from "react-redux";

export default function Nav() {
	const router = useRouter();
	const dispatch = useDispatch();

	const [sendLogout, { isLoading, isSuccess }] = useSendLogoutMutation();

	useEffect(() => {
		if (isSuccess) {
			router.push(routes.home);
		}
	}, [isSuccess, router]);

	const handleLogout = () => {
		dispatch(setPersist({ persist: false }));
		sendLogout("");
	};

	return (
		<div className={styles.container}>
			<div className={styles.container__logo}>
				<Logo width="130" />
			</div>

			<div className={styles.container__nav}>
				<div
					className={`
						${router.pathname == routes.vault && `${styles.container__nav__active}`}
						${styles.container__nav__item}
					`}>
					<NavItem text="Vault" to={routes.vault}>
						<VaultIcon size="26" />
					</NavItem>
				</div>

				<div
					className={`
						${router.pathname == routes.generate && `${styles.container__nav__active}`}
						${styles.container__nav__item}
					`}>
					<NavItem text="Generate" to={routes.generate}>
						<GenerateIcon size="26" />
					</NavItem>
				</div>

				<div
					className={`
						${router.pathname == routes.account && `${styles.container__nav__active}`}
						${styles.container__nav__item}
					`}>
					<NavItem text="Account" to={routes.account}>
						<AccountIcon size="26" />
					</NavItem>
				</div>
			</div>

			<div className={`${styles.container__nav__item} ${styles.container__logoutContainer}`}>
				<div className={styles.container__nav__item__logout} onClick={handleLogout}>
					<LogoutIcon size="26" />
					<span className={styles.container__nav__item__logout__text}>
						{isLoading ? "Logging out..." : "Logout"}
					</span>
				</div>
			</div>
		</div>
	);
}
