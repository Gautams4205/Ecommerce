export function fetchAllproductByfilter(filter, Sort, Pagination) {
  // let querystring = "";

  // for (let key in Sort) {
  //   querystring += `${key}=${Sort[key]}&`;
  // }

  // for (let key in filter) {
  //   const CategoryValues = filter[key];
  //   if (CategoryValues.length) {
  //     const LastCategoryValues = CategoryValues[CategoryValues.length - 1];
  //     querystring += `${key}=${LastCategoryValues}&`;
  //   }
  // }
  // for (let key in Pagination) {
  //   querystring += `${key}=${Pagination[key]}&`;
  // }

  return new Promise(async (resolve) => {
    let response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductbyId(id) {
  return new Promise(async (resolve) => {
    let response = await fetch("http://localhost:8080/products/" + id); //http://localhost:8080/products/
    const data = await response.json();
    resolve({ data });
  });
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    let response = await fetch("http://localhost:8080/products/", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function UpdateProduct(update) {
  return new Promise(async (resolve) => {
    let response = await fetch("http://localhost:8080/products/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllbrands() {
  return new Promise(async (resolve) => {
    let response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllcategories() {
  return new Promise(async (resolve) => {
    let response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    resolve({ data });
  });
}
