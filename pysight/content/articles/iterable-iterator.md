---
title: "iterableとiterator"
description: "Pythonのiterableとiteratorの違いを解説。基本的な概念からfor文の仕組み、実装例までをまとめてみました。"
date: "2024-04-01"
---

Python で `for` 文や `list()` などを使うとき、裏側では **iterable** と **iterator** の仕組みが動いている。この2つの概念を整理する。

# iterable とは

`for` 文で繰り返し処理できるオブジェクトを **iterable（イテラブル）** と呼ぶ。`__iter__()` メソッドを持つオブジェクトがこれに当たる。

```python
# これらはすべて iterable
print(hasattr([1, 2, 3], '__iter__'))   # True
print(hasattr("hello", '__iter__'))      # True
print(hasattr((1, 2), '__iter__'))       # True
print(hasattr({1, 2}, '__iter__'))       # True
print(hasattr({'a': 1}, '__iter__'))     # True
```

整数は iterable ではない。

```python
for i in 42:  # TypeError: 'int' object is not iterable
    pass
```

# iterator とは

**iterator（イテレータ）** は `__next__()` メソッドを持ち、呼ばれるたびに次の要素を返すオブジェクトである。要素が尽きると `StopIteration` を送出する。

```python
lst = [1, 2, 3]
it = iter(lst)      # iterator を取得

print(next(it))     # 1
print(next(it))     # 2
print(next(it))     # 3
print(next(it))     # StopIteration
```

```
1
2
3
Traceback (most recent call last):
  ...
StopIteration
```

# for 文の仕組み

`for x in obj:` は内部で以下と同等の処理をしている。

```python
it = iter(obj)        # obj.__iter__() を呼ぶ
while True:
    try:
        x = next(it) # it.__next__() を呼ぶ
    except StopIteration:
        break
    # ループ本体
```

# iterable と iterator の違い

| | iterable | iterator |
|---|---|---|
| 必要なメソッド | `__iter__()` | `__iter__()` + `__next__()` |
| 状態を持つ | 持たない | 現在位置を持つ |
| 再利用 | できる | できない（使い切り） |

```python
lst = [1, 2, 3]

# iterable は何度でも使える
for x in lst: pass
for x in lst: pass  # OK

# iterator は一度使い切り
it = iter(lst)
for x in it: pass
for x in it: pass  # 何も出力されない（空）
```

# カスタム iterator の実装

`__iter__()` と `__next__()` を実装することで独自の iterator が作れる。

```python
class Countdown:
    """n から 1 までカウントダウンする iterator"""

    def __init__(self, n):
        self.n = n

    def __iter__(self):
        return self

    def __next__(self):
        if self.n <= 0:
            raise StopIteration
        self.n -= 1
        return self.n + 1

for i in Countdown(5):
    print(i, end=" ")
```

```
5 4 3 2 1 
```

# ジェネレータ

`yield` を使うと iterator を簡単に作れる。

```python
def countdown(n):
    while n > 0:
        yield n
        n -= 1

for i in countdown(5):
    print(i, end=" ")
```

```
5 4 3 2 1 
```

ジェネレータ関数は呼び出すと自動的に iterator オブジェクトを返す。

# 参考

> 公式ドキュメント
> https://docs.python.org/ja/3/glossary.html#term-iterable
> https://docs.python.org/ja/3/glossary.html#term-iterator
