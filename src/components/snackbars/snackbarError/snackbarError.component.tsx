// styles
import styles from "./snackbarError.module.scss";
// react
import { forwardRef } from "react";
// npm
import { CustomContentProps, SnackbarContent } from "notistack";
// @components
import Icon, { icons } from "@components/icon/icon";
// @util
import pixelToRem from "@util/pixelToRem";

interface ErrorProps extends CustomContentProps {
	allowDownload?: boolean;
}

const ErrorSnackbar = forwardRef<HTMLDivElement, ErrorProps>(({ id, ...props }, ref) => {
	return (
		<SnackbarContent ref={ref} className={styles.container}>
			<>
				<span className={styles.icon}>
					<Icon icon={icons.crossWithBg} size={pixelToRem(18)} />
				</span>

				{props.message}
			</>
		</SnackbarContent>
	);
});

ErrorSnackbar.displayName = "ErrorSnackbar";

export default ErrorSnackbar;
