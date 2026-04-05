---
title: "__doc__について"
description: "Pythonの特殊属性__doc__の基本と使い方を紹介。docstringを利用したカスタマイズ方法や記述スタイルのポイントも紹介します。"
date: "2024-11-10"
---

# \_\_doc\_\_

標準ライブラリや外部ライブラリなどで、関数やクラスの使用法が分からなくなった時の選択肢の一つ。<br>
`__doc__`という特殊属性を使用することで、関数やクラスなどの使用法が分かる場合がある。


```python
a = int(5)
print(a.__doc__)
```

    int([x]) -> integer
    int(x, base=10) -> integer
    
    Convert a number or string to an integer, or return 0 if no arguments
    are given.  If x is a number, return x.__int__().  For floating-point
    numbers, this truncates towards zero.
    
    If x is not a number or if base is given, then x must be a string,
    bytes, or bytearray instance representing an integer literal in the
    given base.  The literal can be preceded by '+' or '-' and be surrounded
    by whitespace.  The base defaults to 10.  Valid bases are 0 and 2-36.
    Base 0 means to interpret the base from the string as an integer literal.
    >>> int('0b100', base=0)
    4


Linuxコマンドの`man`にとても似ている。<br>
でも、結構簡単に使えるから気持ちとしては`help`オプションぐらいの気持ちで気軽に使ってみよう！

# docstrings

また、自作の関数やクラスで`__doc__`を使えるようにするには`docstring`という方法を使う。

```python
class MyClass:
    """This is a class!!"""

def func():
    """This is a function!!"""

print(func.__doc__)
print(MyClass.__doc__)
```

    This is a function!!
    This is a class!!


上記の例では、適当に`docstrings`を記載しているが、しっかり書きたいなら一般的に使われているスタイルに沿って記述すると尚良し。<br>
代表的なスタイルとして挙げられるのは
- reStructuredTextスタイル
- Googleスタイル
- NumPyスタイル

などがあるけど、とりあえず[PEP257](https://peps.python.org/pep-0257/)のルールは守ると統一的にはなる。

そもそも`docstrings`を書いている時点で十分偉いけどね。

# 参考文献

> [Python] docstringのスタイルと書き方
> https://qiita.com/flcn-x/items/393c6f1f1e1e5abec906
