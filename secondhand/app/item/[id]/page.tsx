import { notFound } from "next/navigation";
import { products } from "../../data/products";
import Image from "next/image";

export default async function ItemDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await Promise.resolve(params);
  const product = products.find((p) => p.id === id);
  if (!product) return notFound();

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white rounded-2xl shadow-md p-6 border border-gray-100">
      <div className="relative w-full h-64 bg-gray-50 mb-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>
      <h1 className="font-bold text-2xl mb-2">{product.name}</h1>
      <p className="text-lg text-gray-900 font-semibold mb-4">
        ${product.price.toFixed(2)}
      </p>
      <p className="text-gray-700 mb-4">Product ID: {product.id}</p>
    </div>
  );
}
