import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";

const PACKAGE_NAME = "com.mahmoud.flousy";
const SITE_HOST = "mahmoud-yassin.com";
const CODE_PATTERN = /^[A-Z0-9]{8}$/;

/**
 * Landing page for shared referral links: /flousy/invite/CODE.
 *
 * When Flousy is installed and the Android App Link is verified, the link
 * opens the app directly and this page never loads. When it does load on
 * Android, an intent:// link opens the installed app and, if there is none,
 * Chrome follows `S.browser_fallback_url` to the Play Store. The code travels
 * in the store link's `referrer` so the app can apply it after the first launch.
 */
const FlousyInvite = () => {
  const { code = "" } = useParams();
  const clean = code.trim().toUpperCase();
  const valid = CODE_PATTERN.test(clean);
  const [copied, setCopied] = useState(false);

  const isAndroid = useMemo(
    () => typeof navigator !== "undefined" && /android/i.test(navigator.userAgent),
    [],
  );

  const playUrl = useMemo(() => {
    const base = `https://play.google.com/store/apps/details?id=${PACKAGE_NAME}`;
    return valid ? `${base}&referrer=${encodeURIComponent(`flousy_ref=${clean}`)}` : base;
  }, [clean, valid]);

  const openAppUrl = useMemo(
    () =>
      `intent://${SITE_HOST}/flousy/invite/${clean}#Intent;scheme=https;package=${PACKAGE_NAME};` +
      `S.browser_fallback_url=${encodeURIComponent(playUrl)};end`,
    [clean, playUrl],
  );

  useEffect(() => {
    if (!isAndroid || !valid) return;
    // A short beat so the page paints before the hand-off.
    const timer = window.setTimeout(() => window.location.replace(openAppUrl), 600);
    return () => window.clearTimeout(timer);
  }, [isAndroid, valid, openAppUrl]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(clean);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the code is on screen to copy by hand.
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <AnimatedBackground />
      <main id="main-content" className="relative z-10 flex min-h-screen items-center">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-md rounded-2xl border border-border bg-card/60 p-8 text-center shadow-xl backdrop-blur-sm">
            <h1 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl font-bold text-transparent">
              You&apos;re invited to Flousy
            </h1>

            {valid ? (
              <>
                <p className="mt-3 text-sm text-muted-foreground">
                  Use this referral code when you join:
                </p>
                <p className="mt-3 select-all text-3xl font-black tracking-[0.3em]">{clean}</p>
                <button
                  type="button"
                  onClick={copyCode}
                  className="mt-3 text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  {copied ? "Copied" : "Copy code"}
                </button>

                <div className="mt-6 flex flex-col gap-3">
                  {isAndroid ? (
                    <>
                      <a
                        href={openAppUrl}
                        className="rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground"
                      >
                        Open in Flousy
                      </a>
                      <a
                        href={playUrl}
                        className="rounded-xl border border-border px-5 py-3 font-semibold"
                      >
                        Get it on Google Play
                      </a>
                      <p className="text-xs text-muted-foreground">
                        Opening the app… if it isn&apos;t installed you&apos;ll go to Google Play and
                        your code will be applied automatically.
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Flousy is available on Android. Open this link on your phone, or search for
                      &quot;Flousy&quot; on Google Play and enter the code above.
                    </p>
                  )}
                </div>
              </>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                This invite link looks incomplete. Ask your friend to share it again.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FlousyInvite;
