import request from "./request";
import { handleUser } from "@/lib/validate";

export function getAllInfo(page) {
  return request({
    url: "/allInfo",
    method: "get",
    params: {
      page
    }
  });
}

export function searchInfo(user) {
  user = handleUser(user);
  return request({
    url: "/searchInfo",
    method: "get",
    params: {
      user
    }
  });
}
