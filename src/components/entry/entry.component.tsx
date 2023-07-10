import styles from "./entry.module.scss";
// react
import { MouseEventHandler } from "react";
// npm
import { EntityId } from "@reduxjs/toolkit";
// @hooks
import { useCopyToClipboard, useFindCustomField } from "@hooks/index";
// @components
import { Icon, icons, WebsiteIcon } from "@components/index";
// @util
import { pixelToEm } from "@util/index";

export type EntryType = {
	id: EntityId;
	password: string;
	title: string;
	customFields: { key: string; value: string }[];
};

export default function Entry({
	entry,
	active,
	onClick,
}: {
	entry: EntryType;
	active?: boolean;
	onClick?: MouseEventHandler<SVGSVGElement>;
}) {
	const email = useFindCustomField(entry, ["email", "mail"]);
	const username = useFindCustomField(entry, ["username", "user", "name"]);

	const [copyPassword, { success: copyPasswordSuccess }] =
		useCopyToClipboard();

	return (
		<div
			className={`
				${styles["entry"]}
				${active && styles["entry--active"]}
			`}
		>
			<div className={styles["entry__content"]}>
				<WebsiteIcon entry={entry} />

				<div className={styles["entry__content__text"]}>
					<p
						className={`
							${styles["entry__content__text__title"]}
							${styles["truncate"]}
						`}
					>
						{entry.title}
					</p>

					{username.value && (
						<div
							className={
								styles["entry__content__text__credential"]
							}
						>
							<Icon icon={icons.account} size={pixelToEm(18)} />

							<span className={styles["truncate"]}>
								{username.value}
							</span>

							<Icon
								icon={
									username.copySuccess
										? icons.tick
										: icons.copy
								}
								size={pixelToEm(24)}
								className="interactable"
								onClick={username.copy}
							/>
						</div>
					)}

					{email.value && (
						<div
							className={
								styles["entry__content__text__credential"]
							}
						>
							<Icon icon={icons.mail} size={pixelToEm(18)} />

							<span className={styles["truncate"]}>
								{email.value}
							</span>

							<Icon
								icon={
									email.copySuccess ? icons.tick : icons.copy
								}
								size={pixelToEm(24)}
								className="interactable"
								onClick={email.copy}
							/>
						</div>
					)}

					<div
						className={`interactable ${styles["entry__content__text__copy"]}`}
						onClick={() => copyPassword(entry.password)}
					>
						{copyPasswordSuccess ? (
							<>
								<Icon icon={icons.tick} size={pixelToEm(24)} />
								<span>Password copied</span>
							</>
						) : (
							<span>Copy password</span>
						)}
					</div>
				</div>
			</div>

			<Icon
				icon={icons.options}
				size={pixelToEm(24)}
				className={styles["entry__options"]}
				onClick={onClick}
			/>
		</div>
	);
}
