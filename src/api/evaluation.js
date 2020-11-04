import request from "./request";

export function getGpaRecord(page, year) {
  return request({
    url: "/gpa_record",
    method: "get",
    params: {
      page,
      year
    }
  });
}

export function getEvaluation(page, year) {
  return request({
    url: "/evaluation",
    method: "get",
    params: {
      page,
      year
    }
  });
}

export function evaluate(data) {
  return request({
    url: "/evaluate",
    method: "post",
    data
  });
}

export function getPersonEvaluation(fid, year) {
  return request({
    url: "/person_eval",
    method: "get",
    params: {
      fid,
      year
    }
  });
}
