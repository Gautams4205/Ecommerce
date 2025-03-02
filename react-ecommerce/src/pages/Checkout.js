import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DeleteItemfromCartAsync, selectitems, UpdateCartAsync } from "../features/cart/cartSlice";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UpdateUserAsync } from "../features/auth/authSlice";
import { createOrderAsync, selectCurrentOrder } from "../features/order/orderSlice";
import { selectUserInfo } from "../features/user/userSlice";

export default function Checkout() {
  const [SelectedAddress, SetSelectedAddress] = useState(null);
  const [PaymentMethod, SetPaymentMethod] = useState("cash");
  const items = useSelector(selectitems);
  const currentOrder = useSelector(selectCurrentOrder);
  const dispatch = useDispatch();
  const subtotal = items.reduce(
    (amount, item) => Math.round(item.product.price * (1 - item.product.discountPercentage / 100) * 83.52) * item.quantity + amount,
    0
  );

  const user = useSelector(selectUserInfo);

  const handleQuantity = (e, item) => {
    dispatch(UpdateCartAsync({ id: item.id,  quantity: +e.target.value }));
  };

  const handleRemove = (e, itemId) => {
    dispatch(DeleteItemfromCartAsync(itemId));
  };

  const handleAddress = (e) => {
    SetSelectedAddress(user.addresses[e.target.value]);
  };
  const handlePayment = (e) => {
    SetPaymentMethod(e.target.value);
  };
  const handleOrder = () => {
    if (SelectedAddress === null) {
      alert("Please add address");
      return;
    }
    const order = { items, totalitems, subtotal, user, PaymentMethod, SelectedAddress, status: "pending" };
    dispatch(createOrderAsync(order));
  };

  const { register, handleSubmit, reset } = useForm();

  const totalitems = items.reduce((total, item) => item.quantity + total, 0);

  return (
    <>
      {currentOrder && <Navigate to={`/order-success/${currentOrder.id}`}></Navigate>}
      {!items.length && <Navigate to="/"></Navigate>}
      <div className="mx-auto max-w-7xl px-0 sm:px-0 lg:px-0">
        <div className="grid grid-cols-1 gap-x-8 gap-y-1 lg:grid-cols-5">
          <div className="lg:col-span-3 ">
            <form
              className="bg-white px-5 py-8 lg:mt-12 mt-2"
              noValidate
              onSubmit={handleSubmit((data) => {
                dispatch(UpdateUserAsync({ ...user, addresses: [...user.addresses, data] }));
                reset();
              })}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 ">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900 ">Personal Information</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive items.</p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("name", { required: "name is required" })}
                          id="name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", { required: "email is required" })}
                          type="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          type="tel"
                          id="phone"
                          {...register("phone", { required: "phone is required" })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("street", { required: "street is required" })}
                          id="street"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", { required: "city is required" })}
                          id="city"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("state", { required: "state is required" })}
                          id="state"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("pinCode", { required: "pinCode is required" })}
                          id="pinCode"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => reset()}>
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Add Address
                  </button>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">Choose from Existing addresses.</p>
                  <ul>
                    {user.addresses.map((address, index) => (
                      <li key={index} className="flex justify-between gap-x-6 py-2 px-4 border-solid border-2 border-gray-200 my-1">
                        <div className="flex min-w-0 gap-x-4">
                          <input
                            onClick={(e) => handleAddress(e, index)}
                            id="cash"
                            name="address"
                            type="radio"
                            value={index}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {address.street}, {address.city}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.pinCode}</p>
                          </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">Phone: {address.phone}</p>
                          <p className="text-sm leading-6 text-gray-500">{address.state}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">Payment method</legend>
                      <p className="mt-1 text-sm leading-6 text-gray-600">Choose one</p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            onChange={handlePayment}
                            id="cash"
                            name="payment"
                            type="radio"
                            checked={PaymentMethod === "cash"}
                            value="cash"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                            Cash
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            onChange={handlePayment}
                            id="card"
                            name="payment"
                            type="radio"
                            checked={PaymentMethod === "card"}
                            value="card"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                            Card Payment
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="lg:col-span-2">
            <div className="mx-auto lg:mt-12 mt-2 bg-white max-w-5xl px-2 sm:px-2 lg:px-4">
              <div className="border-t border-gray-200 px-1 pb-6 sm:px-1">
                <h1 className="flex text-4xl my-5 mb-8 font-bold tracking-tight text-gray-900 justify-center ">Cart</h1>

                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {items.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img src={item.product.thumbnail} alt={item.product.title} className="h-full w-full object-cover object-center" />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={item.product.href}>{item.product.title}</a>
                              </h3>
                              <p className="ml-4">
                                &#8377;
                                {Math.round(item.product.price * (1 - item.product.discountPercentage / 100) * 83.52)}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label htmlFor="quantity" className="inline mr-4 text-sm font-medium leading-6 text-gray-900">
                                Qty
                              </label>
                              <select onChange={(e) => handleQuantity(e, item)} value={item.quantity}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                              </select>
                            </div>

                            <div className="flex">
                              <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                onClick={(e) => handleRemove(e, item.id)}>
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-2 py-6 sm:px-4 ">
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>&#8377;{subtotal}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Total Items in cart</p>
                  <p>{totalitems} items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div className="mt-6">
                  <div
                    onClick={handleOrder}
                    className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                    Order Now
                  </div>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{" "}
                    <Link to="/">
                      <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
