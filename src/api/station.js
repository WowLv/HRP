import request from "./request";

export function posTransferApply(data) {
  return request({
    url: "/pos_transfer",
    method: "post",
    data: data
  });
}

export function getPosTransferApply() {
  return request({
    url: "/pos_transferApply",
    method: "get"
  });
}
