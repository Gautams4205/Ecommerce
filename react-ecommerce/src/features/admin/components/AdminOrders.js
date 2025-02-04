import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrdersAsync, selectOrders, selectTotalOrders, UpdateOrderAsync } from "../../order/orderSlice";
import { ITEMS_PER_PAGE } from "../../../app/constant";
import { EyeIcon, PencilIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import Pagenation from "../../common/Pagination";

function AdminOrders() {
  const [Page, SetPage] = useState(1);
  const [Sort, SetSort] = useState({});
  const [EditableOrderId, SetEditableOrderId] = useState(-1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);

  const handleShow = () => {
    console.log("handleshow");
  };

  const handleEdit = (order) => {
    SetEditableOrderId(order.id);
  };

  const handleUpdate = (e, order) => {
    const Updatedorder = { ...order, status: e.target.value };
    dispatch(UpdateOrderAsync(Updatedorder));
    SetEditableOrderId(-1);
  };

  const ChooseColour = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "canceled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  const handleSort = (option) => {
    const sort = { _sort: option.sort };
    SetSort(sort);
  };

  const handlePage = (Page) => {
    SetPage(Page);
  };

  useEffect(() => {
    const Pagination = { _page: Page, _per_page: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ Sort, Pagination }));
  }, [dispatch, Page, Sort]);

  return (
    <div className="overflow-x-auto">
      <div className=" bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
        <div className="w-full ">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th
                    className="py-3 px-6 text-left cursor-pointer"
                    onClick={(e) => handleSort({ sort: Sort._sort === "id" ? "-id" : "id" })}>
                    Order Id{" "}
                    {Sort._sort === "id" ? (
                      <ArrowDownIcon className="inline w-4 h-4"></ArrowDownIcon>
                    ) : (
                      <ArrowUpIcon className="inline w-4 h-4"></ArrowUpIcon>
                    )}
                  </th>
                  <th className="py-3 px-6 text-left justify-center">Items</th>
                  <th
                    className="py-3 px-6 text-center"
                    onClick={(e) => handleSort({ sort: Sort._sort === "subtotal" ? "-subtotal" : "subtotal" })}>
                    {" "}
                    Total amount{" "}
                    {Sort._sort === "subtotal" ? (
                      <ArrowDownIcon className="inline w-4 h-4"></ArrowDownIcon>
                    ) : (
                      <ArrowUpIcon className="inline w-4 h-4"></ArrowUpIcon>
                    )}
                  </th>
                  <th className="py-3 px-6 text-center">Shipping Address</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span className="font-medium">{order.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center">
                          <div className="mr-2">
                            <img className="w-6 h-6 rounded-full" src={item.thumbnail} alt="" />
                          </div>
                          <span>
                            #{item.quantity} - {item.title} - &#8377;
                            {Math.round(item.price * (1 - item.discountPercentage / 100) * 83.52)}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">&#8377; {order.subtotal}</div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className=" items-center justify-center">
                        <div>
                          <strong>{order.SelectedAddress.name}</strong>
                        </div>
                        <div>{order.SelectedAddress.street}</div>
                        <div>
                          {order.SelectedAddress.city}, {order.SelectedAddress.state}
                        </div>
                        <div>{order.SelectedAddress.pinCode}</div>
                        <div>{order.SelectedAddress.phone}</div>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {order.id === EditableOrderId ? (
                        <select onChange={(e) => handleUpdate(e, order)}>
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="canceled">Canceled</option>
                        </select>
                      ) : (
                        <span className={`${ChooseColour(order.status)} py-1 px-3 rounded-full text-xs`}>{order.status}</span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-4 mr-4  transform hover:text-purple-500 hover:scale-110">
                          <EyeIcon className="w-6 h-6" onClick={(e) => handleShow(order)}></EyeIcon>
                        </div>
                        <div className="w-4 mr-4  transform hover:text-purple-500 hover:scale-110">
                          <PencilIcon className="w-6 h-6" onClick={(e) => handleEdit(order)}></PencilIcon>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Pagination start here */}
      <Pagenation handlePage={handlePage} Page={Page} totalItems={totalOrders}></Pagenation>
    </div>
  );
}

export default AdminOrders;
