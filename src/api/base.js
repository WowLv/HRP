import request from "./request";

export function getWorkLoadType() {
  return request({
    url: "/workLoadType",
    method: "get"
  });
}

export function getGpa(workLoadTypeId, workLoadId) {
  return request({
    url: "/gpa",
    method: "get",
    params: {
      workLoadTypeId,
      workLoadId
    }
  });
}
