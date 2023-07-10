import styles from "./customField.module.scss";
// react
import { useRef } from "react";
// @hooks
import { useClickOutside, useCopyToClipboard, useToggle } from "@hooks/index";
// @components
import { Icon, icons, Input } from "@components/index";
// @util
import { pixelToEm } from "@util/index";

export type CustomFieldType = {
	key: string;
	value: string;
};

export default function CustomField({
	field,
	index,
	onInputChange,
	onRemoveCustomFieldClicked,
}: {
	field: CustomFieldType;
	index: number;
	onInputChange: (index: number, event: any) => void;
	onRemoveCustomFieldClicked: (index: number) => void;
}) {
	const [copyToClipBoard, { success: copySuccess }] = useCopyToClipboard();

	const isLabelEditable = useToggle(false);
	const ref = useRef<HTMLDivElement>(null);

	useClickOutside(ref, () => {
		if (isLabelEditable.value) isLabelEditable.toggleValue();
	});

	return (
		<div className={styles["custom-field"]}>
			<div className={styles["custom-field__title"]} ref={ref}>
				<Icon
					icon={icons.edit}
					size={pixelToEm(24)}
					className="interactable"
					onClick={() => isLabelEditable.toggleValue()}
				/>

				{isLabelEditable.value ? (
					<Input
						type="text"
						name="key"
						value={field.key}
						onChange={(event: any) => onInputChange(index, event)}
					/>
				) : (
					<label htmlFor={index.toString()}>{field.key}</label>
				)}
			</div>

			<Input
				type="text"
				name="value"
				value={field.value}
				id={index.toString()}
				onChange={(event: any) => onInputChange(index, event)}
				className={styles["custom-field__input"]}
			>
				<Icon
					icon={copySuccess ? icons.tick : icons.copy}
					size={pixelToEm(24)}
					className="interactable"
					onClick={() => copyToClipBoard(field.value)}
				/>

				<Icon
					icon={icons.trash}
					size={pixelToEm(24)}
					color="var(--color-error)"
					className="interactable"
					onClick={() => onRemoveCustomFieldClicked(index)}
				/>
			</Input>
		</div>
	);
}
