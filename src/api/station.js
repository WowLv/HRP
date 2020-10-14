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

export function auditStationTransferApply(data) {
  return request({
    url: "/audit_sTransfer",
    method: "post",
    data: data
  });
}
