/**
 * Message Service - Message handling with LLM
 */

import { CONFIG, API_PATHS, MessageRequest, MessageResponse, SavedRange } from '../config';
import { callApi } from './apiService';
import { extractRangesFromMessage, fillCellsWithFormula, getCellValues } from './sheetUtils';

interface HandleMessageResponse {
  reply: string | undefined;
  error: string | undefined;
  savedRanges: SavedRange[] | undefined;
}

/**
 * Handle user message and interact with backend API
 * @param message - User message text
 * @param chatId - The chat ID to send the message to
 * @param model - Optional model to use (defaults to gemini-2.5-flash-lite)
 */
function handleMessage(
  message: string,
  chatId: number,
  model:
    | 'gemini-2.5-flash'
    | 'gemini-2.5-flash-lite'
    | 'gemini-2.5-pro'
    | 'gpt-5'
    | 'gpt-5-pro'
    | 'gpt-5-mini'
    | 'gpt-5-nano'
    | 'claude-3-haiku'
    | 'claude-3-sonnet'
    | 'claude-3-opus',
  provider: 'google' | 'openai' | 'anthropic',
): HandleMessageResponse {
  const selectedRanges = extractRangesFromMessage(message);

  const payload: MessageRequest = {
    message,
    selected_ranges: selectedRanges,
    llm_provider: provider,
    llm_model: model,
  };

  const path = API_PATHS.CHAT_SEND_MESSAGE.replace('{chat_id}', chatId.toString());
  const response = callApi<MessageResponse>('POST', `${CONFIG.API_URL}${path}`, payload);

  if ('error' in response) {
    let errorText = response.error;
    try {
      const jsonMatch = errorText.match(/\{.*\}$/s);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed && typeof parsed === 'object' && 'detail' in parsed) {
          errorText = parsed.detail;
        }
      }
    } catch {
      // eslint-disable-next-line no-empty
    }

    return { error: errorText, reply: undefined, savedRanges: undefined };
  }

  const savedRanges: SavedRange[] = [];

  try {
    const filled_ranges = response.filled_ranges;
    if (filled_ranges && filled_ranges.length > 0) {
      // Save current cell values before applying edits
      filled_ranges.forEach(filled_range => {
        const currentValues = getCellValues(filled_range.sheet_name, filled_range.range);
        savedRanges.push({
          sheetName: filled_range.sheet_name,
          range: filled_range.range,
          values: currentValues,
        });
      });

      // Apply the edits
      filled_ranges.forEach(filled_range => {
        fillCellsWithFormula(filled_range.sheet_name, filled_range.range, filled_range.r1c1_value);
      });
    }
  } catch (err) {
    const error = err as Error;
    return {
      error: 'Error while filling cells: ' + error.message,
      reply: undefined,
      savedRanges: undefined,
    };
  }

  return {
    reply: response.message || 'No reply from server.',
    error: undefined,
    savedRanges: savedRanges.length > 0 ? savedRanges : undefined,
  };
}

export { handleMessage };
