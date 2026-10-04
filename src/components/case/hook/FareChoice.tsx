import { HookMark as Mark } from "./HookMark";
import s from "./Screens.module.css";
import j from "./FareChoice.module.css";

/* ------------------------------------------------ 06 Jet Airways booking */
const fares = [
  { name: "Light", price: null, was: null },
  { name: "Deal", price: "3,315", was: "3,525", left: "2 seats left" },
  { name: "Saver", price: "3,735", was: "3,945" },
  { name: "Classic", price: "4,995", was: "5,205" },
  { name: "Flex", price: "8,723", was: "8,933" },
];

export function FareChoice({ kind }: { kind: "old" | "new" }) {
  const old = kind === "old";
  return (
    <div className={`${s.screen} ${j.phone}`} data-kind={kind} aria-hidden="true">
      <div className={s.body}>
        <span className={j.route}>
          <span>BOM</span>
          <span className={j.plane}>✈</span>
          <span>DEL</span>
        </span>
        <span className={j.flight} data-open={old ? undefined : ""} data-n={old ? undefined : "1"}>
          <span className={j.time}>06:00</span>
          <span className={j.dur}>2h 15m{old ? "" : " · ▴ fares"}</span>
          <span className={j.time}>08:15</span>
        </span>
        {old ? (
          <>
            <div className={j.grid} data-n="1">
              {fares.map((f) => (
                <span key={f.name} className={j.col}>
                  <span className={j.colHead}>{f.name}</span>
                  <span className={j.tiny}>{f.price ?? "Sold out"}</span>
                </span>
              ))}
              <Mark n={1} />
            </div>
            <span className={j.markRow} data-n="2">
              Prices too small to read
              <Mark n={2} />
            </span>
            <span className={j.markRow} data-n="3">
              No seats left, no saving
              <Mark n={3} />
            </span>
          </>
        ) : (
          <div className={j.list}>
            {fares.map((f) => (
              <span key={f.name} className={j.row} data-sold={f.price ? undefined : ""}>
                <span className={j.fareName}>
                  {f.name}
                  {f.left && (
                    <span className={j.left} data-n="3">
                      {f.left}
                    </span>
                  )}
                </span>
                {f.price ? (
                  <span className={j.priceCol}>
                    <span className={j.was} data-n="3">
                      {f.was}
                    </span>
                    <span className={j.price} data-n="2">
                      INR {f.price}
                    </span>
                  </span>
                ) : (
                  <span className={j.soldOut}>Sold out</span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
