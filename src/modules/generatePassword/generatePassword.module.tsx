import styles from "./generatePassword.module.scss";
// react
import { useState } from "react";
// @hooks
import { useCopyToClipboard, useEffectOnMount, useToggle } from "@hooks/index";
// @component
import { Button, Icon, icons, Input, Slider, Toggle } from "@components/index";
// @util
import { passwordGenerator, pixelToEm } from "@util/index";

// page module for "/generate" route
export default function GeneratePassword() {
	const [password, setPassword] = useState("");
	const [passwordLength, setPasswordLength] = useState(32);

	const uppercase = useToggle(true);
	const lowercase = useToggle(true);
	const numbers = useToggle(true);
	const symbols = useToggle(true);

	const [copyToClipboard, { success: copySuccess }] = useCopyToClipboard();

	function noOptionsSelected(): boolean {
		return (
			!uppercase.value &&
			!lowercase.value &&
			!numbers.value &&
			!symbols.value
		);
	}

	function onSliderChange(value: number): void {
		setPasswordLength(value);
	}

	function generatePassword(): void {
		const generationSettings = {
			passwordLength,
			uppercase: uppercase.value,
			lowercase: lowercase.value,
			numbers: numbers.value,
			symbols: symbols.value,
		};

		setPassword(passwordGenerator(generationSettings));
	}

	useEffectOnMount(() => generatePassword());

	function onCopyBtnClicked(): void {
		copyToClipboard(password);
	}

	return (
		<div className={styles["password-generator-module"]}>
			<p className="title">Generate password</p>

			<Input
				type="text"
				readonly
				value={password}
				className={styles["generatedPassword"]}
				ariaLive="polite"
				ariaLabel="generated password"
			>
				<Icon
					icon={copySuccess ? icons.tick : icons.copy}
					size={pixelToEm(24)}
					className="interactable"
					onClick={onCopyBtnClicked}
				/>
			</Input>

			<div className={styles["generator-settings"]}>
				<p>Length: {passwordLength}</p>
				<Slider
					defaultValue={passwordLength}
					min={1}
					max={32}
					disabled={noOptionsSelected()}
					onChange={onSliderChange}
					onAfterChange={generatePassword}
					className={styles["generator-settings__slider"]}
				/>

				<Toggle
					label="Uppercase letters"
					flex
					checked={uppercase.value}
					onChange={uppercase.toggleValue}
				/>
				<Toggle
					label="Lowercase letters"
					flex
					checked={lowercase.value}
					onChange={lowercase.toggleValue}
				/>
				<Toggle
					label="Include Numbers"
					flex
					checked={numbers.value}
					onChange={numbers.toggleValue}
				/>
				<Toggle
					label="Special characters"
					flex
					checked={symbols.value}
					onChange={symbols.toggleValue}
				/>
			</div>

			<Button
				text="Generate"
				color="primary"
				flex
				disabled={noOptionsSelected()}
				onClick={generatePassword}
			/>
		</div>
	);
}
