---
title: "Ellipsisオブジェクト"
description: "Pythonの組み込み定数Ellipsisオブジェクトについて紹介。リテラル記法やNumPyでの使い方を具体例で紹介します。"
date: "2024-11-11"
---

# Ellipsis

数少ないPythonの組み込み定数の中に`Ellipsis`というオブジェクトがある。<br>


```python
import types
a = types.EllipsisType()
print(type(a))
```

    <class 'ellipsis'>


`Ellipsis`はリテラルで記述することができる。記述方法は`...`。<br>


```python
a = ...
print(type(a))
```

    <class 'ellipsis'>


Pythonのライブラリの中を覗いてみると時々書いてある`...`は、実は`Ellipsis`オブジェクトである。<br>
以下は`builtins.pyi`の110行目辺りを抜粋したものである。


```python
from typing import Any
def __setattr__(self, name: str, value: Any, /) -> None: ...
def __delattr__(self, name: str, /) -> None: ...
def __eq__(self, value: object, /) -> bool: ...
def __ne__(self, value: object, /) -> bool: ...
```

# NumPyで使う

他の使い道として、NumPyのスライス表記に`Ellipsis`を使うというものがある。


```python
import numpy as np
a = np.random.rand(2, 3, 4)
print(a)

```

    [[[0.56590201 0.97903887 0.44530135 0.20071816]
      [0.82552545 0.82236629 0.52527161 0.33831452]
      [0.57238685 0.27612096 0.9644424  0.63009476]]
    
     [[0.47114314 0.56021692 0.29685363 0.46150172]
      [0.10109488 0.43051151 0.82899553 0.98291398]
      [0.38259785 0.15382005 0.11119233 0.4664168 ]]]


このNumPy配列の、最後の次元の2番目の要素を取り出したい時を考える。<br>


```python
b = a[:, :, 2]
print(b)
```

    [[0.44530135 0.52527161 0.9644424 ]
     [0.29685363 0.82899553 0.11119233]]


上のように書いてもいいのだが、同等の処理を`Ellipsis`を使って書くこともできる。


```python
c = a[..., 2]
print(c)
```

    [[0.44530135 0.52527161 0.9644424 ]
     [0.29685363 0.82899553 0.11119233]]


# 参考

> 公式ドキュメント
> https://docs.python.org/3/library/constants.html#Ellipsis

> Python3の...（Ellipsisオブジェクト）について
> https://qiita.com/yubessy/items/cc1ca4dbc3161f84285e
