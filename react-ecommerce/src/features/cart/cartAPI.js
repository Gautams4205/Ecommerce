// A mock function to mimic making an async request for data
export function AddtoCart(item) {
  return new Promise(async (resolve) => {
    let response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchItemsByUserId(UserId) {
  return new Promise(async (resolve) => {
    let response = await fetch("http://localhost:8080/cart?user=" + UserId);
    const data = await response.json();
    resolve({ data });
  });
}

export function UpdateCart(update) {
  return new Promise(async (resolve) => {
    let response = await fetch("http://localhost:8080/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function DeleteItemfromCart(itemId) {
  return new Promise(async (resolve) => {
    let response = await fetch("http://localhost:8080/cart/" + itemId, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    // eslint-disable-next-line
    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
}

export function resetCart(userId) {
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId(userId);
    const items = response.data;
    for (let item of items) {
      await DeleteItemfromCart(item.id);
    }
    resolve({ status: "success" });
  });
}
