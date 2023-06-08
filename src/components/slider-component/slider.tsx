// styles
import styles from "./slider.module.scss";
// npm
import ReactSlider from "react-slider";

export default function Slider({ defaultValue, onChange, onAfterChange }: any) {
	return (
		<ReactSlider
			onChange={onChange}
			onAfterChange={onAfterChange}
			min={8}
			max={32}
			defaultValue={defaultValue}
			className={styles.slider}
			trackClassName={styles.slider__track}
			thumbClassName={styles.slider__thumb}
		/>
	);
}
