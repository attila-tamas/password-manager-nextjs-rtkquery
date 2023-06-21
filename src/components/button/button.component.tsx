import styles from "./button.module.scss";
// react
import { MouseEventHandler } from "react";

export default function Button({
	type = "button",
	text = "text",
	disabled = false,
	background = true,
	color = "primary",
	flex = false,
	grow = false,
	className = undefined,
	onClick,
}: {
	type?: "button" | "submit" | "reset" | undefined;
	text?: string | number;
	disabled?: boolean;
	background?: boolean;
	color?: string;
	flex?: boolean;
	grow?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	className?: string;
}) {
	const buttonColor = (): string => {
		switch (color) {
			case "primary":
				if (background) return styles["button--background--primary"];
				return styles["button--no-background--primary"];

			case "danger":
				if (background) return styles["button--background--danger"];
				return styles["button--no-background--danger"];

			default:
				if (background) return styles["button--background--default"];
				return styles["button--no-background--default"];
		}
	};

	const buttonClasses = (): string => {
		let classes = `${styles["button"]} ${buttonColor()} ${className}`;

		if (background) classes += ` ${styles["button--background"]}`;
		else classes += ` ${styles["button--no-background"]}`;

		if (flex) classes += ` ${styles["button--flex"]}`;
		if (grow) classes += ` ${styles["button--grow"]}`;

		return classes;
	};

	return (
		<button type={type} disabled={disabled} className={buttonClasses()} onClick={onClick}>
			{text}
		</button>
	);
}
