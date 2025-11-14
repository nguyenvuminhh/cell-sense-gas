"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_PATHS = exports.CONFIG = void 0;
exports.CONFIG = {
    API_URL: 'https://turgid-unverified-sherril.ngrok-free.dev',
};
exports.API_PATHS = {
    PING: '/ping',
    ROOT: '/',
    CHAT_SEND_MESSAGE: '/chat/send-message',
    CHAT_LIST: '/chat/list',
    CHAT_NEW: '/chat/new',
    CHAT_BY_ID: '/chat/{chat_id}',
    CHAT_MESSAGES: '/chat/{chat_id}/messages',
    DELETE_MESSAGE: '/chat/messages/{message_id}',
    ERROR_500: '/error/500',
    ERROR_404: '/error/404',
    ERROR_400: '/error/400',
    ERROR_HTTP_EXCEPTION: '/error/http_exception',
    ERROR_UNEXPECTED_EXCEPTION: '/error/unexpected_exception',
};
