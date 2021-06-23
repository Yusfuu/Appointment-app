export default {
  async post(url = "", data = {}) {
    const config = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, config);
    return response.json();
  },
  async get(url = "", bearer = "") {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "application/json"`Bearer ${bearer}`,
      }
    };

    const response = await fetch(url, config);
    return response.json();
  },
  async auth() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };


    const response = await fetch("http://localhost:8000/api/auth", requestOptions);
    return response.json();
  },
}