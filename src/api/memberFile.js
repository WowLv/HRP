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
    data: memberData
  });
}

export function entryApply(data) {
  return request({
    url: "/memberApply",
    method: "post",
    data: data
  });
}

export function resignApply(data) {
  return request({
    url: "/memberApply",
    method: "post",
    data: data
  });
}

export function getAllMenberApply() {
  return request({
    url: "/allMemberApply",
    method: "get"
  });
}

export function passMember(mid) {
  return request({
    url: "/passMember",
    method: "post",
    data: {
      mid
    }
  });
}

export function rejectMember(mid) {
  return request({
    url: "/rejectMember",
    method: "post",
    data: {
      mid
    }
  });
}
