import "./index.sass";
import { FC } from "react";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

const Filter: FC<IncomeFilterProps> = ({
  filters,
  setFilters,
  yearOptions,
  currentYear,
  currentMonth,
  monthOptions,
  currentMonthName,
}) => {
  const availableMonthOptions = monthOptions?.filter(
    (_, i) => +filters.selectedYear !== currentYear || i <= currentMonth
  );

  const isCurrentMonthInFilter =
    filters.selectedMonth !== currentMonthName ||
    +filters.selectedYear !== currentYear;

  const createFilter = (options: any, filterName: string) => {
    const isActive =
      filterName === "selectedMonth"
        ? isCurrentMonthInFilter
        : +filters.selectedYear !== currentYear;

    const filterType =
      filterName === "selectedMonth" ? "month-filter" : "year-filter";

    return (
      <Dropdown
        className={`${filterType} ${isActive && "active"}`}
        menu={{
          items: options.map((item: any, i: number) => ({
            key: i,
            label: (
              <a
                className={filters[filterName] == item.label ? "active" : ""}
                onClick={() =>
                  setFilters({
                    ...filters,
                    ...(filterName === "selectedYear"
                      ? { selectedMonth: "January" }
                      : {}),
                    [filterName]: options?.find((item: any) => +item.key === i)!
                      .label,
                  })
                }
                children={item.label}
              />
            ),
          })),
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            {filters[filterName]}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    );
  };

  return (
    <div className={"filters-wrapper"}>
      <div className={"filters"}>
        {createFilter(availableMonthOptions, "selectedMonth")}
        {createFilter(yearOptions, "selectedYear")}
      </div>
    </div>
  );
};

export default Filter;
