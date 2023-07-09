import React from 'react';

const ReviewTable = ({ products }) => {
  return (
    <div className="container mx-10 justify-center flex flex-col max-w-max mt-5">
      <h1 className="text-2xl font-bold mb-4">Product Table</h1>
      <table className="border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 p-2">Title</th>
            <th className="border border-gray-400 p-2">Review</th>
            <th className="border border-gray-400 p-2">Price</th>
            <th className="border border-gray-400 p-2">Status</th>
            <th className="border border-gray-400 p-2">Post date</th>
            <th className="border border-gray-400 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td className="border border-gray-400 p-2">{product.title}</td>
              <td className="border border-gray-400 p-2">{product.description}</td>
              <td className="border border-gray-400 p-2">{product.price}</td>
              <td className="border border-gray-400 p-2">{product.visibility}</td>
              <td className="border border-gray-400 p-2">{product.postDate}</td>
              <td className="border border-gray-400 p-2">
                <button className='px-2 py-1 bg-blue-400 rounded-xl'>Add comment</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewTable;
