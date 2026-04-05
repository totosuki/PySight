---
title: "super()の仕組み"
description: "Pythonのsuper()について、基本的な使い方からMROとの関係、引数の動作原理まで実例付きで解説します。"
date: "2025-08-19"
---

# super()
今回は、Pythonのクラスでよく使われる `super()` について紹介する。

`super()` は一見単純に見えるが、実際には多重継承やMRO（Method Resolution Order）と密接に関わる複雑な仕組みを持っている。また、`super` は公式ドキュメントでは組み込み関数として[挙げられている](https://docs.python.org/ja/3.13/library/functions.html)が、実際にはクラスである。

# 基本的な使い方
`super()` の基本的な機能は、継承関係にあるクラスで親クラスのメソッドを呼び出すことである。

```python
class Arabic:
    def print_hello(self):
        print("مرحبًا")

class English(Arabic):
    def print_hello(self):
        print("hello")
        super().print_hello()

class Japanese(English):
    def print_hello(self):
        print("こんにちは")
        super().print_hello()

Japanese().print_hello()
```
```
こんにちは
hello
مرحبًا
```

`super()` により、継承元の親クラスのメソッドが順番に呼ばれていることが分かる。

また、この機能を使用して初期化でよく使われるパターンがある。

```python
class Animal:
    def __init__(self, name, animal_type):
        self.name = name
        self.animal_type = animal_type

class Dog(Animal):
    def __init__(self, name, animal_type, dog_type):
        super().__init__(name, animal_type)
        self.dog_type = dog_type

class Cat(Animal):
    def __init__(self, name, animal_type, cat_type):
        super().__init__(name, animal_type)
        self.cat_type = cat_type

dog = Dog("ポチ", "犬", "トイプードル")
cat = Cat("タマ", "猫", "スコティッシュフォールド")

print(dog.name, dog.animal_type, dog.dog_type)
print(cat.name, cat.animal_type, cat.cat_type)
```

```
ポチ 犬 トイプードル
タマ 猫 スコティッシュフォールド
```

# MROを考慮した動作
`super()` が持つ他の機能として、MRO（Method Resolution Order）を考慮したメソッドアクセスが挙げられる。MROについて詳しくは、[Classの多重継承とMROの記事](https://claude.ai/articles/mro/)で解説しているが、簡単に言うとPythonが多重継承時にメソッドを探す順序のことである。

では実際に、多重継承で `super()` がどのように動作するか確認してみる。

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

D().introduce()
print("MRO:", [cls.__name__ for cls in D.mro()])
```

```
Class B
Class C
Class A
MRO: ['D', 'B', 'C', 'A', 'object']
```

これをよーく見てみると、Bクラスで `super()` が呼ばれているのにも関わらず、次にCクラスが呼ばれている。このことから、`super()` はただ単に親クラスを呼び出す訳ではなく、<b>MROによって次に呼び出すクラスが決まっている</b>ことが分かる。

# super()の省略形

今までは`super()`の引数に何も値を入れていないが、これは省略されている記法である。

正式な記法では以下のように書ける。

```python
class A:
    def introduce(self):
        print("Class A")

class B(A):
    def introduce(self):
        print("Class B")
        super(B, self).introduce()  # 省略なしの記法

class C(A):
    def introduce(self):
        print("Class C")
        super(C, self).introduce()  # 省略なしの記法

class D(B, C): ...

D().introduce()
```

```
Class B
Class C
Class A
```

# super()の引数
次に、`super()` の引数について詳しく見てみる。
以下のような複雑な継承構造を作成して実験してみよう。

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

class D(B):
    def introduce(self):
        print("Class D")
        super().introduce()

class E(C):
    def introduce(self):
        print("Class E")
        super().introduce()

class F(D, E):
    def introduce(self):
        print("Class F")
        super().introduce()

print("FクラスのMRO:")
print(*[cls.__name__ for cls in F.mro()], sep=" -> ")
```

```
FクラスのMRO:
F -> D -> B -> E -> C -> A -> object
```

この継承構造で、`super()` の引数を変更して動作を確認してみる。

```python
f = F()
print("--- super(F, f) ---")
super(F, f).introduce()
print("\n--- super(D, f) ---")
super(D, f).introduce()
print("\n--- super(E, f) ---")
super(E, f).introduce()
```

```
--- super(F, f) ---
Class D
Class B
Class E
Class C
Class A

--- super(D, f) ---
Class B
Class E
Class C
Class A

--- super(E, f) ---
Class C
Class A
```

この結果から、「第二引数のMROに基づいた順序を、第一引数の次の場所から始める」ということが分かる。

試しに他のパターンでも実行してみる。今度は第二引数を変更して試してみよう。

```python
f = F()
d = D()
print("--- super(B, f) ---")
super(B, f).introduce()
print("\n--- super(B, d) ---")
super(B, d).introduce()
```

```
--- super(B, f) ---
Class E
Class C
Class A

--- super(B, d) ---
Class A
```

第二引数のMROに基づいていることが検証できた！

つまり、`super(第一引数, 第二引数)` は「第二引数のMROにおいて、第一引数の次に来るクラス」を返している！

# 参考

> 公式ドキュメント  
> https://docs.python.org/3/library/functions.html#super
