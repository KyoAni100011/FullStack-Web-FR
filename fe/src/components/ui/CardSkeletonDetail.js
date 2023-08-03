import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import React from "react";

export default function CardSkeletonDetail() {
  return (
    <React.Fragment>
      <div className="lg:w-1/2 w-full object-cover object-center">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 className="text-sm title-font uppercase text-gray-500 tracking-widest">
          <Skeleton height={20} className="w-3/12" />
        </h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
          <Skeleton height={40} width={100} />
        </h1>
        <div className="flex mb-4">
          <span className="flex items-center">
            <ThumbUpIcon />
            <Skeleton width={60} height={20} className="ml-3" />
            <span className="text-gray-600 ml-3">Reviews</span>
          </span>
          <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
            <a href="/#" className="text-gray-500">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a href="/#" className="ml-2 text-gray-500">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            <a href="/#" className="ml-2 text-gray-500">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
              </svg>
            </a>
          </span>
          <div className="ml-3 border-l-2">
            <button className="rounded-full hover:text-blue-500 w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
              <ThumbUpIcon></ThumbUpIcon>
            </button>
          </div>
        </div>
        <p className="leading-relaxed">
          <Skeleton height={20} count={6} />
        </p>
        <div className="mt-6 pb-5 border-b-2 border-gray-200 mb-5"></div>
        <div>
          <div className="first-part">
            <div className="sub-first-part">
              <div>
                <span className="flex items-center title-font font-medium text-2xl text-gray-900">
                  <p>Price :</p>
                  <Skeleton width={60} height={20} className="mx-3" />
                  <span className="inline-block">$</span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex md:items-center sm:flex-row flex-col mt-6">
            <span className="font-bold text-lg mr-6 max-sm:mb-2">
              Quantites :{" "}
            </span>
            <div className="flex items-center">
              <div className="custom-number-input h-10 w-32">
                <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent">
                  <button
                    data-action="decrement"
                    className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                  >
                    <span className="m-auto text-2xl font-thin">−</span>
                  </button>
                  <input
                    type="number"
                    className="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                    name="custom-input-number"
                    readOnly
                    defaultValue={1}
                  />
                  <button
                    data-action="increment"
                    className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                  >
                    <span className="m-auto text-2xl font-thin">+</span>
                  </button>
                </div>
              </div>
              <span className="ml-4 text-gray-500 text-sm">
                159 products are available
              </span>
            </div>
          </div>
          <div className="second-part flex mt-6 md:items-center sm:flex-row flex-col">
            <div className="sm:mr-4 max-sm:w-full">
              <button className="flex ml-auto max-sm:w-full max-sm:mb-2 max-sm:block text-white bg-green-sheen hover:bg-emerald border-0 py-3 px-7 focus:outline-none rounded">
                Add To Cart
              </button>
            </div>
            <div className="max-sm:grow">
              <button className="flex ml-auto w-full max-sm:block text-white bg-red-500 hover:bg-red-600 border-0 py-3 px-7 focus:outline-none rounded">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}