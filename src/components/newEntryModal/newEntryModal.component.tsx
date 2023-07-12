import styles from "./newEntryModal.module.scss";
// react
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
// @hooks
import {
	useClickOutside,
	useCopyToClipboard,
	useEffectOnMount,
	useFormInput,
	useMutation,
	useShowPasswordIcon,
	useSuccess,
	useToggle,
} from "@hooks/index";
// @components
import { CustomFieldType } from "@components/customField/customField.component";
import {
	Button,
	CustomFieldsList,
	Icon,
	icons,
	Input,
	Modal,
} from "@components/index";
// @redux
import { useAddNewEntryMutation } from "@redux/entries/entryApiSlice";
// @util
import {
	passwordGenerationSettings,
	passwordGenerator,
	pixelToEm,
} from "@util/index";

export default function NewEntryModal({
	showModal,
	setShowModal,
	parentContainer,
}: {
	showModal: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	parentContainer: string;
}) {
	const [copyToClipBoard, { success: copySuccess }] = useCopyToClipboard();

	const [customFields, setCustomFields] = useState<CustomFieldType[]>([]);

	const addNewEntryMutation = useMutation(useAddNewEntryMutation());

	// title
	const title = useFormInput("Title");
	const isTitleEditable = useToggle(false);
	const ref = useRef<HTMLDivElement>(null);

	useClickOutside(ref, () => {
		if (isTitleEditable.value) isTitleEditable.toggleValue();
	});
	//

	// password
	const password = useFormInput("");
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

	useEffectOnMount(() => {
		password.changeValue(passwordGenerator(passwordGenerationSettings));
	});
	//

	// form submit
	async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
		event.preventDefault(); // prevent page reload

		await addNewEntryMutation.trigger({
			title: title.value || "Title",
			password:
				password.value || passwordGenerator(passwordGenerationSettings),
			customFields,
		});
	}

	useSuccess(() => {
		handleCloseModal();
	}, addNewEntryMutation);
	//

	function handleCloseModal(): void {
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
						Create new entry
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
						text="Cancel"
						background={false}
						size="small"
						onClick={handleCloseModal}
					/>

					<Button
						text="Create"
						type="submit"
						color="primary"
						size="small"
					/>
				</div>
			</form>
		</Modal>
	);
}
