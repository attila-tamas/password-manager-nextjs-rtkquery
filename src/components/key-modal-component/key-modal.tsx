import styles from "./key-modal.module.scss";

import { selectKeyById } from "@redux/keys/keysApiSlice";
import { SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Button from "@components/button-component/button";
import AddIcon from "@components/icon-components/add-icon";
import CloseIcon from "@components/icon-components/close-icon";
import CustomFieldIcon from "@components/icon-components/custom-field-icon";
import DeleteIcon from "@components/icon-components/delete-icon";
import GenerateIcon from "@components/icon-components/generate-icon";
import Input from "@components/input-component/input";
import WebsiteIcon from "@components/website-icon-component/website-icon";

export default function EditKey({ keyId, showEditor }: any) {
	const key = useSelector(state => selectKeyById(state, keyId));

	const [title, setTitle] = useState(key.title);
	const [password, setPassword] = useState("");
	const [inputFields, setInputFields] = useState([{ key: "", value: "" }]);

	// load the custom fields from the key
	useEffect(() => {
		const customFields: SetStateAction<{ key: string; value: string }[]> = [];

		key.customFields.map((field: any) => {
			customFields.push({ key: field.key, value: field.value });
		});

		setInputFields(customFields);
	}, [key.customFields]);

	// check if the last two characters are white space
	// if they are, trim the last one
	// otherwise, return the value without formatting
	const formatTitle = (value: string) => {
		if (value.endsWith("  ")) {
			return value.slice(0, -1);
		}

		return value;
	};

	const handlePasswordChange = (e: any) => setPassword(e.target.value);

	const handleInputChange = (index: number, event: any) => {
		const data = [...inputFields];
		data[index][event.target.name as keyof (typeof inputFields)[0]] = event.target.value;
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
						size={field.key.length}
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

	const handleSubmit = (e: any) => {
		e.preventDefault(); // prevent page reload

		console.log(inputFields);
	};

	const handleClose = () => showEditor(false);

	return (
		<div className={styles.container}>
			<span className={styles.container__closeIcon} onClick={handleClose}>
				<CloseIcon size="28" />
			</span>

			<form className={styles.container__form} onSubmit={handleSubmit}>
				<div className={styles.container__form__titleContainer}>
					<WebsiteIcon currentKey={key} />

					<input
						type="text"
						name="key"
						maxLength={24}
						value={formatTitle(title)}
						size={formatTitle(title).length}
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
							className={styles.container__form__fieldContainer__input__generateIcon}>
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
					<span onClick={handleClose}>
						<Button text="Cancel" color="danger" noBackdrop flex />
					</span>
					<div className={styles.container__form__buttonGroup__separator}>&nbsp;</div>
					<span>
						<Button text="Save" color="primary" noBackdrop flex type="submit" />
					</span>
				</div>
			</form>
		</div>
	);
}
