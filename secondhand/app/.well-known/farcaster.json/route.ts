"use server";

function withValidProperties(
  properties: Record<string, undefined | string | string[]>,
) {
  return Object.fromEntries(
    Object.entries(properties).filter(([key, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return !!value;
    }),
  );
}

export async function GET() {
  const URL =
    process.env.NEXT_PUBLIC_URL  "https://secondhand-six.vercel.app";

  return Response.json({
    accountAssociation: {
      header: process.env.NEXT_PUBLIC_FARCASTER_HEADER  "",
      payload: process.env.NEXT_PUBLIC_FARCASTER_PAYLOAD  "",
      signature: process.env.NEXT_PUBLIC_FARCASTER_SIGNATURE  "",
    },
    baseBuilder: {
      allowedAddresses: ["0x14F6CBaa0c98202f29bFE871405bF2BC2F831AB6"],
    },
    frame: withValidProperties({
      version: "1",
      name:
        process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME  "Secondhand Store",
      subtitle:
        process.env.NEXT_PUBLIC_APP_SUBTITLE  "Buy & sell secondhand items",
      description:
        process.env.NEXT_PUBLIC_APP_DESCRIPTION 
        "A marketplace for buying and selling quality secondhand children's items, toys, and essentials with crypto payments.",
      homeUrl: URL,
      iconUrl: process.env.NEXT_PUBLIC_APP_ICON  ${URL}/icon.png,
      splashImageUrl:
        process.env.NEXT_PUBLIC_APP_SPLASH_IMAGE  `${URL}/splash.png`,
      splashBackgroundColor:
        process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR  "#FFF7F3",
      webhookUrl: ${URL}/api/webhook,
      primaryCategory:
        process.env.NEXT_PUBLIC_APP_PRIMARY_CATEGORY  "shopping",
      tags: ["secondhand", "marketplace", "children", "crypto", "sustainable"],
      heroImageUrl: process.env.NEXT_PUBLIC_APP_HERO_IMAGE  ${URL}/hero.png,
      tagline:
        process.env.NEXT_PUBLIC_APP_TAGLINE  "Sustainable shopping made easy",
      ogTitle: process.env.NEXT_PUBLIC_APP_OG_TITLE  "Secondhand Store",
      ogDescription:
        process.env.NEXT_PUBLIC_APP_OG_DESCRIPTION 
        "Buy & sell quality secondhand items with crypto",
      ogImageUrl: process.env.NEXT_PUBLIC_APP_OG_IMAGE  ${URL}/hero.png,
      screenshotUrls: [
        ${URL}/screenshot1.png,
        ${URL}/screenshot2.png,
        ${URL}/screenshot3.png,
      ],
      noindex: process.env.NODE_ENV === "development",
    }),
  });
}