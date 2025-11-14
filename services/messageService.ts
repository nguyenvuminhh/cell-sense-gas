/**
 * Message Service - Message handling with LLM
 */

import { CONFIG, API_PATHS, MessageRequest, MessageResponse } from '../config';
import { callApi } from './apiService';
import { extractRangesFromMessage, fillCellsWithFormula } from './sheetUtils';

interface HandleMessageResponse {
  reply: string;
}

/**
 * Handle user message and interact with backend API
 */
function handleMessage(message: string): HandleMessageResponse {
  const selectedRanges = extractRangesFromMessage(message);
  
  const payload: MessageRequest = {
    message,
    selected_ranges: selectedRanges,
    llm_provider: 'google',
    llm_model: 'gemini-2.5-flash-lite'
  };

  const response = callApi<MessageResponse>('POST', `${CONFIG.API_URL}${API_PATHS.CHAT_SEND_MESSAGE}`, payload);

  if ('error' in response) {
    return { reply: `Something went wrong: ${response.error}` };
  }

  try {
    const filled_ranges = response.filled_ranges;
    if (filled_ranges && filled_ranges.length > 0) {
      filled_ranges.forEach(filled_range => {
        fillCellsWithFormula(
          filled_range.sheet_name,
          filled_range.range,
          filled_range.r1c1_value
        );
      });
    }
  } catch (err) {
    const error = err as Error;
    return { reply: "Error while filling cells: " + error.message };
  }

  return { reply: response.message || 'No reply from server.' };
}

export { handleMessage };
