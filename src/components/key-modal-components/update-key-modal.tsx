import styles from "./key-modal.module.scss";

import { SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
	selectKeyById,
	useDeleteKeyMutation,
	useUpdateKeyMutation,
} from "@redux/keys/keysApiSlice";

import { passwordGenerationSettings, passwordGenerator } from "@util/passwordGenerator";

import Button from "@components/button-component/button";
import AddIcon from "@components/icon-components/add-icon";
import CloseIcon from "@components/icon-components/close-icon";
import CustomFieldIcon from "@components/icon-components/custom-field-icon";
import DeleteIcon from "@components/icon-components/delete-icon";
import GenerateIcon from "@components/icon-components/generate-icon";
import Input from "@components/input-component/input";
import WebsiteIcon from "@components/website-icon-component/website-icon";
import format from "@util/formatInputValue";

export default function UpdateKeyModal({ keyId, show }: any) {
	const key = useSelector(state => selectKeyById(state, keyId));

	const [title, setTitle] = useState(key.title);
	const [password, setPassword] = useState(key.password);
	const [inputFields, setInputFields] = useState([{ key: "", value: "" }]);
	const [errorMessage, setErrorMessage] = useState("");

	const [updateKey, { isLoading, isSuccess, isError, error }] = useUpdateKeyMutation();
	const [deleteKey, { isLoading: isDelLoading, isSuccess: isDelSuccess }] =
		useDeleteKeyMutation();

	useEffect(() => {
		if (isLoading || isDelLoading) {
			console.log("loading...");
		}
	}, [isLoading, isDelLoading]);

	useEffect(() => {
		if (isSuccess || isDelSuccess) {
			show(false);
		}
	}, [isSuccess, isDelSuccess, show]);

	useEffect(() => {
		if (isError) {
			const errorObj = error as any;
			setErrorMessage(errorObj.data.message);
		}
	}, [isError, error]);

	useEffect(() => {
		setErrorMessage("");
	}, [password]);

	// load the custom fields from the key
	useEffect(() => {
		const customFields: SetStateAction<{ key: string; value: string }[]> = [];

		key.customFields.map((field: any) => {
			customFields.push({ key: field.key, value: field.value });
		});

		setInputFields(customFields);
	}, [key.customFields]);

	const onPwdChange = (e: any) => setPassword(e.target.value);

	// empty the password field and set an artificial delay
	// to convey response to the user that the password has been regenerated
	const onGeneratePwdClick = () => {
		setPassword("");
		setTimeout(() => setPassword(passwordGenerator(passwordGenerationSettings)), 100);
	};

	const onInputChange = (index: number, event: any) => {
		const data = [...inputFields];
		data[index][event.target.name as keyof (typeof inputFields)[0]] = event.target.value;
		setInputFields(data);
	};

	const onAddNewFieldClicked = () => {
		const newfield = { key: "New field", value: "" };
		setInputFields([...inputFields, newfield]);
	};

	const onRemoveFieldClicked = (index: number) => {
		const data = [...inputFields];
		data.splice(index, 1);
		setInputFields(data);
	};

	const customFields = inputFields.map((field: any, index: number) => {
		return (
			<div key={index} className={styles.form__field}>
				<div className={styles.form__field__titleContainer}>
					<span className={styles.form__field__titleContainer__customFieldIcon}>
						<CustomFieldIcon size="24" />
					</span>

					<input
						type="text"
						name="key"
						maxLength={24}
						value={field.key}
						size={field.key.length || 4}
						onChange={(event: any) => onInputChange(index, event)}
						className={styles.form__field__titleContainer__input}
					/>
				</div>

				<div className={styles.form__field__inputContainer}>
					<Input
						type="text"
						name="value"
						value={field.value}
						onChange={(event: any) => onInputChange(index, event)}
						withCopyButton
					/>

					<span
						onClick={() => onRemoveFieldClicked(index)}
						className={styles.form__field__inputContainer__deleteIcon}>
						<DeleteIcon size="32" />
					</span>
				</div>
			</div>
		);
	});

	const onDeleteKeyClicked = async () => {
		await deleteKey({ id: key.id });
	};

	const onSubmit = async (e: any) => {
		e.preventDefault(); // prevent page reload

		await updateKey({
			id: key.id,
			title: title || "Title",
			password,
			customFields: inputFields,
		});
	};

	return (
		<div className={styles.container}>
			<span onClick={() => show(false)} className={styles.closeIcon}>
				<CloseIcon size="28" />
			</span>

			<form onSubmit={onSubmit} className={styles.form}>
				<div className={styles.form__titleContainer}>
					<WebsiteIcon currentKey={key} />

					<input
						type="text"
						name="key"
						maxLength={24}
						value={format(title)}
						size={format(title).length || 4}
						onChange={(event: any) => setTitle(event.target.value)}
						className={styles.form__titleContainer__input}
					/>
				</div>

				<div className={styles.form__field}>
					<label htmlFor="password">Password</label>

					<div className={styles.form__field__inputContainer}>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={onPwdChange}
							withCopyButton
						/>

						<span
							onClick={onGeneratePwdClick}
							className={styles.form__field__inputContainer__generateIcon}>
							<GenerateIcon size="32" />
						</span>
					</div>

					{errorMessage && (
						<p className="error" aria-live="assertive">
							{errorMessage}
						</p>
					)}
				</div>

				<>{customFields}</>

				<div className={styles.form__addNewFieldContainer}>
					<span
						onClick={onAddNewFieldClicked}
						className={`link ${styles.form__addNewFieldContainer__button}`}>
						<AddIcon size="26" />
						<span>Add new field</span>
					</span>
				</div>

				<div className={styles.form__buttonGroup}>
					<span onClick={() => show(false)}>
						<Button text="Cancel" color="danger" noBackdrop flex />
					</span>

					<div className={styles.form__buttonGroup__separator}>&nbsp;</div>

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

			<div className={styles.deleteKeyContainer}>
				<div onClick={onDeleteKeyClicked} className={styles.deleteKeyContainer__button}>
					<DeleteIcon size="22" />
					<p className="danger">Delete key</p>
				</div>
			</div>
		</div>
	);
}
