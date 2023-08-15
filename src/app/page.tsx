import PaginationBar from "@/components/PaginationBar";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";

interface HomeProps {
  searchParams: { page: string };
}

export default async function Home({
  searchParams: { page = "1" },
}: HomeProps) {
  const currentPage = parseInt(page);
  const pageSize = 6;
  const heroItemCount = 1;
  const totalItemCount = await prisma.product.count();

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    skip:
      (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  });
  return (
    <main className=" flex flex-col items-center lg:mx-20">
      {currentPage === 1 && (
        <div className=" relative h-[150px] w-full grid-cols-1 overflow-hidden rounded-xl bg-pink-200 shadow-xl md:h-[350px]">
          <Image
            src={products[0].imageUrl}
            alt={products[0].name}
            width={1000}
            height={1000}
            className=" col-span-1 w-full object-center"
            priority
          ></Image>
          <div className="absolute top-0 h-full w-full bg-black/20">
            <div className="flex h-full w-full flex-col items-center justify-center px-5">
              <h1 className=" text-xl font-bold text-base-100 md:text-5xl">
                {products[0].name}
              </h1>
              <p className=" py-2 text-center text-sm text-base-100 md:py-6 md:text-base">
                {products[0].description}
              </p>
              <Link
                href={`/products/${products[0].id}`}
                className=" btn-sm btn bg-base-100 text-xs text-gray-700 md:btn md:text-base"
              >
                ORDER NOW
              </Link>
            </div>
          </div>
        </div>
        //   <div className=" hero-content flex-col md:flex-row">
        //     <Image
        //       src={products[0].imageUrl}
        //       alt={products[0].name}
        //       width={400}
        //       height={800}
        //       className="w-full max-w-sm rounded-lg shadow-2xl"
        //       priority
        //     />
        //     <div>
        //       <h1 className="text-5xl font-bold">{products[0].name}</h1>
        //       <p className="py-6">{products[0].description}</p>
        //       <Link
        //         href={`/products/${products[0].id}`}
        //         className="btn-primary btn"
        //       >
        //         ORDER NOW
        //       </Link>
        //     </div>
        //   </div>
        // </div>
      )}
      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {(currentPage === 1 ? products.slice(1) : products).map((products) => {
          return <ProductCard product={products} key={products.id} />;
        })}
      </div>
      {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      )}
    </main>
  );
}
