// import Layout from "../../../component/Layout";
// import Tracker from "../../../component/Tracker";
// import { NavLink } from "react-router-dom";

// export default function Products() {

//   return (
//     <div className="flex w-screen h-screen">
//       <Layout>
//         <div className="flex flex-col flex-wrap w-full h-full">
//           <div className="flex flex-row flex-wrap">
//             <Tracker
//               text="Available"
//               smallText="Total"
//               total={12}
//               daily={12423}
//               color="bg-green-500"
//             />
//             <Tracker
//               text="Sold"
//               smallText="Total"
//               total={3}
//               daily={821230}
//               color="bg-red-500"
//             />
//             <Tracker
//               text="Shipping"
//               smallText="Total"
//               total={8}
//               daily={821230}
//               color="bg-blue-500"
//             />
//             <Tracker
//               text="Refund"
//               smallText="Total"
//               total={10}
//               daily={334230}
//               color="bg-tracker"
//             />
//           </div>
//           <div>
//           <NavLink to="/seller/products/new" className='ml-10 p-2 rounded-lg bg-blue-500'>Add new products</NavLink>
//           </div>
//         </div>
//       </Layout>
//     </div>
//   );
// }

import React, { useState } from "react";
import Layout from "../../../component/Layout";
import Tracker from "../../../component/Tracker";
import { NavLink } from "react-router-dom";
import ProductTable from "../../../component/Table";
import defaultProducts from "../../../Model/data";

export default function Products() {
  return (
    <div className="flex w-screen h-screen">
      <Layout>
        <div className="flex flex-col flex-wrap w-full h-full">
          <div className="flex flex-row flex-wrap">
            <Tracker
              text="Available"
              smallText="Total"
              total={12}
              daily={12423}
              color="bg-green-500"
            />
            <Tracker
              text="Sold"
              smallText="Total"
              total={3}
              daily={821230}
              color="bg-red-500"
            />
            <Tracker
              text="Shipping"
              smallText="Total"
              total={8}
              daily={821230}
              color="bg-blue-500"
            />
            <Tracker
              text="Refund"
              smallText="Total"
              total={10}
              daily={334230}
              color="bg-tracker"
            />
          </div>
          <div>
            <NavLink
              to="/seller/products/new"
              className="ml-10 p-2 rounded-lg bg-blue-500"
            >
              Add new products
            </NavLink>
          </div>
          <div>
            <ProductTable products={defaultProducts} />
          </div>
        </div>
      </Layout>
    </div>
  );
}
