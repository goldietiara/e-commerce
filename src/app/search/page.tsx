import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import { title } from "process";

interface searchPageProps {
  searchParams: { query: string };
}

export function generateMetadata({
  searchParams: { query },
}: searchPageProps): Metadata {
  return { title: `Shop for ${query} | Owy Shoppy` };
}

export default async function SearchPage({
  searchParams: { query },
}: searchPageProps) {
  const product = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { id: "desc" },
  });

  if (product.length === 0) {
    return <div className="text-center">no product</div>;
  }
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {product.map((v) => (
        <ProductCard product={v} key={v.id} />
      ))}
    </div>
  );
}
