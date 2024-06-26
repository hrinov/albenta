interface RootStateInterface {
  user: {
    id: number;
    name: string;
    email: string;
    balance: number;
    avatar: string;
  } | null;
  deposits: {
    active: DepositInterface[] | [];
    ready: DepositInterface[] | [];
    closed: DepositInterface[] | [];
  } | null;
}

interface PayloadInterface {
  [key: string]: any;
}

interface MeResponse {
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

interface DepositInterface {
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

interface ActivityInterface {
  platform: string;
  country: string;
  device: string;
  browser: string;
  date: string;
  type: string;
}

interface NavItemInterface {
  name: string;
  label: ReactNode;
  children?: ReactNode;
  openedElement?: string | undefined;
  setOpenedElement?: React.Dispatch<SetStateAction<string | undefined>>;
}

interface AccountProps {
  type: string;
}

interface MonthIncomeInterface {
  data: { day: number; amount: number }[];
  total: number;
  average: number;
  daysInMonth: number;
}

interface IncomeFilterProps {
  filters: { [key: string]: string };
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  setFilters: React.Dispatch<SetStateAction<{ [key: string]: string }>>;
  yearOptions: { value?: string; label: string; key: number }[];
  currentYear: number;
  currentMonth: number;
  monthOptions: { value?: string; label: string; key: number }[];
  currentMonthName: string;
}

interface ChartInterface {
  loading: boolean;
  filters: { [key: string]: string };
  monthIncome: MonthIncomeInterface | undefined;
}

interface ModalWindowOptionsInterface {
  type: boolean;
  amount: number | null;
  depositId: number | null;
}

interface ModalWindowInterface {
  depositsLimit: number;
  isWithdrawModalOpen: {
    type: boolean;
    amount: number | null;
    depositId: number | null;
  };
  handleWithdrawModal: (
    type: boolean,
    amount: number | null,
    depositId: number | null
  ) => void;
}

interface DepositsInterface {
  handleWithdrawModal: (
    type: boolean,
    amount: number | null,
    depositId: number
  ) => void;
  depositsLimit: number;
  setDepositsLimit: React.Dispatch<SetStateAction<number>>;
}
