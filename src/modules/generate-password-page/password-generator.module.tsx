import styles from "./password-generator.module.scss";

import { useEffect, useState } from "react";

import { passwordGenerator } from "@util/passwordGenerator";

import Button from "@components/button-component/button";
import AddIcon from "@components/icon-components/add-icon";
import Slider from "@components/slider-component/slider";
import Toggle from "@components/toggle-component/toggle";

export default function Generate() {
	const [passwordLength, setPasswordLength] = useState(32);
	const [uppercase, setUppercase] = useState(true);
	const [lowercase, setLowercase] = useState(true);
	const [numbers, setNumbers] = useState(true);
	const [symbols, setSymbols] = useState(true);

	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [text, setText] = useState("");

	const [wasPasswordCopied, setWasPasswordCopied] = useState(false);
	const [waitTimer, setWaitTimer] = useState(undefined);

	const generatePassword = () => {
		setErrorMsg("");

		if (!uppercase && !lowercase && !numbers && !symbols) {
			return setErrorMsg("Select at least one option");
		}

		const generationSettings = {
			passwordLength,
			uppercase,
			lowercase,
			numbers,
			symbols,
		};

		setPassword(passwordGenerator(generationSettings));
	};

	const copyPassword = () => {
		if (!errorMsg && !waitTimer) {
			navigator.clipboard.writeText(password);

			setWasPasswordCopied(true);
			setText("Password copied");

			setWaitTimer(
				setTimeout(() => {
					setText(password);
					setWaitTimer(undefined);
					setWasPasswordCopied(false);
				}, 600) as any
			);
		}
	};

	useEffect(() => {
		generatePassword();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!errorMsg) {
			setText(password);
		} else {
			setText(errorMsg);
		}
	}, [errorMsg, password]);

	return (
		<div className={styles.container}>
			<p className={styles.container__title}>Password generator</p>

			<div className={styles.container__content}>
				<div
					onClick={copyPassword}
					className={`
								${styles.container__content__generatedPassword}
								${errorMsg && styles.container__content__generatedPassword__error}
								${wasPasswordCopied && styles.container__content__generatedPassword__copied}
							`}>
					<p>{text}</p>
				</div>

				<div className={styles.container__content__settings}>
					<div className={styles.container__content__settings__sliderContainer}>
						<p>
							Length: <span>{passwordLength}</span>
						</p>
						<Slider
							defaultValue={passwordLength}
							onChange={(value: number) => setPasswordLength(value)}
							onAfterChange={generatePassword}
						/>
					</div>
					<Toggle
						label="Uppercase letters"
						flex
						defaultChecked={uppercase}
						onChange={(event: any) => setUppercase(event.target.checked)}
					/>
					<Toggle
						label="Lowercase letters"
						flex
						defaultChecked={lowercase}
						onChange={(event: any) => setLowercase(event.target.checked)}
					/>
					<Toggle
						label="Include Numbers"
						flex
						defaultChecked={numbers}
						onChange={(event: any) => setNumbers(event.target.checked)}
					/>
					<Toggle
						label="Special characters"
						flex
						defaultChecked={symbols}
						onChange={(event: any) => setSymbols(event.target.checked)}
					/>
				</div>

				<Button text="Generate" color="primary" flex onClick={generatePassword} />
			</div>

			<div className={`link ${styles.container__addToVault}`}>
				<AddIcon size="24" />
				<span>Add to vault</span>
			</div>
		</div>
	);
}
