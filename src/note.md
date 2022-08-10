# 一些收获

#### 分布式条件类型 ( Distributive Conditional Types )

```ts
type Naked<T> = T extends boolean ? "Y" : "N";
type Wrapped<T> = [T] extends [boolean] ? "Y" : "N";

/*
 * 先分发到 Naked<number> | Naked<boolean>
 * 然后到 "N" | "Y"
 */
type Distributed = Naked<number | boolean>;

/*
 * 不会分发 直接是 [number | boolean] extends [boolean]
 * 然后是"N"
 */
type NotDistributed = Wrapped<number | boolean>;
```

- 裸类型参数，没有额外被接口/类型别名包裹过的
- 对 union extends type ，union 每一个成员都会分发进行逻辑判断，最后把结果以 union 的形式返回
- never 是一种空的 union ，判断 never 要用 `[T] extends [never]`

#### string

- string 的解构方式：`${infer F}${infer O}`，遍历方式：递归

- 这样无法被解构

```ts
type res1 = "1" extends `${infer F}${infer S}${infer R}` ? 1 : 2; // 2
```

- 在字符串模板中使用下标来将数组转联合类型，一样可以分发生成多个字符串

```ts
`${B}__${E[number]}--${M[number]}`;
```

#### object

- 用 `T extends Record<PropertyKey, never>` 判断空对象而不是 `T extends {}`

- `key in keyof T as never` 可以删除掉对应的 key

- 可以通过 `MergeType` 将交叉类型中的两个对象合并成一个

```ts
type MergeType<O> = {
  [P in keyof O]: O[P];
};
```

- 对象 value 转 union

```ts
type ObjectToUnion<T> = T[keyof T];
```

#### array

- array 的解构方式：`[infer F, ...infer O]`，遍历方式：递归

- 读取数组长度：`T['length']`

#### 其他

- ts 类型系统里面 number 转 string 的方法：`${number|bigint}`

- string 转 number 的方法：`${infer A extends number}`，但是要在 ts@v4.8.0+ 才支持

- 可以使用泛型来定义新变量

- `keyof (Foo & Bar)` 取 key 并集，`keyof (O | O1)` 取 key 交集

- `type res = never extends string ? 1 : 2; // 1`

- number 范围更大

```ts
type res = number extends 1 ? 1 : 2; // 2
type res1 = 1 extends number ? 1 : 2; // 1
```

- ts 中递归最多只能 999 次
