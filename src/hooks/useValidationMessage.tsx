import { Validation } from "@hooks/useLiveValidation";

export default function useValidationMessage(validation: Validation) {
	if (validation.isError)
		return (
			<span className="error" role="alert">
				{validation.errorMsg}
			</span>
		);
	return;
}
