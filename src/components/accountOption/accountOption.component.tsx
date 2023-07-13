import styles from "./accountOption.module.scss";
// react
import { useRef } from "react";
// @hooks
import { useClickOutside, useToggle } from "@hooks/index";
// @components
import { Button } from "@components/index";

type Props = {
	text?: string;
	danger?: boolean;
	onConfirm?: () => void;
	onClick?: () => void;
};

export default function AccountOption({
	text = "Option",
	danger,
	onConfirm,
	onClick,
}: Props) {
	const showConfirmButton = useToggle(false);
	const ref = useRef<HTMLDivElement>(null);

	function onOptionClicked(): void {
		if (onClick) onClick();
		else if (danger) showConfirmButton.toggleValue();
	}

	function showButton(): false | JSX.Element {
		return (
			showConfirmButton.value && (
				<Button
					text="Confirm"
					color="danger"
					size="small"
					className={styles["option__confirm-button"]}
					onClick={onConfirm}
				/>
			)
		);
	}

	useClickOutside(ref, () => {
		if (showConfirmButton.value) showConfirmButton.toggleValue();
	});

	return (
		<div
			className={`
				${styles["option"]}
				${danger && styles["option--danger"]}
			`}
			ref={ref}
			onClick={onOptionClicked}
		>
			<span>{text}</span>
			{showButton()}
		</div>
	);
}
