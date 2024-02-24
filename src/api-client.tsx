// src/api/apiClient.ts
import { getPreferenceValues } from "@raycast/api";
import { apiPreferences } from "./preferences";

import axios from "axios";

const apiPreferences = getPreferenceValues<apiPreferences>();

// Load environment variables from .env file
const API_BASE_URL = apiPreferences.API_BASE_URL;
const API_TOKEN = apiPreferences.API_TOKEN;

// Create an axios instance configured with the API base URL and headers for authentication
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export default apiClient;
