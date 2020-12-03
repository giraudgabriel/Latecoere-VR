class User {
  constructor(username, name, password, admin = false) {
    this.username = username;
    this.name = name;
    this.password = password;
    this.admin = admin;
  }
}

export default User;
