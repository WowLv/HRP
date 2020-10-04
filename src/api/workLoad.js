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
