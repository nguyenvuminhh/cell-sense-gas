/**
 * Model Service - Get supported LLM models
 */

import { CONFIG, API_PATHS, LLMModels, ApiResponse } from '../config';
import { callApi } from './apiService';

type SupportedModelsResponse = {
  [provider: string]: LLMModels[];
};

/**
 * Get list of supported models
 */
function getSupportedModels(): ApiResponse<SupportedModelsResponse> {
  const response = callApi<SupportedModelsResponse>(
    'GET',
    `${CONFIG.API_URL}${API_PATHS.SUPPORTED_MODELS}`,
  );
  return response;
}

export { getSupportedModels };
