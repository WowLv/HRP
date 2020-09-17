class Person {
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

export class Admin extends Person {
  constructor(uid, username, sex, age, phone, email, power) {
    super(uid, username, sex, age, phone, email, power);
    this.password = "";
  }
}
export class Teacher extends Person {
  constructor(uid, username, sex, age, phone, email, power) {
    super(uid, username, sex, age, phone, email, power);
  }
}
export class SectionMember extends Person {}
export class SectionThief extends Person {}
export class Dean extends Person {}
