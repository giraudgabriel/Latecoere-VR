class User {
  constructor(username, name, password, isAdmin = false) {
    this.username = username;
    this.name = name;
    this.password = password;
    this.isAdmin = isAdmin;
  }
}

export default User;
