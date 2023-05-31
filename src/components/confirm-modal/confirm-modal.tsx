import styles from "./confirm-modal.module.scss";

import { useDeleteAllKeysMutation } from "@/redux/keys/keysApiSlice";
import { useEffect } from "react";

import Button from "@components/button-component/button";

export default function ConfirmModal({ title, desc, loadingText, show }: any) {
	const [deleteAllKeys, { isLoading, isSuccess }] = useDeleteAllKeysMutation();

	useEffect(() => {
		if (isLoading) {
			console.log("loading...");
		}
	}, [isLoading]);

	useEffect(() => {
		if (isSuccess) {
			show(false);
		}
	}, [isSuccess, show]);

	const onEmptyTheVaultConfirmed = async () => {
		await deleteAllKeys("");
	};

	return (
		<div className={styles.container}>
			<p className={styles.container__title}>{title}</p>
			<p className={styles.container__desc}>{desc}</p>

			<div className={styles.container__buttonGroup}>
				<span onClick={() => show(false)}>
					<Button text="Cancel" noBackdrop flex />
				</span>
				<div className={styles.container__buttonGroup__separator}>&nbsp;</div>
				<span>
					<Button
						onClick={onEmptyTheVaultConfirmed}
						text={isLoading ? loadingText : "Confirm"}
						color="danger"
						noBackdrop
						flex
						type="submit"
					/>
				</span>
			</div>
		</div>
	);
}
