/**
 * Model Service - Get supported LLM models
 */

import { CONFIG, API_PATHS, LLMProviders, LLMModels, ApiResponse } from '../config';
import { callApi } from './apiService';

type SupportedModel = [LLMProviders, LLMModels];

/**
 * Get list of supported models
 */
function getSupportedModels(): ApiResponse<SupportedModel[]> {
  const response = callApi<SupportedModel[]>(
    'GET',
    `${CONFIG.API_URL}${API_PATHS.SUPPORTED_MODELS}`,
  );
  return response;
}

export { getSupportedModels };
