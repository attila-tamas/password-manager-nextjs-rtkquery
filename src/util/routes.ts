export const publicRoutes = {
	home: "/",
	login: "/login",
	register: "/register",
	verifyEmail: "/verify-email",
};

export const protectedRoutes = {
	vault: "/vault",
	generate: "/generate",
	account: "/account",
};

const routes = {
	...publicRoutes,
	...protectedRoutes,
};

export default routes;
