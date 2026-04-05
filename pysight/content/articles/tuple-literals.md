---
title: "tuple型のリテラル記法"
description: "Pythonのtuple型のリテラルでの記述方法を紹介。"
date: "2024-11-01"
---

Python の `tuple`（タプル）はリストと似ているが、変更不可能（イミュータブル）なシーケンス型である。リテラル記法にはいくつかの落とし穴があるので整理する。

# 基本的な記法

```python
t = (1, 2, 3)
print(t)        # (1, 2, 3)
print(type(t))  # <class 'tuple'>
```

# 括弧なしでも tuple になる

カンマ区切りの式は括弧なしでも tuple として扱われる。

```python
t = 1, 2, 3
print(t)        # (1, 2, 3)
print(type(t))  # <class 'tuple'>
```

関数の戻り値で複数の値を返す場合もこの記法が使われる。

```python
def min_max(lst):
    return min(lst), max(lst)

result = min_max([3, 1, 4, 1, 5])
print(result)        # (1, 5)
print(type(result))  # <class 'tuple'>
```

# 1要素 tuple の落とし穴

1要素の tuple を作る際は末尾のカンマが必須。

```python
# これは tuple ではなく int
a = (1)
print(type(a))   # <class 'int'>

# これが 1要素 tuple
b = (1,)
print(type(b))   # <class 'tuple'>
print(b)         # (1,)

# 括弧なしでも OK
c = 1,
print(type(c))   # <class 'tuple'>
```

# 空の tuple

```python
empty = ()
print(type(empty))   # <class 'tuple'>
print(len(empty))    # 0
```

または `tuple()` を使う。

```python
empty = tuple()
print(empty)   # ()
```

# アンパック

tuple はアンパックで複数の変数に一度に代入できる。

```python
t = (10, 20, 30)
a, b, c = t
print(a, b, c)   # 10 20 30
```

スター式を使った部分アンパック:

```python
first, *rest = (1, 2, 3, 4, 5)
print(first)  # 1
print(rest)   # [2, 3, 4, 5]

*init, last = (1, 2, 3, 4, 5)
print(init)   # [1, 2, 3, 4]
print(last)   # 5
```

# リストとの使い分け

| | list | tuple |
|---|---|---|
| ミュータブル | ○ | ✕ |
| ハッシュ可能 | ✕ | ○（要素がすべてハッシュ可能な場合） |
| 用途 | 変更が必要なシーケンス | 変更不要なシーケンス、辞書のキー |

```python
# tuple は辞書のキーに使える
d = {(0, 0): 'origin', (1, 0): 'right'}
print(d[(0, 0)])  # 'origin'
```

# 参考

> 公式ドキュメント
> https://docs.python.org/ja/3/library/stdtypes.html#tuple
