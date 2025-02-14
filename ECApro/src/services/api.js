import axios from 'axios';
import storage from './storage';

// const url = 'http://3.142.146.136:3005/';
// const url = 'http://185.137.92.133:8080/'

// const url = 'https://srv584966.hstgr.cloud/api/'

// const url = 'https://srv639121.hstgr.cloud/'
const url = 'http://localhost:3000/'

// const url = 'http://192.168.178.235:3000/'

const config = {
  //baseURL: 'http://ec2-18-222-139-92.us-east-2.compute.amazonaws.com/API',
  baseURL: url,
}



const instance = axios.create(config)

export const headers = {
  "x-token":storage.getString('x-token')
}

export const api = instance;
