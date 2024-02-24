// src/api/linkService.ts

import apiClient from "./api-client";

interface ShortenLinkRequest {
  original_url: string;
  short_code?: string;
}

interface ShortenLinkResponse {
  id: string;
  original_url: string;
  short_code: string;
}

interface Link {
  id: string;
  original_url: string;
  short_code: string;
}

// Function to shorten a link
export const shortenLink = async (data: ShortenLinkRequest): Promise<ShortenLinkResponse> => {
  const response = await apiClient.post<ShortenLinkResponse>("/secure/shorten", data);
  return response.data;
};

// Function to retrieve all shortened links
export const getShortenedLinks = async (): Promise<Link[]> => {
  const response = await apiClient.get<Link[]>("/secure/urls");
  return response.data;
};

// Function to modify an existing shortened link
export const modifyLink = async (id: string, data: ShortenLinkRequest): Promise<void> => {
  await apiClient.put(`/secure/${id}`, data);
};

// Function to delete a shortened link
export const deleteLink = async (short_code: string): Promise<void> => {
  await apiClient.delete(`/secure/${short_code}`);
};
