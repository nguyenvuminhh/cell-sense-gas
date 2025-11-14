/**
 * Chat Service - Chat and message CRUD operations
 */

import {
  CONFIG,
  API_PATHS,
  Chat,
  ChatRequest,
  ChatMessage,
  ChatMessageRequest,
  ApiResponse,
} from '../config';
import { callApi } from './apiService';

/**
 * Get all chats for the current user
 */
function getChatList(): ApiResponse<Chat[]> {
  const response = callApi<Chat[]>('GET', `${CONFIG.API_URL}${API_PATHS.CHAT_LIST}`);
  return response;
}

/**
 * Create a new chat
 */
function createChat(title: string = 'New Chat'): ApiResponse<Chat> {
  const payload: ChatRequest = {
    title,
    user_id: 0, // This will be set by the backend based on user_email
  };
  const response = callApi<Chat>('POST', `${CONFIG.API_URL}${API_PATHS.CHAT_NEW}`, payload);
  return response;
}

/**
 * Get a specific chat by ID
 */
function getChat(chatId: number): ApiResponse<Chat> {
  const path = API_PATHS.CHAT_BY_ID.replace('{chat_id}', chatId.toString());
  const response = callApi<Chat>('GET', `${CONFIG.API_URL}${path}`);
  return response;
}

/**
 * Update chat title
 */
function updateChat(chatId: number, title: string): ApiResponse<Chat> {
  const payload: ChatRequest = {
    title,
    user_id: 0, // This will be set by the backend based on user_email
  };
  const path = API_PATHS.CHAT_BY_ID.replace('{chat_id}', chatId.toString());
  const response = callApi<Chat>('PUT', `${CONFIG.API_URL}${path}`, payload);
  return response;
}

/**
 * Delete a chat
 */
function deleteChat(chatId: number): ApiResponse<{ message: string }> {
  const path = API_PATHS.CHAT_BY_ID.replace('{chat_id}', chatId.toString());
  const response = callApi<{ message: string }>('DELETE', `${CONFIG.API_URL}${path}`);
  return response;
}

/**
 * Get all messages for a chat
 */
function getChatMessages(chatId: number): ApiResponse<ChatMessage[]> {
  const path = API_PATHS.CHAT_MESSAGES.replace('{chat_id}', chatId.toString());
  const response = callApi<ChatMessage[]>('GET', `${CONFIG.API_URL}${path}`);
  return response;
}

/**
 * Create a message in a chat
 */
function createChatMessage(
  chatId: number,
  content: string,
  isFromUser: boolean,
  modelName?: string,
): ApiResponse<ChatMessage> {
  const payload: ChatMessageRequest = {
    chat_id: chatId,
    content,
    is_from_user: isFromUser,
    model_name: modelName || null,
  };
  const path = API_PATHS.CHAT_MESSAGES.replace('{chat_id}', chatId.toString());
  const response = callApi<ChatMessage>('POST', `${CONFIG.API_URL}${path}`, payload);
  return response;
}

/**
 * Delete a message
 */
function deleteChatMessage(messageId: number): ApiResponse<{ message: string }> {
  const path = API_PATHS.DELETE_MESSAGE.replace('{message_id}', messageId.toString());
  const response = callApi<{ message: string }>('DELETE', `${CONFIG.API_URL}${path}`);
  return response;
}

export {
  getChatList,
  createChat,
  getChat,
  updateChat,
  deleteChat,
  getChatMessages,
  createChatMessage,
  deleteChatMessage,
};
