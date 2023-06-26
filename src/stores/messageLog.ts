import { defineStore } from 'pinia';

interface MessageLog {
  from: string;
  to: string | string[];
  message: string[];
  date: number;
}

const initMessageLog: MessageLog = {
  from: '',
  to: '',
  message: [],
  date: Date.now(),
};

export const useMessageLogStore = defineStore('messageLog', {
  state: () => ({
    messageLog: initMessageLog,
  }),

  getters: {
    getMessageLog(): MessageLog {
      return this.messageLog;
    },
  },
  actions: {
    setMessageLog(messageLog: MessageLog) {
      this.messageLog = messageLog;
    },
  },
});
