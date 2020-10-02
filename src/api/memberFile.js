import request from "./request";

export function getPersonFile(fid) {
  return request({
    url: "/personFile",
    method: "get",
    params: {
      fid
    }
  });
}

export function getMemberFile(page) {
  return request({
    url: "/memberFile",
    method: "get",
    params: {
      page
    }
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
