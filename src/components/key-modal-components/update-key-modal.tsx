// styles
import styles from "./key-modal.module.scss";
// react
import { SetStateAction, useEffect, useState } from "react";
// npm
import { useSelector } from "react-redux";
// @redux
import {
	selectKeyById,
	useDeleteKeyMutation,
	useUpdateKeyMutation,
} from "@redux/keys/keysApiSlice";
// @util
import format from "@util/formatInputValue";
import { passwordGenerationSettings, passwordGenerator } from "@util/passwordGenerator";
// @components
import Button from "@components/button-component/button";
import AddIcon from "@components/icon-components/add-icon";
import CloseIcon from "@components/icon-components/close-icon";
import CustomFieldIcon from "@components/icon-components/custom-field-icon";
import DeleteIcon from "@components/icon-components/delete-icon";
import GenerateIcon from "@components/icon-components/generate-icon";
import Input from "@components/input-component/input";
import WebsiteIcon from "@components/website-icon-component/website-icon";

export default function UpdateKeyModal({ keyId, show }: any) {
	const key = useSelector(state => selectKeyById(state, keyId));

	// states
	const [title, setTitle] = useState(key.title);
	const [password, setPassword] = useState(key.password);
	const [inputFields, setInputFields] = useState([{ key: "", value: "" }]);
	const [errorMsg, setErrorMsg] = useState("");
	//

	// api hooks
	const [updateKey, { isLoading, isSuccess, isError, error }] = useUpdateKeyMutation();
	const [deleteKey, { isLoading: isDelLoading, isSuccess: isDelSuccess }] =
		useDeleteKeyMutation();
	//

	// useEffect hooks
	// close the modal if the update or delete was successful
	useEffect(() => {
		if (isSuccess || isDelSuccess) {
			show(false);
		}
	}, [isSuccess, isDelSuccess, show]);

	// set the error message if there is an error to display it to the user
	useEffect(() => {
		if (isError) {
			const errorObj = error as any;
			setErrorMsg(errorObj.data.message);
		}
	}, [isError, error]);

	// clear the password input's error message on value change
	useEffect(() => {
		setErrorMsg("");
	}, [password]);

	// load the custom fields from the key
	useEffect(() => {
		const customFields: SetStateAction<{ key: string; value: string }[]> = [];

		key.customFields.map((field: any) => {
			customFields.push({ key: field.key, value: field.value });
		});

		setInputFields(customFields);
	}, [key.customFields]);
	//

	// handler functions
	// password input handler
	const onPasswordChange = (e: any) => setPassword(e.target.value);

	// custom field input handler
	const onInputChange = (index: number, event: any) => {
		const data = [...inputFields];
		data[index][event.target.name as keyof (typeof inputFields)[0]] = event.target.value;
		setInputFields(data);
	};

	// empty the password field and set an artificial delay
	// to convey response to the user that the password has been regenerated
	const onGeneratePwdClick = () => {
		setPassword("");
		setTimeout(() => setPassword(passwordGenerator(passwordGenerationSettings)), 100);
	};

	// add new custom field handler
	const onAddNewFieldClicked = () => {
		const newfield = { key: "New field", value: "" };
		setInputFields([...inputFields, newfield]);
	};

	// remove custom field handler
	const onRemoveFieldClicked = (index: number) => {
		const data = [...inputFields];
		data.splice(index, 1);
		setInputFields(data);
	};

	// delete key handler
	const onDeleteKeyClicked = async () => {
		await deleteKey({ id: key.id });
	};

	// form submit handler
	const onSubmit = async (e: any) => {
		e.preventDefault(); // prevent page reload

		await updateKey({
			id: key.id,
			title: title || "Title", // if the user did not provied a title, default if to "Title"
			password,
			customFields: inputFields,
		});
	};

	// modal close handler
	const handleClose = () => {
		if (!isLoading) {
			show(false);
		}
	};
	//

	return (
		<div className={styles.container}>
			<span onClick={handleClose} className={styles.closeIcon}>
				<CloseIcon size="28" />
			</span>

			{/* update key form starts */}
			<form onSubmit={onSubmit} className={styles.form}>
				{/* title starts */}
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
				{/* title ends */}

				{/* password input starts */}
				<div className={styles.form__field}>
					<label htmlFor="password">Password</label>

					<div className={styles.form__field__inputContainer}>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={onPasswordChange}
							withCopyButton
						/>

						<span
							onClick={onGeneratePwdClick}
							className={styles.form__field__inputContainer__generateIcon}>
							<GenerateIcon size="32" />
						</span>
					</div>

					{errorMsg && (
						<p className="error" aria-live="assertive">
							{errorMsg}
						</p>
					)}
				</div>
				{/* password input ends */}

				{/* custom fields start */}
				{inputFields.map((field: any, index: number) => {
					return (
						<div key={index} className={styles.form__field}>
							{/* title of the custom field starts */}
							<div className={styles.form__field__titleContainer}>
								<span
									className={styles.form__field__titleContainer__customFieldIcon}>
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
							{/* title of the custom field ends */}

							{/* input of the custom field starts */}
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
							{/* input of the custom field ends */}
						</div>
					);
				})}
				{/* custom fields end */}

				{/* add new field button starts */}
				<div className={styles.form__addNewFieldContainer}>
					<span
						onClick={onAddNewFieldClicked}
						className={`link ${styles.form__addNewFieldContainer__button}`}>
						<AddIcon size="26" />
						<span>Add new field</span>
					</span>
				</div>
				{/* add new field button ends */}

				{/* button group starts */}
				<div className={styles.form__buttonGroup}>
					<span onClick={handleClose}>
						<Button text="Cancel" color="danger" noBackdrop flex />
					</span>

					<div className={styles.form__buttonGroup__separator}>&nbsp;</div>

					<span>
						<Button
							text={isLoading ? "Saving..." : "Save"}
							type="submit"
							color="primary"
							noBackdrop
							flex
							disabled={isLoading}
						/>
					</span>
				</div>
				{/* group ends */}
			</form>
			{/* update key form starts */}

			{/* dekete key button starts */}
			<div className={styles.deleteKeyContainer}>
				<div onClick={onDeleteKeyClicked} className={styles.deleteKeyContainer__button}>
					<DeleteIcon size="22" />
					<p className="danger">{isDelLoading ? "Deleting key..." : "Delete key"}</p>
				</div>
			</div>
			{/* dekete key button ends */}
		</div>
	);
}
