// styles
import styles from "./snackbarSuccess.module.scss";
// react
import { forwardRef } from "react";
// npm
import { CustomContentProps, SnackbarContent } from "notistack";
// @components
import Icon, { icons } from "@components/icon/icon";
// @util
import { pixelToEm } from "@util/pixelConverter";

interface SuccessProps extends CustomContentProps {
	allowDownload?: boolean;
}

const SuccessSnackbar = forwardRef<HTMLDivElement, SuccessProps>(({ id, ...props }, ref) => {
	return (
		<SnackbarContent ref={ref} className={styles.container}>
			<>
				<span className={styles.icon}>
					<Icon icon={icons.crossWithBg} size={pixelToEm(24)} />
				</span>

				{props.message}
			</>
		</SnackbarContent>
	);
});

SuccessSnackbar.displayName = "SuccessSnackbar";

export default SuccessSnackbar;
