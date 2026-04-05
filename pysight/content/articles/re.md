---
title: "reモジュール"
description: "Pythonのreモジュールについて、関数と例外をまとめました。"
date: "2024-12-19"
---

# reモジュール

文字列に対して、検索や置換、検証などをする方法として正規表現を使用する方法が挙げられる。今回は、Pythonでの正規表現を使うために使用するモジュール`re`について解説をしていこうと思う。

reモジュールを使用するには以下のコードが必要である。


```python
import re
```

# 関数

## re.compile

正規表現オブジェクト`re.Pattern`にコンパイルをする。
コンパイルすることで、`match`や`search`などを使ってマッチングが出来るようになる。
だが、後述する`re.match`や`re.search`でもマッチングが出来るため、少ないマッチング回数であれば当関数を使う必要性はない


```python
pattern = re.compile("吾輩は[猫犬]")
match = pattern.match("吾輩は犬である。名前はまだ無い。")
print(f"type(pattern) : {type(pattern)}, type(match) : {type(match)}")
print(match, end = "\n\n")

# 上の処理と下の処理は同等である
matcn = re.match(
  pattern = "吾輩は[猫犬]",
  string = "吾輩は犬である。名前はまだ無い。"
)
print(f"type(match) : {type(match)}")
print(match)
```

    type(pattern) : <class 're.Pattern'>, type(match) : <class 're.Match'>
    <re.Match object; span=(0, 4), match='吾輩は犬'>
    
    type(match) : <class 're.Match'>
    <re.Match object; span=(0, 4), match='吾輩は犬'>


## re.search

この関数は、先ほどまでに紹介した通りである。
`pettern`がマッチする最初の位置を探して、対応する`re.Match`を返す。
文字列内でマッチしなければ`None`を返す。


```python
match = re.search(
  pattern = "猫",
  string = "吾輩は猫である。名前はまだ無い。"
)
print(type(match))
print(match)
```

    <class 're.Match'>
    <re.Match object; span=(3, 4), match='猫'>


## re.match

`string`の先頭の文字が`pattern`とマッチする場合のみ`re.Match`を返す。
それ以外は全て`None`として返す。


```python
match = re.match(
  pattern = "猫",
  string = "吾輩は猫である。名前はまだ無い。"
)
print(match)
match = re.match(
  pattern = "吾輩",
  string = "吾輩は猫である。名前はまだ無い。"
)
print(match)
```

    None
    <re.Match object; span=(0, 2), match='吾輩'>


## re.fullmatch

`string`全体が`pattern`にマッチする場合のみ、`re.Match`を返す。
それ以外は全て`None`を返す。


```python
match = re.fullmatch(
  pattern = "猫",
  string = "吾輩は猫である。名前はまだ無い。"
)
print(match)
match = re.fullmatch(
  pattern = "吾輩は猫である。名前はまだ無い。",
  string = "吾輩は猫である。名前はまだ無い。"
)
print(match)
```

    None
    <re.Match object; span=(0, 16), match='吾輩は猫である。名前はまだ無い。'>


## re.split

`pattern`にマッチする`string`の部分で分割する。
戻り値はリストで返される。


```python
match = re.split(
  pattern = "l",
  string = "Hello, World!"
)
print(match)
match = re.split(
  pattern = " ", # 半角スペース
  string = "Hello, World!"
)
print(match)
```

    ['He', '', 'o, Wor', 'd!']
    ['Hello,', 'World!']
    ['Hello, World!']


## re.findall

`pattern`にマッチする全ての文字列をリストで返す。


```python
match = re.findall(
  pattern = r"g[a-z]*",
  string = "Let's go to the baseball game!"
)
print(match)
match = re.findall(
  pattern = r"猫",
  string = "Let's go to the baseball game!"
)
print(match)
```

    ['go', 'game']
    []


注意点は、正規表現を使わず`pattern`を記述してもあまり意味が無いということだ。（単語の数を数える程度には使えるだろう）


```python
match = re.findall(
  pattern = r"base",
  string = "base base kick kick base kick kick"
)
print(match)
print(len(match))
```

    ['base', 'base', 'base']
    3


## re.finditer

