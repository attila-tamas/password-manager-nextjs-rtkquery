import styles from "./home.module.scss";

import Image from "next/image";
import Link from "next/link";

import Button from "@components/button-component/button";
import Logo from "@components/logo-component/logo";

import heroGraphic from "@public/home-page-hero-graphic.svg";

export default function Home() {
	return (
		<main className={styles.container}>
			<div className={styles.nav}>
				<Logo />

				<div className={styles.nav__buttonGroup}>
					<Link href="/login">
						<Button text="Sign in" color="primary" noBackdrop />
					</Link>

					<Link href="/register">
						<Button text="Create account" color="primary" />
					</Link>
				</div>
			</div>

			<div className={styles.hero}>
				<div className={styles.hero__textContainer}>
					<p className={styles.hero__textContainer__title}>
						Your password is the key to your digital life
					</p>

					<p className={styles.hero__textContainer__description}>
						Generate strong passwords with a click of a button. While&nbsp;managing them
						with an easy-to-use interface.
					</p>

					<div className={styles.hero__textContainer__buttonGroup}>
						<Link href="/register">
							<Button text="Try it now for free" color="primary" grow />
						</Link>

						<p className={styles.hero__textContainer__buttonGroup__smallText}>
							I have an account.
							<Link href="/login" className="link">
								{" "}
								Sign in
							</Link>
						</p>
					</div>
				</div>

				<Image
					className={`unselectable ${styles.hero__image}`}
					src={heroGraphic}
					alt="Mobile and desktop device showing keystone vault"
				/>
			</div>
		</main>
	);
}
