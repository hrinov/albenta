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
