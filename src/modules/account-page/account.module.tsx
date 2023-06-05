import styles from "./account.module.scss";

import { useEffect, useState } from "react";

import routes from "@util/routes";
import { useRouter } from "next/router";

import { useSendLogoutMutation } from "@redux/auth/authApiSlice";
import { useDispatch } from "react-redux";

import { useDeleteAllKeysMutation } from "@/redux/keys/keysApiSlice";
import { useDeleteAccountMutation } from "@/redux/user/userApiSlice";

import { setCurrentEmail, setPersist } from "@/redux/user/userSlice";
import ConfirmModal from "@components/confirm-modal/confirm-modal";
import LogoutIcon from "@components/icon-components/logout-icon";

export default function Account() {
	const router = useRouter();
	const dispatch = useDispatch();

	const [showConfirmEmptying, setShowConfirmEmptying] = useState(false);
	const [showConfirmDeletion, setShowConfirmDeletion] = useState(false);

	// api hooks
	const [sendLogout, { isLoading: isLogoutLoading, isSuccess: isLogoutSuccess }] =
		useSendLogoutMutation();

	const [
		deleteAllKeys,
		{ isLoading: isEmptyTheVaultLoading, isSuccess: isEmptyTheVaultSuccess },
	] = useDeleteAllKeysMutation();

	const [
		deleteAccount,
		{ isLoading: isDeleteAccountLoading, isSuccess: isDeleteAccountSuccess },
	] = useDeleteAccountMutation();
	//

	useEffect(() => {
		if (isLogoutSuccess || isDeleteAccountSuccess) {
			router.replace(routes.home);
		}
	}, [isLogoutSuccess, isDeleteAccountSuccess, router]);

	useEffect(() => {
		if (isEmptyTheVaultSuccess) {
			setShowConfirmEmptying(false);
		}
	}, [isEmptyTheVaultSuccess]);

	useEffect(() => {
		if (isDeleteAccountSuccess) {
			setShowConfirmDeletion(false);
		}
	}, [isDeleteAccountSuccess]);

	// api handler functions
	const onLogoutClicked = () => {
		dispatch(setPersist({ persist: false }));
		sendLogout("");
	};

	const onEmptyTheVaultConfirmed = async () => {
		await deleteAllKeys("");
	};

	const onDeleteAccountConfirmed = () => {
		dispatch(setPersist({ persist: false }));
		dispatch(setCurrentEmail({ email: null }));
		deleteAccount("");
	};
	//

	return (
		<>
			<div className={styles.container}>
				<div className={styles.container__wrapper}>
					<div className={styles.container__wrapper__titleContainer}>
						<p className={styles.container__wrapper__titleContainer__title}>Account</p>

						<span
							className={styles.container__wrapper__titleContainer__logoutIcon}
							onClick={onLogoutClicked}>
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
							className={`${styles.container__wrapper__optionsGroup__option} danger`}
							onClick={() => setShowConfirmDeletion(true)}>
							<span>Delete account</span>
						</div>
					</div>
				</div>

				{showConfirmEmptying && (
					<div className={styles.container__confirmModal}>
						<ConfirmModal
							title="Empty the vault"
							desc="Are you sure you want to delete all your entries? This action cannot be undone."
							confirmText={isEmptyTheVaultLoading ? "Emptying..." : "Confirm"}
							show={setShowConfirmEmptying}
							onClick={onEmptyTheVaultConfirmed}
						/>
					</div>
				)}

				{showConfirmDeletion && (
					<div className={styles.container__confirmModal}>
						<ConfirmModal
							title="Delete account"
							desc="Are you sure you want to delete your account? This action cannot be undone."
							confirmText={isDeleteAccountLoading ? "Deleting..." : "Confirm"}
							show={setShowConfirmDeletion}
							onClick={onDeleteAccountConfirmed}
						/>
					</div>
				)}
			</div>

			{(showConfirmDeletion || showConfirmEmptying) && (
				<div
					className={styles.shadow}
					onClick={() => {
						setShowConfirmEmptying(false);
						setShowConfirmDeletion(false);
					}}
				/>
			)}
		</>
	);
}
