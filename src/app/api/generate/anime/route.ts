import { AnimeGenerator } from "@/generators/anime/anime.generator";

export async function GET() {
  const data = await new AnimeGenerator().generate();
  return Response.json(data);
}

export const dynamic = 'force-dynamic';
