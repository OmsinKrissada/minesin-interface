

class Auth {
	token: string | undefined;
	setToken(variable: string) {
		this.token = variable;
	}
}

export default new Auth();