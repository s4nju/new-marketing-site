"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    let cancelled = false;
    let idleHandle: number | undefined;
    let delayHandle: ReturnType<typeof setTimeout> | undefined;
    let destroy: (() => void) | undefined;

    const initialize = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      const lenis = new Lenis({
        autoRaf: true,
        lerp: 0.1,
        smoothWheel: true,
        anchors: true,
      });
      destroy = () => lenis.destroy();
    };

    const startWhenIdle = () => {
      if ("requestIdleCallback" in window) {
        idleHandle = window.requestIdleCallback(() => void initialize(), {
          timeout: 1500,
        });
      } else {
        void initialize();
      }
    };

    delayHandle = setTimeout(startWhenIdle, 1000);

    return () => {
      cancelled = true;
      if (delayHandle) clearTimeout(delayHandle);
      if (idleHandle !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleHandle);
      }
      destroy?.();
    };
  }, []);

  return null;
}
