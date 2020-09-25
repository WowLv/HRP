class User {
  constructor(uid, username, sex, age, phone, email, powerId) {
    this.uid = uid;
    this.username = username;
    this.age = age;
    this.sex = sex;
    this.phone = phone;
    this.email = email;
    this.powerId = powerId;
  }
}

class Member {
  constructor(name, sex, age, phone, email, positionId) {
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.phone = phone;
    this.email = email;
    this.positionId = positionId;
  }
}

export class Admin extends User {
  constructor(uid, username, sex, age, phone, email, powerId) {
    super(uid, username, sex, age, phone, email, powerId);
    this.password = "";
  }
}
export class Teacher extends User {
  constructor(uid, username, sex, age, phone, email, powerId) {
    super(uid, username, sex, age, phone, email, powerId);
  }
}

export class TeachMember extends Member {
  constructor(name, sex, age, phone, email, stationId, level, positionId) {
    super(name, sex, age, phone, email, positionId);
    this.stationId = stationId;
    this.level = level;
  }
}

export class SectionMember extends Member {
  constructor(name, sex, age, phone, email, sectionId, positionId) {
    super(name, sex, age, phone, email, positionId);
    this.sectionId = sectionId;
  }
}
export class DeanMember extends Member {
  constructor(name, sex, age, phone, email, positionId) {
    super(name, sex, age, phone, email, positionId);
  }
}
// export class SectionThief extends Person {}
// export class Dean extends Person {}
