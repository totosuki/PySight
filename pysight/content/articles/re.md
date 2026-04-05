---
title: "reモジュール"
description: "Pythonのreモジュールについて、関数と例外をまとめました。"
date: "2024-02-01"
---

Python 標準ライブラリの `re` モジュールは、正規表現を使った文字列操作を提供する。

# インポート

```python
import re
```

# 主な関数

## re.match()

文字列の**先頭**がパターンに一致するか確認する。

```python
m = re.match(r'\d+', '123abc')
print(m)        # <re.Match object; span=(0, 3), match='123'>
print(m.group()) # '123'

m2 = re.match(r'\d+', 'abc123')
print(m2)       # None（先頭が一致しない）
```

## re.search()

文字列の**どこか**にパターンが一致するか確認する。

```python
m = re.search(r'\d+', 'abc123def')
print(m.group())  # '123'
```

`match()` との違いは先頭に限定しない点。

## re.findall()

パターンに一致する**すべての部分文字列**をリストで返す。

```python
result = re.findall(r'\d+', 'abc123def456ghi789')
print(result)  # ['123', '456', '789']
```

## re.finditer()

`findall()` と同様だが、マッチオブジェクトのイテレータを返す。

```python
for m in re.finditer(r'\d+', 'abc123def456'):
    print(m.group(), m.span())
```

```
123 (3, 6)
456 (9, 12)
```

## re.sub()

パターンに一致する部分を置換する。

```python
result = re.sub(r'\d+', 'NUM', 'abc123def456')
print(result)  # 'abcNUMdefNUM'
```

第3引数 `count` で置換回数を制限できる。

```python
result = re.sub(r'\d+', 'NUM', 'abc123def456', count=1)
print(result)  # 'abcNUMdef456'
```

## re.split()

パターンで文字列を分割する。

```python
result = re.split(r'[\s,]+', 'one two,three  four')
print(result)  # ['one', 'two', 'three', 'four']
```

## re.compile()

パターンを事前にコンパイルして、繰り返し使う場合に効率化できる。

```python
pattern = re.compile(r'\d+')

print(pattern.findall('abc123def456'))  # ['123', '456']
print(pattern.sub('NUM', 'abc123'))     # 'abcNUM'
```

# フラグ

`re.IGNORECASE`（`re.I`）: 大文字小文字を無視

```python
print(re.findall(r'hello', 'Hello HELLO hello', re.I))
# ['Hello', 'HELLO', 'hello']
```

`re.MULTILINE`（`re.M`）: `^` と `$` が各行の先頭・末尾にマッチ

```python
text = "line1\nline2\nline3"
print(re.findall(r'^\w+', text, re.M))
# ['line1', 'line2', 'line3']
```

# 例外

## re.error

パターンが無効な正規表現の場合に送出される。

```python
try:
    re.compile(r'[invalid')
except re.error as e:
    print(e)  # unterminated character set at position 0
```

# グループ

括弧 `()` でグループ化し、`group()` で取得できる。

```python
m = re.search(r'(\d{4})-(\d{2})-(\d{2})', '2024-01-15')
print(m.group(0))  # '2024-01-15'（全体）
print(m.group(1))  # '2024'
print(m.group(2))  # '01'
print(m.group(3))  # '15'
```

名前付きグループ `(?P<name>...)`:

```python
m = re.search(r'(?P<year>\d{4})-(?P<month>\d{2})', '2024-01')
print(m.group('year'))   # '2024'
print(m.group('month'))  # '01'
```

# 参考

> 公式ドキュメント
> https://docs.python.org/ja/3/library/re.html
