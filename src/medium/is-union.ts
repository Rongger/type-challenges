/*
  1097 - IsUnion
  -------
  by null (@bencor) #medium 
  
  ### Question
  
  Implement a type `IsUnion`, which takes an input type `T` and returns whether `T` resolves to a union type.
  
  For example:
    
    ```ts
    type case1 = IsUnion<string>  // false
    type case2 = IsUnion<string|number>  // true
    type case3 = IsUnion<[string|number]>  // false
    ```
  
  > View on GitHub: https://tsch.js.org/1097
*/

/* _____________ Your Code Here _____________ */

// A extends A 导致A被分发，所以在[B] extends [A] 这里，B 是联合类型，而A 是分发类型，二者如果不等，那么表示A就是联合类型
type IsNever<T> = [T] extends [never] ? true : false;
type IsUnion<A, B = A> = IsNever<A> extends true
  ? false
  : A extends A
  ? [B] extends [A]
    ? false
    : true
  : false;

// type IsUnion<T, R = T> = (T extends any ? Exclude<R, T> : never) extends never
//   ? false
//   : true;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<"a" | "b" | "c" | "d">, true>>,
  Expect<Equal<IsUnion<undefined | null | void | "">, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | "a">, false>>,
  Expect<Equal<IsUnion<never>, false>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1097/answer
  > View solutions: https://tsch.js.org/1097/solutions
  > More Challenges: https://tsch.js.org
*/
