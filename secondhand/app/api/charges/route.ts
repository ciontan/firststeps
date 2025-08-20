import { COMMERCE_API_URL } from "../../links.js";
import { NextResponse } from "next/server";
import type { ChargeDetails } from "../../types.js";

const COINBASE_COMMERCE_API_KEY = process.env.COINBASE_COMMERCE_API_KEY;

export async function POST(request: Request) {
  if (!COINBASE_COMMERCE_API_KEY) {
    return NextResponse.json(
      { error: "Missing Coinbase Commerce API key" },
      { status: 500 },
    );
  }

  try {
    const chargeDetails: ChargeDetails = await request.json();

    const res = await fetch(`${COMMERCE_API_URL}/charges`, {
      method: "POST",
      body: JSON.stringify(chargeDetails),
      headers: {
        "Content-Type": "application/json",
        "X-CC-Api-Key": COINBASE_COMMERCE_API_KEY,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("API Error:", {
        status: res.status,
        statusText: res.statusText,
        errorText,
        requestBody: chargeDetails, // Log what we're sending
      });
      return NextResponse.json(
        { error: errorText || `HTTP error! status: ${res.status}` },
        { status: res.status },
      );
    }

    const { data } = await res.json();
    return NextResponse.json({ id: data.id });
  } catch (error) {
    console.error("Error creating charge:", error);
    return NextResponse.json(
      { error: "Failed to create charge" },
      { status: 500 },
    );
  }
}
