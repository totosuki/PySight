---
title: "frozenset型"
description: "Pythonのfrozenset型を紹介。set型との違いや辞書のキーとしての利用方法を具体例で紹介します。"
date: "2024-11-11"
---

# frozenset

Pythonの集合型は、実は二種類存在する。<br>
一つ目は言わずとしれた、`set`型である。


```python
a = set([2, 5, 1, 2])
print(type(a))
print(a)

# set型はリテラルで作成することもできる
b = {2, 5, 1, 2}
print(type(b))
print(b)
```

    <class 'set'>
    {1, 2, 5}
    <class 'set'>
    {1, 2, 5}


そしてもう一つが、今回紹介する`frozenset`型である。<br>


```python
c = frozenset([2, 5, 1, 2])
print(type(c))
print(c)
```

    <class 'frozenset'>
    frozenset({1, 2, 5})


この`frozenset`型の一番大きな違いは、`set`型と違って変更不可（immutable）な集合型である点。<br>
ここで、`frozenset`型の`__dir__`を確認してみよう。


```python
d = frozenset([2, 5, 1, 2])
print(*dir(d), sep = ", ")
```

    __and__, __class__, __class_getitem__, __contains__, __delattr__, __dir__, __doc__, __eq__, __format__, __ge__, __getattribute__, __getstate__, __gt__, __hash__, __init__, __init_subclass__, __iter__, __le__, __len__, __lt__, __ne__, __new__, __or__, __rand__, __reduce__, __reduce_ex__, __repr__, __ror__, __rsub__, __rxor__, __setattr__, __sizeof__, __str__, __sub__, __subclasshook__, __xor__, copy, difference, intersection, isdisjoint, issubset, issuperset, symmetric_difference, union


頑張って探してみると、`__hash__`が実装されていることが分かる。<br>
つまり...ハッシュ化が出来るということが`frozenset`型の魅力である。

そして、ハッシュ化が出来るということは、`frozenset`型は辞書型の`key`になれるということである！<br>
辞書型の`key`として`frozenset`型を使ってみる。


```python
e = frozenset([2, 5, 1, 2])
test_dict = {e : "Hello"} # <- 辞書型のキーに使えている
print(test_dict)
print(test_dict[frozenset([2, 5, 1, 2])])
```

    {frozenset({1, 2, 5}): 'Hello'}
    Hello


辞書型の`key`として使えることが確認できた。
しかし、これ以外は基本的に`set`型と同じであるためあまり使うケースは少ない...

# 参考

> 公式ドキュメント
> https://docs.python.org/ja/3/reference/datamodel.html#set-types
