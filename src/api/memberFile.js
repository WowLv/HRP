import request from "./request";

export function getPersonFile(uid) {
  return request({
    url: "/personFile",
    method: "get",
    params: {
      uid
    }
  });
}

export function getMemberFile() {
  return request({
    url: "/memberFile",
    method: "get"
  });
}

export function memberRegister(memberData) {
  return request({
    url: "/mregister",
    method: "post",
    data: {
      memberData
    }
  });
}
