import { useEffect, useRef, type CSSProperties, type RefObject } from "react";

export type BurgerLayer = { src: string; clip?: string; openY: number; closedY: number };
const illustration = "/images/burger-illustration.webp";
// One cached illustration, six CSS layers. Replace with final transparent assets.
const defaultLayers: BurgerLayer[] = [
  { src: illustration, clip: "inset(0 0 74% 0)", openY: -4, closedY: 21 },
  { src: illustration, clip: "inset(26% 0 56% 0)", openY: -2, closedY: 13 },
  { src: illustration, clip: "inset(44% 0 44% 0)", openY: 0, closedY: 8 },
  { src: illustration, clip: "inset(56% 0 26% 0)", openY: 2, closedY: 0 },
  { src: illustration, clip: "inset(74% 0 20% 0)", openY: 4, closedY: -4 },
  { src: illustration, clip: "inset(80% 0 0 0)", openY: 6, closedY: -6 },
];

type Props = {
  scrollTarget?: RefObject<HTMLElement | null>;
  layers?: BurgerLayer[];
  video?: { src: string; poster: string };
  staticView?: boolean;
};

export function BurgerScene({
  scrollTarget,
  layers = defaultLayers,
  video,
  staticView = false,
}: Props) {
  const scene = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = scene.current;
    if (!el) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const target = scrollTarget?.current;
      let progress = 1;
      if (!staticView && !preference.matches && target) {
        const rect = target.getBoundingClientRect();
        progress = Math.min(
          1,
          Math.max(0, -rect.top / Math.max(target.offsetHeight - window.innerHeight, 1)),
        );
      }
      el.style.setProperty("--assembly", String(progress));
      const film = videoRef.current;
      // Final video runs exploded -> assembled. No autoplay or scroll interception.
      if (film && Number.isFinite(film.duration) && film.readyState >= 2 && !film.seeking) {
        const time = progress * Math.max(0, film.duration - 0.04);
        if (Math.abs(film.currentTime - time) > 0.025) film.currentTime = time;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const film = videoRef.current;
    film?.addEventListener("loadeddata", schedule);
    film?.addEventListener("seeked", schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      film?.removeEventListener("loadeddata", schedule);
      film?.removeEventListener("seeked", schedule);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", schedule);
    };
  }, [scrollTarget, staticView, video]);
  return (
    <div
      ref={scene}
      className={`burger-scene${staticView ? " is-static" : ""}`}
      style={{ "--assembly": 1 } as CSSProperties}
      role="img"
      aria-label="Composição gastronômica de um hambúrguer"
    >
      {video ? (
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      ) : (
        layers.map((layer, i) => (
          <img
            key={`${layer.src}-${i}`}
            className="burger-layer"
            src={layer.src}
            width="1000"
            height="1000"
            alt=""
            aria-hidden="true"
            decoding="async"
            fetchPriority={!staticView && i === 0 ? "high" : "auto"}
            loading={staticView ? "lazy" : "eager"}
            draggable="false"
            style={
              {
                clipPath: layer.clip,
                "--open-y": `${layer.openY}%`,
                "--travel-y": `${layer.closedY - layer.openY}%`,
                zIndex: layers.length - i,
              } as CSSProperties
            }
          />
        ))
      )}
    </div>
  );
}
