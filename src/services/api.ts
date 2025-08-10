import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

export const api = axios.create({
  baseURL: API_BASE
});

export const fetchConversations = () => api.get("/conversations");
export const fetchMessages = (wa_id: string) => api.get(`/conversations/${wa_id}/messages`);
export const sendMessage = (wa_id: string, body: any) => api.post(`/conversations/${wa_id}/messages`, body);
