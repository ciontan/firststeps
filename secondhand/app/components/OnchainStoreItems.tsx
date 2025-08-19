import OnchainStoreItem from './OnchainStoreItem';
import useOnchainStoreContext from './OnchainStoreProvider';

export default function OnchainStoreItems() {
  const { products } = useOnchainStoreContext();

  return (
    <div className=" scroll mb-16 mx-3 grow md:mb-0 ">
      <div className="grid h-full grid-cols-2 gap-x-3 gap-y-5 grid-rows-2">
        {products?.map((item) => (
          <OnchainStoreItem {...item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
