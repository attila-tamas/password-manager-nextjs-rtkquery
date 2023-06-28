import styles from "./button.module.scss";
// react
import { MouseEventHandler, ReactNode } from "react";
// @components
import Spinner from "@components/spinner/spinner.component";

type Props = {
	type?: "button" | "submit" | "reset";
	text?: string | number;
	disabled?: boolean;
	background?: boolean;
	color?: string;
	flex?: boolean;
	grow?: boolean;
	className?: string;
	children?: ReactNode;
	loading?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function Button({
	type = "button",
	text = "text",
	disabled = false,
	background = true,
	color = "primary",
	flex = false,
	grow = false,
	className,
	children,
	loading,
	onClick,
}: Props) {
	function buttonColor(): string {
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
	}

	function buttonClasses(): string {
		let classes = `${styles["button"]} ${buttonColor()} ${className}`;

		if (background) classes += ` ${styles["button--background"]}`;
		else classes += ` ${styles["button--no-background"]}`;

		if (flex) classes += ` ${styles["button--flex"]}`;
		if (grow) classes += ` ${styles["button--grow"]}`;

		return classes;
	}

	function buttonContent(): JSX.Element {
		if (loading) return <Spinner size={24} color="currentColor" />;
		return (
			<>
				{children}
				{text}
			</>
		);
	}

	return (
		<button
			type={type}
			disabled={disabled}
			className={buttonClasses()}
			onClick={onClick}
		>
			{buttonContent()}
		</button>
	);
}
