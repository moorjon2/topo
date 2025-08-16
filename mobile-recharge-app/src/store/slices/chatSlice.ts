import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Conversation, Message } from '../../types/chat';

export interface ChatState {
  conversations: Conversation[];
  messages: { [conversationId: string]: Message[] };
  activeConversation: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  conversations: [],
  messages: {},
  activeConversation: null,
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload;
    },
    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations.unshift(action.payload);
    },
    updateConversation: (state, action: PayloadAction<Conversation>) => {
      const index = state.conversations.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.conversations[index] = action.payload;
      }
    },
    setMessages: (state, action: PayloadAction<{ conversationId: string; messages: Message[] }>) => {
      state.messages[action.payload.conversationId] = action.payload.messages;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      const conversationId = action.payload.conversationId;
      if (!state.messages[conversationId]) {
        state.messages[conversationId] = [];
      }
      state.messages[conversationId].push(action.payload);
    },
    updateMessage: (state, action: PayloadAction<Message>) => {
      const conversationId = action.payload.conversationId;
      const messages = state.messages[conversationId];
      if (messages) {
        const index = messages.findIndex(m => m.id === action.payload.id);
        if (index !== -1) {
          messages[index] = action.payload;
        }
      }
    },
    setActiveConversation: (state, action: PayloadAction<string | null>) => {
      state.activeConversation = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearChat: (state) => {
      state.conversations = [];
      state.messages = {};
      state.activeConversation = null;
      state.error = null;
    },
  },
});

export const {
  setConversations,
  addConversation,
  updateConversation,
  setMessages,
  addMessage,
  updateMessage,
  setActiveConversation,
  setLoading,
  setError,
  clearChat,
} = chatSlice.actions;
export default chatSlice.reducer;