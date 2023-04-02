import axios from "axios";

export function useAPI(method: string, url: string, option: any = null) {
  return axios({
    method: method,
    url: url,
    ...option,
  });
}

// export function formApi(method: string, url: string, option: any = null) {
//   return fetch({

//   })
// }
