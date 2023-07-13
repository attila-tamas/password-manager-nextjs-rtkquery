import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// create a dummy storage on the server-side and a wrapper for local storage on the client-side
// to avoid "redux-persist failed to create sync storage. falling back to noop storage." log, which occurs on the server side
const createNoopStorage = () => {
	return {
		getItem(_key: any) {
			return Promise.resolve(null);
		},
		setItem(_key: any, value: any) {
			return Promise.resolve(value);
		},
		removeItem(_key: any) {
			return Promise.resolve();
		},
	};
};

const storage =
	typeof window !== "undefined"
		? createWebStorage("local")
		: createNoopStorage();

export default storage;
