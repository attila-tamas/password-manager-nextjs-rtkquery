// styles
import styles from "./confirm-modal.module.scss";
// @components
import Button from "@components/button-component/button";

export default function ConfirmModal({ title, desc, confirmText, show, onClick }: any) {
	return (
		<div className={styles.container}>
			<p className={styles.title}>{title}</p>
			<p className={styles.desc}>{desc}</p>

			<div className={styles.buttonGroup}>
				<span onClick={() => show(false)}>
					<Button text="Cancel" noBackdrop flex />
				</span>

				<div className={styles.buttonGroup__separator}>&nbsp;</div>

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
