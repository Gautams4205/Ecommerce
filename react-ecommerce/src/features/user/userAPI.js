// A mock function to mimic making an async request for data
export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) => {
    let response = await fetch("http://localhost:8080/users/" + userId);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    let response = await fetch("http://localhost:8080/orders/?user.id=" + userId);
    const data = await response.json();
    resolve({ data });
  });
}


export function UpdateUser(update) {
  return new Promise(async (resolve) => {
    let response = await fetch("http://localhost:8080/users/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}