import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebaseConfig";
import type { Product } from "../types";
import { CleaningStatus, Condition } from "../types";

export async function fetchProductsFromFirestore(): Promise<Product[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "products-template"));
    const products: Product[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      // Map Firestore data to your Product type
      const product: Product = {
        id: doc.id,
        name: data.name || "",
        price: data.price || 0,
        image: data.image || "",
        description: data.description || "",
        condition: (data.condition as Condition) || Condition.LikeNew,
        ageRange: {
          start_age: data.ageRange?.startAge || data.ageRange?.start_age || 0,
          end_age: data.ageRange?.endAge || data.ageRange?.end_age || 0,
        },
        brand: data.brand || "",
        cleaningStatus:
          (data.cleaningStatus as CleaningStatus) || CleaningStatus.Washed,
        dimensions: data.dimensions || "",
        dealMethod: data.dealMethod || "",
        seller: {
          name: data.seller?.name || "",
          rating: data.seller?.rating || 0,
          review: data.seller?.review || 0,
          avatar: data.seller?.avatar?.replace(/^"|"$/g, "") || "",
          listings: data.seller?.listings || [],
        },
        likes: data.likes || 0,
        category: data.category || "Baby essentials", // Keep as string from Firestore
        status: data.status || "pending", // <-- Added status field
      };

      products.push(product);
    });

    return products;
  } catch (error) {
    console.error("Error fetching products from Firestore:", error);
    return [];
  }
}

export async function fetchProductByIdFromFirestore(
  id: string,
): Promise<Product | null> {
  try {
    const productDocRef = doc(db, "products-template", id);
    const productDocSnap = await getDoc(productDocRef);

    if (!productDocSnap.exists()) {
      return null;
    }

    const data = productDocSnap.data();

    // Map Firestore data to your Product type
    const product: Product = {
      id: productDocSnap.id,
      name: data.name || "",
      price: data.price || 0,
      image: data.image || "",
      description: data.description || "",
      condition: (data.condition as Condition) || Condition.LikeNew,
      ageRange: {
        start_age: data.ageRange?.startAge || data.ageRange?.start_age || 0,
        end_age: data.ageRange?.endAge || data.ageRange?.end_age || 0,
      },
      brand: data.brand || "",
      cleaningStatus:
        (data.cleaningStatus as CleaningStatus) || CleaningStatus.Washed,
      dimensions: data.dimensions || "",
      dealMethod: data.dealMethod || "",
      seller: {
        name: data.seller?.name || "",
        rating: data.seller?.rating || 0,
        review: data.seller?.review || 0,
        avatar: data.seller?.avatar?.replace(/^"|"$/g, "") || "",
        listings: data.seller?.listings || [],
      },
      likes: data.likes || 0,
      category: data.category || "Baby essentials", // Keep as string from Firestore
      status: data.status || "pending", // <-- Added status field
    };

    return product;
  } catch (error) {
    console.error("Error fetching product from Firestore:", error);
    return null;
  }
}

export function searchProducts(products: Product[], query: string): Product[] {
  if (!query.trim()) {
    return products;
  }

  const searchTerm = query.toLowerCase().trim();

  return products.filter((product) => {
    // Search by product name
    const nameMatch = product.name.toLowerCase().includes(searchTerm);

    // Search by category
    const categoryMatch = product.category.toLowerCase().includes(searchTerm);

    // Search by brand
    const brandMatch = product.brand.toLowerCase().includes(searchTerm);

    // Search by description (optional for more comprehensive search)
    const descriptionMatch = product.description
      .toLowerCase()
      .includes(searchTerm);

    return nameMatch || categoryMatch || brandMatch || descriptionMatch;
  });
}

export function filterProductsByCategory(
  products: Product[],
  category: string,
): Product[] {
  if (category === "all" || !category) {
    return products;
  }

  // Map category IDs from CategoryTabs to actual Firestore category values
  const categoryMap: Record<string, string> = {
    baby: "Baby essentials",
    clothes: "Clothes",
    toys: "Toys",
    furniture: "Furniture",
    learning: "Learning",
    sports: "Sports",
  };

  const targetCategoryString = categoryMap[category.toLowerCase()];

  if (!targetCategoryString) {
    return products;
  }

  return products.filter((product) => {
    // Case-insensitive comparison to handle any potential casing differences
    return (
      product.category.toLowerCase() === targetCategoryString.toLowerCase()
    );
  });
}

export async function saveNewListing(
  listingData: Omit<Product, "id">,
  imageFile: File | null,
): Promise<Product> {
  try {
    let imageUrl = "";

    // Upload image if provided
    if (imageFile) {
      const storageRef = ref(
        storage,
        `listings/${Date.now()}_${imageFile.name}`,
      );
      const snapshot = await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    // Prepare the listing data
    const listing = {
      ...listingData,
      image: imageUrl,
      createdAt: new Date().toISOString(),
      status: "pending",
      likes: 0,
    };

    // Add listing to Firestore
    const docRef = await addDoc(collection(db, "products-template"), listing);

    // Return the created listing with its ID
    return {
      ...listing,
      id: docRef.id,
    } as Product;
  } catch (error) {
    console.error("Error saving new listing:", error);
    throw error;
  }
}

// Function to update a listing's status
export async function updateListingStatus(
  listingId: string,
  status: string,
): Promise<void> {
  try {
    const listingRef = doc(db, "products-template", listingId);
    await updateDoc(listingRef, { status });
  } catch (error) {
    console.error("Error updating listing status:", error);
    throw error;
  }
}
