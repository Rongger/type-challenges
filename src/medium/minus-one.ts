/*
  2257 - MinusOne
  -------
  by Mustafo Faiz (@fayzzzm) #中等 #math
  
  ### 题目
  
  给定一个正整数作为类型的参数，要求返回的类型是该数字减 1。
  
  例如:
  
  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```
  
  > 在 Github 上查看：https://tsch.js.org/2257/zh-CN
*/

/* _____________ 你的代码 _____________ */

type Map = [9, 0, 1, 2, 3, 4, 5, 6, 7, 8];

type ReverseString<T extends string> = T extends `${infer F}${infer R}`
  ? `${ReverseString<R>}${F}`
  : T;

// infer F extends number 需要 ts 版本 4.8.0+ 支持
type MinusOneInString<T extends string> = T extends `${infer F extends number}${infer R}`
? F extends 0
  ? `${Map[F]}${MinusOneInString<R>}`
  : `${Map[F]}${R}`
: T

type TrimZero<T extends string> = T extends '0' ? T : T extends `${infer F}${infer R}`
  ? F extends '0' ? TrimZero<R> : T
  : never

type ParseInt<T extends string> = T extends `${infer N extends number}` ? N : never;

type MinusOne<T extends number> = ParseInt<TrimZero<ReverseString<
MinusOneInString<ReverseString<`${T}`>>>>
> 



/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/2257/answer/zh-CN
  > 查看解答：https://tsch.js.org/2257/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
