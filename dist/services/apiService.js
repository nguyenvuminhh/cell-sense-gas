"use strict";
/**
 * API Service - HTTP communication layer
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.callApi = callApi;
exports.buildQuery = buildQuery;
/**
 * Build query string from object
 */
function buildQuery(query = {}) {
    const keys = Object.keys(query);
    if (keys.length === 0)
        return '';
    const params = keys
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
        .join('&');
    return `?${params}`;
}
/**
 * Make API call to backend
 */
function callApi(method, url, payload = {}, query = {}) {
    const userEmail = Session.getActiveUser().getEmail();
    query.user_email = userEmail;
    const fullUrl = url + buildQuery(query);
    const options = {
        method: method,
        contentType: 'application/json',
        muteHttpExceptions: true,
    };
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
        options.payload = JSON.stringify(payload);
    }
    Logger.log('🔹 Request URL: ' + fullUrl);
    Logger.log('🔹 Method: ' + method);
    Logger.log('🔹 Payload: ' + JSON.stringify(payload));
    try {
        const response = UrlFetchApp.fetch(fullUrl, options);
        const code = response.getResponseCode();
        const text = response.getContentText();
        Logger.log('🔹 Response Code: ' + code);
        Logger.log('🔹 Response Body: ' + text);
        if (code >= 200 && code < 300) {
            return JSON.parse(text);
        }
        else {
            throw new Error(`HTTP ${code}: ${text}`);
        }
    }
    catch (e) {
        const error = e;
        Logger.log('Error: ' + error.message);
        return { error: error.message };
    }
}
