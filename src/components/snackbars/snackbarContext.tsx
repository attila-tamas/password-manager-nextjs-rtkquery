// npm
import { SnackbarProvider } from "notistack";
// @components
import ErrorSnackbar from "./snackbarError.component";
import SuccessSnackbar from "./snackbarSuccess.component";

export default function SnackbarContext({ children }: any) {
	return (
		<SnackbarProvider
			autoHideDuration={3000} // 3 seconds
			dense
			preventDuplicate
			maxSnack={3}
			anchorOrigin={{
				vertical: "top",
				horizontal: "center",
			}}
			Components={{
				success: SuccessSnackbar,
				error: ErrorSnackbar,
			}}
		>
			{children}
		</SnackbarProvider>
	);
}
