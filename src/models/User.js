class User {

    #id;
    #name;
    #email;
    #password;

    constructor(name, email, password, id = null) {
        this.#id = id;
        this.#name = name;
        this.#email = email;
        this.#password = password;
    }

    // Getters
    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get email() {
        return this.#email;
    }

    get password() {
        return this.#password;
    }

    // Setters
    set name(newName) {
        this.#name = newName;
    }

    set email(newEmail) {
        this.#email = newEmail;
    }

    set password(newPassword) {
        this.#password = newPassword;
    }
}

export default User;