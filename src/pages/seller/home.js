import BarChart from "../../component/BarChart";
import Layout from "../../component/Layout";
import Tracker from "../../component/Tracker";

export default function HomeSeller() {
  return (
    <div className="flex w-screen h-screen">
      <Layout>
        <div className="flex flex-col w-full h-full">
          <div className="flex flex-row flex-wrap">
            <Tracker
              text="Total Sales"
              smallText="Daily Sales"
              total={22656000}
              daily={121230}
              color="bg-tracker"
            />
            <Tracker
              text="Total Refund"
              smallText="Daily Refund"
              total={2266000}
              daily={821230}
              color="bg-tracker"
            />
          </div>
          <div className="">
            <BarChart />
          </div>
        </div>
      </Layout>
    </div>
  );
}
