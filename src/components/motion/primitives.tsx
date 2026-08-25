"use client";

import { motion, useReducedMotion, useSpring, type HTMLMotionProps } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "span";
};

/** Появление: opacity + blur + translateY, один раз, прерываемое. */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const reduced = useReducedMotion();
  const Comp = motion[as] as React.ComponentType<HTMLMotionProps<"div">>;

  if (reduced) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 0.68, 0.24, 1] }}
    >
      {children}
    </Comp>
  );
}

/** Stagger-контейнер для списков. */
export function RevealGroup({
  children,
  className,
  step = 0.06,
}: {
  children: ReactNode[];
  className?: string;
  step?: number;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * step}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}

/** Magnetic hover: элемент мягко тянется к курсору. */
export function Magnetic({
  children,
  className,
  strength = 0.22,
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  max?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 180, damping: 22, mass: 0.6 });
  const y = useSpring(0, { stiffness: 180, damping: 22, mass: 0.6 });

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        x.set(Math.max(-max, Math.min(max, dx * strength)));
        y.set(Math.max(-max, Math.min(max, dy * strength)));
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Глобальное слежение за курсором: элемент тянется и наклоняется в сторону мыши,
 * где бы она ни находилась на странице.
 */
export function CursorTracker({
  children,
  className,
  shift = 4,
  tilt = 6,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  shift?: number;
  tilt?: number;
  as?: "div" | "span";
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [fine, setFine] = useState(false);

  const spring = { stiffness: 90, damping: 20, mass: 0.7 };
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const apply = () => setFine(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduced || !fine) return;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)));
      x.set(nx * shift);
      y.set(ny * shift);
      rotateY.set(nx * tilt);
      rotateX.set(-ny * tilt);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, fine, shift, tilt, x, y, rotateX, rotateY]);

  const Comp = motion[as] as React.ComponentType<HTMLMotionProps<"div">>;

  if (reduced || !fine) {
    return as === "span" ? (
      <span className={className}>{children}</span>
    ) : (
      <div className={className}>{children}</div>
    );
  }

  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn("inline-block", className)}
      style={{
        x,
        y,
        rotateX,
        rotateY,
        perspective: 700,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
    </Comp>
  );
}

/** Медленное «дыхание»: элемент едва заметно плавает в пространстве. */
export function Breathe({
  children,
  className,
  index = 0,
  duration = 16,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
  duration?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div
      className={cn("float-soft", className)}
      style={{
        animationDelay: `${(index * -2.6) % duration}s`,
        animationDuration: `${duration + (index % 3) * 1.5}s`,
      }}
    >
      {children}
    </div>
  );
}

/** 3D-наклон за курсором (только точный указатель). */
export function Tilt({
  children,
  className,
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [fine, setFine] = useState(false);
  const rotateX = useSpring(0, { stiffness: 150, damping: 20, mass: 0.5 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 20, mass: 0.5 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const apply = () => setFine(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  if (reduced || !fine) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={cn("h-full", className)}
      style={{
        perspective: 900,
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
        willChange: "transform",
      }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const py = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        rotateY.set(Math.max(-1, Math.min(1, px)) * max);
        rotateX.set(Math.max(-1, Math.min(1, -py)) * max);
      }}
      onPointerLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Типовая карточка: дыхание + tilt. */
export function TiltCard({
  children,
  className,
  index = 0,
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
  max?: number;
}) {
  return (
    <Breathe index={index} className={cn("h-full", className)}>
      <Tilt max={max}>{children}</Tilt>
    </Breathe>
  );
}
