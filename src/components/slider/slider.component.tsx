// styles
import styles from "./slider.module.scss";
// npm
import ReactSlider from "react-slider";

type Props = {
	defaultValue: number;
	min?: number;
	max?: number;
	disabled?: boolean;
	className?: string;
	onChange?: (value: number, index: number) => void;
	onAfterChange?: (value: number, index: number) => void;
};

export default function Slider({
	defaultValue = 1,
	min = 1,
	max = 99,
	disabled = false,
	className,
	onChange,
	onAfterChange,
}: Props) {
	return (
		<ReactSlider
			onChange={onChange}
			onAfterChange={onAfterChange}
			min={min}
			max={max}
			defaultValue={defaultValue}
			disabled={disabled}
			className={`
				${styles["slider"]}
				${disabled && styles["slider--disabled"]}
				${className}
			`}
			trackClassName={styles["slider__track"]}
			thumbClassName={styles["slider__thumb"]}
		/>
	);
}
