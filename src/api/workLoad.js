import request from "./request";

export function getPublicLoadSum() {
  return request({
    url: "/publicLoad_sum",
    method: "get"
  });
}

export function getScientLoadSum() {
  return request({
    url: "/scientLoad_sum",
    method: "get"
  });
}

export function getWorkLoadList(mode, page) {
  return request({
    url: "/load_manage",
    method: "get",
    params: {
      mode,
      page
    }
  });
}

export function getMeasure(workLoadTypeId, workLoadId) {
  return request({
    url: "/measure",
    method: "get",
    params: {
      workLoadTypeId,
      workLoadId
    }
  });
}

export function auditWorkLoad(data) {
  return request({
    url: "/audit_workLoad",
    method: "post",
    data
  });
}
