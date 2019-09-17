import axios from "axios";
import { mockUserInfo } from "../mock/user";

export async function getUserInfo() {
  // return axios.get("/auth/validate");
  return mockUserInfo();
}


