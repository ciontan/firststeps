import { use } from "react";
import ItemDetails from "../../components/ItemDetails";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ItemDetailPage({ params }: PageProps) {
  const { id } = use(params);
  return <ItemDetails id={id} />;
}
