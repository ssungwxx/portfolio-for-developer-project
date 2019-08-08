class User {
    constructor(
        user_pw,
        user_salt,
        user_name,
        user_grade,
        user_gitId,
        user_gitAdd,
        user_gitToken,
        user_email,
        user_aboutMe,
        user_profile
    ) {
        this.user_pw = user_pw;
        this.user_salt = user_salt;
        this.user_name = user_name;
        this.user_grade = user_grade;
        this.user_gitId = user_gitId;
        this.user_gitAdd = user_gitAdd;
        this.user_gitToken = user_gitToken;
        this.user_email = user_email;
        this.user_aboutMe = user_aboutMe;
        this.user_profile = user_profile;
    }
}
