// styles
import styles from "./vault.module.scss";
// react
import { useEffect, useState } from "react";
// @redux
import { useGetKeysQuery } from "@redux/keys/keysApiSlice";
// @util
import format from "@util/formatInputValue";
// @components
import Button from "@components/button-component/button";
import SpinnerIcon from "@components/icon-components/spinner-icon";
import Input from "@components/input-component/input";
import Key from "@components/key-component/key";
import AddNewKeyModal from "@components/key-modal-components/new-key-modal";
import UpdateKeyModal from "@components/key-modal-components/update-key-modal";

// page module for "/vault" route
export default function Vault() {
	let keys: object[];
	let initialKeysList: any;

	// states
	const [keyId, setKeyId] = useState("");
	// search function
	const [query, setQuery] = useState("");
	const [filteredKeysList, setFilteredKeysList] = useState([] as Element[] | Element);
	// modals
	const [selectedKeyId, setSelectedKeyId] = useState("");
	const [showUpdateKeyModal, setShowUpdateKeyModal] = useState(false);
	const [showAddNewKeyModal, setShowAddNewKeyModal] = useState(false);
	//

	// api hook
	const { data, isLoading, isSuccess, isError, error } = useGetKeysQuery("");

	// useEffect hooks
	// set the error message if there is an error to display it to the user
	useEffect(() => {
		if (isError) {
			const errorObj = error as any;
			console.log(errorObj.data.message);
		}
	}, [isError, error]);

	// deselect the key on page reload
	useEffect(() => {
		if (selectedKeyId && !showUpdateKeyModal) {
			setSelectedKeyId("");
		}
	}, [selectedKeyId, showUpdateKeyModal]);
	//

	// if the getKeys query is successful set the initialKeysList to display the keys for the user
	if (isSuccess) {
		const { ids, entities } = data;

		initialKeysList = ids?.length
			? ids.map((keyId: any) => (
					<Key
						key={keyId}
						keyId={keyId}
						active={selectedKeyId === keyId}
						onClick={() => {
							setKeyId(keyId);
							setSelectedKeyId(keyId);
							if (showAddNewKeyModal) setShowAddNewKeyModal(false);
							setShowUpdateKeyModal(true);
						}}
					/>
			  ))
			: null;

		// get the keys from the entities for filtering
		keys = Object.entries(entities).map((entitiy: any) => {
			const key = entitiy[1];
			return key;
		});
	}

	// handler functions
	// search handler
	const onSearchInputChange = (event: any) => {
		// set the keyword, which is used for the filtering
		const keyword = format(event.target.value);
		// set the keyword state, which is used for the search bar text
		setQuery(keyword);

		// get the filtered keys based on the keyword
		// if there is no keyword it returns all keys
		const filteredKeys = keys.filter((key: any) => {
			if (keyword === "") {
				return keys;
			}

			const { title, customFields } = key;

			// convert the title to lowercase for case insensitive filtering
			const titleInLowercase = title.toLowerCase();

			// which fields to check
			const fieldsToCheck = customFields.filter((field: any) => {
				// convert the field title to lowercase for case insensitive filtering
				const fieldInLowerCase = field.key.toLowerCase();

				return (
					// which keywords to look for in the fields to add them for checking
					fieldInLowerCase.indexOf("email") !== -1 ||
					fieldInLowerCase.indexOf("username") !== -1 ||
					fieldInLowerCase.indexOf("url") !== -1 ||
					fieldInLowerCase.indexOf("website") !== -1
				);
			});

			// if a field contains the keyword add the result to a boolean array
			const containsKeyword = fieldsToCheck.map((field: any) => {
				return field.value.indexOf(keyword) !== -1;
			});

			// add the title result to the array
			containsKeyword.push(titleInLowercase.indexOf(keyword) !== -1);

			// return the key if the array contains a true
			// which means that one of the fields of the key contains the keyword
			if (containsKeyword.includes(true)) {
				return key;
			}
		});

		// sort the filtered keys list in ascending order based on their title
		filteredKeys.sort((a: any, b: any) => a.title.localeCompare(b.title));

		// get the ids of the filtered keys to use them for displaying the keys
		const filteredKeyIds = filteredKeys.map((key: any) => key.id);

		const listContent = filteredKeyIds.length ? (
			// set the list content to the filtered keys if there are keys that match the query
			filteredKeyIds.map((keyId: string) => (
				<Key
					key={keyId}
					keyId={keyId}
					active={selectedKeyId === keyId}
					onClick={() => {
						setKeyId(keyId);
						setSelectedKeyId(keyId);
						if (showAddNewKeyModal) setShowAddNewKeyModal(false);
						setShowUpdateKeyModal(true);
					}}
				/>
			))
		) : (
			// display a no result feedback if there are no keys that match the query
			<div className={styles.wrapper__keyList__noResult}>
				<span>No results for &quot;{keyword}&quot;</span>

				<p className={styles.wrapper__keyList__noResult__hint}>
					Check for typos or use a different term
				</p>
			</div>
		);

		setFilteredKeysList(listContent as any);
	};

	// set the key list display to the initial keys from the API call if there is no keyword to search for
	// this makes sure a list of keys is displayed at all times
	const getKeyList = () => {
		if (initialKeysList) {
			// display the keys when the vault is not empty

			if (!query) {
				return initialKeysList;
			}

			return filteredKeysList;
		} else {
			// display a hint when the vault is empty

			return (
				<div className={styles.wrapper__keyList__noResult}>
					<span>Your vault is empty</span>

					<p className={styles.wrapper__keyList__noResult__hint}>
						Add a key by pressing the{" "}
						<span onClick={onAddNewClicked} className="link">
							New
						</span>{" "}
						button
					</p>
				</div>
			);
		}
	};

	// add new key handler
	const onAddNewClicked = () => {
		if (showUpdateKeyModal) setShowUpdateKeyModal(false);
		setShowAddNewKeyModal(true);
		setQuery("");
	};
	//

	return (
		<>
			{/* container for the page content starts */}
			<div className={styles.container}>
				{/* main content of the page starts */}
				<div className={styles.wrapper}>
					{/* search bar and new key button container starts */}
					<div className={styles.wrapper__utilContainer}>
						<Input
							type="text"
							placeholder="Search..."
							value={query}
							onChange={onSearchInputChange}
						/>
						<Button text="New" color="primary" onClick={onAddNewClicked} />
					</div>
					{/* search bar and new key button container ends */}

					{/* key list starts */}
					<div className={styles.wrapper__keyList}>
						<>{isLoading ? <SpinnerIcon /> : getKeyList()}</>
					</div>
					{/* key list ends */}
				</div>
				{/* main content of the page ends */}

				{/* modals start */}
				{showUpdateKeyModal && (
					<div className={styles.modal}>
						<UpdateKeyModal keyId={keyId} show={setShowUpdateKeyModal} />
					</div>
				)}

				{showAddNewKeyModal && (
					<div className={styles.modal}>
						<AddNewKeyModal show={setShowAddNewKeyModal} />
					</div>
				)}
				{/* modals end */}
			</div>
			{/* container for the page content ends */}

			{/* modal shadow starts */}
			{(showUpdateKeyModal || showAddNewKeyModal) && (
				<div
					className={styles.modal__shadow}
					onClick={() => {
						setShowUpdateKeyModal(false);
						setShowAddNewKeyModal(false);
					}}
				/>
			)}
			{/* modal shadow ends */}
		</>
	);
}
