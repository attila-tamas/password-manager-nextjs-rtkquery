const routes = {
	// public routes - do not require an access token
	home: "/",
	login: "/login",
	register: "/register",
	verifyEmail: "/verify-email",

	// protected routes - require an access token
	vault: "/vault",
	generate: "/generate",
	account: "/account",
};

export default routes;
