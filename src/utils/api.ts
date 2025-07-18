import axios from 'axios';
import type { User, Card, CardOwner, Fanart, Seven } from '../types';

const getApiUrl = () => {
  if (window.location.host === "localhost:8080" || window.location.host === "192.168.11.12:8080") {
    return "/api/";
  }
  return "https://api.syui.ai/";
};

export const api = axios.create({
  baseURL: getApiUrl(),
});

// API関数
export const fetchUsers = async (itemsPerPage = 3000): Promise<{ data: User[] }> => {
  const response = await api.get(`users?itemsPerPage=${itemsPerPage}`);
  return response.data;
};

export const fetchUserCards = async (userId: number, itemsPerPage = 8000): Promise<{ data: Card[] }> => {
  const response = await api.get(`users/${userId}/card?itemsPerPage=${itemsPerPage}`);
  return response.data;
};

export const fetchUser = async (userId: number): Promise<{ data: User }> => {
  const response = await api.get(`users/${userId}`);
  return response.data;
};

export const fetchSevens = async (itemsPerPage = 8000): Promise<{ data: Seven[] }> => {
  const response = await api.get(`sevs?itemsPerPage=${itemsPerPage}`);
  return response.data;
};

export const fetchCardData = async (): Promise<{ data: CardOwner[] }> => {
  const response = await axios.get("/json/card.json");
  return response.data;
};

export const fetchFanarts = async (): Promise<{ data: Fanart[] }> => {
  const response = await axios.get("/json/fanart.json");
  return response.data;
};

export const fetchPhotos = async (): Promise<{ data: Fanart[] }> => {
  const response = await axios.get("/json/photo.json");
  return response.data;
};