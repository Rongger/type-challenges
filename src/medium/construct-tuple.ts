/*
  7544 - Construct Tuple
  -------
  by Lo (@LoTwT) #medium #tuple
  
  ### Question
  
  Construct a tuple with a given length.
  
  For example
  
  ```ts
  type result = ConstructTuple<2> // expect to be [unknown, unkonwn]
  ```
  
  > View on GitHub: https://tsch.js.org/7544
*/

/* _____________ Your Code Here _____________ */

type ConstructTuple<
  L extends number,
  A extends unknown[] = []
> = A["length"] extends L ? A : ConstructTuple<L, [...A, unknown]>;

// type ConstructTuple<L extends number, O extends string = `${L}`, Count extends unknown[] = []> =
//   O extends `${infer F}${infer R}` ? (
//     ConstructTuple<L, R, N<Count>[keyof N & F]>
//   ) : Count

// type N<T extends unknown[] = []> = {
//   '0': [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T],
//   '1': [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, unknown],
//   '2': [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, unknown, unknown],
//   '3': [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, unknown, unknown, unknown],
//   '4': [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, unknown, unknown, unknown, unknown],
//   '5': [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, unknown, unknown, unknown, unknown, unknown],
//   '6': [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, unknown, unknown, unknown, unknown, unknown, unknown],
//   '7': [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, unknown, unknown, unknown, unknown, unknown, unknown, unknown],
//   '8': [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown],
//   '9': [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown],
// }

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<ConstructTuple<0>, []>>,
  Expect<Equal<ConstructTuple<2>, [unknown, unknown]>>,
  Expect<Equal<ConstructTuple<999>["length"], 999>>,
  // @ts-expect-error
  Expect<Equal<ConstructTuple<1000>["length"], 1000>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/7544/answer
  > View solutions: https://tsch.js.org/7544/solutions
  > More Challenges: https://tsch.js.org
*/
