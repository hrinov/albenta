export interface MeResponse {
  success: boolean;
  data: {
    access_token: string;
    refresh_token: string;
    email: string;
    name: string;
    balance: number;
  };
}

export interface DepositInterface {
  amount: number;
  created_at: string;
  hours: number;
  id: number;
  percent: number;
  user_id: number;
}
