interface WebSocketRequest extends IncomingMessage {
  url?: string;
}

interface Deposit {
  created_at: string;
  hours: number;
  percent: number;
  amount: number;
  closed: boolean;
}

interface Activity {
  browser: string;
  country: string;
  date: Date;
  device: string;
  id: number;
  ip: number;
  type: string;
  user_id: number;
}
