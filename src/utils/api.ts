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
export const fetchUsers = async (itemsPerPage = 8000): Promise<{ data: User[] }> => {
  try {
    // Directly fetch from API to get complete user data including planet
    const response = await api.get(`users?itemsPerPage=${itemsPerPage}`);
    return { data: response.data };
  } catch (error) {
    console.error('Failed to fetch users from API:', error);
    // Fallback to cached data (but it doesn't have planet field)
    try {
      const cachedResponse = await axios.get('/json/users.json');
      return { data: cachedResponse.data };
    } catch (cacheError) {
      console.error('Cache fallback failed:', cacheError);
      return { data: [] };
    }
  }
};

// Fetch users with cache-first strategy for home page
export const fetchUsersWithCache = async (): Promise<{ data: User[], isFromCache?: boolean }> => {
  try {
    // First, try to get cached data
    console.log('Attempting to load cached users.json');
    const cachedResponse = await axios.get('/json/users.json');
    console.log('Successfully loaded cached data:', cachedResponse.data.length, 'users');
    return { data: cachedResponse.data, isFromCache: true };
  } catch (error) {
    console.error('Cache read failed, fetching from API:', error);
    // If cache fails, fetch from API
    try {
      const response = await api.get('users?itemsPerPage=8000');
      console.log('Successfully loaded from API:', response.data.length, 'users');
      return { data: response.data, isFromCache: false };
    } catch (apiError) {
      console.error('API fetch also failed:', apiError);
      return { data: [], isFromCache: false };
    }
  }
};

export const fetchUserCards = async (userId: number, itemsPerPage = 8000): Promise<{ data: Card[] }> => {
  try {
    const response = await api.get(`users/${userId}/card?itemsPerPage=${itemsPerPage}`);
    // API returns array directly, not wrapped in { data: [...] }
    return { data: response.data };
  } catch (error) {
    console.error('Failed to fetch user cards:', error);
    return { data: [] };
  }
};

export const fetchCardById = async (cardId: number): Promise<Card | null> => {
  try {
    const response = await api.get(`cards/${cardId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch card by ID:', error);
    return null;
  }
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