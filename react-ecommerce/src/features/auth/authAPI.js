// A mock function to mimic making an async request for data
export function CreateUser(Userdata) {
  return new Promise(async (resolve) => {
    let response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      body: JSON.stringify(Userdata),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function CheckUser(logindata) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        body: JSON.stringify(logindata),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject({ error });
      }
    } catch (error) {
      reject({ error });
    }
  });
}

export function SignOut(UserId) {
  return new Promise(async (resolve) => {
    resolve({ data: "Success" });
  });
}
