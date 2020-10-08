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
    url: "/searchMember",
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

export function getAllMenberApply(page) {
  return request({
    url: "/allMemberApply",
    method: "get",
    params: {
      page
    }
  });
}

export function getAllMenberFinished(page) {
  return request({
    url: "/allMemberFinished",
    method: "get",
    params: {
      page
    }
  });
}

export function auditMember(mid, modeId) {
  return request({
    url: "/auditMember",
    method: "post",
    data: {
      mid,
      modeId
    }
  });
}

export function getLevel() {
  return request({
    url: "/positionList",
    method: "get"
  });
}
