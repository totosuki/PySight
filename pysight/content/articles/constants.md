---
title: "組み込み定数"
description: "Pythonの組み込み定数について解説。True, False, None, NotImplemented, Ellipsis, __debug__の特徴を具体例で紹介します。"
date: "2024-09-01"
---

「Pythonには定数が無い」と思われがちだが、実はいくつかの定数が存在する。
今回は、Built-in の名前空間の中にある組み込み定数を全て紹介してみる。

# True と False

言わずと知れた真偽値だが、実は `True` と `False` は定数である。

試しに `False` に値を代入してみよう。

```python
False = 5
```

```
  Cell In[1], line 1
    False = 5
    ^
SyntaxError: cannot assign to False
```

しっかり `SyntaxError` が出力された。`True` も同様に再代入は不可能である。

# None

値の非存在を表すオブジェクトである `NoneType` 型唯一のインスタンス。

よく使うが、実は定数で代入ができない。

```python
None = "Hello World"
```

```
  Cell In[2], line 1
    None = "Hello World"
    ^
SyntaxError: cannot assign to None
```

# NotImplemented

特殊メソッドの二項演算系で、他の型に対して演算ができないときに返される値。

試しに状況を再現してみる。

```python
print(int(5).__gt__(10))      # like 5 > 10
print(int(5).__gt__("Tanaka")) # like 5 > "Tanaka"
```

```
False
NotImplemented
```

整数と文字列型で比較は実装されていないので `NotImplemented` と出力された。

## NotImplemented の効果

`NotImplemented` があると何が便利なのか？という疑問に答えるために、以下の2つのクラスを実装してみる。

```python
class A:
    def __eq__(self, obj):
        print("exec A.__eq__")
        if isinstance(obj, A) or isinstance(obj, B):
            return True
        else:
            return False

class B:
    def __eq__(self, obj):
        print("exec B.__eq__")
        return NotImplemented
```

`__eq__` は二項演算 `==` の特殊メソッドなので、それらを使用して確認してみる。

```python
a = A()
b = B()

print("--- a == a ---")
print(a == a)
print("--- a == b ---")
print(a == b)
print("--- b == a ---")
print(b == a)
```

```
--- a == a ---
exec A.__eq__
True
--- a == b ---
exec A.__eq__
True
--- b == a ---
exec B.__eq__
exec A.__eq__
True
```

出力を見ると、最後の `b == a` では `B.__eq__` が呼ばれた後に `A.__eq__` を呼び出していることが分かる。これが `NotImplemented` の効果である。

## NotImplemented のメリット

この仕組みのメリットを、自作クラス `MyInt` を用いて説明する。

```python
class MyInt:
    def __init__(self, num):
        self.num = num

    def __eq__(self, obj):
        if isinstance(obj, MyInt):
            return self.num == obj.num
        elif isinstance(obj, int):
            return self.num == obj
        else:
            return NotImplemented
```

`int` 型には `MyInt` 型が来た際専用の処理は用意されていないが、出力はどうなるだろう？

```python
print("--- MyInt(5) == int(5) ---")
print(MyInt(5) == int(5))
print("--- int(5) == MyInt(5) ---")
print(int(5) == MyInt(5))
```

```
--- MyInt(5) == int(5) ---
True
--- int(5) == MyInt(5) ---
True
```

見事に同じ結果が出ている。この理由が `NotImplemented` である。

`int` 型の実装で、知らないクラスと二項演算する際には `NotImplemented` とすることで、左項と右項を入れ替えた特殊メソッドが呼ばれる。これにより「左項と右項を入れ替えても結果が同じ」になるのだ！

# Ellipsis

Ellipsis については、[別記事](/articles/ellipsis) で詳しく説明しているため、ここでは簡単に紹介する。

`Ellipsis` 型は定数であり、リテラル記法 `...` で記述できる。

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

ただし、名前 `Ellipsis` 自体は再代入できてしまう。

```python
Ellipsis = "World"  # エラーにならない
print(Ellipsis)
```

```
World
```

# \_\_debug\_\_

最後に、あまり知られていない `__debug__` という定数を紹介する。

```python
print(__debug__)
print(type(__debug__))
```

```
True
<class 'bool'>
```

`__debug__` は Python を実行する際のオプションによって値が変わる定数である。

- 通常の実行：`True` になる
- `-O` `-OO` オプション付きで実行：`False` になる

```bash
# 通常の実行
$ python -c "print(__debug__)"
True

# -Oオプション付きで実行
$ python -O -c "print(__debug__)"
False
```

`-O` オプションは「基本的な最適化」を行うオプションで、主に以下の処理を行う。

- `__debug__` を `False` に設定
- `assert` 文を除去
- `if __debug__:` ブロック内コードを除去

```python
if __debug__:
    print("debug mode")
assert 1 != 1, "1 must not be 1"
```

通常実行では両方のコードが実行されるが、`-O` オプション付きでは両方とも完全に無視される。

ただし、この最適化は主にデバッグコードの除去が目的で、実行速度の大幅な向上は期待できない。むしろ本番環境でデバッグ用のコードを確実に無効化することが主な用途である。

また、通常実行時 `__debug__` は `True` であることから、普段何気なく実行している `python xxx.py` のようなコマンドはデバッグモードで実行していることが分かる。

# 真の定数

公式ドキュメントでは、以下のように述べられている。

> 名前 `None` 、 `False` 、 `True` 、 `__debug__` は再代入できない (これらに対する代入は、たとえ属性名としてであっても `SyntaxError` が送出されます) ので、これらは「真の」定数であると考えられます。

つまり、Python における「真の定数」は以下の 4 つだけである。

- `None`
- `False`
- `True`
- `__debug__`

`NotImplemented` や `Ellipsis` は、値としては定数的な性質を持つが、名前自体は再代入可能なため「真の定数」ではない。

# 参考

> 公式ドキュメント
> https://docs.python.org/ja/3/library/constants.html

> Real Python
> https://realpython.com/python-assert-statement/
