import Script from "next/script";

/**
 * Lightweight analytics loader. Provider is selected by env var, with no
 * network call when nothing is configured — production builds without
 * analytics ship zero overhead.
 *
 * Supported providers:
 *   • Plausible — set NEXT_PUBLIC_PLAUSIBLE_DOMAIN
 *     (and optionally NEXT_PUBLIC_PLAUSIBLE_SCRIPT for self-hosted endpoints)
 *   • Google Analytics 4 — set NEXT_PUBLIC_GA_ID (e.g. "G-XXXX")
 *   • Vercel Analytics — set NEXT_PUBLIC_VERCEL_ANALYTICS=1
 *     (uses Vercel's auto-injected runtime; requires @vercel/analytics if you
 *     want the React SDK, but the script tag below works without it)
 *
 * If multiple are set, all run. Both are no-ops in dev unless explicitly
 * configured.
 */

export function Analytics() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const plausibleScript =
    process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT ?? "https://plausible.io/js/script.js";
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      {plausibleDomain && (
        <Script
          strategy="afterInteractive"
          data-domain={plausibleDomain}
          src={plausibleScript}
        />
      )}

      {gaId && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}
    </>
  );
}
