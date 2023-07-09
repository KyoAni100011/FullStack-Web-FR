import defaultDataReview from "../../../Model/dataReview";
import Layout from "../../../component/Layout";
import ReviewTable from "../../../component/TableReview";
import Tracker from "../../../component/Tracker";

export default function Review () {
    return (
        <Layout>
        <div className="flex flex-col w-full h-full">
          <div className="flex flex-row flex-wrap">
            <Tracker
              text="Positive Review"
              smallText="In total"
              total={2}
              daily={12}
              color="bg-green-500"
            />
            <Tracker
              text="Negative Review"
              smallText="In total"
              total={3}
              daily={82}
              color="bg-tracker"
            />
          </div>
          <div>
          <ReviewTable products={defaultDataReview}/>
            {/* <ProductTable products={defaultProducts} /> */}
          </div>
        </div>
      </Layout>
    )
}