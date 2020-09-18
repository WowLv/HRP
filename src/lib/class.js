class User {
  constructor(uid, username, sex, age, phone, email, power) {
    this.uid = uid;
    this.username = username;
    this.age = age;
    this.sex = sex;
    this.phone = phone;
    this.email = email;
    this.power = power;
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
  constructor(uid, username, sex, age, phone, email, power) {
    super(uid, username, sex, age, phone, email, power);
    this.password = "";
  }
}
export class Teacher extends User {
  constructor(uid, username, sex, age, phone, email, power) {
    super(uid, username, sex, age, phone, email, power);
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
