interface WebSocketRequest extends IncomingMessage {
  url?: string;
}

interface Deposit {
  created_at: string;
  hours: number;
  percent: number;
}
