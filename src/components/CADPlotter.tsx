import React, { useEffect, useRef, useState } from 'react';

export const CADPlotter: React.FC = () => {
  const plotterRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const xhairRef = useRef<HTMLDivElement>(null);
  const snapRef = useRef<HTMLSpanElement>(null);

  const [currentLayer, setCurrentLayer] = useState('TOPO-CONTOURS');
  const [coords, setCoords] = useState({ x: '28.229300 E', y: '25.747900 S' });
  const [isRunning, setIsRunning] = useState(false);
  const [stampClass, setStampClass] = useState('');

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const plotter = plotterRef.current;
    const svg = svgRef.current;
    const xhair = xhairRef.current;
    const snap = snapRef.current;

    if (!plotter || !svg || !xhair) return;

    const layers = Array.from(svg.querySelectorAll<SVGGElement>('g[data-layer]'));
    const queue: { path: SVGGeometryElement; layer: string; dash?: string | null }[] = [];

    layers.forEach((g) => {
      const stroke = g.getAttribute('data-stroke') || '';
      const dash = g.getAttribute('data-dash');
      g.setAttribute('stroke', stroke);
      Array.from(g.querySelectorAll<SVGGeometryElement>('.plot')).forEach((path) => {
        queue.push({ path, layer: g.getAttribute('data-layer') || '', dash });
      });
    });

    const SPEED = 620; // svg units per second
    let idx = 0;
    let animId: number;
    let timeoutId: number;
    let isCancelled = false;

    const toScreen = (pt: DOMPoint) => {
      const vb = svg.viewBox.baseVal;
      const rect = plotter.getBoundingClientRect();
      const scale = Math.max(rect.width / vb.width, rect.height / vb.height);
      const ox = (rect.width - vb.width * scale) / 2;
      const oy = (rect.height - vb.height * scale) / 2;
      return { x: ox + pt.x * scale, y: oy + pt.y * scale };
    };

    const moveXhair = (pt: DOMPoint) => {
      const pos = toScreen(pt);
      xhair.style.transform = `translate(${pos.x}px,${pos.y}px)`;
      setCoords({
        x: (28.2293 + pt.x / 900000).toFixed(6) + ' E',
        y: (25.7479 + pt.y / 900000).toFixed(6) + ' S',
      });
    };

    const fireSnap = (pt: DOMPoint) => {
      if (!snap) return;
      const pos = toScreen(pt);
      snap.style.transform = `translate(${pos.x}px,${pos.y}px)`;
      snap.classList.remove('fire');
      void snap.offsetWidth;
      snap.classList.add('fire');
    };

    const drawNext = () => {
      if (isCancelled || !isVisible) return;

      if (idx >= queue.length) {
        setCurrentLayer('PLOT COMPLETE');
        setStampClass('show');

        timeoutId = window.setTimeout(() => {
          if (isCancelled) return;
          setStampClass('hide');
          queue.forEach((q) => {
            q.path.classList.remove('drawn');
          });
          idx = 0;
          timeoutId = window.setTimeout(drawNext, 700);
        }, 4600);
        return;
      }

      const q = queue[idx++];
      const path = q.path;
      const len = path.getTotalLength();
      setCurrentLayer(q.layer);
      path.classList.add('drawn');
      path.style.strokeDasharray = q.dash ? q.dash : `${len}`;
      if (!q.dash) {
        path.style.strokeDashoffset = `${len}`;
      }
      const dur = Math.max((len / SPEED) * 1000, 260);
      const t0 = performance.now();

      const step = (t: number) => {
        if (isCancelled) return;
        const pr = Math.min((t - t0) / dur, 1);
        if (!q.dash) {
          path.style.strokeDashoffset = `${len * (1 - pr)}`;
        }
        moveXhair(path.getPointAtLength(len * pr));

        if (pr < 1) {
          animId = requestAnimationFrame(step);
        } else {
          if (q.dash) {
            path.style.strokeDasharray = q.dash;
          }
          fireSnap(path.getPointAtLength(len));
          timeoutId = window.setTimeout(drawNext, 140);
        }
      };

      animId = requestAnimationFrame(step);
    };

    let isVisible = false;
    let isStarted = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry.isIntersecting;
        if (entry.isIntersecting) {
          setIsRunning(true);
          if (!isStarted) {
            isStarted = true;
            timeoutId = window.setTimeout(drawNext, 400);
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(plotter);

    return () => {
      isCancelled = true;
      observer.disconnect();
      cancelAnimationFrame(animId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className={`plotter ${isRunning ? 'running' : ''}`} ref={plotterRef} id="plotter" aria-hidden="true">
      <div className="plotter-shade"></div>
      <svg
        ref={svgRef}
        viewBox="0 0 1200 640"
        className="plotter-svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* LAYER 1: CONTOURS */}
        <g data-layer="TOPO-CONTOURS" data-stroke="rgba(94,158,139,0.35)">
          <path className="plot" d="M700 620 C 800 560, 860 560, 940 500 S 1100 420, 1200 400" />
          <path className="plot" d="M760 640 C 860 590, 920 580, 1000 520 S 1150 460, 1200 450" />
          <path className="plot" d="M840 640 C 930 610, 990 600, 1060 550 S 1180 500, 1200 495" />
        </g>
        {/* LAYER 2: SITE BOUNDARY */}
        <g data-layer="SITE-BOUNDARY" data-stroke="rgba(255,255,255,0.4)" data-dash="10 8">
          <path className="plot" d="M640 120 H1160 V560 H700 L640 480 Z" />
        </g>
        {/* LAYER 3: ELEC RETICULATION */}
        <g data-layer="ELEC-RETIC 11kV" data-stroke="rgba(255,255,255,0.8)">
          <path className="plot" d="M660 500 L760 420 L870 440 L980 350 L1090 370 L1160 300" />
          <path className="plot" d="M760 420 l0 -14 m-9 14 l18 0 M980 350 l0 -14 m-9 14 l18 0 M1090 370 l0 -14 m-9 14 l18 0" />
        </g>
        {/* LAYER 4: SUBSTATION */}
        <g data-layer="SUBSTATION MT-SS1" data-stroke="rgba(163,213,84,0.95)">
          <path className="plot" d="M900 170 h170 v110 h-170 z" />
          <path className="plot" d="M930 200 a16 16 0 1 0 0.1 0 M930 245 a16 16 0 1 0 0.1 0" />
          <path className="plot" d="M1000 185 v80 M1030 185 v80 M1000 225 h30" />
        </g>
        {/* LAYER 5: HYDRO BOREHOLES */}
        <g data-layer="HYDRO-BH SERIES" data-stroke="rgba(94,158,139,0.9)">
          <path className="plot" d="M730 250 a14 14 0 1 0 0.1 0 M730 236 v28 M716 250 h28" />
          <path className="plot" d="M820 560 a14 14 0 1 0 0.1 0 M820 546 v28 M806 560 h28" />
          <path className="plot" d="M1120 480 a14 14 0 1 0 0.1 0 M1120 466 v28 M1106 480 h28" />
        </g>
      </svg>

      {/* crosshair cursor */}
      <div className="xhair" ref={xhairRef} id="xhair">
        <span className="xhair-v"></span>
        <span className="xhair-h"></span>
        <span className="xhair-ring"></span>
      </div>

      {/* snap pulse */}
      <span className="snap-pulse" ref={snapRef} id="snap-pulse"></span>

      {/* approval stamp */}
      <div className={`stamp num ${stampClass}`} id="plot-stamp">
        <span className="stamp-top">DRAFT APPROVED</span>
        <span className="stamp-mid">MT-SVC-2026</span>
        <span className="stamp-low">REV A &middot; PR. ENG.</span>
      </div>

      {/* live HUD */}
      <div className="hud num" id="hud">
        <span className="hud-line">
          LAYER: <em id="hud-layer">{currentLayer}</em>
        </span>
        <span className="hud-line">
          X: <em id="hud-x">{coords.y}</em>
        </span>
        <span className="hud-line">
          Y: <em id="hud-y">{coords.x}</em>
        </span>
        <span className="hud-line">
          SNAP: <em className="hud-on">ON</em> &nbsp;ORTHO: <em className="hud-on">ON</em>
        </span>
      </div>
    </div>
  );
};
