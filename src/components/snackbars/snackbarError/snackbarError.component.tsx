// styles
import styles from "./snackbarError.module.scss";
// react
import { forwardRef } from "react";
// npm
import { CustomContentProps, SnackbarContent } from "notistack";
// @components
import SnackbarErrorIcon from "@components/icons/snackbarError.icon";

interface ErrorProps extends CustomContentProps {
	allowDownload?: boolean;
}

const ErrorSnackbar = forwardRef<HTMLDivElement, ErrorProps>(({ id, ...props }, ref) => {
	return (
		<SnackbarContent ref={ref} className={styles.container}>
			<>
				<span className={styles.icon}>
					<SnackbarErrorIcon size="18" />
				</span>

				{props.message}
			</>
		</SnackbarContent>
	);
});

ErrorSnackbar.displayName = "ErrorSnackbar";

export default ErrorSnackbar;
