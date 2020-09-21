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
    url: "/entry",
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

export function passMenberApply(mid) {
  return request({
    url: "/passMemberApply",
    method: "post",
    data: {
      mid
    }
  });
}

export function rejectMenberApply(mid) {
  return request({
    url: "/rejectMemberApply",
    method: "post",
    data: {
      mid
    }
  });
}
