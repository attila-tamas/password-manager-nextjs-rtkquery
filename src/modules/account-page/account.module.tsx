import styles from "./account.module.scss";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import routes from "@util/routes";
import { useRouter } from "next/router";

import { useDeleteAllKeysMutation } from "@/redux/keys/keysApiSlice";
import { useSendLogoutMutation } from "@redux/auth/authApiSlice";
import {
	useDeleteAccountMutation,
	useRequestPasswordChangeMutation,
} from "@redux/user/userApiSlice";

import { selectEmail, setCurrentEmail, setPersist } from "@redux/user/userSlice";

import ConfirmModal from "@components/confirm-modal/confirm-modal";
import LogoutIcon from "@components/icon-components/logout-icon";

export default function Account() {
	const router = useRouter();
	const dispatch = useDispatch();

	const email = useSelector(selectEmail);

	const [showConfirmEmptying, setShowConfirmEmptying] = useState(false);
	const [showConfirmDeletion, setShowConfirmDeletion] = useState(false);

	// api hooks
	const [sendLogout, { isLoading: isLogoutLoading, isSuccess: isLogoutSuccess }] =
		useSendLogoutMutation();

	const [requestPasswordChange, { isLoading: isPasswordChangeRequestLoading }] =
		useRequestPasswordChangeMutation();

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

	const onChangePasswordClicked = async () => {
		await requestPasswordChange(email);
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
				<div className={styles.wrapper}>
					<div className={styles.wrapper__titleContainer}>
						<p className={styles.wrapper__titleContainer__title}>Account</p>

						<span
							className={styles.wrapper__titleContainer__logoutIcon}
							onClick={onLogoutClicked}>
							<LogoutIcon size="32" />
						</span>
					</div>

					<div className={styles.wrapper__optionsGroup}>
						<div
							onClick={onChangePasswordClicked}
							className={styles.wrapper__optionsGroup__option}>
							<span>
								{isPasswordChangeRequestLoading
									? "Sending email..."
									: "Request password change"}{" "}
							</span>
						</div>

						<div
							onClick={() => setShowConfirmEmptying(true)}
							className={`${styles.wrapper__optionsGroup__option} danger`}>
							<span>Empty the vault</span>
						</div>

						<div
							onClick={() => setShowConfirmDeletion(true)}
							className={`${styles.wrapper__optionsGroup__option} danger`}>
							<span>Delete account</span>
						</div>
					</div>
				</div>

				{showConfirmEmptying && (
					<div className={styles.modal}>
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
					<div className={styles.modal}>
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
					className={styles.modal__shadow}
					onClick={() => {
						setShowConfirmEmptying(false);
						setShowConfirmDeletion(false);
					}}
				/>
			)}
		</>
	);
}
