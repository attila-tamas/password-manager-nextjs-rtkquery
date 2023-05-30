import styles from "./vault.module.scss";

import { useGetKeysQuery } from "@redux/keys/keysApiSlice";
import { useEffect, useState } from "react";

import format from "@util/formatInputValue";

import Button from "@components/button-component/button";
import Input from "@components/input-component/input";
import Key from "@components/key-component/key";
import AddNewKeyModal from "@components/key-modal-component/new-key-modal";
import UpdateKeyModal from "@components/key-modal-component/update-key-modal";

export default function Vault() {
	let keys: object[];
	let initialKeysList: any;

	const [keyId, setKeyId] = useState("");
	const [query, setQuery] = useState("");
	const [filteredKeysList, setFilteredKeysList] = useState([] as Element[] | Element);
	const [showUpdateKeyModal, setShowUpdateKeyModal] = useState(false);
	const [showAddNewKeyModal, setShowAddNewKeyModal] = useState(false);

	const { data, isLoading, isSuccess, isError, error } = useGetKeysQuery("");

	useEffect(() => {
		if (isLoading) {
			console.log("loading...");
		}
	}, [isLoading]);

	useEffect(() => {
		if (isError) {
			const errorObj = error as any;
		}
	}, [isError, error]);

	if (isSuccess) {
		const { ids, entities } = data;

		initialKeysList = ids?.length
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

		keys = Object.entries(entities).map((entitiy: any) => {
			const key = entitiy[1];
			return key;
		});
	}

	const onSearchInputChange = (event: any) => {
		const keyword = format(event.target.value);
		setQuery(keyword);

		const filteredKeys = keys.filter((key: any) => {
			if (keyword === "") {
				return keys;
			}

			const { title, customFields } = key;

			const titleInLowercase = title.toLowerCase();

			const fieldsToCheck = customFields.filter((field: any) => {
				const fieldInLowerCase = field.key.toLowerCase();
				return (
					fieldInLowerCase.indexOf("email") !== -1 ||
					fieldInLowerCase.indexOf("username") !== -1 ||
					fieldInLowerCase.indexOf("url") !== -1 ||
					fieldInLowerCase.indexOf("website") !== -1
				);
			});

			const containsKeyword = fieldsToCheck.map((field: any) => {
				return field.value.indexOf(keyword) !== -1;
			});

			containsKeyword.push(titleInLowercase.indexOf(keyword) !== -1);

			if (containsKeyword.includes(true)) {
				return key;
			}
		});

		filteredKeys.sort((a: any, b: any) => a.title.localeCompare(b.title));

		const filteredKeyIds = filteredKeys.map((key: any) => key.id);

		const listContent = filteredKeyIds.length ? (
			filteredKeyIds.map((keyId: string) => (
				<Key
					key={keyId}
					keyId={keyId}
					onClick={() => {
						setKeyId(keyId);
						setShowUpdateKeyModal(true);
					}}
				/>
			))
		) : (
			<div className={styles.noResult}>
				<span>No results for &quot;{keyword}&quot;</span>
				<p className={styles.noResult__hint}>Check for typos or use a different term</p>
			</div>
		);

		setFilteredKeysList(listContent as any);
	};

	const getKeyList = () => {
		if (!query) {
			return initialKeysList;
		}
		return filteredKeysList;
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.container__wrapper}>
					<div className={styles.container__wrapper__utilContainer}>
						<Input
							type="text"
							placeholder="Search..."
							value={query}
							onChange={onSearchInputChange}
						/>
						<Button
							text="New"
							color="primary"
							onClick={() => {
								setShowAddNewKeyModal(true);
								setQuery("");
							}}
						/>
					</div>

					<div className={styles.container__wrapper__keyList}>
						<>{getKeyList()}</>
					</div>
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
