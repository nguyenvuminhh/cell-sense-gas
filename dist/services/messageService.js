"use strict";
/**
 * Message Service - Message handling with LLM
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMessage = handleMessage;
const config_1 = require("../config");
const apiService_1 = require("./apiService");
const sheetUtils_1 = require("./sheetUtils");
/**
 * Handle user message and interact with backend API
 */
function handleMessage(message) {
    const selectedRanges = (0, sheetUtils_1.extractRangesFromMessage)(message);
    const payload = {
        message,
        selected_ranges: selectedRanges,
        llm_provider: 'google',
        llm_model: 'gemini-2.5-flash-lite'
    };
    const response = (0, apiService_1.callApi)('POST', `${config_1.CONFIG.API_URL}${config_1.API_PATHS.CHAT_SEND_MESSAGE}`, payload);
    if ('error' in response) {
        return { reply: `Something went wrong: ${response.error}` };
    }
    try {
        const filled_ranges = response.filled_ranges;
        if (filled_ranges && filled_ranges.length > 0) {
            filled_ranges.forEach(filled_range => {
                (0, sheetUtils_1.fillCellsWithFormula)(filled_range.sheet_name, filled_range.range, filled_range.r1c1_value);
            });
        }
    }
    catch (err) {
        const error = err;
        return { reply: "Error while filling cells: " + error.message };
    }
    return { reply: response.message || 'No reply from server.' };
}
