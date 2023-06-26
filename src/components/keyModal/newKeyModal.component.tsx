// styles
import styles from "./keyModal.module.scss";
// react
import { useEffect, useState } from "react";
// @redux
import { useAddNewKeyMutation } from "@redux/keys/keysApiSlice";
// @util
import format from "@util/formatInputValue";
import {
	passwordGenerationSettings,
	passwordGenerator,
} from "@util/passwordGenerator";
import { pixelToEm } from "@util/pixelConverter";
// @components
import Button from "@components/button/button.component";
import Icon, { icons } from "@components/icon/icon";
import Input from "@components/input/input.component";

export default function AddNewKeyModal({ show }: any) {
	// states
	const [title, setTitle] = useState("Title");
	const [password, setPassword] = useState("");
	const [showPwd, setShowPwd] = useState(false);
	const [inputFields, setInputFields] = useState([] as any[]);
	//

	// api hook
	const [addNewKey, { isLoading, isSuccess }] = useAddNewKeyMutation();

	// useEffect hooks
	// generate a password on page load
	useEffect(() => {
		setPassword(passwordGenerator(passwordGenerationSettings));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// close the modal if the update or delete was successful
	useEffect(() => {
		if (isSuccess) {
			show(false);
		}
	}, [isSuccess, show]);
	//

	// handler functions
	// input handler
	const onPasswordChange = (e: any) => setPassword(e.target.value);
	const handleShowPwdToggle = () => setShowPwd((prev: boolean) => !prev);

	// custom field input handler
	const onInputChange = (index: number, event: any) => {
		const data = [...inputFields];
		data[index][event.target.name] = event.target.value;
		setInputFields(data);
	};

	// empty the password field and set an artificial delay
	// to convey response to the user that the password has been regenerated
	const onGeneratePasswordClick = () => {
		setPassword("");
		setTimeout(
			() => setPassword(passwordGenerator(passwordGenerationSettings)),
			100
		);
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

	// form submit handler
	const onSubmit = async (e: any) => {
		e.preventDefault(); // prevent page reload

		await addNewKey({
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
							className={
								styles.form__field__passwordFieldTitle__showIcon
							}
						>
							<Icon
								icon={showPwd ? icons.hide : icons.show}
								size={pixelToEm(24)}
								className="interactable"
							/>
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
							className={
								styles.form__field__inputContainer__generateIcon
							}
						>
							<Icon
								icon={icons.generate}
								size={pixelToEm(32)}
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
									className={
										styles.form__field__titleContainer__customFieldIcon
									}
								>
									<Icon
										icon={icons.customField}
										size={pixelToEm(24)}
									/>
								</span>

								<input
									type="text"
									name="key"
									maxLength={24}
									value={field.key}
									size={field.key.length || 4}
									onChange={(event: any) =>
										onInputChange(index, event)
									}
									className={
										styles.form__field__titleContainer__input
									}
								/>
							</div>
							{/* title of the custom field ends */}

							{/* input of the custom field starts */}
							<div className={styles.form__field__inputContainer}>
								<Input
									type="text"
									name="value"
									value={field.value}
									onChange={(event: any) =>
										onInputChange(index, event)
									}
									copyButton={true}
								/>

								<span
									onClick={() => onRemoveFieldClicked(index)}
									className={
										styles.form__field__inputContainer__deleteIcon
									}
								>
									<Icon
										icon={icons.trash}
										size={pixelToEm(32)}
									/>
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
						<Icon icon={icons.add} size={pixelToEm(28)} />
						<span>Add new field</span>
					</span>
				</div>
				{/* add new field button ends */}
			</div>
			{/* scrollable content ends */}

			{/* button group starts */}
			<div className={styles.form__buttonGroup}>
				<Button
					text="Cancel"
					background={false}
					onClick={handleClose}
					className={styles.form__buttonGroup__button}
				/>

				<Button
					text={isLoading ? "Creating..." : "Create"}
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
