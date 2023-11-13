export async function getIngredientes() {
  const req = await fetch('http://localhost:3000/ingredientes');
  const data = await req.json();
  return data;
}
