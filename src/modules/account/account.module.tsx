// styles
import styles from "./account.module.scss";
// react
import { useEffect, useState } from "react";
// next.js
import { useRouter } from "next/router";
// npm
import { useDispatch, useSelector } from "react-redux";
// @redux
// api hooks
import { useSendLogoutMutation } from "@redux/auth/authApiSlice";
import { useDeleteAllKeysMutation } from "@redux/keys/keysApiSlice";
import {
	useDeleteAccountMutation,
	useRequestPasswordChangeMutation,
} from "@redux/user/userApiSlice";
// selectors
import { selectCurrentEmail, setCurrentEmail } from "@redux/auth/authSlice";
import { setPersist } from "@redux/user/userSlice";
//
// @util
import { pixelToEm } from "@util/pixelConverter";
import routes from "@util/routes";
// @components
import ConfirmModal from "@components/confirmModal/confirmModal.component";
import Icon, { icons } from "@components/icon/icon";

// page module for "/account" route
export default function Account() {
	const router = useRouter();
	const dispatch = useDispatch();

	const email = useSelector(selectCurrentEmail);

	// states for the modals
	const [showConfirmEmptying, setShowConfirmEmptying] = useState(false);
	const [showConfirmDeletion, setShowConfirmDeletion] = useState(false);
	//

	// api hooks
	const [
		sendLogout,
		{ isLoading: isLogoutLoading, isSuccess: isLogoutSuccess },
	] = useSendLogoutMutation();

	const [
		requestPasswordChange,
		{ isLoading: isPasswordChangeRequestLoading },
	] = useRequestPasswordChangeMutation();

	const [
		deleteAllKeys,
		{
			isLoading: isEmptyTheVaultLoading,
			isSuccess: isEmptyTheVaultSuccess,
		},
	] = useDeleteAllKeysMutation();

	const [
		deleteAccount,
		{
			isLoading: isDeleteAccountLoading,
			isSuccess: isDeleteAccountSuccess,
		},
	] = useDeleteAccountMutation();
	//

	// useEffect hooks
	// redirect the user to the home page on successful logout or account deletion
	useEffect(() => {
		if (isLogoutSuccess || isDeleteAccountSuccess) {
			router.replace(routes.home);
		}
	}, [isLogoutSuccess, isDeleteAccountSuccess, router]);

	// close the empty the vault confirmation modal if emptying the vault was successful
	useEffect(() => {
		if (isEmptyTheVaultSuccess) {
			setShowConfirmEmptying(false);
		}
	}, [isEmptyTheVaultSuccess]);

	// close the delete account confirmation modal if deleting the account was successful
	useEffect(() => {
		if (isDeleteAccountSuccess) {
			setShowConfirmDeletion(false);
		}
	}, [isDeleteAccountSuccess]);
	//

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
			{/* container for the page content starts */}
			<div className={styles.container}>
				{/* main content of the page starts */}
				<div className={styles.wrapper}>
					{/* title starts */}
					<div className={styles.wrapper__titleContainer}>
						<p className={styles.wrapper__titleContainer__title}>
							Account
						</p>

						<span
							className={
								styles.wrapper__titleContainer__logoutIcon
							}
							onClick={onLogoutClicked}
						>
							<Icon
								icon={icons.logout}
								size={pixelToEm(32)}
								className="interactable"
							/>
						</span>
					</div>
					{/* title ends */}

					{/* account service options start */}
					<div className={styles.wrapper__optionsGroup}>
						<div
							onClick={onChangePasswordClicked}
							className={styles.wrapper__optionsGroup__option}
						>
							<span>
								{isPasswordChangeRequestLoading
									? "Sending email..."
									: "Request password change"}
							</span>
						</div>

						<div
							onClick={() => setShowConfirmEmptying(true)}
							className={`${styles.wrapper__optionsGroup__option} danger`}
						>
							<span>Empty the vault</span>
						</div>

						<div
							onClick={() => setShowConfirmDeletion(true)}
							className={`${styles.wrapper__optionsGroup__option} danger`}
						>
							<span>Delete account</span>
						</div>
					</div>
					{/* account service options end */}
				</div>
				{/* main content of the page ends */}

				{/* modals start */}
				{showConfirmEmptying && (
					<div className={styles.modal}>
						<ConfirmModal
							title="Empty the vault"
							desc="Are you sure you want to delete all your entries? This action cannot be undone."
							confirmText={
								isEmptyTheVaultLoading
									? "Emptying..."
									: "Confirm"
							}
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
							confirmText={
								isDeleteAccountLoading
									? "Deleting..."
									: "Confirm"
							}
							show={setShowConfirmDeletion}
							onClick={onDeleteAccountConfirmed}
						/>
					</div>
				)}
				{/* modals end */}
			</div>
			{/* container for the page content ends */}

			{/* modal shadow starts */}
			{(showConfirmDeletion || showConfirmEmptying) && (
				<div
					className={styles.modal__shadow}
					onClick={() => {
						setShowConfirmEmptying(false);
						setShowConfirmDeletion(false);
					}}
				/>
			)}
			{/* modal shadow ends */}
		</>
	);
}
