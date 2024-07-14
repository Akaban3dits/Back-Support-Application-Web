export class LoginRequestDTO {
    constructor({ email, password }) {
        this.email = email;
        this.password = password;
    }
}

export class LoginResponseDTO {
    constructor({ token }) {
        this.token = token;
    }
}
