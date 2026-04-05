---
title: "Classの多重継承とMRO"
description: "Pythonの多重継承とMRO(Method Resolution Order)について解説。MROの基本ルールやメソッドの呼び出し順序を調べました。"
date: "2025-04-15"
---

# Classの多重継承

Pythonでは、JavaやC#と違いクラスの多重継承をすることが可能である。
（JavaやC#もインターフェースの多重継承は可能である）


```python
class A:
    def introduce(self):
        print("Class A")

class B(A):
    def introduce(self):
        print("Class B")
        super().introduce()

class C(A):
    def introduce(self):
        print("Class C")
        super().introduce()

class D(B, C): ...
```

上記コードでは、以下のような継承関係があるクラスを作成した。
- BクラスはAクラスを継承している。
- CクラスはAクラスを継承している。
- DクラスはBクラスとCクラスを継承している。
- 全てのクラスは、暗黙的にobjectクラスを継承している。

ちなみにobjectクラスというのは、所謂基底クラスというもので特殊メソッドや特殊属性などが全てのクラスで使えるようにするためのものである。<br>
ではこの状況で、`D().introduce()`を実行してみる。


```python
D().introduce()
```

    Class B
    Class C
    Class A


B -> C -> Aの順番で`introduce()`が呼ばれていることが分かる。
ここで、Dクラスの継承してるクラスの順番を変えて再度実行してみる。


```python
class D(C, B): ...

d = D()
d.introduce()
```

    Class C
    Class B
    Class A


`introduce()`が呼ばれるクラスの順番が変わっていることが分かった。<br>
では、Pythonはどのような順序でクラスの継承の順序を決めているのだろうか？

# MRO

クラスの継承の順序を決めているのは、「Method Resolution Order」というルールである。Pythonはこの仕組みによって、多重継承された際のメソッド実行順序が決まる。また、Method Resolution Orderは一般的にMROと呼ばれている。

「Method Resolution Order」のルールはPython公式で[定義](https://docs.python.org/3/howto/mro.html)されているが、複雑なため簡潔に三つにまとめてみた。<br>
- 多重継承の順番を守る
- 基底クラスをDFSで見つける
- 共通の基底クラスは後から出てきたものを優先する

となる。

Method Resolution Orderによって、決められた呼び出し順序は`mro`メソッドで確認することが出来る。


```python
# DクラスはD(C, B)で定義した状態である。
D.mro()
```




    [__main__.D, __main__.C, __main__.B, __main__.A, object]



また、この例だけでは「基底クラスの探索は`BFS`なのでは？」と思うかもしれないので、以下の例も試してみる。


```python
class A: ...
class B(A): ...
class C(A): ...
class D(B): ...
class E(C): ...
class F(D, E): ...

F.mro()
```




    [__main__.F,
     __main__.D,
     __main__.B,
     __main__.E,
     __main__.C,
     __main__.A,
     object]



しっかり基底クラスがDFSで探されていることが分かる。

クラスを多重継承する際にMethod Resolution Orderのルールで矛盾してしまう場合は、以下のような例外が出力される。


```python
class A: ...
class B(A): ...
class C(A): ...
class D(A, B, C): ...

D.mro()
```


    ---------------------------------------------------------------------------
    TypeError                                 Traceback (most recent call last)
    Cell In[8], line 4
          2 class B(A): ...
          3 class C(A): ...
    ----> 4 class D(A, B, C): ...
          6 D.mro()

    TypeError: Cannot create a consistent method resolution order (MRO) for bases A, B, C


BとCの共通の基底クラスであるAは最後に呼ばれなければならないのに対し、クラスDの多重継承ではAが最初に呼ばれる継承順序となっているため、例外が出力されている。

まあでも、そもそもオブジェクト指向的を意識した実装をする場合にはこのような継承例はそもそも生まれないと思うので大丈夫だと思う。<br>
生まれる場合は、クラス同士の関係性やクラスの機能を見直したほうが良さそう。

余談ではあるが、クラスのMROは特殊属性`__mro__`に格納されていて、値は変更することが不可能である。


```python
class A: ...
class B(A): ...
class C(A): ...
class D(B, C): ...

D.__mro__ = [D, C, B, A]
```


    ---------------------------------------------------------------------------
    AttributeError                            Traceback (most recent call last)
    Cell In[63], line 6
          3 class C(A): ...
          4 class D(B, C): ...
    ----> 6 D.__mro__ = [D, C, B, A]

    AttributeError: attribute '__mro__' of 'type' objects is not writable


# 参考

> 公式ドキュメント
> https://docs.python.org/3/howto/mro.html
