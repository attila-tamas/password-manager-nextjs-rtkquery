// react
import { ReactNode } from "react";
// next
import { useRouter } from "next/router";
// @hooks
import {
	useEffectOnMount,
	useEffectOnUpdate,
	useLazyQuery,
} from "@hooks/index";
// @redux
import { useLazyGetCurrentUserQuery } from "@redux/auth/authApiSlice";
import { selectIsActive } from "@redux/auth/authSlice";
// @util
import { checkIfCookieExists, protectedRoutes, routes } from "@util/index";
import { useSelector } from "react-redux";

const allowedPaths = [
	...Object.values(protectedRoutes),
	routes.requestPasswordChange,
];

export default function RouteGuard({ children }: { children: ReactNode }) {
	const router = useRouter();

	// the isActive state is required because the currentUser does not update correctly
	const isActive = useSelector(selectIsActive);

	const isLoggedIn = checkIfCookieExists("isLoggedIn");

	const getCurrentUserQuery = useLazyQuery(useLazyGetCurrentUserQuery());

	useEffectOnMount(() => {
		async function getCurrentUser(): Promise<void> {
			await getCurrentUserQuery.trigger();
		}

		if ([...Object.values(protectedRoutes)].includes(router.asPath)) {
			getCurrentUser();
		}
	});

	const currentUser = getCurrentUserQuery.data;

	useEffectOnUpdate(() => {
		if (currentUser) {
			if (
				!currentUser.active &&
				!isActive &&
				router.asPath !== routes.verifyEmail
			) {
				router.replace(routes.verifyEmail);
			} else if (
				currentUser.active &&
				router.asPath === routes.verifyEmail
			) {
				router.replace(routes.vault);
			}
		}
	}, [currentUser]);

	if (isLoggedIn && !allowedPaths.includes(router.asPath)) {
		if (router.asPath !== routes.vault) router.replace(routes.vault);
	}

	return <>{children}</>;
}
