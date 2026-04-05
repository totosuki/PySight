---
title: "存在しないキー取得時の対処法3選"
description: "Pythonの辞書で存在しないキーを扱う方法を紹介。try-except文、dict.getメソッド、defaultdictの使い方を具体例と共に紹介します。"
date: "2024-08-01"
---

Python の辞書（`dict`）で存在しないキーにアクセスすると `KeyError` が発生する。これを安全に扱う方法を3つ紹介する。

```python
d = {'a': 1, 'b': 2}
print(d['c'])  # KeyError: 'c'
```

# 方法 1：try-except 文

最も汎用的な方法。

```python
d = {'a': 1, 'b': 2}

try:
    value = d['c']
except KeyError:
    value = None  # デフォルト値

print(value)  # None
```

エラーの種類に関わらず対応できる柔軟さがあるが、コードが冗長になる。

複数のキーをまとめて処理する場合:

```python
keys = ['a', 'b', 'c', 'd']
results = {}

for key in keys:
    try:
        results[key] = d[key]
    except KeyError:
        results[key] = 0

print(results)  # {'a': 1, 'b': 2, 'c': 0, 'd': 0}
```

# 方法 2：dict.get()

`dict.get(key, default)` はキーが存在しない場合にデフォルト値を返す。

```python
d = {'a': 1, 'b': 2}

print(d.get('a'))        # 1
print(d.get('c'))        # None（デフォルトは None）
print(d.get('c', 0))     # 0（デフォルト値を指定）
```

最もシンプルで読みやすい。デフォルト値が固定の場合に適している。

```python
# カウンターのパターン
text = "hello world"
count = {}

for char in text:
    count[char] = count.get(char, 0) + 1

print(count)
```

```
{'h': 1, 'e': 1, 'l': 3, 'o': 2, ' ': 1, 'w': 1, 'r': 1, 'd': 1}
```

# 方法 3：collections.defaultdict

`defaultdict` はキーが存在しない場合に自動でデフォルト値を生成する辞書。

```python
from collections import defaultdict

# int のデフォルト値は 0
count = defaultdict(int)

text = "hello world"
for char in text:
    count[char] += 1

print(dict(count))
```

```
{'h': 1, 'e': 1, 'l': 3, 'o': 2, ' ': 1, 'w': 1, 'r': 1, 'd': 1}
```

リストをデフォルト値にする例:

```python
from collections import defaultdict

graph = defaultdict(list)
edges = [('a', 'b'), ('a', 'c'), ('b', 'd')]

for src, dst in edges:
    graph[src].append(dst)

print(dict(graph))
```

```
{'a': ['b', 'c'], 'b': ['d']}
```

# 使い分け

| 方法 | 適した場面 |
|---|---|
| `try-except` | 複雑なエラーハンドリングが必要な場合 |
| `dict.get()` | シンプルなデフォルト値が必要な場合 |
| `defaultdict` | 同じデフォルト値を多くのキーに適用する場合 |

# 参考

> 公式ドキュメント（dict.get）
> https://docs.python.org/ja/3/library/stdtypes.html#dict.get

> 公式ドキュメント（collections.defaultdict）
> https://docs.python.org/ja/3/library/collections.html#collections.defaultdict
