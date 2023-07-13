import useLiveValidation from "@hooks/useLiveValidation";
import useToggle from "@hooks/useToggle";
import styles from "./changePassword.module.scss";
// react
import { FormEvent, useRef } from "react";
// next
import Image from "next/image";
import { useRouter } from "next/router";
// npm
import { enqueueSnackbar } from "notistack";
// @hooks
import {
	useDispatchLogout,
	useEffectOnMount,
	useEffectOnUpdate,
	useFormInput,
	useMutation,
	useShowPasswordIcon,
	useSuccess,
} from "@hooks/index";
// @redux
import { useSendLogoutMutation } from "@redux/auth/authApiSlice";
import { useChangePasswordMutation } from "@redux/user/userApiSlice";
import { useValidateRegistrationPasswordMutation } from "@redux/validation/validationApiSlice";
// @public
import changePasswordGraphic from "@public/changePasswordGraphic.svg";
// @components
import { Button, Error, Icon, Input, Logo } from "@components/index";
// @util
import { pixelToEm, pixelToRem, routes } from "@util/index";

export default function ChangePassword() {
	const router = useRouter();

	// password
	const password = useFormInput("");

	const showPassword = useToggle(false);
	const showPasswordIcon = useShowPasswordIcon(showPassword.value);

	const passwordInputRef = useRef<HTMLInputElement>(null);
	useEffectOnMount(() => passwordInputRef.current?.focus());

	const passwordValidation = useLiveValidation(
		password.value,
		useValidateRegistrationPasswordMutation()
	);

	const changePasswordMutation = useMutation(useChangePasswordMutation());
	//

	// form submit
	const logoutMutation = useMutation(useSendLogoutMutation());
	const dispatchLogout = useDispatchLogout();

	async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
		event?.preventDefault(); // prevent page reload

		if (!router.query.params) return;

		await changePasswordMutation.trigger({
			email: router.query.params[0],
			otp: router.query.params[1],
			password: password.value,
		});
	}

	useEffectOnUpdate(() => {
		router.replace(routes.requestPasswordChange);
		enqueueSnackbar("Invalid data. Try again.", {
			variant: "error",
		});
	}, [changePasswordMutation.isError]);

	// log out the user if they are currently logged in
	// to force them to login again with the new password
	useSuccess(() => {
		async () => await logoutMutation.trigger();
		dispatchLogout({ persist: false });
		router.replace(routes.login);
		enqueueSnackbar("New password set", { variant: "success" });
	}, changePasswordMutation);
	//

	return (
		<div className={styles["change-password-module"]}>
			<Logo size={pixelToRem(20)} />

			<Image
				className="unselectable"
				src={changePasswordGraphic}
				alt="Verify email graphic"
			/>

			<form className={styles["form"]} onSubmit={onSubmit}>
				<div className={styles["form__field"]}>
					<label
						className={styles["form__field__label"]}
						htmlFor="password"
					>
						New password
					</label>

					<Input
						className={styles["form__field__input"]}
						id="password"
						type="password"
						value={password.value}
						onChange={password.onChange}
						showPassword={showPassword.value}
						validation={passwordValidation}
						autocomplete="new-password"
					>
						<Icon
							icon={showPasswordIcon}
							size={pixelToEm(24)}
							className="interactable"
							onClick={showPassword.toggleValue}
						/>
					</Input>

					<Error message={passwordValidation.errorMsg} />
				</div>

				<Button
					text="Set new password"
					type="submit"
					color="primary"
					flex
					disabled={!passwordValidation.isSuccess}
					loading={changePasswordMutation.isLoading}
				/>
			</form>
		</div>
	);
}
