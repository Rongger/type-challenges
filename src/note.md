# 一些收获

- ts 类型系统里面 number 转 string 的方法：`${number|bigint}`

- string 的解构方式：`${infer F}${infer O}`，遍历方式：递归

- array 的解构方式：`[infer F, ...infer O]`，遍历方式：递归

- 读取数组长度：`T['length']`

- 可以使用泛型来定义新变量

- 对 union extends type ，union 每一个成员都会执行一遍 extends 的逻辑，最后把结果以 union 的形式返回

- never 是一种空的 union ，判断 never 要用 `[T] extends [never]`

- `keyof (Foo & Bar)` 取 key 并集，`keyof (O | O1)` 取 key 交集

- 用 `T extends Record<PropertyKey, never>` 判断空对象而不是 `T extends {}`
