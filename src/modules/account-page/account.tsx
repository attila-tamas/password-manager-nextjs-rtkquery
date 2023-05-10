import styles from "./account.module.scss";

import LogoutIcon from "@components/icon-components/logout-icon";

export default function Account() {
	return (
		<div className={styles.container}>
			<div className={styles.container__titleContainer}>
				<p className={styles.container__titleContainer__title}>Account</p>

				<span className={styles.container__titleContainer__logoutIcon}>
					<LogoutIcon size="32" />
				</span>
			</div>

			<div className={styles.container__optionsGroup}>
				<div className={styles.container__optionsGroup__option}>
					<span>Change password</span>
				</div>

				<div className={`${styles.container__optionsGroup__option} danger`}>
					<span>Empty vault</span>
				</div>

				<div className={`${styles.container__optionsGroup__option} danger`}>
					<span>Delete account</span>
				</div>
			</div>
		</div>
	);
}
