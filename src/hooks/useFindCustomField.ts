import { EntryType } from "@components/entry/entry.component";
import useCopyToClipboard from "./useCopyToClipboard";

export default function useFindCustomField(
	entry: EntryType,
	keywords: string[]
) {
	const [copy, { success }] = useCopyToClipboard();

	const customField = entry?.customFields.find(
		(field: { key: string; value: string }) => {
			const fieldInLowerCase = field.key.toLowerCase();

			let foundField;
			keywords.forEach(keyword => {
				if (fieldInLowerCase.includes(keyword)) {
					return (foundField = fieldInLowerCase);
				}
			});

			if (foundField) return foundField;
		}
	);

	const props = {
		value: customField?.value,
		copy: () => {
			if (customField) copy(customField.value);
		},
		copySuccess: success,
	};

	return props;
}
