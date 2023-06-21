// all spinners can be viewed here: https://github.com/dephraiim/react-svg-spinners
import { Tadpole } from "react-svg-spinners";

export default function SpinnerIcon({ size, color, fullScreen }: any) {
	const spinner = (
		<div
			style={
				fullScreen && {
					width: "100%",
					height: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}
			}>
			<Tadpole width={size || "28"} height={size || "28"} color={color || "#5AC97A"} />
		</div>
	);

	return spinner;
}
