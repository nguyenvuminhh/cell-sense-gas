/**
 * User Service - User profile and API key management
 */

import {
  CONFIG,
  API_PATHS,
  UserWithTruncatedApiKey,
  ApiKeyUpdateRequest,
  FreeUserQuota,
  ApiResponse,
} from '../config';
import { callApi } from './apiService';

/**
 * Get current user information
 */
function getCurrentUser(): ApiResponse<UserWithTruncatedApiKey> {
  const response = callApi<UserWithTruncatedApiKey>('GET', `${CONFIG.API_URL}${API_PATHS.USER_ME}`);
  return response;
}

/**
 * Update user's Gemini API key
 * @param apiKey - The Gemini API key to set, or empty string to remove
 */
function updateApiKey(apiKey: string): ApiResponse<UserWithTruncatedApiKey> {
  const payload: ApiKeyUpdateRequest = {
    gemini_api_key: apiKey,
  };
  const response = callApi<UserWithTruncatedApiKey>(
    'PATCH',
    `${CONFIG.API_URL}${API_PATHS.USER_API_KEY}`,
    payload,
  );
  return response;
}

/**
 * Get user's free quota information
 */
function getUserQuota(): ApiResponse<FreeUserQuota> {
  const response = callApi<FreeUserQuota>('GET', `${CONFIG.API_URL}${API_PATHS.USER_QUOTA}`);
  return response;
}

export { getCurrentUser, updateApiKey, getUserQuota };
