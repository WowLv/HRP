import request from "./request";

export function postScientificLoad(fileObj) {
  var fd = new FormData();

  fd.append("file", fileObj.file);
  fd.append("loadInfo", fileObj.data);
  return request({
    url: "/scient_load",
    method: "post",
    // headers: { "Content-Type": "multipart/form-data" },
    data: fd
  });
}
