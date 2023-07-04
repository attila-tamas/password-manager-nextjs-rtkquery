import AccountOption from "@components/accountOption/accountOption.component";
import { Icon, icons } from "@components/index";
import useDispatchLogout from "@hooks/useDispatchLogout";
import useMutation from "@hooks/useMutation";
import useSuccess from "@hooks/useSuccess";
import { useDeleteAllKeysMutation } from "@redux/keys/keysApiSlice";
import { useDeleteAccountMutation } from "@redux/user/userApiSlice";
import { pixelToEm } from "@util/pixelConverter";
import { routes } from "@util/routes";
import { useRouter } from "next/router";
import { enqueueSnackbar } from "notistack";
import styles from "./account.module.scss";

// page module for "/account" route
export default function Account() {
	const router = useRouter();

	const dispatchLogout = useDispatchLogout();

	const emptyVaultMutation = useMutation(useDeleteAllKeysMutation());
	const deleteAccountMutation = useMutation(useDeleteAccountMutation());

	async function onEmptyVaultConfirmed(): Promise<void> {
		await emptyVaultMutation.trigger();
	}

	async function onDeleteAccountConfirmed(): Promise<void> {
		await deleteAccountMutation.trigger();
	}

	useSuccess(() => {
		enqueueSnackbar("Vault emptied", { variant: "success" });
	}, emptyVaultMutation);

	useSuccess(() => {
		dispatchLogout({ persist: false });
		router.replace(routes.home);
		enqueueSnackbar("Account deleted", { variant: "success" });
	}, deleteAccountMutation);

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
				/>
			</div>

			<div className={styles["options"]}>
				<AccountOption
					text="Change password"
					onClick={() => console.log("Changing password")}
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
