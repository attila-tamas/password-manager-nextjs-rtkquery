// styles
import styles from "./keyModal.module.scss";
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
import pixelToRem from "@util/pixelToRem";
// @components
import Button from "@components/button/button.component";
import Icon, { icons } from "@components/icon/icon";
import Input from "@components/input/input.component";
import WebsiteIcon from "@components/websiteIcon/websiteIcon";

export default function UpdateKeyModal({ keyId, show }: any) {
	const key = useSelector(state => selectKeyById(state, keyId));

	// states
	const [title, setTitle] = useState(key.title);
	const [password, setPassword] = useState(key.password);
	const [showPwd, setShowPwd] = useState(false);
	const [inputFields, setInputFields] = useState([{ key: "", value: "" }]);
	//

	// api hooks
	const [updateKey, { isLoading, isSuccess }] = useUpdateKeyMutation();
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
	const handleShowPwdToggle = () => setShowPwd((prev: boolean) => !prev);

	// custom field input handler
	const onInputChange = (index: number, event: any) => {
		const data = [...inputFields];
		data[index][event.target.name as keyof (typeof inputFields)[0]] = event.target.value;
		setInputFields(data);
	};

	// empty the password field and set an artificial delay
	// to convey response to the user that the password has been regenerated
	const onGeneratePasswordClick = () => {
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
			title: title || "Title",
			password: password || passwordGenerator(passwordGenerationSettings),
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
		<form onSubmit={onSubmit} className={styles.form}>
			{/* scrollable content starts */}
			<div className={styles.form__wrapper}>
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

				{/* password field starts */}
				<div className={styles.form__field}>
					<div className={styles.form__field__passwordFieldTitle}>
						<label htmlFor="password">Password</label>

						<span
							onClick={handleShowPwdToggle}
							className={styles.form__field__passwordFieldTitle__showIcon}
						>
							<Icon icon={icons.eye} size={pixelToRem(24)} className="interactable" />
						</span>
					</div>

					<div className={styles.form__field__inputContainer}>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={onPasswordChange}
							copyButton={true}
							showPassword={showPwd}
						/>

						<span
							onClick={onGeneratePasswordClick}
							className={styles.form__field__inputContainer__generateIcon}
						>
							<Icon
								icon={icons.generate}
								size={pixelToRem(32)}
								className="interactable"
							/>
						</span>
					</div>
				</div>
				{/* password field ends */}

				{/* custom fields start */}
				{inputFields.map((field: any, index: number) => {
					return (
						<div key={index} className={styles.form__field}>
							{/* title of the custom field starts */}
							<div className={styles.form__field__titleContainer}>
								<span
									className={styles.form__field__titleContainer__customFieldIcon}
								>
									<Icon icon={icons.customField} size={pixelToRem(24)} />
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
									copyButton={true}
								/>

								<span
									onClick={() => onRemoveFieldClicked(index)}
									className={styles.form__field__inputContainer__deleteIcon}
								>
									<Icon icon={icons.trash} size={pixelToRem(32)} />
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
						className={`interactable ${styles.form__addNewFieldContainer__button}`}
					>
						<Icon icon={icons.add} size={pixelToRem(28)} />
						<span>Add new field</span>
					</span>
				</div>
				{/* add new field button ends */}
			</div>
			{/* scrollable content ends */}

			{/* button group starts */}
			<div className={styles.form__buttonGroup}>
				{/* delete key button starts */}
				<div className={styles.form__buttonGroup__deleteKeyContainer}>
					<div
						onClick={onDeleteKeyClicked}
						className={styles.form__buttonGroup__deleteKeyContainer__button}
					>
						<span
							className={styles.form__buttonGroup__deleteKeyContainer__button__icon}
						>
							<Icon icon={icons.trash} size={pixelToRem(20)} />
						</span>
						<p className="danger">{isDelLoading ? "Deleting..." : "Delete"}</p>
					</div>
				</div>
				{/* delete key button ends */}

				<Button
					text="Close"
					background={false}
					onClick={handleClose}
					className={`${styles.form__buttonGroup__button} ${styles.form__buttonGroup__button__close}`}
				/>

				<Button
					text={isLoading ? "Saving..." : "Save"}
					type="submit"
					color="primary"
					disabled={isLoading}
					className={styles.form__buttonGroup__button}
				/>
			</div>
			{/* button group ends */}
		</form>
	);
}
