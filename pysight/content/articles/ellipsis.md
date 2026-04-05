---
title: "Ellipsisオブジェクト"
description: "Pythonの組み込み定数Ellipsisオブジェクトについて紹介。リテラル記法やNumPyでの使い方を具体例で紹介します。"
date: "2024-06-01"
---

Python には `Ellipsis` という組み込み定数が存在する。`...`（3つのドット）というリテラルで表現でき、見た目のインパクトとは裏腹に使いどころは意外と多い。

# Ellipsis とは

`Ellipsis` は `ellipsis` 型の唯一のインスタンスである。

```python
print(type(...))
print(type(Ellipsis))
print(... is Ellipsis)
```

```
<class 'ellipsis'>
<class 'ellipsis'>
True
```

`...` と `Ellipsis` は同じオブジェクトを参照するリテラルと名前の関係にある。

# 定数としての性質

`Ellipsis` は名前の再代入が可能だが、`...` リテラル自体の意味は変わらない。

```python
Ellipsis = "World"  # エラーにならない
print(Ellipsis)     # World
print(...)          # Ellipsis（リテラルは影響されない）
```

```
World
Ellipsis
```

一方、`None`, `True`, `False` は再代入できないため「真の定数」だが、`Ellipsis` はそうではない。

# 型ヒントでの使用

関数の型ヒントで可変長引数の `Callable` を表すときに使う。

```python
from collections.abc import Callable

# 引数の型を問わず、int を返す関数
def apply(func: Callable[..., int], value: int) -> int:
    return func(value)
```

`Callable[..., int]` の `...` は「任意の引数」を意味する。

# スタブファイルでの使用

`.pyi` スタブファイルでは、関数の実装を省略するために `...` を使う。

```python
def heavy_computation(n: int) -> float: ...
def another_function(s: str) -> None: ...
```

# NumPy でのスライス

NumPy の多次元配列で `...` を使うと、複数の `:` を省略できる。

```python
import numpy as np

arr = np.zeros((2, 3, 4, 5))

# 通常のスライス（末尾2次元を取得）
a = arr[:, :, 1, :]

# Ellipsis を使ったスライス（同じ意味）
b = arr[..., 1, :]

print(a.shape)  # (2, 3, 5)
print(b.shape)  # (2, 3, 5)
```

次元数が変わっても `...` を使えば対応できる。

# pass の代わりに

空のクラスや関数の本体として `pass` の代わりに使える（可読性は好みによる）。

```python
class MyProtocol:
    def method(self) -> None: ...

# pass との違いはなし（どちらも有効）
class MyProtocol2:
    def method(self) -> None: pass
```

# 参考

> 公式ドキュメント
> https://docs.python.org/ja/3/library/constants.html#Ellipsis
