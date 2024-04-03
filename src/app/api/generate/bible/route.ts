import { BibleGenerator } from "@/generators/bible/bible.generator";

export async function GET() {
  const data = await new BibleGenerator().generate();
  return Response.json(data);
}

export const dynamic = 'force-dynamic';
