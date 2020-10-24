import request from "./request";

export function setTeachRecord(data) {
  return request({
    url: "/teach_record",
    method: "post",
    data: data
  });
}

export function setTeachLoad(data) {
  return request({
    url: "/teachLoad",
    method: "post",
    data: data
  });
}
