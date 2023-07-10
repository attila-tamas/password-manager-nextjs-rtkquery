import styles from "./toggle.module.scss";
// react
import { ChangeEvent } from "react";

type Props = {
	label: string;
	flex?: boolean;
	checked: boolean;
	className?: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function Toggle({
	label,
	flex,
	checked,
	className,
	onChange,
}: Props) {
	return (
		<label
			className={`
				${styles["wrapper"]}
				${flex && styles["wrapper--flex"]}
				${className}
			`}
		>
			<input
				type="checkbox"
				className={styles["input"]}
				checked={checked}
				onChange={onChange}
			/>
			<span className={styles["toggle"]} />
			<p>{label}</p>
		</label>
	);
}
