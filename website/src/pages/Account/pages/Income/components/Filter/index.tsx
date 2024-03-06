import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Typography, Space } from "antd";
import { FC, useState } from "react";
import "./index.sass";

const Filter: FC = () => {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: currentYear - 2023 + 1 },
    (_, i) => ({
      label: String(currentYear - i),
      key: String(i),
    })
  );
  const currentMonth = new Date().getMonth() + 1;
  let monthOptions = Array.from({ length: 12 }, (_, index) => {
    return {
      label: new Date(currentYear, index).toLocaleString("default", {
        month: "long",
      }),
      key: String(index + 1),
    };
  });
  const getMonthNumber = (month: string) => {
    return monthOptions?.find((option) => option.label === month)!.key;
  };
  const currentMonthName = monthOptions?.find(
    (option) => +option.key === currentMonth
  )!.label;

  const [filters, setFilters] = useState<{ [key: string]: string }>({
    selectedMonth: currentMonthName!,
    selectedYear: String(currentYear),
  });

  const availableMonthOptions = monthOptions?.filter(
    (month, i) => +filters.selectedYear !== currentYear || i < currentMonth
  );

  const isCurrentMonthInFilter =
    filters.selectedMonth !== currentMonthName ||
    filters.selectedYear !== String(currentYear);

  const createFilter = (options: any, filterName: string) => {
    const isActive =
      filterName === "selectedMonth"
        ? isCurrentMonthInFilter
        : filters.selectedYear !== String(currentYear);
    const filterType =
      filterName === "selectedMonth" ? "month-filter" : "year-filter";

    // const { data, loading } = useGetDashboardQuery({
    //   variables: {
    //     input: {
    //       dateRange: {
    //         fromDate: `${filters.selectedYear}-${getMonthNumber(
    //           filters.selectedMonth
    //         )
    //           .toString()
    //           .padStart(2, "0")}-01T00:00:00`,
    //         toDate: `${
    //           filters.selectedMonth !== "December"
    //             ? filters.selectedYear
    //             : +filters.selectedYear + 1
    //         }-${
    //           filters.selectedMonth !== "December"
    //             ? (+getMonthNumber(filters.selectedMonth) + 1)
    //                 .toString()
    //                 .padStart(2, "0")
    //             : "01"
    //         }-01T00:00:00`,
    //       },
    //     },
    //   },
    // });

    return (
      <Dropdown
        className={`${filterType} ${isActive && "active"}`}
        trigger={["click"]}
        overlay={
          <Menu
            onClick={(e) =>
              setFilters({
                ...filters,
                ...(filterName === "selectedYear"
                  ? { selectedMonth: "January" }
                  : {}),
                [filterName]: options?.find(
                  (item: any) => +item.key === +e.key
                )!.label,
              })
            }
            selectedKeys={[
              `${options?.find(
                (item: any) => item.label === filters[filterName]
              )!.key}`,
            ]}
          >
            {options.map((item: any) => (
              <Menu.Item key={item.key}>{item.label}</Menu.Item>
            ))}
          </Menu>
        }
      >
        <Typography.Link>
          <Space className={"dropdown"}>
            {
              options?.find((item: any) => item.label === filters[filterName])!
                .label
            }
            <DownOutlined style={{ color: "black" }} />
          </Space>
        </Typography.Link>
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
