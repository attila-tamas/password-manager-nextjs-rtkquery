// styles
import styles from "./register.module.scss";
// react
import { useEffect, useRef, useState } from "react";
// next.js
import Link from "next/link";
import router from "next/router";
// npm
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
// @redux
// api hooks
import { useRegisterMutation } from "@redux/auth/authApiSlice";
// actions
import { setCurrentEmail } from "@redux/user/userSlice";
//
// @util
import routes from "@util/routes";
// @components
import Button from "@components/button-component/button";
import Checkbox from "@components/checkbox-component/checkbox";
import Input from "@components/input-component/input";
import Logo from "@components/logo-component/logo";

// page module for "/register" route
export default function Register() {
	const dispatch = useDispatch();

	// refs
	const emailRef = useRef<HTMLDivElement>(null);
	const errorRef = useRef<HTMLDivElement>(null);
	//

	// states
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPwd, setShowPwd] = useState(false);
	//

	// api hook
	const [register, { isLoading, isSuccess }] = useRegisterMutation();

	// useEffect hooks
	// focus the email input on page load
	useEffect(() => {
		emailRef.current?.focus();
	}, []);

	// handler functions
	// input handlers
	const handleEmailInput = (e: any) => setEmail(e.target.value);
	const handlePwdInput = (e: any) => setPassword(e.target.value);

	const handleShowPwdToggle = () => setShowPwd((prev: boolean) => !prev);

	// form submit handler
	const handleSubmit = async (e: any) => {
		e.preventDefault(); // prevent page reload

		try {
			await register({ email, password }).unwrap();

			dispatch(setCurrentEmail({ email }));

			router.replace(routes.verifyEmail);
		} catch (error: any) {
			enqueueSnackbar(error.data?.message, { variant: "error" });
			errorRef.current?.focus();
		}
	};
	//

	return (
		<div className={styles.container}>
			<Logo size="130" />

			<p className={styles.title}>Create account</p>

			{/* register form starts */}
			<form onSubmit={handleSubmit} className={styles.form}>
				{/* email field starts */}
				<div className={styles.form__field}>
					<label htmlFor="email">Email</label>

					<Input
						type="text"
						id="email"
						reference={emailRef}
						value={email}
						onChange={handleEmailInput}
					/>
				</div>
				{/* email field ends */}

				{/* password field starts */}
				<div className={styles.form__field}>
					<label htmlFor="password">Password</label>

					<Input
						type="password"
						id="password"
						show={showPwd}
						value={password}
						onChange={handlePwdInput}
					/>

					<Checkbox
						label="Show Password"
						checked={showPwd}
						onChange={handleShowPwdToggle}
					/>
				</div>
				{/* password field ends */}

				{/* button group starts */}
				<div className={styles.form__buttonGroup}>
					<Button
						text={isLoading ? "Creating account..." : "Create account"}
						color="primary"
						type="submit"
						flex
					/>

					<p>
						I have an account.
						<Link href="/login" className="link">
							{" "}
							Sign in
						</Link>
					</p>
				</div>
				{/* button group ends */}
			</form>
			{/* register form ends */}
		</div>
	);
}
