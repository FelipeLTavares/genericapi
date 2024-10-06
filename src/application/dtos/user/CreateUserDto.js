class CreateUserDto {
    name;
    email;
    nickname;
    description;
    password;

    constructor(user) {
        this.name = user.name;
        this.email = user.email;
        this.nickname = user.nickname;
        this.description = user.description;
        this.password = user.password;
    }
}

module.exports = CreateUserDto;