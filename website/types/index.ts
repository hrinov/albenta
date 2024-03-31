import { ReactNode, SetStateAction } from "react";

export interface MeResponse {
  success?: boolean;
  message?: string;
  data?: {
    access_token: string;
    refresh_token: string;
    id: number;
    email: string;
    name: string;
    balance: number;
    avatar: string;
  };
}

export interface DepositInterface {
  amount: number;
  created_at: string;
  end_date: string;
  hours: number;
  id: number;
  percent: number;
  user_id: number;
  profit: number;
  total_sum: number;
  closed: boolean;
}

export interface ActivityInterface {
  ip: number;
  country: string;
  device: string;
  browser: string;
  date: string;
  type: string;
}

export interface NavItemInterface {
  name: string;
  label: ReactNode;
  children?: ReactNode;
  openedElement?: string | undefined;
  setOpenedElement?: React.Dispatch<SetStateAction<string | undefined>>;
}

export interface AccountProps {
  type: string;
}

export interface MonthIncomeInterface {
  data: { day: number; amount: number }[];
  total: number;
  average: number;
  daysInMonth: number;
}

export interface IncomeFilterProps {
  filters: { [key: string]: string };
  setFilters: React.Dispatch<SetStateAction<{ [key: string]: string }>>;
  yearOptions: { value?: string; label: string; key: number }[];
  currentYear: number;
  currentMonth: number;
  monthOptions: { value?: string; label: string; key: number }[];
  currentMonthName: string;
}

export interface ChartInterface {
  loading: boolean;
  filters: { [key: string]: string };
  monthIncome: MonthIncomeInterface;
}
