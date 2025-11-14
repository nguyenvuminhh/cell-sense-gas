import { components, paths } from './types';

export const CONFIG = {
  API_URL: 'https://turgid-unverified-sherril.ngrok-free.dev',
} as const;

export const API_PATHS = {
  PING: '/ping' as keyof paths,
  ROOT: '/' as keyof paths,
  CHAT_SEND_MESSAGE: '/chat/send-message' as keyof paths,
  CHAT_LIST: '/chat/list' as keyof paths,
  CHAT_NEW: '/chat/new' as keyof paths,
  CHAT_BY_ID: '/chat/{chat_id}' as keyof paths,
  CHAT_MESSAGES: '/chat/{chat_id}/messages' as keyof paths,
  DELETE_MESSAGE: '/chat/messages/{message_id}' as keyof paths,
  ERROR_500: '/error/500' as keyof paths,
  ERROR_404: '/error/404' as keyof paths,
  ERROR_400: '/error/400' as keyof paths,
  ERROR_HTTP_EXCEPTION: '/error/http_exception' as keyof paths,
  ERROR_UNEXPECTED_EXCEPTION: '/error/unexpected_exception' as keyof paths,
} as const;

// Re-export all types from OpenAPI schema
export type MessageRequest = components['schemas']['MessageRequest'];
export type MessageResponse = components['schemas']['MessageResponse'];
export type ChatRequest = components['schemas']['ChatRequest'];
export type Chat = components['schemas']['Chat'];
export type ChatMessage = components['schemas']['ChatMessage'];
export type ChatMessageRequest = components['schemas']['ChatMessageRequest'];
export type SelectedRange = components['schemas']['SelectedRange'];
export type FilledRange = components['schemas']['FilledRange'];
export type LLMModels = components['schemas']['LLMModels'];
export type LLMProviders = components['schemas']['LLMProviders'];
export type ValidationError = components['schemas']['ValidationError'];
export type HTTPValidationError = components['schemas']['HTTPValidationError'];

// Custom app-specific types (not in backend schema)
export interface ApiErrorResponse {
  error: string;
}

export type ApiResponse<T> = T | ApiErrorResponse;

export interface ActiveRangeInfo {
  sheetName: string;
  activeRange: string;
}

export interface RangePayload {
  sheet_name_and_range: string;
  cell_values: unknown[][];
}

