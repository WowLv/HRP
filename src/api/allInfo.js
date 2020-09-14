import request from "./request";
import { handleUser } from "@/lib/validate";

export function getAllInfo() {
  return request({
    url: "/allInfo",
    method: "get"
  });
}

export function searchInfo(user) {
  user = handleUser(user);
  return request({
    url: "/searchInfo",
    method: "post",
    data: {
      user
    }
  });
}
