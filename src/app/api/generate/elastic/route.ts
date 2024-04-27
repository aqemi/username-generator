import { ElasticGenerator } from "@/generators/elastic/elastic.generator";

export async function GET() {
  const data = await new ElasticGenerator().generate();
  return Response.json(data);
}

export const dynamic = 'force-dynamic';
