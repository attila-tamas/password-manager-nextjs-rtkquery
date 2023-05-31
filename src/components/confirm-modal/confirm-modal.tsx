import styles from "./confirm-modal.module.scss";

import Button from "@components/button-component/button";

export default function ConfirmModal({ title, desc, confirmText, show, onClick }: any) {
	return (
		<div className={styles.container}>
			<p className={styles.container__title}>{title}</p>
			<p className={styles.container__desc}>{desc}</p>

			<div className={styles.container__buttonGroup}>
				<span onClick={() => show(false)}>
					<Button text="Cancel" noBackdrop flex />
				</span>

				<div className={styles.container__buttonGroup__separator}>&nbsp;</div>

				<span>
					<Button
						onClick={onClick}
						text={confirmText}
						color="danger"
						noBackdrop
						flex
						type="submit"
					/>
				</span>
			</div>
		</div>
	);
}
