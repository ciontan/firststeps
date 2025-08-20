import OnchainStoreItem from './OnchainStoreItem';
import useOnchainStoreContext from './OnchainStoreProvider';

export default function OnchainStoreItems() {
  const { products, loading } = useOnchainStoreContext();

  if (loading) {
    return (
      <div className="scroll mb-16 mx-3 grow md:mb-0">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading products...</div>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="scroll mb-16 mx-3 grow md:mb-0">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">No products found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="scroll mb-16 mx-3 grow md:mb-0">
      <div className="grid h-full grid-cols-2 gap-x-3 gap-y-5 grid-rows-2">
        {products.map((item) => (
          <OnchainStoreItem {...item} key={item.id} />
        ))}
      </div>
    </div>
  );
}