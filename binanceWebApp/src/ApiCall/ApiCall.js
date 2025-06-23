
import axios from "axios";
import {useTelegram} from "../hooks/useTelegram";

export default function (url, method, data, param, header) {
    const {userTelegram} = useTelegram();

     const baseUrl = 'http://localhost:8080';
    // const baseUrl = 'http://85.193.94.223:80';
    //  const baseUrl = 'https://akobir.co';
    //  const baseUrl = 'https://cryptoz.fun';
    // const baseUrl = '';
    //  let token = userTelegram.id
    // let token=5774477233 //yangi
    let token=5397857416  //ali
    // let token=1004132145
    return axios({
        url: baseUrl + url,
        method: method,
        data: data,
        headers: {
            "Authorization": token,
            ...(header ? {"Content-Type": "multipart/form-data"} : {})
        },
        params: param
    }).then((res) => {
        // console.log(res.data)
        if (res.data) {
            // console.log(res.data)
            return {
                error: false,
                data: res.data
            };
        }
    }).catch((err) => {

        // Handle errors
    });
}
