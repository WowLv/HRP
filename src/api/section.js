import request from "./request";

export function getSectionFile(params) {
  return request({
    url: "/sectionFile",
    method: "get",
    params
  });
}

export function applySection(data) {
  return request({
    url: "/sectionApply",
    method: "post",
    data
  });
}

export function getAllSectionApply(params) {
  return request({
    url: "/all_sectionApply",
    method: "get",
    params
  });
}

export function auditSectionApply(data) {
  return request({
    url: "/audit_sectionApply",
    method: "post",
    data
  });
}

export function setSection(data) {
  return request({
    url: "/set_section",
    method: "post",
    data
  });
}
