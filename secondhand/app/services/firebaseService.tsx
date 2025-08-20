import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import type { Product } from "../types";
import { CleaningStatus, Condition, Category } from "../types";

export async function fetchProductsFromFirestore(): Promise<Product[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "products-template"));
    const products: Product[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      // Map Firestore data to your Product type
      const product: Product = {
        id: doc.id, // Firestore document ID as string
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
          (data.cleaningStatus as CleaningStatus) || CleaningStatus.Washed, // Cast string to enum
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
        category: (data.category as Category) || Category.BabyEssentials,
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
      category: (data.seller?.category as Category) || Category.BabyEssentials,
    };

    return product;
  } catch (error) {
    console.error("Error fetching product from Firestore:", error);
    return null;
  }
}
