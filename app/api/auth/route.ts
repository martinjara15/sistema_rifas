export async function POST(request: Request) {
  const { password } = await request.json();
  const demoPassword = process.env.DEMO_PASSWORD || "demo2025";

  if (password === demoPassword) {
    return Response.json({ success: true });
  }

  return Response.json({ error: "Clave incorrecta" }, { status: 401 });
}
