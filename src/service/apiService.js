const apiUrl = "http://localhost:3000";

export async function getIngredientes() {
  const req = await fetch(`${apiUrl}/ingredientes`);
  const data = await req.json();
  return data;
}

export async function createBurger(data) {
  const dataJson = JSON.stringify(data);
  const req = await fetch(`${apiUrl}/burgers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: dataJson,
  });
  const res = await req.json();
  return res;
}


export async function getPedidos() {
  const req = await fetch(`${apiUrl}/burgers`);
  const data = await req.json();
  return data;
}

export async function getStatus() {
  const req = await fetch(`${apiUrl}/status`);
  const data = await req.json();
  return data;
}

export async function deletePedido(id) {
  const req = await fetch(`${apiUrl}/burgers/${id}`, {
    method: "DELETE",
  });
  const res = await req.json();
  return res;
}

export async function updateStatus(id, status) {
  const dataJson = JSON.stringify({ status });
  const req = await fetch(`${apiUrl}/burgers/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: dataJson,
  });
  const res = await req.json();
  return res;
}
