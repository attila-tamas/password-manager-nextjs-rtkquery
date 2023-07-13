// styles
import styles from "./snackbar.module.scss";
// react
import { forwardRef } from "react";
// npm
import { CustomContentProps, SnackbarContent } from "notistack";
// @components
import { Icon, icons } from "@components/index";
// @util
import { pixelToEm } from "@util/index";

interface ErrorProps extends CustomContentProps {
	allowDownload?: boolean;
}

const ErrorSnackbar = forwardRef<HTMLDivElement, ErrorProps>(
	({ id, ...props }, ref) => {
		return (
			<SnackbarContent
				ref={ref}
				className={`${styles["snackbar"]} ${styles["snackbar--error"]}`}
			>
				<Icon icon={icons.crossWithBg} size={pixelToEm(24)} />
				{props.message}
			</SnackbarContent>
		);
	}
);

ErrorSnackbar.displayName = "ErrorSnackbar";

export default ErrorSnackbar;
