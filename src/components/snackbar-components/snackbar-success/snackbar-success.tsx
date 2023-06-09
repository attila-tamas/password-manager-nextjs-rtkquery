// styles
import styles from "./snackbar-success.module.scss";
// react
import { forwardRef } from "react";
// npm
import { CustomContentProps, SnackbarContent } from "notistack";
// @components
import SnackbarSuccessIcon from "@components/icon-components/snackbar-success-icon";

interface SuccessProps extends CustomContentProps {
	allowDownload?: boolean;
}

const SuccessSnackbar = forwardRef<HTMLDivElement, SuccessProps>(({ id, ...props }, ref) => {
	return (
		<SnackbarContent ref={ref} className={styles.container}>
			<>
				<span className={styles.icon}>
					<SnackbarSuccessIcon size="18" />
				</span>

				{props.message}
			</>
		</SnackbarContent>
	);
});

SuccessSnackbar.displayName = "SuccessSnackbar";

export default SuccessSnackbar;
