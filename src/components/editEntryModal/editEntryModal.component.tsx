import styles from "./editEntryModal.module.scss";
// react
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
// @hooks
import {
	useClickOutside,
	useCopyToClipboard,
	useEffectOnUpdate,
	useFormInput,
	useMatchMedia,
	useMutation,
	useShowPasswordIcon,
	useSuccess,
	useToggle,
} from "@hooks/index";
// @redux
import {
	useDeleteEntryMutation,
	useUpdateEntryMutation,
} from "@redux/entries/entryApiSlice";
// @components
import { EntryType } from "@components/entry/entry.component";
import {
	Button,
	CustomFieldsList,
	Icon,
	icons,
	Input,
	Modal,
	WebsiteIcon,
} from "@components/index";
// @util
import {
	passwordGenerationSettings,
	passwordGenerator,
	pixelToEm,
} from "@util/index";

export default function EditEntryModal({
	entry,
	setSelectedEntry,
	showModal,
	setShowModal,
	parentContainer,
}: {
	entry: EntryType;
	setSelectedEntry: Dispatch<SetStateAction<EntryType | null>>;
	showModal: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	parentContainer?: string;
}) {
	const [copyToClipBoard, { success: copySuccess }] = useCopyToClipboard();

	// title
	const title = useFormInput(entry.title);
	const isTitleEditable = useToggle(false);
	const ref = useRef<HTMLDivElement>(null);

	useClickOutside(ref, () => {
		if (isTitleEditable.value) isTitleEditable.toggleValue();
	});
	//

	// password
	const password = useFormInput(entry.password);
	const showPassword = useToggle(false);
	const showPasswordIcon = useShowPasswordIcon(showPassword.value);

	function onGeneratePasswordClicked(): void {
		// empty the password field and set an artificial delay
		// to convey response to the user that the password has been regenerated
		password.changeValue("");
		setTimeout(
			() =>
				password.changeValue(
					passwordGenerator(passwordGenerationSettings)
				),
			100
		);
	}
	//

	// custom fields
	const [customFields, setCustomFields] = useState<any[]>(entry.customFields);

	// need to load the custom fields this way to make them editable
	useEffectOnUpdate(() => {
		const fields: SetStateAction<{ key: string; value: string }[]> = [];

		entry.customFields.map((field: any) => {
			fields.push({ key: field.key, value: field.value });
		});

		setCustomFields(fields);
	}, [entry.customFields]);
	//

	// delete entry
	const deleteEntryMutation = useMutation(useDeleteEntryMutation());

	async function onDeleteEntryClicked(): Promise<void> {
		await deleteEntryMutation.trigger({ id: entry.id });
	}

	useSuccess(() => {
		handleCloseModal();
	}, deleteEntryMutation);
	//

	// form submit
	const updateEntryMutation = useMutation(useUpdateEntryMutation());

	async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
		event.preventDefault(); // prevent page reload

		await updateEntryMutation.trigger({
			id: entry.id,
			title: title.value || "Title",
			password:
				password.value || passwordGenerator(passwordGenerationSettings),
			customFields,
		});
	}
	//

	// update success
	const [saveButtonText, setSaveButtonText] = useState("Save");

	const isDesktopRes = useMatchMedia(
		`(min-width: ${styles.breakpointLarge})`,
		true
	);

	useSuccess(() => {
		// on large screens the modal does not appear above other content
		// therefore we do not need to close it after saving
		if (!isDesktopRes) handleCloseModal();

		setSaveButtonText("Saved!");
		setTimeout(() => {
			setSaveButtonText("Save");
		}, 400);
	}, updateEntryMutation);
	//

	function handleCloseModal(): void {
		setSelectedEntry(null);
		setShowModal(false);
	}

	return (
		<Modal
			isOpen={showModal}
			onRequestClose={handleCloseModal}
			parentContainer={parentContainer}
		>
			<form className={styles["modal"]} onSubmit={onSubmit}>
				<div className={styles["modal__header"]}>
					<h1 className={styles["modal__header__title"]}>
						Edit entry
					</h1>

					<Icon
						icon={icons.cross}
						size={pixelToEm(24)}
						className={styles["modal__header__close-icon"]}
						onClick={handleCloseModal}
					/>
				</div>

				<div className={styles["modal__content"]}>
					<div className={styles["modal__content__title"]} ref={ref}>
						<WebsiteIcon entry={entry} />

						<Icon
							icon={icons.edit}
							size={pixelToEm(24)}
							className="interactable"
							onClick={isTitleEditable.toggleValue}
						/>

						{isTitleEditable.value ? (
							<Input
								type="text"
								name="key"
								value={title.value}
								onChange={title.onChange}
								autocomplete="off"
							/>
						) : (
							<p>{title.value}</p>
						)}
					</div>

					<div className={styles["modal__content__field"]}>
						<label htmlFor="password">Password</label>
						<Input
							className={styles["modal__content__field__input"]}
							id="password"
							type="password"
							value={password.value}
							onChange={password.onChange}
							showPassword={showPassword.value}
							autocomplete="off"
						>
							<Icon
								icon={showPasswordIcon}
								size={pixelToEm(24)}
								className="interactable"
								onClick={showPassword.toggleValue}
							/>

							<Icon
								icon={copySuccess ? icons.tick : icons.copy}
								size={pixelToEm(24)}
								className="interactable"
								onClick={() => copyToClipBoard(password.value)}
							/>

							<Icon
								icon={icons.generate}
								size={pixelToEm(24)}
								className="interactable"
								onClick={onGeneratePasswordClicked}
							/>
						</Input>
					</div>

					<CustomFieldsList
						customFields={customFields}
						setCustomFields={setCustomFields}
					/>
				</div>

				<div className={styles["modal__footer"]}>
					<Button
						text="Delete"
						background={false}
						size="small"
						color="danger"
						className={styles["modal__footer__delete-button"]}
						onClick={onDeleteEntryClicked}
					>
						<Icon icon={icons.trash} size={pixelToEm(24)} />
					</Button>

					<Button
						text="Cancel"
						background={false}
						size="small"
						onClick={handleCloseModal}
					/>

					<Button
						text={saveButtonText}
						type="submit"
						color="primary"
						size="small"
						loading={updateEntryMutation.isLoading}
					/>
				</div>
			</form>
		</Modal>
	);
}
