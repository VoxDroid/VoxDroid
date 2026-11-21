/** Deterministic "hand-made" shapes for the Photocopy edition: same input, same paper, every render. */

function generator(seed: number) {
  let s = (Math.abs(Math.floor(seed)) % 2147483646) + 1;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

export function seedOf(text: string) {
  let h = 7;
  for (const ch of text) h = (h * 31 + ch.charCodeAt(0)) % 100003;
  return h;
}

/** A tilt between -max and +max degrees. */
export function tilt(seed: number, max: number) {
  const r = generator(seed)();
  return `${((r * 2 - 1) * max).toFixed(2)}deg`;
}

/** A torn-paper clip-path: every edge nibbled by up to `amp` percent. */
export function tornEdge(seed: number, amp = 1.6) {
  const rnd = generator(seed);
  const n = 14;
  const pts: string[] = [];
  const f = (v: number) => v.toFixed(1);
  for (let i = 0; i <= n; i++)
    pts.push(`${f((i / n) * 100)}% ${f(rnd() * amp)}%`);
  for (let i = 1; i <= n; i++)
    pts.push(`${f(100 - rnd() * amp * 0.6)}% ${f((i / n) * 100)}%`);
  for (let i = n - 1; i >= 0; i--)
    pts.push(`${f((i / n) * 100)}% ${f(100 - rnd() * amp)}%`);
  for (let i = n - 1; i >= 1; i--)
    pts.push(`${f(rnd() * amp * 0.6)}% ${f((i / n) * 100)}%`);
  return `polygon(${pts.join(", ")})`;
}
