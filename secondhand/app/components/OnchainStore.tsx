import { useState } from "react";
import { Banner } from "./Banner";
import Navbar from "./Navbar";
import CategoryTabs from "./CategoryTabs";
import OnchainStoreCart from "./OnchainStoreCart";
import OnchainStoreItems from "./OnchainStoreItems";
import { OnchainStoreProvider } from "./OnchainStoreProvider";
import SearchBar from "./SearchBar";
import useOnchainStoreContext from "./OnchainStoreProvider";

function OnchainStoreContent() {
  const { onSearch, onCategoryChange } = useOnchainStoreContext();

  return (
    <div className="relative flex h-full max-h-screen max-w-full flex-col font-sansMono">
      <Banner />
      <Navbar onCategorySelect={onCategoryChange} />
      <main className="mx-auto flex max-w-5xl w-full grow flex-col pt-[4rem] pb-10">
        <SearchBar onSearch={onSearch} />
        <CategoryTabs onCategoryChange={onCategoryChange} />
        <OnchainStoreItems />
        <OnchainStoreCart />
      </main>
    </div>
  );
} 

export default function OnchainStore() {
  return (
    <OnchainStoreProvider>
      <OnchainStoreContent />
    </OnchainStoreProvider>
  );
}
