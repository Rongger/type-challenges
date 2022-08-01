/*
  296 - Permutation
  -------
  by Naoto Ikuno (@pandanoir) #中等 #union
  
  ### 题目
  
  实现联合类型的全排列，将联合类型转换成所有可能的全排列数组的联合类型。
  
  ```typescript
  type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
  ```
  
  > 在 Github 上查看：https://tsch.js.org/296/zh-CN
*/

/* _____________ 你的代码 _____________ */

type IfNeverEmptyArr<T> = [T] extends [never] ? [] : T;
type Permutation<T, U = T> = IfNeverEmptyArr<
  T extends U ? [T, ...Permutation<Exclude<U, T>>] : never
>;

// https://github.com/type-challenges/type-challenges/issues/13383
// 推导过程
type Uni = 'A' | 'B' | 'C'
// STEP1: 利用 Distributive Conditional Types 特性,把 Union 转换成 Array, 至于这里 extends 什么并不太重要, 只要条件为真,先用 any 好了
// 要注意, 这里产生分支的条件是 extends 表达式, 表达式中的 U 是联合类型的每一个分支, 相当于被map
type S1<U> = U extends any ? [U] : never
type P1 = S1<Uni> // ['A']|['B']|['C']
// STEP2: 观察一下,只是拿到了首个字母, 如果要继续拿后面的两个, 很显然需要loop, Type Space里的loop通常通过循环调用. 或者想一下如果是 function 该怎么写, 见
// 然后上面的式子里U被map拆掉了,那么我们还需要一份完整的copy,用于之后继续传递, 所以增加一个C=U, 之后我们填上 S2<Exclude<C,U>>, 看第一项等于把[B, C]传入下一次循环
type S2<U, C = U> = U extends any ? [U, S2<Exclude<C, U>>] : never
type P2 = S2<Uni> //["A", ["B", ["C", never]] | ["C", ["B", never]]] | ["B", ["A", ["C", never]] | ["C", ["A", never]]] | ["C", ["A", ["B", never]] | ["B", ["A", never]]]
// STEP3: 观察一下结果, 是拓成了 6 项, 但每项的内容不对, 而且里面有 never, 试着想办法把 never 拿掉, 怎么拿掉呢? 试着再加一级 extends, 
//注意, 如果这里还是用 Union extends xxx 的形式就又 Distribute 分支了, 所以这里把传入[U] 整体进条件
type S3<U, C = U> = [U] extends [never] ? [] : U extends C ? [U, ...S3<Exclude<C, U>>] : never
// 这里同样, 用 [U]/[C]判断无关紧要, 因为这两个相等, U extends any也可以改成 U extends C, 但注意, 这里的意义跟前面完全不同, U 已经是map后的子元素了, 不可以反过来
type P3 = S3<Uni>


// difference between[T] extends [never] and T extends never
// extends never 的时候会返回 union 的每个成员应用的结果的 union，never 相当于是一个空的 union ，所以返回 never
type P<T> = T extends never ? true : false;
type A1 = P<never> //never 
type A2 = P<any> //boolean 

type Q<T> = [T] extends [never] ? true : false;
type B1 = Q<never> //true
type B2 = Q<any> //false



/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Permutation<"A">, ["A"]>>,
  Expect<
    Equal<
      Permutation<"A" | "B" | "C">,
      | ["A", "B", "C"]
      | ["A", "C", "B"]
      | ["B", "A", "C"]
      | ["B", "C", "A"]
      | ["C", "A", "B"]
      | ["C", "B", "A"]
    >
  >,
  Expect<
    Equal<
      Permutation<"B" | "A" | "C">,
      | ["A", "B", "C"]
      | ["A", "C", "B"]
      | ["B", "A", "C"]
      | ["B", "C", "A"]
      | ["C", "A", "B"]
      | ["C", "B", "A"]
    >
  >,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/296/answer/zh-CN
  > 查看解答：https://tsch.js.org/296/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
