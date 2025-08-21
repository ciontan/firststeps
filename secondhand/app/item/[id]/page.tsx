import { use } from "react";
import ItemDetails from "../../components/ItemDetails";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ItemDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <ItemDetails id={id} />;
}
