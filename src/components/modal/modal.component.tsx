import styles from "./modal.module.scss";
// react
import { ReactNode } from "react";
// npm
import ReactModal from "react-modal";

ReactModal.setAppElement("#__next");

// prettier-ignore
export type ModalType = {
	isOpen: boolean;
	onRequestClose?: () => void;
	onAfterClose?: () => void;
	contentLabel?: string;
	parentContainer?: string;
	children?: ReactNode;
};

export default function Modal({
	isOpen,
	onRequestClose,
	onAfterClose,
	contentLabel,
	parentContainer,
	children,
}: ModalType) {
	function setParent(): HTMLElement {
		if (parentContainer) {
			const parent = document.getElementById(parentContainer);
			if (parent) return parent;
		}
		return document.body;
	}

	return (
		<ReactModal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			onAfterClose={onAfterClose}
			contentLabel={contentLabel}
			className={styles["overlay__modal"]}
			overlayClassName={styles["overlay"]}
			portalClassName={styles["portal"]}
			parentSelector={setParent}
		>
			{children}
		</ReactModal>
	);
}
