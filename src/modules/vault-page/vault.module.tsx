import styles from "./vault.module.scss";

import { useGetKeysQuery } from "@redux/keys/keysApiSlice";
import { useState } from "react";

import Button from "@components/button-component/button";
import Input from "@components/input-component/input";
import Key from "@components/key-component/key";
import AddNewKeyModal from "@components/key-modal-component/new-key-modal";
import UpdateKeyModal from "@components/key-modal-component/update-key-modal";

export default function Vault() {
	const { data: keys, isLoading, isSuccess, isError, error } = useGetKeysQuery("");

	const [keyId, setKeyId] = useState("");
	const [showUpdateKeyModal, setShowUpdateKeyModal] = useState(false);
	const [showAddNewKeyModal, setShowAddNewKeyModal] = useState(false);

	let content;

	if (isLoading) {
		content = <p>Loading...</p>;
	}

	if (isError) {
		console.log(error);
	}

	if (isSuccess) {
		const { ids } = keys;

		const listContent = ids?.length
			? ids.map((keyId: any) => (
					<Key
						key={keyId}
						keyId={keyId}
						onClick={() => {
							setKeyId(keyId);
							setShowUpdateKeyModal(true);
						}}
					/>
			  ))
			: null;

		content = <>{listContent}</>;
	}

	return (
		<>
			<div className={styles.container}>
				<div className={styles.container__wrapper}>
					<div className={styles.container__wrapper__utilContainer}>
						<Input type="text" placeholder="Search..." />
						<Button
							text="New"
							color="primary"
							onClick={() => {
								setShowAddNewKeyModal(true);
							}}
						/>
					</div>

					<div className={styles.container__wrapper__keyList}>{content}</div>
				</div>

				{showUpdateKeyModal && (
					<div className={styles.container__keyEditor}>
						<UpdateKeyModal keyId={keyId} show={setShowUpdateKeyModal} />
					</div>
				)}

				{showAddNewKeyModal && (
					<div className={styles.container__keyEditor}>
						<AddNewKeyModal show={setShowAddNewKeyModal} />
					</div>
				)}
			</div>
			{(showUpdateKeyModal || showAddNewKeyModal) && (
				<div
					className={styles.shadow}
					onClick={() => {
						setShowUpdateKeyModal(false);
						setShowAddNewKeyModal(false);
					}}
				/>
			)}
		</>
	);
}
