import request from "./request";
import { handleUser } from "@/lib/validate";

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

export function searchMemberFile(user) {
  user = handleUser(user);
  return request({
    url: "/searchFile",
    method: "post",
    data: {
      user
    }
  });
}

export function memberRegister(memberData) {
  return request({
    url: "/m_register",
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
