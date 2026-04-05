---
title: "iterableとiterator"
description: "Pythonのiterableとiteratorの違いを解説。基本的な概念からfor文の仕組み、実装例までをまとめてみました。"
date: "2024-11-27"
---

# iterableとiterator

for文から`iterable`と`iterator`について触れて考えてみる。<br>
また分かりやすくするため、できるだけ最小構成のクラスで試してみた。

注意として、`__iter__`や`__next__`などの特殊メソッドについての説明はしていない。<br>
そして[Home](https://totosuki.github.io/)でも書いているが、自分なりに`iterable`と`iterator`の違いを調べたメモをまとめたものである。

# for文が動く条件

## \_\_iter\_\_
まず初めに、`__iter__`のみを実装したクラスでfor文を回してみる


```python
class Test1:
  def __init__(self):
    pass
  
  def __iter__(self):
    return 5

test1 = Test1()
for item in test1:
  print(item)
```


    ---------------------------------------------------------------------------
    TypeError                                 Traceback (most recent call last)
    Cell In[57], line 10
          7     return 5
          9 test1 = Test1()
    ---> 10 for item in test1:
         11   print(item)

    TypeError: iter() returned non-iterator of type 'int'


## \_\_next\_\_
`__iter__`のみのクラス実装だと上手く動かなかった。<br>
次に、`__iter__`と`__next__`を実装したクラスで動かしてみる。


```python
class Test2:
  def __init__(self):
    self.i = 0
  
  def __iter__(self):
    return self
  
  def __next__(self):
    if self.i >= 5:
      raise StopIteration() # これが呼び出されるまでfor文は続く仕組み
    else:
      self.i += 1
      return self.i

test2 = Test2()
for item in test2:
  print(item)
```

    1
    2
    3
    4
    5


## 疑問点1

`__iter__`のみでは動かなかったが、`__next__`だけでは動くのか？<br>
試してみる。


```python
class Test3:
  def __init__(self):
    self.i = 0

  def __next__(self):
    if self.i >= 5:
      raise StopIteration()
    else:
      self.i += 1
      return self.i

test3 = Test3()
for item in test3:
  print(item)
```


    ---------------------------------------------------------------------------
    TypeError                                 Traceback (most recent call last)
    Cell In[84], line 13
         10       return self.i
         12 test3 = Test3()
    ---> 13 for item in test3:
         14   print(item)

    TypeError: 'Test3' object is not iterable


`TypeError`が出た。どうやら、`__iter__`だけでも`__next__`だけでも動かないらしい。

## 疑問点2

`__iter__`で返されるクラスは、`self`ではなく`__next__`を実装した別クラスでも良いのか？


```python
class Test4:
    def __init__(self):
        pass
    
    def __iter__(self):
        return Test5()

class Test5:
    def __init__(self):
        self.i = 0

    def __next__(self):
        if self.i >= 5:
            raise StopIteration()
        else:
            self.i += 1
            return self.i

test4 = Test4()
for item in test4:
    print(item)
```

    1
    2
    3
    4
    5


`__iter__`で`__next__`が実装されている別のクラスのインスタンスを返しても動くことが分かった。

## まとめ

for文は `__iter__` で `__next__` が実装されているオブジェクトを呼び出す必要がある。<br>
別のクラスのインスタンスを呼び出しても問題は無い。（`__next__`が実装されていれば）

# List型

for文が動く条件が分かったので、次はList型はどのようにしてfor文上で使えるようになっているか見てみる。<br>
まずは、List型の特殊メソッドに何が含まれているか確認する。


```python
print(dir(list))
```

    ['__add__', '__class__', '__class_getitem__', '__contains__', '__delattr__', '__delitem__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getitem__', '__getstate__', '__gt__', '__hash__', '__iadd__', '__imul__', '__init__', '__init_subclass__', '__iter__', '__le__', '__len__', '__lt__', '__mul__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__reversed__', '__rmul__', '__setattr__', '__setitem__', '__sizeof__', '__str__', '__subclasshook__', 'append', 'clear', 'copy', 'count', 'extend', 'index', 'insert', 'pop', 'remove', 'reverse', 'sort']


ここで、上記の出力をよーく確認してほしいのだが、`__iter__`は実装されているが、「`__next__`」が実装されていない。<br>
じゃあ、for文で使えないのでは？と思うかもしれないが実際のところList型は使えている。

では、どうしてfor文で使用することが出来るのか...を知るために以下のコードを実行してみる。


```python
a = [1, 2, 3, 4, 5]
b = a.__iter__()
print(type(b))
```

    <class 'list_iterator'>


出力を見ると分かるのだが、List型は`__iter__`の戻り値を、`list_iterator`というクラスのインスタンスにしているのである。<br>
実際に、`list_iterator`クラスの特殊メソッドを確認してみる。


```python
a = [1, 2, 3, 4, 5]
b = a.__iter__()
print(b.__dir__())
print(b.__next__())
print(b.__next__())
```

    ['__getattribute__', '__iter__', '__next__', '__length_hint__', '__reduce__', '__setstate__', '__doc__', '__new__', '__repr__', '__hash__', '__str__', '__setattr__', '__delattr__', '__lt__', '__le__', '__eq__', '__ne__', '__gt__', '__ge__', '__init__', '__reduce_ex__', '__getstate__', '__subclasshook__', '__init_subclass__', '__format__', '__sizeof__', '__dir__', '__class__']
    1
    2


`list_iterator`にしっかり`__next__`が実装されていることが分かった。<br>
つまりList型は、for文を動かす際にList型の`__iter__`で、`list_iterator`クラスのインスタンスを呼び、`list_iterator`の特殊メソッドである`__next__`でfor文のループ変数に一つづつ値を入れているのである。

# iterableとiteratorとは

ここまでを踏まえて、`iterable`と`iterator`について考えてみる。

初めに、[公式ドキュメント](https://docs.python.org/ja/3/glossary.html#term-iterable)を見るに、List型は`iterable`であることが分かる。<br>
そして、List型の`__iter__`で返された値は、`list_iterator`クラスであり、名前からして`iterator`であることに間違いは無い。


```python
str_iter = str().__iter__()
tuple_iter = tuple().__iter__()
print(type(str_iter))
print(type(tuple_iter))
```

    <class 'str_ascii_iterator'>
    <class 'tuple_iterator'>


また、同様に先程の[公式ドキュメント](https://docs.python.org/ja/3/glossary.html#term-iterable)で`iterable`として紹介されている`str`と`tuple`も`__iter__`で返されるクラスが、`xxx_iterator`であることが分かるため、`list`だけが特殊では無いだろうと推測できる。

そのため、`iterable`と`iterator`を以下のように認識出来ると思う。<br>
- `iterable`は、特殊メソッド`__iter__`で、`iterator`を返すクラス。
- `iterator`は、特殊メソッド`__next__`で、値を一つずつ返すことが出来るクラス。

余計困惑するかもしれないが、水道水と蛇口のような関係だなと思った。<br>
水道水(iterator)は水がいつでも供給可能で、蛇口(iterable)は水を一回の操作で少しずつ取り出せるみたいな。

# Listに\_\_next\_\_が無い理由

ここまでで納得できるなら問題ないのだが、私には一つ疑問が生まれた。<br>
「何故、List型には直接`__next__`を入れずわざわざ`list_iterator`を返しているのか？」という疑問である。

これは、あくまで理由の一つに過ぎないが「複数の`iterator`を独立させたいから」というのが大きい理由では無いかと思う。<br>
実際に、以下のコードを動かして`list_iterator`を返すメリットを考えてみる。


```python
class Test5:
    def __init__(self):
        self.i = 0
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.i >= 5:
            raise StopIteration() # これが呼び出されるまでfor文は続く仕組み
        else:
            self.i += 1
            return self.i

test5 = Test5()
test5_iter1 = test5.__iter__()
test5_iter2 = test5.__iter__()

l_list = list([1, 4, 5, 2, 6])
l_iter1 = l_list.__iter__()
l_iter2 = l_list.__iter__()

print(test5_iter1.__next__())
print(test5_iter2.__next__())
print(l_iter1.__next__())
print(l_iter2.__next__())
```

    1
    2
    1
    1


`Test5`クラスは、`__iter__`を呼び出すと、同じインスタンスを返すクラスである。<br>
ここで、出力をみてみると、`Test5`のクラスは複数の`iterator`が独立していないことが分かり、List型は複数の`iterator`が独立していることが分かった！

これが、List型などが`__iter__`でselfを返していない理由の一つである。

また、`Test5`クラスは自分自身を返しているので、`iterable`とは言いにくい。一度しか`iterator`を呼び出せない`iterable`としても振る舞えるな〜位の気持ち。

# mapはiterator

Pythonで普段使うようなデータ型で、`iterator`はあまり存在しない。`list`,`str`,`set`,`tuple`...などはすべて`iterable`である。<br>
しかし、普段から何かと使う`map`クラスは`iterator`であるので少し紹介する。


```python
m = map(lambda x: x **2, [1, 2, 3, 4, 5])
for item in m: print(item)
for item in m: print(item)
```

    1
    4
    9
    16
    25


`map`クラスは、上のコードのように`__iter__`でselfを返すため、上記の例などでは上手く使用することが出来ない。<br>
二回以上for文で使いたい場合は、List型など`iterable`なオブジェクトに型変換するか、下記のコードのように`copy.deepcopy`メソッドを使用するなどしよう。


```python
import copy
m = map(lambda x: x **2, [1, 2, 3])
for item in copy.deepcopy(m): print(item)
for item in copy.deepcopy(m): print(item)
```

    1
    4
    9
    1
    4
    9


# 参考

> 公式ドキュメント（iterable）
> https://docs.python.org/ja/3/glossary.html#term-iterable

> Python でイテラブルとイテレータの使い分け
> https://zenn.dev/shizukakokoro/articles/d634f8ddad833c
