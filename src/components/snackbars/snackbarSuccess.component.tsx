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

interface SuccessProps extends CustomContentProps {
	allowDownload?: boolean;
}

const SuccessSnackbar = forwardRef<HTMLDivElement, SuccessProps>(
	({ id, ...props }, ref) => {
		return (
			<SnackbarContent
				ref={ref}
				className={`${styles["snackbar"]} ${styles["snackbar--success"]}`}
			>
				<Icon icon={icons.tickWithBg} size={pixelToEm(24)} />
				{props.message}
			</SnackbarContent>
		);
	}
);

SuccessSnackbar.displayName = "SuccessSnackbar";

export default SuccessSnackbar;
