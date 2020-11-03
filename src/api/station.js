import request from "./request";

export function posTransferApply(data) {
  return request({
    url: "/pos_transfer",
    method: "post",
    data: data
  });
}

export function getPosTransferApply(data) {
  return request({
    url: "/pos_transferApply",
    method: "get",
    params: data
  });
}

export function auditPosTransferApply(data) {
  return request({
    url: "/audit_posTransfer",
    method: "post",
    data: data
  });
}

export function deleteTransferRecord(transferId) {
  return request({
    url: "/delete_posTransfer",
    method: "post",
    data: {
      transferId
    }
  });
}

export function setStation(data) {
  return request({
    url: "/set_station",
    method: "post",
    data: data
  });
}

export function setPosition(data) {
  return request({
    url: "/set_position",
    method: "post",
    data: data
  });
}
