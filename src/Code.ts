import {
  createChat,
  getLatestChat,
  getChatMessages,
  getChatList,
  getChat,
} from './services/chatService';
import { handleMessage } from './services/messageService';
import {
  getCurrentUser,
  updateGeminiApiKey,
  updateChatGPTApiKey,
  updateClaudeApiKey,
  getUserQuota,
} from './services/userService';

/**
 * Main entry point - Creates the CellSense menu on spreadsheet open
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('CellSense')
    .addItem('My Profile', 'showProfile')
    .addSeparator()
    .addItem('New Chat', 'createNewChat')
    .addItem('Chat History', 'showChatList')
    .addItem('Most Recent Chat', 'showLatestChat')
    .addToUi();
}

/**
 * Open a specific chat by ID (if chatId is 0, opens the latest chat)
 */
function openChatById(chatId: number) {
  let chatResponse;

  if (chatId === 0) {
    chatResponse = getLatestChat();
  } else {
    chatResponse = getChat(chatId);
  }

  if ('error' in chatResponse) {
    SpreadsheetApp.getUi().alert(`Failed to load chat: ${chatResponse.error}`);
    return;
  }

  const actualChatId = chatResponse.id;
  const messagesResponse = getChatMessages(actualChatId);
  const messages = 'error' in messagesResponse ? [] : messagesResponse;

  const template = HtmlService.createTemplateFromFile('html/chat_interface');
  template.chatId = actualChatId;
  template.messages = JSON.stringify(messages);

  const html = template.evaluate().setTitle(chatResponse.title).setWidth(450);
  SpreadsheetApp.getUi().showSidebar(html);
}

/**
 * Show the chat interface sidebar with the latest chat
 */
function showLatestChat() {
  openChatById(0);
}

/**
 * Show the chat list sidebar
 */
function showChatList() {
  const chatsResponse = getChatList();
  const chats = 'error' in chatsResponse ? [] : chatsResponse;

  const template = HtmlService.createTemplateFromFile('html/chat_list');
  template.chats = JSON.stringify(chats);

  const html = template.evaluate().setTitle('CellSense - Chats').setWidth(450);
  SpreadsheetApp.getUi().showSidebar(html);
}

/**
 * Create new chat and call showLatestChat to display it
 */
function createNewChat() {
  const response = createChat();

  if ('error' in response) {
    SpreadsheetApp.getUi().alert(`Failed to create new chat: ${response.error}`);
    return;
  }

  showLatestChat();
}

/**
 * Show the user profile sidebar
 */
function showProfile() {
  const userResponse = getCurrentUser();

  if ('error' in userResponse) {
    SpreadsheetApp.getUi().alert(`Failed to load profile: ${userResponse.error}`);
    return;
  }

  const quotaResponse = getUserQuota();
  const quota = 'error' in quotaResponse ? null : quotaResponse;

  const template = HtmlService.createTemplateFromFile('html/profile');
  template.userData = JSON.stringify(userResponse);
  template.quotaData = JSON.stringify(quota);

  const html = template.evaluate().setTitle('My Profile').setWidth(450);
  SpreadsheetApp.getUi().showSidebar(html);
}

/**
 * Update user's Gemini API key
 */
function updateUserGeminiApiKey(apiKey: string) {
  return updateGeminiApiKey(apiKey);
}

/**
 * Update user's ChatGPT API key
 */
function updateUserChatGPTApiKey(apiKey: string) {
  return updateChatGPTApiKey(apiKey);
}

/**
 * Update user's Claude API key
 */
function updateUserClaudeApiKey(apiKey: string) {
  return updateClaudeApiKey(apiKey);
}

export {
  onOpen,
  showLatestChat,
  showChatList,
  createNewChat,
  openChatById,
  showProfile,
  updateUserGeminiApiKey,
  updateUserChatGPTApiKey,
  updateUserClaudeApiKey,
  handleMessage,
};
