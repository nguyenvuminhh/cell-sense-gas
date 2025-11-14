"use strict";
/**
 * Chat Service - Chat and message CRUD operations
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatList = getChatList;
exports.createChat = createChat;
exports.getChat = getChat;
exports.updateChat = updateChat;
exports.deleteChat = deleteChat;
exports.getChatMessages = getChatMessages;
exports.createChatMessage = createChatMessage;
exports.deleteChatMessage = deleteChatMessage;
const config_1 = require("../config");
const apiService_1 = require("./apiService");
/**
 * Get all chats for the current user
 */
function getChatList() {
    const response = (0, apiService_1.callApi)('GET', `${config_1.CONFIG.API_URL}${config_1.API_PATHS.CHAT_LIST}`);
    return response;
}
/**
 * Create a new chat
 */
function createChat(title = 'New Chat') {
    const payload = {
        title,
        user_id: 0 // This will be set by the backend based on user_email
    };
    const response = (0, apiService_1.callApi)('POST', `${config_1.CONFIG.API_URL}${config_1.API_PATHS.CHAT_NEW}`, payload);
    return response;
}
/**
 * Get a specific chat by ID
 */
function getChat(chatId) {
    const path = config_1.API_PATHS.CHAT_BY_ID.replace('{chat_id}', chatId.toString());
    const response = (0, apiService_1.callApi)('GET', `${config_1.CONFIG.API_URL}${path}`);
    return response;
}
/**
 * Update chat title
 */
function updateChat(chatId, title) {
    const payload = {
        title,
        user_id: 0 // This will be set by the backend based on user_email
    };
    const path = config_1.API_PATHS.CHAT_BY_ID.replace('{chat_id}', chatId.toString());
    const response = (0, apiService_1.callApi)('PUT', `${config_1.CONFIG.API_URL}${path}`, payload);
    return response;
}
/**
 * Delete a chat
 */
function deleteChat(chatId) {
    const path = config_1.API_PATHS.CHAT_BY_ID.replace('{chat_id}', chatId.toString());
    const response = (0, apiService_1.callApi)('DELETE', `${config_1.CONFIG.API_URL}${path}`);
    return response;
}
/**
 * Get all messages for a chat
 */
function getChatMessages(chatId) {
    const path = config_1.API_PATHS.CHAT_MESSAGES.replace('{chat_id}', chatId.toString());
    const response = (0, apiService_1.callApi)('GET', `${config_1.CONFIG.API_URL}${path}`);
    return response;
}
/**
 * Create a message in a chat
 */
function createChatMessage(chatId, content, isFromUser, modelName) {
    const payload = {
        chat_id: chatId,
        content,
        is_from_user: isFromUser,
        model_name: modelName || null
    };
    const path = config_1.API_PATHS.CHAT_MESSAGES.replace('{chat_id}', chatId.toString());
    const response = (0, apiService_1.callApi)('POST', `${config_1.CONFIG.API_URL}${path}`, payload);
    return response;
}
/**
 * Delete a message
 */
function deleteChatMessage(messageId) {
    const path = config_1.API_PATHS.DELETE_MESSAGE.replace('{message_id}', messageId.toString());
    const response = (0, apiService_1.callApi)('DELETE', `${config_1.CONFIG.API_URL}${path}`);
    return response;
}
