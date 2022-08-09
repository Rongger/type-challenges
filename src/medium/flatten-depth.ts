/*
  3243 - FlattenDepth
  -------
  by jiangshan (@jiangshanmeta) #medium #array
  
  ### Question
  
  Recursively flatten array up to depth times.
  
  For example:
  
  ```typescript
  type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
  type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
  ```
  
  If the depth is provided, it's guaranteed to be positive integer.
  
  > View on GitHub: https://tsch.js.org/3243
*/

/* _____________ Your Code Here _____________ */
import { MinusOne } from "./minus-one";

type FlattenOnce<T extends any[], U extends any[] = []> = T extends [
  infer F,
  ...infer O
]
  ? F extends any[]
    ? FlattenOnce<O, [...U, ...F]>
    : FlattenOnce<O, [...U, F]>
  : U;

type FlattenDepth<
  T extends Array<any>,
  S extends number = 1,
  L extends any[] = []
> = L["length"] extends S
  ? T
  : FlattenOnce<T> extends T
  ? T
  : FlattenDepth<FlattenOnce<T>, S, [...L, any]>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<
    Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>
  >
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3243/answer
  > View solutions: https://tsch.js.org/3243/solutions
  > More Challenges: https://tsch.js.org
*/
