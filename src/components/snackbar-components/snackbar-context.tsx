// npm
import { SnackbarProvider } from "notistack";
// @components
import ErrorSnackbar from "./snackbar-error/snackbar-error";
import SuccessSnackbar from "./snackbar-success/snackbar-success";

// snackbar context provider
export default function SnackbarContext({ children }: any) {
	return (
		<SnackbarProvider
			autoHideDuration={3000} // hide after 3 seconds
			dense // denser margin between snackbars
			preventDuplicate // prevent the same snackbar from showing multiple times at once
			maxSnack={3} // maximum number of snackbars showing at once
			anchorOrigin={{
				// snackbar origin position
				vertical: "top",
				horizontal: "center",
			}}
			Components={{
				// snackbar variants
				success: SuccessSnackbar,
				error: ErrorSnackbar,
			}}>
			{/* render the child components */}
			{children}
		</SnackbarProvider>
	);
}
