class User {
  constructor(uid, username, sex, age, phone, email, pid) {
    this.uid = uid;
    this.username = username;
    this.age = age;
    this.sex = sex;
    this.phone = phone;
    this.email = email;
    this.pid = pid;
  }
}

class Member {
  constructor(name, sex, age, phone, email) {
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.phone = phone;
    this.email = email;
  }
}

export class Admin extends User {
  constructor(uid, username, sex, age, phone, email, pid) {
    super(uid, username, sex, age, phone, email, pid);
    this.password = "";
  }
}
export class Teacher extends User {
  constructor(uid, username, sex, age, phone, email, pid) {
    super(uid, username, sex, age, phone, email, pid);
  }
}

export class TeachMember extends Member {
  constructor(name, sex, age, phone, email, pid, level) {
    super(name, sex, age, phone, email);
    this.pid = pid;
    this.level = level;
  }
}

export class SectionMember extends Member {
  constructor(name, sex, age, phone, email, sid) {
    super(name, sex, age, phone, email);
    this.sid = sid;
  }
}
export class DeanMember extends Member {
  constructor(name, sex, age, phone, email) {
    super(name, sex, age, phone, email);
  }
}
// export class SectionThief extends Person {}
// export class Dean extends Person {}
