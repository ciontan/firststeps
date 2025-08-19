import { useState } from "react";
import { Banner } from "./Banner";
import Navbar from "./Navbar";
import CategoryTabs from "./CategoryTabs";
import OnchainStoreCart from "./OnchainStoreCart";
import OnchainStoreItems from "./OnchainStoreItems";
import { OnchainStoreProvider } from "./OnchainStoreProvider";
import OnchainStoreSummary from "./OnchainStoreSummary";
import SearchBar from "./SearchBar";

export default function OnchainStore() {
  const [showModal, setShowModal] = useState(false);

  return (
    <OnchainStoreProvider>
      <div className="relative flex h-full max-h-screen max-w-full flex-col font-sansMono">
        <Banner />
        <Navbar />
        <main className="mx-auto flex max-w-5xl w-full grow flex-col pt-[4rem] pb-10">
          <SearchBar />
          <CategoryTabs />
          <div className="flex grow flex-col pb-10 md:flex-row">
            {/* <OnchainStoreSummary /> */}
            <OnchainStoreItems />
          </div>
          <OnchainStoreCart showModal={showModal} setShowModal={setShowModal} />
        </main>
      </div>
    </OnchainStoreProvider>
  );
}
