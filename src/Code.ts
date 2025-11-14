/**
 * Main entry point - Creates the CellSense menu on spreadsheet open
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('CellSense')
    .addItem('Open Sidebar', 'showChatInterface')
    .addItem('Chat List', 'showChatList')
    .addToUi();
}

/**
 * Show the chat interface sidebar
 */
function showChatInterface() {
  const html = HtmlService.createHtmlOutputFromFile('html/chat_interface')
    .setTitle('CellSense')
    .setWidth(450);
  SpreadsheetApp.getUi().showSidebar(html);
}

/**
 * Show the chat list sidebar
 */
function showChatList() {
  const html = HtmlService.createHtmlOutputFromFile('html/chat_list')
    .setTitle('CellSense - Chats')
    .setWidth(450);
  SpreadsheetApp.getUi().showSidebar(html);
}

export { onOpen, showChatInterface, showChatList };
