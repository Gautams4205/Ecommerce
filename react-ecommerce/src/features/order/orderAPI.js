export function createOrder(order) {
  return new Promise(async (resolve) => {
    let response = await fetch("http://localhost:8080/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function UpdateOrder(order) {
  return new Promise(async (resolve) => {
    let response = await fetch("http://localhost:8080/orders/" + order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrders(Sort,Pagination) {
  let querystring = "";
  for (let key in Sort) {
    querystring += `${key}=${Sort[key]}&`;
  }

  for (let key in Pagination) {
    querystring += `${key}=${Pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders?" + querystring);
    const data = await response.json();
    resolve({ data });
  });
}
