import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: "https://full-stack-web-fr.vercel.app/",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

const fakeapi = axios.create({
  baseURL: "https://fakestoreapi.com/products",
});

export { instance, fakeapi };
