import axios from "axios";

export function clearAuthSession() {
	localStorage.removeItem("token");
	delete axios.defaults.headers.common.Authorization;
	delete axios.defaults.headers.common.authorization;
}
