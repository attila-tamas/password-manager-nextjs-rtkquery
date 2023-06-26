import styles from "./spinner.module.scss";
// all spinners can be viewed here: https://github.com/dephraiim/react-svg-spinners
import { Tadpole } from "react-svg-spinners";

export default function Spinner({
	size = 24,
	color = "var(--color-primary)",
	fullScreen,
}: {
	size?: number;
	color?: string;
	fullScreen?: boolean;
}) {
	return (
		<span className={`${fullScreen && styles["fullscreen"]}`}>
			<Tadpole width={size} height={size} color={color} />
		</span>
	);
}
