---
title: "Classの多重継承とMRO"
description: "Pythonの多重継承とMRO(Method Resolution Order)について解説。MROの基本ルールやメソッドの呼び出し順序を調べました。"
date: "2024-03-01"
---

Pythonでは、複数のクラスを同時に継承する「多重継承」が可能である。多重継承では、メソッドの探索順序（MRO: Method Resolution Order）が重要になる。

# 多重継承の基本

```python
class A:
    def hello(self):
        print("Hello from A")

class B(A):
    pass

class C(A):
    def hello(self):
        print("Hello from C")

class D(B, C):
    pass

D().hello()
```

```
Hello from C
```

`D` は `B` と `C` を継承しているが、`hello()` は `C` から呼ばれた。この順序がMROによって決まる。

# MRO の確認方法

クラスの `mro()` メソッドまたは `__mro__` 属性でMROを確認できる。

```python
print(D.mro())
print(D.__mro__)
```

```
[<class '__main__.D'>, <class '__main__.B'>, <class '__main__.C'>, <class '__main__.A'>, <class 'object'>]
(<class '__main__.D'>, <class '__main__.B'>, <class '__main__.C'>, <class '__main__.A'>, <class 'object'>)
```

# C3線形化アルゴリズム

PythonのMROはC3線形化アルゴリズムによって計算される。このアルゴリズムは以下の原則を保証する。

1. サブクラスは常に親クラスより先に探索される
2. 複数の親クラスの順序は継承宣言の順序が保たれる
3. 一貫性のない継承関係（矛盾するMRO）は `TypeError` を発生させる

# ダイヤモンド継承

最もよく知られる多重継承の問題がダイヤモンド継承である。

```python
class Base:
    def greet(self):
        print("Base")

class Left(Base):
    def greet(self):
        print("Left")
        super().greet()

class Right(Base):
    def greet(self):
        print("Right")
        super().greet()

class Child(Left, Right):
    def greet(self):
        print("Child")
        super().greet()

Child().greet()
print("MRO:", [c.__name__ for c in Child.mro()])
```

```
Child
Left
Right
Base
MRO: ['Child', 'Left', 'Right', 'Base', 'object']
```

`super()` がMROに沿って呼び出されることで、`Base.greet()` が一度だけ呼ばれることが保証される。

# TypeError が発生するケース

矛盾するMROを要求する継承は `TypeError` になる。

```python
class X: pass
class Y: pass
class A(X, Y): pass
class B(Y, X): pass

class C(A, B): pass  # TypeError!
```

```
TypeError: Cannot create a consistent method resolution order (MRO)
for bases X, Y
```

`A` では `X → Y` の順序を要求し、`B` では `Y → X` の順序を要求しているため、一貫したMROが作れない。

# 参考

> 公式ドキュメント
> https://docs.python.org/ja/3/library/stdtypes.html#class.__mro__

> The Python 2.3 Method Resolution Order
> https://www.python.org/download/releases/2.3/mro/
