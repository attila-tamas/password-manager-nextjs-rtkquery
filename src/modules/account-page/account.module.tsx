import styles from "./account.module.scss";

import { useEffect, useState } from "react";

import routes from "@util/routes";
import { useRouter } from "next/router";

import useLocalStorage from "@hooks/useLocalStorage";
import { useSendLogoutMutation } from "@redux/auth/authApiSlice";

import ConfirmModal from "@components/confirm-modal/confirm-modal";
import LogoutIcon from "@components/icon-components/logout-icon";

export default function Account() {
	const router = useRouter();

	const [persist, setPersist] = useLocalStorage("persist", "true");

	const [showConfirmEmptying, setShowConfirmEmptying] = useState(false);

	const [sendLogout, { isLoading, isSuccess }] = useSendLogoutMutation();

	useEffect(() => {
		if (isSuccess) {
			router.push(routes.home);
		}
	}, [isSuccess, router]);

	const handleLogout = () => {
		setPersist("false");
		sendLogout("");
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.container__wrapper}>
					<div className={styles.container__wrapper__titleContainer}>
						<p className={styles.container__wrapper__titleContainer__title}>Account</p>

						<span
							className={styles.container__wrapper__titleContainer__logoutIcon}
							onClick={handleLogout}>
							<LogoutIcon size="32" />
						</span>
					</div>

					<div className={styles.container__wrapper__optionsGroup}>
						<div className={styles.container__wrapper__optionsGroup__option}>
							<span>Change password</span>
						</div>

						<div
							className={`${styles.container__wrapper__optionsGroup__option} danger`}
							onClick={() => setShowConfirmEmptying(true)}>
							<span>Empty the vault</span>
						</div>

						<div
							className={`${styles.container__wrapper__optionsGroup__option} danger`}>
							<span>Delete account</span>
						</div>
					</div>
				</div>

				{showConfirmEmptying && (
					<div className={styles.container__confirmModal}>
						<ConfirmModal
							title="Empty the vault"
							desc="Are you sure you want to delete all your entries? This action cannot be undone."
							loadingText="Emptying..."
							show={setShowConfirmEmptying}
						/>
					</div>
				)}
			</div>

			{showConfirmEmptying && (
				<div
					className={styles.shadow}
					onClick={() => {
						setShowConfirmEmptying(false);
					}}
				/>
			)}
		</>
	);
}
