import { CONFIG } from '../config';
import { callApi } from './apiService';

/**
 * Get a secret from Google Secret Manager
 */
function getSecret(secretName: string): string {
  // Add authorization header using current script's OAuth token
  // eslint-disable-next-line no-undef
  const cache = CacheService.getScriptCache();
  const cacheKey = `secret_${secretName}`;

  // 1. Try cache first
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }
  // eslint-disable-next-line no-undef
  const token = ScriptApp.getOAuthToken();
  const url = CONFIG.GCP_SECRET_MANAGER_URL.replace('{projectId}', CONFIG.PROJECT_NUMBER).replace(
    '{secretName}',
    secretName,
  );

  const response = callApi<any>(
    'GET',
    url,
    {},
    {},
    {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    true,
  );

  if (response.error) {
    throw new Error(`Secret Manager error: ${response.error}`);
  }

  // Decode Base64 payload → UTF-8 string
  const encoded = response.payload.data;
  // eslint-disable-next-line no-undef
  const decoded = Utilities.newBlob(Utilities.base64Decode(encoded)).getDataAsString();
  cache.put(cacheKey, decoded, 60 * 60 * 6); // 6 hours = 21,600 seconds
  return decoded;
}

export { getSecret };
