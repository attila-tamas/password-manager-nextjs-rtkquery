import React from "react";
import styles from "./home.module.scss";
import Image from "next/image";
import heroGraphic from "@/../public/home-page-hero-graphic.svg";
import Logo from "@/components/logo-component/logo";
import Button from "@/components/button-component/button";

export default function Home() {
	return (
		<main className={styles.container}>
			<div className={styles.container__nav}>
				<Logo />

				<div className={styles.container__nav__buttonGroup}>
					<Button text="Sign in" color="success" noBackdrop />
					<Button text="Create account" color="success" />
				</div>
			</div>

			<div className={styles.container__hero}>
				<div className={styles.container__hero__text}>
					<p className={styles.container__hero__text__title}>
						Your password is the key to your digital life
					</p>

					<p className={styles.container__hero__text__description}>
						Generate strong passwords with a click of a button. While&nbsp;managing them
						with an easy-to-use interface.
					</p>

					<div className={styles.container__hero__text__buttonGroup}>
						<Button text="Try it now for free" color="success" />
						<p className={styles.container__hero__text__buttonGroup__small}>
							I have an account. <span className="link">Sign in</span>
						</p>
					</div>
				</div>

				<Image
					className={`unselectable ${styles.container__hero__image}`}
					src={heroGraphic}
					alt="Mobile and desktop device showing keystone vault"
					priority
				/>
			</div>
		</main>
	);
}
