// styles
import styles from "./password-generator.module.scss";
// react
import { useEffect, useState } from "react";
// @util
import { passwordGenerator } from "@util/passwordGenerator";
// @components
import Button from "@components/button-component/button";
import Slider from "@components/slider-component/slider";
import Toggle from "@components/toggle-component/toggle";

// page module for "/generate" route
export default function Generate() {
	// states
	// generation settings
	const [passwordLength, setPasswordLength] = useState(32);
	const [uppercase, setUppercase] = useState(true);
	const [lowercase, setLowercase] = useState(true);
	const [numbers, setNumbers] = useState(true);
	const [symbols, setSymbols] = useState(true);
	// display for the generated password container
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [text, setText] = useState("");
	// copy feedback
	const [wasPasswordCopied, setWasPasswordCopied] = useState(false);
	const [waitTimer, setWaitTimer] = useState(undefined);
	//

	// useEffect hooks
	// generate a password on page load
	useEffect(() => {
		generatePassword();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// handle text display in the generated password container
	// if there is an error display the error, otherwise display the generated password
	useEffect(() => {
		if (errorMsg) {
			setText(errorMsg);
		} else {
			setText(password);
		}
	}, [errorMsg, password]);
	//

	// handler functions
	// used for generating the password
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

	// used for handling copying the password
	const copyPassword = () => {
		if (!errorMsg && !waitTimer) {
			navigator.clipboard.writeText(password);

			// display feedback that the password has been copied
			setWasPasswordCopied(true);
			setText("Password copied");

			// reset the display to the generated password after 600ms
			setWaitTimer(
				setTimeout(() => {
					setText(password);
					setWaitTimer(undefined);
					setWasPasswordCopied(false);
				}, 600) as any
			);
		}
	};
	//

	return (
		<div className={styles.container}>
			<p className={styles.title}>Password generator</p>

			{/* main content of the page starts */}
			<div className={styles.wrapper}>
				{/* generated password display starts */}
				<div
					onClick={copyPassword}
					className={`
								${styles.wrapper__generatedPassword}
								${errorMsg && styles.wrapper__generatedPassword__error}
								${wasPasswordCopied && styles.wrapper__generatedPassword__copied}
							`}>
					<p>{text}</p>
				</div>
				{/* generated password display ends */}

				{/* generation settings starts */}
				<div className={styles.wrapper__settings}>
					{/* slider for the password length starts */}
					<div className={styles.wrapper__settings__sliderContainer}>
						<p>
							Length: <span>{passwordLength}</span>
						</p>
						<Slider
							defaultValue={passwordLength}
							onChange={(value: number) => setPasswordLength(value)}
							onAfterChange={generatePassword}
						/>
					</div>
					{/* slider for the password length ends */}

					{/* toggles for the additional settings start */}
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
					{/* toggles for the additional settings end */}
				</div>
				{/* generation settings ends */}

				<Button text="Generate" color="primary" flex onClick={generatePassword} />
			</div>
			{/* main content of the page ends */}
		</div>
	);
}
