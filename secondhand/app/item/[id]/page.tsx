import { use } from 'react';
import ItemDetails from '../../components/ItemDetails';

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const unwrappedParams = use(Promise.resolve(params));
  return <ItemDetails id={unwrappedParams.id} />;
}
