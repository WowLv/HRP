import request from "./request";

export function postScientificLoad(fileObj) {
  var fd = new FormData();
  console.log(fileObj.file);
  fd.append("file", fileObj.file);
  return request({
    url: "/scient_load",
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    data: fd
  });
}
