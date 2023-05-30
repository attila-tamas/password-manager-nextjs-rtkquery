import styles from "./key-modal.module.scss";

import { useAddNewKeyMutation } from "@redux/keys/keysApiSlice";
import { useEffect, useState } from "react";

import { passwordGenerationSettings, passwordGenerator } from "@util/passwordGenerator";

import format from "@/util/formatInputValue";
import Button from "@components/button-component/button";
import AddIcon from "@components/icon-components/add-icon";
import CloseIcon from "@components/icon-components/close-icon";
import CustomFieldIcon from "@components/icon-components/custom-field-icon";
import DeleteIcon from "@components/icon-components/delete-icon";
import GenerateIcon from "@components/icon-components/generate-icon";
import Input from "@components/input-component/input";

export default function AddNewKeyModal({ show }: any) {
	const [title, setTitle] = useState("Title");
	const [password, setPassword] = useState("");
	const [inputFields, setInputFields] = useState([] as any[]);

	const [addNewKey, { isLoading, isSuccess, isError, error }] = useAddNewKeyMutation();

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

	useEffect(() => {
		if (isError) {
			const errorObj = error as any;
			console.log(errorObj.data.message);
		}
	}, [isError, error]);

	useEffect(() => {
		setPassword(passwordGenerator(passwordGenerationSettings));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handlePasswordChange = (e: any) => setPassword(e.target.value);

	// empty the password field and set an artificial delay
	// to convey response to the user that the password has been regenerated
	const handleGeneratePasswordClick = () => {
		setPassword("");
		setTimeout(() => setPassword(passwordGenerator(passwordGenerationSettings)), 100);
	};

	const handleInputChange = (index: number, event: any) => {
		const data = [...inputFields];
		data[index][event.target.name] = event.target.value;
		setInputFields(data);
	};

	const handleAddNewField = () => {
		const newfield = { key: "New field", value: "" };
		setInputFields([...inputFields, newfield]);
	};

	const handleRemoveField = (index: number) => {
		const data = [...inputFields];
		data.splice(index, 1);
		setInputFields(data);
	};

	const customFields = inputFields.map((field: any, index: number) => {
		return (
			<div key={index} className={styles.container__form__fieldContainer}>
				<div className={styles.container__form__fieldContainer__title}>
					<span
						className={styles.container__form__fieldContainer__title__customFieldIcon}>
						<CustomFieldIcon size="24" />
					</span>

					<input
						type="text"
						name="key"
						maxLength={24}
						value={field.key}
						size={field.key.length || 4}
						onChange={(event: any) => handleInputChange(index, event)}
						className={styles.container__form__fieldContainer__title__input}
					/>
				</div>

				<div className={styles.container__form__fieldContainer__input}>
					<Input
						type="text"
						name="value"
						value={field.value}
						onChange={(event: any) => handleInputChange(index, event)}
						withCopyButton
					/>

					<span
						className={styles.container__form__fieldContainer__input__deleteIcon}
						onClick={() => handleRemoveField(index)}>
						<DeleteIcon size="32" />
					</span>
				</div>
			</div>
		);
	});

	const handleSubmit = async (e: any) => {
		e.preventDefault(); // prevent page reload

		await addNewKey({
			title: title || "Title",
			password: password || passwordGenerator(passwordGenerationSettings),
			customFields: inputFields,
		});
	};

	return (
		<div className={styles.container}>
			<span className={styles.container__closeIcon} onClick={() => show(false)}>
				<CloseIcon size="28" />
			</span>

			<form className={styles.container__form} onSubmit={handleSubmit}>
				<div className={styles.container__form__titleContainer}>
					<input
						type="text"
						name="key"
						maxLength={24}
						value={format(title)}
						size={format(title).length || 4}
						onChange={(event: any) => setTitle(event.target.value)}
						className={styles.container__form__titleContainer__input}
					/>
				</div>

				<div className={styles.container__form__fieldContainer}>
					<label htmlFor="password">Password</label>

					<div className={styles.container__form__fieldContainer__input}>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={handlePasswordChange}
							withCopyButton
						/>

						<span
							className={styles.container__form__fieldContainer__input__generateIcon}
							onClick={handleGeneratePasswordClick}>
							<GenerateIcon size="32" />
						</span>
					</div>
				</div>

				<>{customFields}</>

				<div className={styles.container__form__addNewField}>
					<span
						className={`link ${styles.container__form__addNewField__content}`}
						onClick={handleAddNewField}>
						<AddIcon size="26" />
						<span>Add new field</span>
					</span>
				</div>

				<div className={styles.container__form__buttonGroup}>
					<span onClick={() => show(false)}>
						<Button text="Cancel" color="danger" noBackdrop flex />
					</span>
					<div className={styles.container__form__buttonGroup__separator}>&nbsp;</div>
					<span>
						{/* Make the buttons disabled while loading */}
						{/* Make the modal unclosable while loading */}
						<Button
							text={isLoading ? "Saving..." : "Save"}
							color="primary"
							noBackdrop
							flex
							type="submit"
						/>
					</span>
				</div>
			</form>
		</div>
	);
}
