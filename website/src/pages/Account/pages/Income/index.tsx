import "./index.sass";
import Chart from "./components/Chart";
import Filter from "./components/Filter";
import { FC, useEffect, useState } from "react";
import {
  getDataOptions,
  getDaysInMonth,
  requestHandler,
} from "../../../../utils";

const Income: FC = () => {
  const {
    currentYear,
    yearOptions,
    currentMonth,
    monthOptions,
    currentMonthName,
  } = getDataOptions();

  const [loading, setLoading] = useState<boolean>(true);
  const [monthIncome, setMonthIncome] = useState<MonthIncomeInterface>();
  const [filters, setFilters] = useState<{ [key: string]: string }>({
    selectedMonth: currentMonthName!,
    selectedYear: String(currentYear),
  });

  const getIncome = async () => {
    const getMonthNumber = (month: string) => {
      return +monthOptions?.find((option) => option.label === month)!.key + 1;
    };

    try {
      const response: any = await requestHandler(
        `income?month=${getMonthNumber(filters.selectedMonth)}&year=${
          filters.selectedYear
        }`,
        "GET"
      );

      if (response?.success) {
        const { data, total, average } = response;
        const daysInMonth = getDaysInMonth(currentMonth);
        setMonthIncome({ data, total, average, daysInMonth });
      }
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getIncome();
  }, [filters]);

  return (
    <section className="income">
      <div className="income-main-wrapper">
        <Filter
          {...{
            filters,
            setLoading,
            setFilters,
            yearOptions,
            currentYear,
            currentMonth,
            monthOptions,
            currentMonthName,
          }}
        />
        <Chart
          {...{
            loading,
            monthOptions,
            filters,
            currentMonth,
            currentYear,
            monthIncome,
          }}
        />
      </div>
    </section>
  );
};

export default Income;
