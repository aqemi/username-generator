import { GachaGenerator } from "@/generators/gacha/gacha.generator";

export async function GET() {
  const data = await new GachaGenerator().generate();
  return Response.json(data);
}

export const dynamic = 'force-dynamic';
