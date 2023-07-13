import { pixelToEm } from "@util/pixelConverter";
import { Dispatch, SetStateAction } from "react";
import { CustomField, Icon, icons } from "..";
import styles from "./customFieldsList.module.scss";

export default function CustomFieldsList({
	customFields,
	setCustomFields,
}: {
	customFields: any[];
	setCustomFields: Dispatch<SetStateAction<any[]>>;
}) {
	const onInputChange = (index: number, event: any) => {
		const data = [...customFields];
		data[index][event.target.name] = event.target.value;
		setCustomFields(data);
	};

	function onAddNewCustomFieldClicked(): void {
		const newfield = { key: "New field", value: "" };
		setCustomFields([...customFields, newfield]);
	}

	function onRemoveCustomFieldClicked(index: number): void {
		const data = [...customFields];
		data.splice(index, 1);
		setCustomFields(data);
	}

	return (
		<>
			{customFields.map((field: any, index: number) => {
				return (
					<CustomField
						key={index}
						field={field}
						index={index}
						onInputChange={onInputChange}
						onRemoveCustomFieldClicked={onRemoveCustomFieldClicked}
					/>
				);
			})}

			<div
				className={`interactable ${styles["add-new-field"]}`}
				onClick={onAddNewCustomFieldClicked}
			>
				<Icon icon={icons.add} size={pixelToEm(24)} />
				<span>Add new field</span>
			</div>
		</>
	);
}
