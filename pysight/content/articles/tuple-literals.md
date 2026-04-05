---
title: "tuple型のリテラル記法"
description: "Pythonのtuple型のリテラルでの記述方法を紹介。"
date: "2024-11-10"
---

# tuple型のリテラル

一つの要素のみからなるtuple型をリテラルで定義する方法は以下である。


```python
a = (1,)
print(type(a))

# "()"無しでも可能
a = 1,
print(type(a))
```

    <class 'tuple'>
    <class 'tuple'>


ただ単に`()`で記述した場合はタプル型にはならない。


```python
a = (5)
print(type(a))
```

    <class 'int'>


また、要素数が0のtuple型を作成する方法は以下である。


```python
a = ()
print(type(a))
```

    <class 'tuple'>


# 参考文献

> 公式ドキュメント
> https://docs.python.org/ja/3/library/stdtypes.html#tuple
