import { components, paths } from './types';

const CONFIG = {
  API_URL: 'API_URL_PLACEHOLDER',
  GCP_SECRET_MANAGER_URL:
    'https://secretmanager.googleapis.com/v1/projects/{projectId}' +
    '/secrets/{secretName}/versions/latest:access',
  PROJECT_NUMBER: '903488684125',
  SECRET_SIGNATURE_PRIVATE_KEY: 'SIGNATURE_PRIVATE_KEY',
} as const;

const API_PATHS = {
  PING: '/ping' as keyof paths,
  ROOT: '/' as keyof paths,
  SUPPORTED_MODELS: '/supported-models' as keyof paths,
  CHAT_SEND_MESSAGE: '/chat/{chat_id}/send-message' as keyof paths,
  CHAT_LIST: '/chat/list' as keyof paths,
  CHAT_NEW: '/chat/new' as keyof paths,
  CHAT_LATEST: '/chat/latest' as keyof paths,
  CHAT_BY_ID: '/chat/{chat_id}' as keyof paths,
  CHAT_MESSAGES: '/chat/{chat_id}/messages' as keyof paths,
  DELETE_MESSAGE: '/chat/messages/{message_id}' as keyof paths,
  USER_ME: '/user/me' as keyof paths,
  USER_QUOTA: '/user/quota' as keyof paths,
  USER_API_KEY: '/user/api-key' as keyof paths,
  ERROR_500: '/error/500' as keyof paths,
  ERROR_404: '/error/404' as keyof paths,
  ERROR_400: '/error/400' as keyof paths,
  ERROR_HTTP_EXCEPTION: '/error/http_exception' as keyof paths,
  ERROR_UNEXPECTED_EXCEPTION: '/error/unexpected_exception' as keyof paths,
} as const;

// Re-export all types from OpenAPI schema
type MessageRequest = components['schemas']['MessageRequest'];
type MessageResponse = components['schemas']['MessageResponse'];
type Chat = components['schemas']['Chat'];
type ChatMessage = components['schemas']['ChatMessage'];
type SelectedRange = components['schemas']['SelectedRange'];
type FilledRange = components['schemas']['FilledRange'];
type LLMModels = components['schemas']['LLMModels'];
type LLMProviders = components['schemas']['LLMProviders'];
type ValidationError = components['schemas']['ValidationError'];
type HTTPValidationError = components['schemas']['HTTPValidationError'];
type UserWithTruncatedApiKey = components['schemas']['UserWithTruncatedApiKey'];
type ApiKeyUpdateRequest = components['schemas']['ApiKeyUpdateRequest'];
type FreeUserQuota = components['schemas']['FreeUserQuota'];

// Custom app-specific types (not in backend schema)
interface ApiErrorResponse {
  error: string;
}

type ApiResponse<T> = T | ApiErrorResponse;

interface ActiveRangeInfo {
  sheetName: string;
  activeRange: string;
}

interface RangePayload {
  sheet_name_and_range: string;
  cell_values: unknown[][];
}

export {
  CONFIG,
  API_PATHS,
  MessageRequest,
  MessageResponse,
  Chat,
  ChatMessage,
  SelectedRange,
  FilledRange,
  LLMModels,
  LLMProviders,
  ValidationError,
  HTTPValidationError,
  UserWithTruncatedApiKey,
  ApiKeyUpdateRequest,
  FreeUserQuota,
  ApiErrorResponse,
  ApiResponse,
  ActiveRangeInfo,
  RangePayload,
};
