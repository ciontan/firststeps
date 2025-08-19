/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_URL: string;
    NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME: string;
    NEXT_PUBLIC_APP_ICON: string;
    NEXT_PUBLIC_APP_SPLASH_IMAGE: string;
    NEXT_PUBLIC_APP_HERO_IMAGE: string;
    NEXT_PUBLIC_APP_TAGLINE: string;
    NEXT_PUBLIC_APP_OG_TITLE: string;
    NEXT_PUBLIC_APP_OG_DESCRIPTION: string;
    NEXT_PUBLIC_APP_OG_IMAGE: string;
    NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR: string;
    NEXT_PUBLIC_APP_PRIMARY_CATEGORY: string;
    NEXT_PUBLIC_APP_SUBTITLE: string;
    NEXT_PUBLIC_APP_DESCRIPTION: string;
    FARCASTER_HEADER: string;
    FARCASTER_PAYLOAD: string;
    FARCASTER_SIGNATURE: string;
  }
}
