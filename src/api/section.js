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
