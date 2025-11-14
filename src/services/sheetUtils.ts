/**
 * Sheet Utilities - Google Sheets helper functions
 */

import { ActiveRangeInfo, RangePayload } from '../config';

/**
 * Get the currently active range in A1 notation
 */
function getActiveRangeA1Notation(): ActiveRangeInfo | null {
  // eslint-disable-next-line no-undef
  const sheet = SpreadsheetApp.getActiveSheet();
  if (!sheet) {
    return null;
  }
  const activeRange = sheet.getActiveRange();
  if (!activeRange) {
    return null;
  }
  return {
    sheetName: sheet.getName(),
    activeRange: activeRange.getA1Notation(),
  };
}

/**
 * Parse range label and get cell values
 */
function getRangePayload(rangeLabel: string): RangePayload | null {
  const match = rangeLabel.match(/^'(.*)'!(.+)$/);
  if (!match) {
    return null;
  }

  const sheetName = match[1].replace(/''/g, "'");
  const rangeNotation = match[2];

  // eslint-disable-next-line no-undef
  const spreadsheet = SpreadsheetApp.getActive();
  const sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    return null;
  }

  try {
    const cell_values = sheet.getRange(rangeNotation).getValues();
    return { sheet_name_and_range: rangeLabel, cell_values };
  } catch (error) {
    // eslint-disable-next-line no-undef
    Logger.log(`Failed to read range ${rangeLabel}: ${error}`);
    return null;
  }
}

/**
 * Extract range references from message
 */
function extractRangesFromMessage(message: string): RangePayload[] {
  const pattern = /<cells>(.*?)<\/cells>/g;
  const ranges: RangePayload[] = [];
  const seen = new Set<string>();
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(message)) !== null) {
    const rangeLabel = match[1];
    if (seen.has(rangeLabel)) {
      continue;
    }
    seen.add(rangeLabel);

    const payload = getRangePayload(rangeLabel);
    if (payload) {
      ranges.push(payload);
    }
  }

  return ranges;
}

/**
 * Fill cells with formula
 */
function fillCellsWithFormula(sheetName: string, range: string, r1c1Formula: string): void {
  // eslint-disable-next-line no-undef
  const targetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!targetSheet) {
    throw new Error(`Sheet not found: ${sheetName}`);
  }

  const targetRange = targetSheet.getRange(range);
  targetRange.setFormulaR1C1(r1c1Formula);
}

export {
  getActiveRangeA1Notation,
  getRangePayload,
  extractRangesFromMessage,
  fillCellsWithFormula,
};
