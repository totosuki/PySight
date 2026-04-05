---
title: "__doc__について"
description: "Pythonの特殊属性__doc__の基本と使い方を紹介。docstringを利用したカスタマイズ方法や記述スタイルのポイントも紹介します。"
date: "2024-01-01"
---

標準ライブラリや外部ライブラリなどで、関数やクラスの使用法が分からなくなった時の選択肢の一つ。

`__doc__` という特殊属性を使用することで、関数やクラスなどの使用法が分かる場合がある。

```python
a = int(5)
print(a.__doc__)
```

```
int([x]) -> integer
int(x, base=10) -> integer

Convert a number or string to an integer, or return 0 if no arguments
are given.  If x is a number, return x.__int__().  For floating-point
numbers, this truncates towards zero.
...
```

# __doc__ とは

`__doc__` は関数・クラス・モジュールが持つ特殊属性で、その定義の直下に書かれた文字列リテラル（docstring）を格納している。

```python
def greet(name: str) -> str:
    """指定した名前に挨拶する。"""
    return f"Hello, {name}!"

print(greet.__doc__)
```

```
指定した名前に挨拶する。
```

# docstring の書き方

PEP 257 では、docstring の記述スタイルとして以下が推奨されている。

## 一行 docstring

```python
def add(a, b):
    """2つの数を足して返す。"""
    return a + b
```

## 複数行 docstring

```python
def divide(a, b):
    """
    2つの数を割り算する。

    Args:
        a: 被除数
        b: 除数（0 以外）

    Returns:
        a / b の結果

    Raises:
        ZeroDivisionError: b が 0 の場合
    """
    return a / b
```

# クラスへの適用

クラスにも同様に docstring を付けることができる。

```python
class Circle:
    """円を表すクラス。"""

    def __init__(self, radius: float):
        """
        Args:
            radius: 円の半径
        """
        self.radius = radius

print(Circle.__doc__)
print(Circle.__init__.__doc__)
```

```
円を表すクラス。

        Args:
            radius: 円の半径
        
```

# __doc__ のカスタマイズ

`__doc__` は属性なので、直接書き換えることもできる。

```python
def my_func():
    pass

my_func.__doc__ = "動的に設定した docstring"
print(my_func.__doc__)
```

```
動的に設定した docstring
```

ただし、通常の開発では直接書き換えることは少なく、デコレータなどで自動生成する場合に使われる。

# help() との関係

組み込み関数 `help()` は内部で `__doc__` を参照して情報を表示する。

```python
help(int)
```

`__doc__` が `None` の場合、`help()` は "No documentation available." と表示する。

# 参考

> 公式ドキュメント
> https://docs.python.org/ja/3/reference/datamodel.html#index-55

> PEP 257 – Docstring Conventions
> https://peps.python.org/pep-0257/
