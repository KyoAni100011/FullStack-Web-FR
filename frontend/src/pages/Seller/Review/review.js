import React from "react";
import Table from "./component/Table";
import AnalyticEcommerce from "../components/statistics/AnalyticEcommerce";

export default function Review() {
  return (
    <React.Fragment>
      <div className="flex flex-row">
        <div className="flex-1 flex flex-col w-auto">
          <div className="m-2 flex flex-rows flex-wrap gap-2">
            <AnalyticEcommerce
              title="Positive Review"
              count="3"
              percentage={59.3}
              extra="12"
            />
            <AnalyticEcommerce
              title="Negative Review"
              count="5"
              percentage={27.3}
              extra="7"
            />
          </div>
          <div className="mt:inline-block hidden">
            <Table />
          </div>
        </div>
      </div>
      <div className="mt:hidden inline-block">
        <Table />
      </div>
    </React.Fragment>
  );
}
