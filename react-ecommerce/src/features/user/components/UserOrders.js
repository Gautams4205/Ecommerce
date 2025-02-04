import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUserOrdersAsync, selectUserInfo, selectUserOrders } from "../userSlice";

export default function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, [dispatch, user]);

  return (
    <div>
      {orders.map((order, index) => (
        <div key={index}>
          <div className="mx-auto mt-12 bg-white max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h1 className="text-4xl my-6 font-bold tracking-tight text-gray-900">Order #{order.id}</h1>
              <h3 className="text-xl m-6 font-bold tracking-tight text-red-900">Order status : {order.status}</h3>
              <div className="flow-root">
                <ul className="-my-6 divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover object-center" />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={item.href}>{item.title}</a>
                            </h3>
                            <p className="ml-4">
                              &#8377;
                              {Math.round(item.price * (1 - item.discountPercentage / 100) * 83.52)}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label htmlFor="quantity" className="inline mr-4 text-sm font-medium leading-6 text-gray-900">
                              Qty:{item.quantity}
                            </label>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>&#8377;{order.subtotal}</p>
              </div>
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Total Items in cart</p>
                <p>{order.totalitems} items</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shiping Address :</p>
              <div className="flex justify-between gap-x-6 py-2 px-4 border-solid border-2 border-gray-200 my-1">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{order.SelectedAddress.name}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {order.SelectedAddress.street}, {order.SelectedAddress.city}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.SelectedAddress.pinCode}</p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">Phone: {order.SelectedAddress.phone}</p>
                  <p className="text-sm leading-6 text-gray-500">{order.SelectedAddress.state}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
