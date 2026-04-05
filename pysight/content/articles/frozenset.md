---
title: "frozenset型"
description: "Pythonのfrozenset型を紹介。set型との違いや辞書のキーとしての利用方法を具体例で紹介します。"
date: "2024-07-01"
---

`frozenset` は Python の組み込み型で、**変更不可能な集合（set）** である。`set` 型との違いや活用場面を紹介する。

# frozenset の基本

```python
fs = frozenset([1, 2, 3, 2, 1])
print(fs)
print(type(fs))
```

```
frozenset({1, 2, 3})
<class 'frozenset'>
```

重複は除去される点は `set` と同じ。

# set との違い

`frozenset` はイミュータブルなので、要素の追加・削除ができない。

```python
s = {1, 2, 3}
s.add(4)       # OK
s.remove(1)    # OK

fs = frozenset([1, 2, 3])
fs.add(4)      # AttributeError: 'frozenset' object has no attribute 'add'
```

```
AttributeError: 'frozenset' object has no attribute 'add'
```

# ハッシュ可能

`frozenset` はイミュータブルなのでハッシュ値を持つ。これにより、辞書のキーや `set` の要素として使用できる。

```python
# dict のキーに使う
d = {
    frozenset([1, 2]): "pair",
    frozenset([3, 4, 5]): "triple",
}
print(d[frozenset([1, 2])])
```

```
pair
```

通常の `set` は辞書のキーにできない。

```python
d = {{1, 2}: "pair"}  # TypeError: unhashable type: 'set'
```

# set の要素に frozenset を使う

```python
s = {frozenset([1, 2]), frozenset([3, 4]), frozenset([1, 2])}
print(s)
```

```
{frozenset({1, 2}), frozenset({3, 4})}
```

重複が除去され、2つの要素になる。

# 集合演算

`frozenset` でも `set` と同様の集合演算が使える。

```python
a = frozenset([1, 2, 3])
b = frozenset([2, 3, 4])

print(a | b)   # 和集合
print(a & b)   # 積集合
print(a - b)   # 差集合
print(a ^ b)   # 対称差
```

```
frozenset({1, 2, 3, 4})
frozenset({2, 3})
frozenset({1})
frozenset({1, 4})
```

演算結果も `frozenset` になる。

# 空の frozenset

```python
empty = frozenset()
print(empty)
print(bool(empty))
```

```
frozenset()
False
```

`frozenset()` は空のfrozensetを作る。`frozenset({})` は辞書として解釈されるので注意。

# 参考

> 公式ドキュメント
> https://docs.python.org/ja/3/library/stdtypes.html#frozenset
