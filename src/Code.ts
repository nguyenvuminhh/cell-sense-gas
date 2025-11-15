import {
  createChat,
  getLatestChat,
  getChatMessages,
  getChatList,
  getChat,
} from './services/chatService';
import { handleMessage } from './services/messageService';

/**
 * Main entry point - Creates the CellSense menu on spreadsheet open
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('CellSense')
    .addItem('Most Recent Chat', 'showLatestChat')
    .addItem('Chat History', 'showChatList')
    .addItem('New Chat', 'createNewChat')
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

export { onOpen, showLatestChat, showChatList, createNewChat, openChatById, handleMessage };
