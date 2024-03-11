import "./index.sass";
import Filter from "./components/Filter";
import { FC, useEffect, useState } from "react";
import { requestHandler } from "../../../../utils";
import { MonthIncomeInterface } from "../../../../../types";

const Income: FC = () => {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: currentYear - 2023 + 1 },
    (_, i) => ({
      value: String(currentYear - i),
      label: String(currentYear - i),
      key: i,
    })
  );

  const currentMonth = new Date().getMonth();
  let monthOptions = Array.from({ length: 12 }, (_, index) => {
    return {
      value: new Date(currentYear, index).toLocaleString("default", {
        month: "long",
      }),
      label: new Date(currentYear, index).toLocaleString("default", {
        month: "long",
      }),
      key: index,
    };
  });

  const getMonthNumber = (month: string) => {
    return +monthOptions?.find((option) => option.label === month)!.key + 1;
  };

  const currentMonthName = monthOptions?.find(
    (option) => +option.key === currentMonth
  )!.label;

  const [filters, setFilters] = useState<{ [key: string]: string }>({
    selectedMonth: currentMonthName!,
    selectedYear: String(currentYear),
  });

  const [monthIncome, setMonthIncome] = useState<MonthIncomeInterface[]>();

  const getIncome = async () => {
    const response: {
      success: boolean;
      data: MonthIncomeInterface[];
    } = await requestHandler(
      `income?month=${getMonthNumber(filters.selectedMonth)}&year=${
        filters.selectedYear
      }`,
      "GET"
    );
    if (response.success) {
      setMonthIncome(response.data);
    }
  };

  useEffect(() => {
    getIncome();
  }, [filters]);
  console.log(monthIncome);
  return (
    <section className="income">
      <div className="income-main-wrapper">
        <Filter
          {...{
            filters,
            setFilters,
            yearOptions,
            currentYear,
            currentMonth,
            monthOptions,
            currentMonthName,
          }}
        />
      </div>
    </section>
  );
};

export default Income;
