import qs from "qs"
import axios from "axios"

const instance = axios.create({
    baseURL: '/orion-capas-admin/api',
    timeout: 20000,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    paramsSerializer: function (params) {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  });