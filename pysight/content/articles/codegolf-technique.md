---
title: "Code Golfのテクニック5選"
description: "Code Golf の概要を「Hello World」で解説し、変数名短縮・セイウチ演算子・open(0) 入力・\"YNeos\"スライスなど、Python での Code Golf テクニックを5つ、実例付きで紹介します。"
date: "2024-05-01"
---

**Code Golf** とは、プログラムを可能な限り少ない文字数で書くことを競うプログラミングの遊びである。可読性は無視して、とにかくコードを短くすることが目標だ。

# Hello World で体験

通常の Hello World:

```python
print("Hello, World!")
```

これを Code Golf で短くすると:

```python
print("Hello, World!")
```

……この例ではこれ以上短くならない。では競技プログラミングでよく出る「標準入力を受け取って出力する」を例にとろう。

```python
# 通常
n = int(input())
print(n * 2)

# Code Golf
n=int(input())
print(n*2)
```

スペースを取り除くだけでも文字数が減る。

# テクニック 1：変数名を1文字に

```python
# Before
number = int(input())
result = number * 2
print(result)

# After
n=int(input())
print(n*2)
```

変数名は `n`, `a`, `b`, `i` など1文字にする。

# テクニック 2：セイウチ演算子 `:=`

Python 3.8 以降で使える代入式。

```python
# Before
n = int(input())
if n > 0:
    print(n)

# After
if(n:=int(input()))>0:print(n)
```

セイウチ演算子を使うと、条件式の中で変数に代入しながら評価できる。

# テクニック 3：`open(0)` で標準入力

`open(0)` はファイルディスクリプタ 0（標準入力）を開く。`input()` より短い。

```python
# Before
for line in sys.stdin:
    print(line.strip())

# After
for l in open(0):print(l,end="")
```

複数行の入力を読み込む際に便利。

# テクニック 4："YNeos" スライス

Yes/No を出力する問題でよく使われるテクニック。

```python
# Before
if condition:
    print("Yes")
else:
    print("No")

# After
print("YNeos"[condition::2])
```

`condition` が `True`（1）のとき `"YNeos"[1::2]` = `"Ye"` … ではなく、`True` は `1` なので `"YNeos"[1::2]` = `"No"` …

正確には：
- `condition = True（1）` → `"YNeos"[0::2]` = `"Ye"` → `"Yes"` のインデックスを逆に。

実際の使い方：

```python
print("Yes\nNo"[condition*4:])
# condition=True(1) → "Yes\nNo"[4:] = "No"... 違う

# 正しい "YNeos" テクニック
print("YNeos"[condition^1::2])
```

少し複雑だが、条件に応じた短い文字列選択で広く使われる。

# テクニック 5：リスト内包表記とジェネレータ

```python
# Before
result = []
for i in range(10):
    if i % 2 == 0:
        result.append(i * i)
print(result)

# After
print([i*i for i in range(10)if i%2==0])
```

内包表記はループと条件を1行に圧縮できる。

# 注意

Code Golf はあくまでも遊びであり、実際の開発では可読性を重視したコードを書くべきである。テクニックとして知っておくと、Pythonの機能への理解が深まる。

# 参考

> codegolf.stackexchange.com
> https://codegolf.stackexchange.com/
