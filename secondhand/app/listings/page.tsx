"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { CategoryType } from "../components/CategoryTabs";
import { Plus, Edit3, Trash2, Eye, MoreHorizontal } from "lucide-react";
import StatusTabs from "../components/StatusTabs";
import ListingsGridItem from "../components/ListingsGridItem";
import AddListingModal from "../components/AddListingModal";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import { saveProductToFirestore } from "../services/firebaseService";
import { fetchProductsFromFirestore } from "../services/firebaseService";
import type { Product } from "../types";

export default function ListingsPage() {
  const [listings, setListings] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [activeTab, setActiveTab] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const router = useRouter();

  // Fetch listings from Firestore
  const fetchUserListings = async () => {
    if (!loading) setRefreshing(true);
    setLoading(true);
    try {
      const products = await fetchProductsFromFirestore();
      // Only show actual listings (not sold, not templates, etc)
      const listingStatuses = ["active", "pending", "draft"];
      const filtered = products.filter((p) =>
        listingStatuses.includes((p.status || "").toLowerCase()),
      );
      setListings(filtered);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUserListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredListings = listings.filter((listing) => {
    if (activeTab === "all") return true;
    return listing.status === activeTab;
  });

  const counts = {
    all: listings.length,
    active: listings.filter((l) => l.status === "active").length,
    sold: listings.filter((l) => l.status === "sold").length,
    draft: listings.filter((l) => l.status === "draft").length,
    pending: listings.filter((l) => l.status === "pending").length,
  };

  const handleDeleteListing = (id: string) => {
    setListings((prev) => prev.filter((listing) => listing.id !== id));
  };

  const handleEditListing = (id: string) => {
    // Implement edit logic
  };

  function onCategorySelect(category: string) {
    // Implement category select logic
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        centerContent={
          <h1 className="text-lg font-bold font-wix text-brown">My Listings ({listings.length})</h1>
        }
        onCategorySelect={onCategorySelect}
      />
      <div className="mt-[4rem] bg-white border-b border-gray-100 shadow-sm">
        <div className="w-full px-3 sm:px-4 lg:px-6 max-w-7xl mx-auto py-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 w-full">
            <div className="flex flex-col">
              {refreshing && (
                <p className="text-sm text-gray-500 mt-1">
                  Refreshing listings...
                </p>
              )}
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full sm:w-auto bg-brown text-white rounded-full px-4 sm:px-6 py-2.5 sm:py-3 font-wix font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-colors text-sm sm:text-base"
            >
              + Add
            </button>
          </div>
          <StatusTabs
            activeTab={activeTab}
            counts={counts}
            onTabChange={setActiveTab}
          />
        </div>
      </div>
      <div className="mt-8">
        <div className="px-3 sm:px-4 lg:px-6 max-w-7xl mx-auto">
          {loading ? (
            <LoadingState />
          ) : filteredListings.length === 0 ? (
            <EmptyState onAdd={() => setShowAddForm(true)} />
          ) : (
            <div
              className="overflow-y-auto"
              style={{ maxHeight: "calc(100vh - 220px)" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 pb-8 pt-4">
                {filteredListings.map((listing) => (
                  <ListingsGridItem
                    key={listing.id}
                    listing={{
                      ...listing,
                      status: listing.status as
                        | "active"
                        | "sold"
                        | "draft"
                        | "pending",
                    }}
                    onEdit={handleEditListing}
                    onDelete={handleDeleteListing}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {showAddForm && (
        <AddListingModal
          onClose={() => setShowAddForm(false)}
          onAdd={async () => {
            await fetchUserListings();
            setShowAddForm(false);
          }}
        />
      )}
    </div>
  );
}
