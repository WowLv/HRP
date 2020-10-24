import request from "./request";

export function getInfo(Uid) {
  return request({
    url: "/personInfo",
    method: "get",
    params: {
      Uid
    }
  });
}

/* java api */
// export function getInfo(uid) {
//   return request({
//     url: "/personInfo",
//     method: "get",
//     params: {
//       Uid
//     }
//   });
// }

export function setInfo(data) {
  return request({
    url: "/personInfo",
    method: "post",
    data: data
  });
}
