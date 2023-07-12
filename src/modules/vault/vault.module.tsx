import styles from "./vault.module.scss";
// react
import { ReactNode, useState } from "react";
// @hooks
import { useEffectOnMount, useFormInput, useLazyQuery } from "@hooks/index";
// @redux
import { useLazyGetEntriesQuery } from "@redux/entries/entryApiSlice";
// @components
import { EntryType } from "@components/entry/entry.component";
import {
	Button,
	EditEntryModal,
	EntriesList,
	Entry,
	Input,
	NewEntryModal,
} from "@components/index";

// page module for "/vault" route
export default function Vault() {
	const [showNewEntryModal, setShowNewEntryModal] = useState(false);
	const [showEditEntryModal, setShowEditEntryModal] = useState(false);

	let entries: ReactNode | null;
	const [selectedEntry, setSelectedEntry] = useState<EntryType | null>(null);

	const keyword = useFormInput("");

	const getEntriesQuery = useLazyQuery(
		useLazyGetEntriesQuery(), //
		{ keyword: keyword.value }
	);

	useEffectOnMount(() => {
		getEntriesQuery.trigger({ keyword: keyword.value });
	});

	if (getEntriesQuery.isSuccess) {
		entries =
			getEntriesQuery.data.length > 0
				? Object.entries(getEntriesQuery.data).map((entity: any) => {
						const entry = entity[1];
						return (
							<Entry
								key={entry.id}
								entry={entry}
								active={entry === selectedEntry}
								onClick={() => {
									handleEditEntryModalOpen(entry);
								}}
							/>
						);
				  })
				: null;
	}

	function handleNewEntryModalOpen(): void {
		setShowEditEntryModal(false);
		setSelectedEntry(null);

		setShowNewEntryModal(true);
	}

	function handleEditEntryModalOpen(entry: EntryType): void {
		setShowNewEntryModal(false);
		setSelectedEntry(entry);

		setShowEditEntryModal(true);
	}

	return (
		<div id={styles["wrapper"]}>
			<div className={styles["vault-module"]}>
				<div className={styles["vault-module__util"]}>
					<Input
						type="text"
						placeholder="Search"
						value={keyword.value}
						onChange={keyword.onChange}
					/>

					<Button
						text="New"
						color="primary"
						onClick={handleNewEntryModalOpen}
					/>
				</div>

				<EntriesList
					entries={entries}
					searchKeyword={keyword.value}
					onAddNewClicked={handleNewEntryModalOpen}
				/>
			</div>

			{showNewEntryModal && (
				<NewEntryModal
					showModal={showNewEntryModal}
					setShowModal={setShowNewEntryModal}
					parentContainer={styles["wrapper"]}
				/>
			)}

			{showEditEntryModal && selectedEntry && (
				<EditEntryModal
					entry={selectedEntry}
					setSelectedEntry={setSelectedEntry}
					showModal={showEditEntryModal}
					setShowModal={setShowEditEntryModal}
					parentContainer={styles["wrapper"]}
				/>
			)}
		</div>
	);
}
