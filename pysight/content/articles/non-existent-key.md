---
title: "存在しないキー取得時の対処法3選"
description: "Pythonの辞書で存在しないキーを扱う方法を紹介。try-except文、dict.getメソッド、defaultdictの使い方を具体例と共に紹介します。"
date: "2024-11-12"
---

# 存在しないkeyを取得すると

`dict`型では存在しない`key`を取得しようとするとエラーが起きてしまう。<br>
まず初めに実際に取得しようとしてみよう。


```python
a = {"a" : 1, "b" : 2}
print(a["c"])
```


    ---------------------------------------------------------------------------
    KeyError                                  Traceback (most recent call last)
    Cell In[4], line 2
          1 a = {"a" : 1, "b" : 2}
    ----> 2 print(a["c"])

    KeyError: 'c'


`KeyError`例外が出た。今回はこれの対処方法を<b>三つ紹介</b>しようと思う。

# try-except

dict型の存在しない`key`で値を取得する可能性がある際に、対処する方法を二つ紹介する。<br>
一つ目は、最も一般的な方法である`try-except`文を使用する方法である。

実際に、`try-except`文を使用して存在しない`key`を取得しようとしてみる。


```python
a = {"a" : 1, "b" : 2}
try:
    print(a["c"])
except KeyError:
    print("KeyErrorです")
```

    KeyErrorです


しっかり`try-except`文を使用することで、対処をすることが出来た。

# dict.get()

二つ目の対処方法は、`dict.get`メソッドを使う方法である。<br>
`dict.get`メソッドを使うことで、`key`が存在しない場合に対処できることが出来る。


```python
a = {"a" : 1, "b" : 2}
print(a.get("c"))
```

    None


存在しない`key`を取得しようとすると、`None`が返された。<br>

また、`dict.get`メソッドの引数には`default`というものがあり、それを指定することで、存在しない`key`を取得しようとした際に返される値を変更することが出来る。<br>
ちなみに、`default`引数の初期値は`None`のため先程は`None`が返されていた。


```python
a = {"a" : 1, "b" : 2}
print(a.get("c", -1))
```

    -1


`default`引数に`-1`を入れたので、存在しない`key`を取得した際に`-1`が返されていることが確認できた。

# defaultdict

最後に、そもそも`dict`型を使用しないという解決手段が存在する。<br>
標準ライブラリにある`collections`には、`defaultdict`というデータ型が存在する。<br>


```python
from collections import defaultdict
```

`defaultdict`は、インスタンス化の際に初期化を関数ですることが可能である。<br>
今回は、例として分かりやすくするため無名関数を使用しないが、実際は無名関数を使用したほうが良いと思う。


```python
def func():
    return "Hello"

a = defaultdict(func)
a["a"] = 1
a["b"] = 2
print(a["a"])
print(a["b"])
print(a["c"])
```

    1
    2
    Hello


また、当たり前ではあるがint型などデータ型のコンストラクタを利用することも可能である。


```python
a = defaultdict(list)
a["a"] = [1, 2, 3]
a["b"].append(4)
print(a["a"])
print(a["b"])
print(a["c"])
```

    [1, 2, 3]
    [4]
    []


# 参考

> 公式ドキュメント（defaultdict）
> https://docs.python.org/ja/3.13/library/collections.html#collections.defaultdict

> Pythonの辞書のgetメソッドでキーから値を取得（存在しないキーでもOK）
> https://note.nkmk.me/python-dict-get/
