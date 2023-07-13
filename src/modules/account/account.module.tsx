import styles from "./account.module.scss";
// next
import { useRouter } from "next/router";
//npm
import { enqueueSnackbar } from "notistack";
// @hooks
import { useDispatchLogout, useMutation, useSuccess } from "@hooks/index";
// @redux
import { useSendLogoutMutation } from "@redux/auth/authApiSlice";
import { useDeleteAllEntriesMutation } from "@redux/entries/entryApiSlice";
import { useDeleteAccountMutation } from "@redux/user/userApiSlice";
// @components
import { AccountOption, Icon, icons } from "@components/index";
// @util
import { pixelToEm } from "@util/pixelConverter";
import { routes } from "@util/routes";

// page module for "/account" route
export default function Account() {
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

	// change password
	function onChangePasswordClicked(): void {
		router.push(routes.requestPasswordChange);
	}
	//

	// empty vault
	const emptyVaultMutation = useMutation(useDeleteAllEntriesMutation());

	async function onEmptyVaultConfirmed(): Promise<void> {
		await emptyVaultMutation.trigger();
	}

	useSuccess(() => {
		enqueueSnackbar("Vault emptied", { variant: "success" });
	}, emptyVaultMutation);
	//

	// delete account
	const deleteAccountMutation = useMutation(useDeleteAccountMutation());

	async function onDeleteAccountConfirmed(): Promise<void> {
		await deleteAccountMutation.trigger();
	}

	useSuccess(() => {
		dispatchLogout({ persist: false });
		router.replace(routes.home);
		enqueueSnackbar("Account deleted", { variant: "success" });
	}, deleteAccountMutation);
	//

	return (
		<div className={styles["account-module"]}>
			<div className={styles["title-wrapper"]}>
				<span className="title">Account</span>
				<Icon
					icon={icons.logout}
					size={pixelToEm(32)}
					className={`
						interactable
						${styles["title-wrapper__logout"]}
					`}
					onClick={onLogoutClicked}
				/>
			</div>

			<div className={styles["options"]}>
				<AccountOption
					text="Change password"
					onClick={onChangePasswordClicked}
				/>

				<AccountOption
					text="Empty your vault"
					danger
					onConfirm={onEmptyVaultConfirmed}
				/>

				<AccountOption
					text="Delete account"
					danger
					onConfirm={onDeleteAccountConfirmed}
				/>
			</div>
		</div>
	);
}
