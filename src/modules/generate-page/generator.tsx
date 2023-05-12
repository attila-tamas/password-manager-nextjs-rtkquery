import styles from "./generator.module.scss";

import { useEffect, useState } from "react";

import Button from "@components/button-component/button";
import AddIcon from "@components/icon-components/add-icon";
import Slider from "@components/slider-component/slider";
import Toggle from "@components/toggle-component/toggle";

export default function Generate() {
	const [password, setPassword] = useState("");
	const [passwordLength, setPasswordLength] = useState(32);
	const [uppercase, setUppercase] = useState(true);
	const [lowercase, setLowercase] = useState(true);
	const [numbers, setNumbers] = useState(true);
	const [symbols, setSymbols] = useState(true);
	const [errors, setErrors] = useState("");

	const random = (min = 0, max = 1) => {
		return Math.floor(Math.random() * (max + 1 - min) + min);
	};

	const randomLower = () => {
		return String.fromCharCode(random(97, 122));
	};

	const randomUpper = () => {
		return String.fromCharCode(random(65, 90));
	};

	const randomSymbol = () => {
		const symbols = "~*$%@#^&!?*'-=/,.{}()[]<>";
		return symbols[random(0, symbols.length - 1)];
	};

	const generatePassword = () => {
		setErrors("");

		if (!uppercase && !lowercase && !numbers && !symbols) {
			return setErrors("Select at least one option");
		}

		let password = "";

		for (let i = 0; i < passwordLength; i++) {
			const choice = random(0, 3);

			if (lowercase && choice === 0) {
				password += randomLower();
			} else if (uppercase && choice === 1) {
				password += randomUpper();
			} else if (symbols && choice === 2) {
				password += randomSymbol();
			} else if (numbers && choice === 3) {
				password += random(0, 9);
			} else {
				i--;
			}
		}

		setPassword(password);
	};

	const copyPassword = () => navigator.clipboard.writeText(password);

	useEffect(() => {
		generatePassword();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.container}>
			<p className={styles.container__title}>Password generator</p>

			<div className={styles.container__content}>
				<div
					onClick={copyPassword}
					className={`
								${styles.container__content__generatedPassword}
								${errors && styles.container__content__generatedPassword__error}
							`}>
					<p>{errors === "" ? password : errors}</p>
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

				<div className={`link ${styles.container__content__addToVault}`}>
					<AddIcon size="24" />
					<span>Add to vault</span>
				</div>
			</div>
		</div>
	);
}