`pattern`に当てはまる全ての文字列を、順々に表示するイテレータを作成する。
作成されるイテレータの型は`callable_iterator`。
因みに、「イテレータとは何か？」については[私の記事](https://totosuki.github.io/iterable-iterator)でも紹介をしている。


```python
match = re.finditer(
  pattern = r"t[a-z]*",
  string = "I want to go to the game too."
)
print(type(match))
for m in match:
  print(m)
```

    <class 'callable_iterator'>
    <re.Match object; span=(5, 6), match='t'>
    <re.Match object; span=(7, 9), match='to'>
    <re.Match object; span=(13, 15), match='to'>
    <re.Match object; span=(16, 19), match='the'>
    <re.Match object; span=(25, 28), match='too'>


## re.sub

`pattern`にマッチする`string`の部分を`repl`引数に置き換える。
`count`に数値を入れることで、置き換える回数を指定することが出来る。
戻り値は`str`で返される。
`repl`引数には関数をいれることも可能であり、関数には`re.Match`クラスが渡されるらしい。


```python
match = re.sub(
  pattern = r"犬",
  repl = "猫",
  string = "犬の名前はまだ無い。"
)
print(match)
match = re.sub(
  pattern = "[a-z]+@",
  repl = "****@",
  string = "google@gmail.com, yahoo@co.jp ant exapmle@test.org",
  count = 2 # 置換回数
)
print(match)
```

    猫の名前はまだ無い。
    ****@gmail.com, ****@co.jp ant exapmle@test.org


## re.subn

やっていることは、`re.sub`と変わらない。
ただ、戻り値が`(置換された文字列, 置換した回数)`のタプル型に変わる。


```python
match = re.subn(
  pattern = r"犬",
  repl = "猫",
  string = "犬の名前はまだ無い。"
)
print(type(match))
print(match)
match = re.subn(
  pattern = "[a-z]+@",
  repl = "****@",
  string = "google@gmail.com, yahoo@co.jp ant exapmle@test.org",
  count = 2 # 置換回数
)
print(type(match))
print(match)
```

    <class 'tuple'>
    ('猫の名前はまだ無い。', 1)
    <class 'tuple'>
    ('****@gmail.com, ****@co.jp ant exapmle@test.org', 2)


## re.escape

`pattern`に渡した文字列に特殊文字が含まれている場合、エスケープしてくれる関数。
引数は`pattern`のみで、戻り値は`str`。
`python3.7`以降は正規表現で特殊な意味を持つ文字のみがエスケープされるようになった。


```python
text = re.escape("https://www.python.org")
print(type(text))
print(text)
text = re.escape("!#$%&'*+-.^_`|~:")
print(text)
```

    <class 'str'>
    https://www\.python\.org
    !\#\$%\&'\*\+\-\.\^_`\|\~:


## re.purge

`re`モジュールのキャッシュをクリアするためのメソッド。
キャッシュは過去にコンパイルされた正規表現を保持することで速度向上につながるもの。
内部的には見た感じ、`re._cache`というデータがキャッシュの役割となっており、`dict`で管理されている。


```python
pattern1 = re.compile("猫")
pattern2 = re.compile("犬")
pattern3 = re.compile("吾輩は[猫犬]")

print(f"cache size : {len(re._cache)}")

re.purge()

print(f"cache size : {len(re._cache)}")
```

    cache size : 3
    cache size : 0


実際にcacheのサイズが変わっていることが確認できた。
具体的な内部仕様を見たい場合は、[この辺り](https://github.com/python/cpython/blob/main/Lib/re/__init__.py)を見ると良い。

# 例外

## re.PatternError

reモジュールに存在する唯一の例外である。
有効な正規表現ではないものが含まれていた場合に、出力される。
当たり前ではあるが、マッチしないだけの場合は例外にはならない。
`python3.12`までは、この例外は`re.error`であった。結構わかりやすくなった！


```python
try:
  re.compile("*") # 無効な正規表現
except re.error as e:
  print(e)

raise re.error("エラーが発生しました。")
```

    nothing to repeat at position 0

    ---------------------------------------------------------------------------
    error                                     Traceback (most recent call last)
    Cell In[70], line 6
          3 except re.error as e:
          4   print(e)
    ----> 6 raise re.error("エラーが発生しました。")

    error: エラーが発生しました。


上記コードは、`pyton3.11`にて実行しているため、`re.error`を使用している。

# 参考

> 公式ドキュメント
> https://docs.python.org/3/library/re.html
