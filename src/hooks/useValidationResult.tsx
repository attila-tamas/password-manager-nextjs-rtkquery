// @hooks
import { Validation } from "@hooks/useLiveValidation";
// @components
import Icon, { icons } from "@components/icon/icon";
import Spinner from "@components/spinner/spinner.component";
// @util
import { pixelToEm } from "@util/pixelConverter";

export default function useValidationResult(validation: Validation) {
	if (validation.isLoading) {
		return <Spinner size={24} />;
	} else if (validation.isError) {
		return (
			<Icon
				icon={icons.cross}
				size={pixelToEm(24)}
				color="var(--color-error)"
			/>
		);
	} else if (validation.isSuccess) {
		return (
			<Icon
				icon={icons.tick}
				size={pixelToEm(24)}
				color="var(--color-primary)"
			/>
		);
	}
	return;
}
