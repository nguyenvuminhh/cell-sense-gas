/**
 * API Service - HTTP communication layer
 */

import { ApiResponse, ApiErrorResponse } from '../config';
import { signPayload } from './cryptoService';

/**
 * Build query string from object
 */
function buildQuery(query: Record<string, string | number | boolean> = {}): string {
  const keys = Object.keys(query);
  if (keys.length === 0) return '';

  const params = keys
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
    .join('&');

  return `?${params}`;
}

/**
 * Make API call to backend
 */
function callApi<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  url: string,
  payload: Record<string, unknown> = {},
  query: Record<string, string | number | boolean> = {},
  headers: Record<string, string> = {},
  isFetchingSignature = false,
): ApiResponse<T> {
  // eslint-disable-next-line no-undef
  const userEmail = Session.getActiveUser().getEmail();
  query.user_email = userEmail;
  const now = new Date().toISOString();
  query.timestamp = now;

  const fullUrl = url + (isFetchingSignature ? '' : buildQuery(query));
  // eslint-disable-next-line no-undef
  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    // eslint-disable-next-line no-undef
    method: method.toLowerCase() as GoogleAppsScript.URL_Fetch.HttpMethod,
    contentType: 'application/json',
    muteHttpExceptions: true,
    headers: {
      'ngrok-skip-browser-warning': 'true',
      ...(isFetchingSignature ? {} : { 'X-Signature': signPayload(payload, fullUrl) }),
      ...headers,
    },
  };

  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    options.payload = JSON.stringify(payload);
  }

  /* eslint-disable */
  Logger.log('🔹 Request URL: ' + fullUrl);
  Logger.log('🔹 Method: ' + method);
  Logger.log('🔹 Payload: ' + JSON.stringify(payload));
  /* eslint-enable */

  try {
    // eslint-disable-next-line no-undef
    const response = UrlFetchApp.fetch(fullUrl, options);
    const code = response.getResponseCode();
    const text = response.getContentText();

    /* eslint-disable */
    Logger.log('🔹 Response Code: ' + code);
    Logger.log('🔹 Response Body: ' + text);
    /* eslint-enable */

    if (code >= 200 && code < 300) {
      return JSON.parse(text) as T;
    } else {
      throw new Error(`HTTP ${code}: ${text}`);
    }
  } catch (e) {
    const error = e as Error;
    // eslint-disable-next-line no-undef
    Logger.log('Error: ' + error.message);
    return { error: error.message } as ApiErrorResponse;
  }
}

export { callApi, buildQuery };
