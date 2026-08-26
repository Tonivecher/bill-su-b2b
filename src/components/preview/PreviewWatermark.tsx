const ROWS = 10;
const MARKS_PER_ROW = 5;

export function PreviewWatermark() {
  return (
    <div
      aria-hidden="true"
      data-preview-watermark
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden select-none"
    >
      <div className="absolute left-1/2 top-1/2 flex h-[155vmax] w-[155vmax] -translate-x-1/2 -translate-y-1/2 -rotate-[22deg] flex-col justify-around opacity-[0.085]">
        {Array.from({ length: ROWS }, (_, row) => (
          <div
            key={row}
            className={`flex w-max items-center gap-14 whitespace-nowrap sm:gap-20 ${
              row % 2 === 0 ? "-translate-x-28" : "translate-x-8"
            }`}
          >
            {Array.from({ length: MARKS_PER_ROW }, (_, mark) => (
              <span
                key={mark}
                className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.22em] text-foreground sm:text-xs"
              >
                TONYVECHER AI LAB · CLIENT PREVIEW
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
