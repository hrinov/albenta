import { FC, useEffect, useState } from "react";
import "./index.sass";
import { MonthIncomeInterface } from "../../../../../types";
import { requestHandler } from "../../../../utils";

const Income: FC = () => {
  const month = 2;
  const year = 2024;
  const [monthIncome, setMonthIncome] = useState<MonthIncomeInterface[]>();

  const getIncome = async () => {
    const response: {
      success: boolean;
      data: MonthIncomeInterface[];
    } = await requestHandler(`income?month=${month}&year=${year}`, "GET");
    if (response.success) {
      setMonthIncome(response.data);
    }
  };

  useEffect(() => {
    getIncome();
  }, []);

  return (
    <section className="income">
      <div className="income-main-wrapper"></div>
    </section>
  );
};

export default Income;
