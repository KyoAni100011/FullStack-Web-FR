import { instance } from "./config";

export const login = async (data) => {
  return await instance.post("/users/login", data);
};
