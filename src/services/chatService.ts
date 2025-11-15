/**
 * Chat Service - Chat and message CRUD operations
 */

import {
  CONFIG,
  API_PATHS,
  Chat,
  ChatMessage,
  ChatMessageRequest,
  ApiResponse,
  LLMModels,
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
 * Get the latest chat (most recently updated) for the current user
 */
function getLatestChat(): ApiResponse<Chat> {
  const response = callApi<Chat>('GET', `${CONFIG.API_URL}${API_PATHS.CHAT_LATEST}`);
  return response;
}

/**
 * Create a new chat
 */
function createChat(): ApiResponse<Chat> {
  const response = callApi<Chat>('POST', `${CONFIG.API_URL}${API_PATHS.CHAT_NEW}`);
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
  modelName?: LLMModels,
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
  getLatestChat,
  createChat,
  getChat,
  deleteChat,
  getChatMessages,
  createChatMessage,
  deleteChatMessage,
};
