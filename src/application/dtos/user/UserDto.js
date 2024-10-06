class UserDto {
    id;
    name;
    email;
    nickname;
    description;

    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.nickname = user.nickname;
        this.description = user.description;
    }
}

module.exports = UserDto;