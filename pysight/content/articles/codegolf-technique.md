---
title: "Code Golfのテクニック5選"
description: "Code Golf の概要を「Hello World」で解説し、変数名短縮・セイウチ演算子・open(0) 入力・\"YNeos\"スライスなど、Python での Code Golf テクニックを5つ、実例付きで紹介します。"
date: "2025-05-04"
---

# Code Golfとは？

まず初めに、Code Golf とは<b>「できるだけ短いコードで、与えられた問題を解決する競技」</b>である。

実際に例題を交えて説明した方が伝わると思うので、例題を用意した。

```text
以下の文章を出力してください。

Hello World!
Hello World!
Hello World!
Hello World!
Hello World!
```

まずは、単純明快な解法を考えてみる。

```python
print("Hello World!")
print("Hello World!")
print("Hello World!")
print("Hello World!")
print("Hello World!")
```

`print` 関数を 5 回使用して問題を解いた。

ここからは Code Golf をしていく。Code Golfはできるだけ短いコードで問題を解決する競技なので、更に短くしてみよう！

今回の場合は、for文を使用することで更に短く出来そうだ。
```python
for i in range(5):
    print("Hello World!")
```
また、 for文の中身が一行なので、以下のように書ける。
```python
for i in range(5):print("Hello World!")
```

次に、変数 `i` は使わない為このように書くと四文字省略できる。
```python
for i in[0]*5:print("Hello World!")
```

---

ちなみに、`in` と `[0]` の間にスペースが無くても動く理由は、記号と文字が隣接している場合、間の空白が省略出来るからである。

---

そして、おそらくこの例題の最短コードは以下である。
```python
exec("print('Hello World!');"*5)
```

それでは最初に書いたコードと、出来るだけ短く書いたコードを見比べて見る。
Code Golf がどのようなものか分かったかな？

```python:短縮前
print("Hello World!")
print("Hello World!")
print("Hello World!")
print("Hello World!")
print("Hello World!")
```
```python:短縮後
print("Hello World!\n"*5)
```


# Code Golf テクニック5選
それでは。私が思う、Python の Code Golf で「これはおすすめ！」と思うテクニックを５項目に分けて紹介する。

### 注意書き
- [AtCoder](https://atcoder.jp/) 上での Code Golf を想定して記述してるため、[Code Golf](https://code.golf/) といった Code Golf 用のサイトとはズレがある可能性がある。
- `map(int, input().split())` のような、一般的に競技プログラミングで使われている入力方法を多く使用している。


# 1.　基本的な短縮
１つめは、１番重要でありとても効果的なテクニック（と呼べるか分からないが）である。


## 1.1　変数名を１文字にする
まずは、変数名を１文字にする。これをするだけで、Code Golf感が増し、コードの短縮に繋がる。

また、Python ではアルファベットの大文字と小文字を区別出来るため、一文字でも変数名に困ることは Code Golf において無い。
```python:変更前
hello_text = "Hello World!"
for i in range(5):
    print(hello_text)
```
```python:変更後
T = "Hello World!"
for i in range(5):
    print(T)
```


## 1.2　余計な空白を無くす
一般的なコードでは、可読性（コードの読みやすさ）を上げるために、空白や改行を使い見やすくするが、Code Golf では必要ない。

また、Pythonで間の空白を省略出来る場合は沢山あるので、気になった方は是非色々試してみて欲しい。
```python:変更前
T = "Hello World!"
for i in range(5):
    print(T)
```
```python:変更後
T="Hello World!"
for i in range(5):
    print(T)
```
## 1.3　余計な改行を無くす
if文やfor文などの、中身が１行の場合は、コロン `:` の隣に記述できる。

```python:変更前
T="Hello World!"
for i in range(5):
    print(T)
```
```python:変更後
T="Hello World!"
for i in range(5):print(T)
```
## 1.4　インデントを１にする
実は、インデントは１でもプログラムを動かすことが出来る。
可読性がとてもとても悪くなるので普段はしちゃ駄目！！
```python:変更前
T="Hello World!"
for i in range(5):
    print(T)
```
```python:変更後
T="Hello World!"
for i in range(5):
 print(T) # <- 勿論処理が１行なのでfor文の横に書ける
```

# 2.　変数への代入テクニック
コードを書く上で欠かせないものが変数である。

その中で、初期化や代入の部分で工夫をすることで、コードを短縮できる可能性がある。


## 2.1　同じ値を複数の変数に代入したい場合
同じ値を複数の変数に代入することは１行で簡潔に書ける。
```python:変更前
x=0
y=0
z=0
```
```python:変更後
x=y=z=0
```
基本的にイミュータブルの型であればこのテクニックを使うことができる。

---

Python のイミュータブルな型は `bool` `int` `str` `tuple` などである。詳しくイミュータブルについて知りたい方は[こちらの記事](https://gammasoft.jp/blog/python-built-in-types/)がおすすめ。


## 2.2　アンパック代入
リストや文字列などのイテラブルなオブジェクトは、複数の変数へ一気に代入することができる。

後ほど紹介するが、`open(0)` で入力を受け取る方法と相性が良く覚えておいて損は無い。
```python:変更前
A=list(map(int,input().split()))
print(A[1:])
```
```python:変更後
_,*A=map(int,input().split())
print(A)
```


## 2.3　セイウチ演算子
セイウチ演算子とは「変数の代入と使用」を同時に行える演算子である。あまり使用されていない演算子であるが、Code Golfで使用すると短縮できる場合が存在する。

以下は、配列の長さが５以上の場合に配列の平均値を出力するプログラムである。
```python:変更前
A=list(map(int,input().split()))
l=len(A)
s=sum(A)
if(l>=5):print(s/l)

# よりCodeGolfっぽく書くと...
A=list(map(int,input().split()))
if len(A)>=5:print(sum(A)/len(A))
```
```python:変更後
if(l:=len(A:=list(map(int,input().split()))))>=5:print(sum(A)/l)
```
「変数の代入と使用」を同時に行っている箇所は、`:=` がある所である。

if文や内包表記などの、普段は代入が行えない場所で代入が行えるのがとても便利！




# 3.　input 関数のテクニック



## 3.1　入力をそのままfor文に使う
「for文を使う入力であり、その入力が最後に来る」時には、そのままfor文に使ったほうが短くなる場合が多い。

```python:変更前
N,X=map(int,input().split())
A=map(int,input().split())
c=0
for a in A:
 if a<X:c+=1
print(c)
```
```python:変更後
N,X=map(int,input().split())
c=0
for a in map(int,input().split()):
 if a<X:c+=1
print(c)
```


## 3.2　必要の無い入力がある場合
問題によっては、１つの行が完全に必要ない入力の場合がある。
`input()` は関数なので代入をせずに呼び出すことができる！

```python:変更前
_=input()
A=list(map(int,input().split()))
print(sum(A))
```
```python:変更後
input()
A=list(map(int,input().split()))
print(sum(A))
```
また、必要の無い入力の後に２行以上入力が来る場合、セイウチ演算子を使うことで更に短縮に繋がる。
（ここまで入力が多いと`open(0)` を使用した場合の方が短い可能性が高い）
```python
(i:=input)()
A=list(map(int,i().split()))
B=list(map(int,i().split()))
print(sum(A+B))
```

## 3.3　eval 関数を利用する

まず `eval` 関数とは、簡単に言うと「文字列として書いたコードを実行する関数」である。

入力に使われる、`list(map(int, input().split()))` を文字列にして `eval` 関数で実行すると短縮することができる。

```python:変更前
A=list(map(int,input().split()))
B=list(map(int,input().split()))
```
```python:変更後
S="list(map(int,input().split()))"
A=eval(S)
B=eval(S)
```

個人的に好きな短縮方法なので紹介したが、実際は後ほど紹介する `open(0)` という方法があるため使うタイミングはあまりない...


# 4.　open(0) の入力テクニック
先程、`input` 関数のテクニックを紹介しましたが、大量の入力を受け取る際には `open(0)` を使うと更に短く書ける場合が多い。

## 4.1　open(0) って何？
Pythonでの入力を受け取る方法は、`input` `sys.stdin` `sys.stdin.buffer` `io.BytesIO` などあるが、`open(0)` というものでも入力を受け取ることが可能である。

では、`open(0)` がなぜCode Golfで良く使われているかというと、全ての入力を改行区切りで一度に受け取る事ができるからである。



## 4.2　open(0) の注意点

では、早速 `open(0)` で入力した値を受け取ってみよう！以下のコードを実行してみる。
```python
S = open(0)
print(S)
```
```plaintext:出力
<_io.TextIOWrapper name=0 mode='r' encoding='UTF-8'>
```
すると、入力ができずにこのような出力になった。

この問題の原因は、`open(0)` の戻り値が `str` 型では無く、 `TextIOWrapper` 型というものが戻り値として設定されている事が理由である。

では、どのようにしたら入力をした値を利用できるのだろう？
ここで、`TextIOWrapper` クラスにはどのような関数が実装されているのか確認してみる。

```python
print(dir(open(0)))
```
```plaintext:出力
[..., __iter__, ..., __next__, ...]
```
出力結果が長いので省略するが、`__iter__` と `__next__` 関数が含まれていた。これで、for文やアンパックなどをすることで、入力した値を利用できるということが分かった。

ちなみに、 `__iter__` や `__next__` があるとfor文が出来るかは、[PySight 内の記事](https://pysight.dev/articles/iterable-iterator/)で詳しく解説している。


## 4.3　open(0) の入力その１
１番使用頻度が高いと思う `open(0)` での入力方法は、「１度に入力を受け取ってアンパック代入」である。
```python:変更前
N=int(input())
S=input()
print(S[:N])

# input() でも、もう少し短く出来る
N=int(input())
print(input()[:N])
```
```python:変更後
N,S=open(0)
print(S[:int(N)])
```
`open(0)` を使用する際、 `Ctrl+D` を押すことで標準入力を終了できる。

もちろん、変数に `*` をつけることで、残りの要素を全て受け取ることもできる。
```python
N,*S=open(0)
print(S)
```
入力
```plaintext:入力
5
abcde
vwxyz
```
出力
```plaintext:出力
['abcde\n', 'vwxyz']
```

出力を見ると`open(0)` で入力を受け取ると、改行コード `\n` が残ることが分かる。

対象法は色々ありますが良く使う３種類を軽く紹介する。
- 空白区切りで後々リスト等にする場合：`split()`
- ただ文字列として利用したい場合： `[:-1]`
- 上記以外で削除したい場合：`strip()`

もちろん上記の方法が最短になるとは限らないので、色々試してみるのが良いだろう。


## 4.4　open(0) の入力その２
全ての入力が、空白 か `\n` で区切られてる時、以下の入力方法が使用できる。
```python:変更前
N=int(input())
A=list(map(int,input().split()))
print(A[:N])
```
```python:変更後
N,*A=map(int,open(0).read().split())
print(A[:N])
```
入力
```plaintext:入力
3
1 2 3 4 5
```
出力
```plaintext:出力
[1, 2, 3]
```
どのような時に使うかだが、「空白 か `\n` で区切られていて、全ての入力を整数に変換したい」時が一番使うべきタイミングだ。


## 4.5　open(0) の 0 で初期化
これは入力のコツでは無いが、整数の変数を０で初期化したい時、`open(0)` と セイウチ演算子を組み合わせることで、１文字短縮に繋がる。
```python:変更前
X,*A=map(int,open(0).read().split())
c=0
for a in A:
 if a<X:c+=1
print(c)
```
```python:変更後
X,*A=map(int,open(c:=0).read().split())
for a in A:
 if a<X:c+=1
print(c)
```
入力
```plaintext:入力
5
1 2 3 4 5 6 7
```
出力
```plaintext:出力
4
```




# 5.　スライス と "YNeos"
実は、Code Golf では条件式を、配列のスライス操作に使う場合がある。

## 5.1　YNeos って何？
以下は、`x` が 3 未満の場合 `Yes` を出力し、そうでない場合は `No` を出力するコードだ。
```python
if x < 3:
 print("Yes")
else:
 print("No")
```
より短く書くと以下の様になる。
（更に空白を削れるが見にくいため、ここではしていない。）
```python
print("Yes" if x<3 else "No")
```
結構短くなったが、スライス操作を使用することで更に短く書くことが可能である。
```python
print("YNeos"[x>2::2])
```
「一体、何をしてるんだ！」となるかもしれない。

そこで、 `"YNeos"` の０文字目から１つ飛ばしで文字を取り出して出力するコードを書いてみる。
```python
print("YNeos"[0::2])
```
```python:出力
Yes
```
`Yes` と出力された！

２つのコードを見比べてみると`"YNeos"`が何をしていたか分かると思う。
このテクニック（ `"YNeos"` ）は...

---

条件式が `True` なら 1 、`False` なら 0 として、スライスの開始位置を変えて、`"Yes"` か `"No"` を出力させるテクニックである。

---

ちなみに、なぜ条件式（ `True` `False` ）が１や０として扱えるかと言うと、「 `bool` クラスが `int` クラスのサブクラス」であるからだ。

詳しくは、[公式リファレンス](https://docs.python.org/3/library/functions.html#bool)にて記述されている。

## 5.2　YNeos と NYoe s
`"YNeos"` の意味について理解できた所で、実際の使用例を見てみる。

```plaintext:問題文
与えられた整数が、3 未満なら Yes そうでないなら No と出力してください。
```
```python
print("YNeos"[int(input())>2::2])
```
注意点としては、条件式を `int(input()) < 3` にしてしまうと、３未満の場合 `True` となり、出力結果は `No` となってしまう。そのため上記のコードでは、「与えられた整数が 3 以上の場合に、条件式が `True` となる」ようにコードを書いている。

次に `"YNeos"` が使えない場合にどうするのか、問題を交えて考えてみる。

```plaintext:問題文
与えられた整数が、奇数なら Yes 偶数なら No と出力してください。
```
```python
print("NYoe s"[int(input())%2::2])
```
まず、奇数偶数の判定は `%2` `&1` などで行えて、両方とも奇数の場合 1 となる。
この問題では「奇数の場合に `Yes` 」のため、`"YNeos"` と書こうとすると少し冗長になってしまう。

そこで、`Yes` と `No` の順番を入れ替えた`"NYoe s"`を使用することで短く書くことができる。

## 5.3　条件式でインデックス指定
インデックス指定に条件式を入れるテクニックも存在する。

```plaintext:問題文
「P」と入力したら Python と出力し、それ以外は C# と出力してください。
```
```python:短縮前
print("CP#y t h o n"[input()=="P"::2])
```
```python:短縮後
print(["C#","Python"][input()=="P"])
```
今回の様に「2つの選択肢の文字列の長さに大きな差がある場合」は、インデックス指定の方が短い場合も存在する。

また、変数に値を代入する際にもインデックス指定が最適な場合がある。
以下のコードは、入力した値が 20 未満の場合 10、それ以外は 20 を変数に代入している。
```python
x=[10,20][int(input())<20]
```

# 参考
本記事で参照した資料や参考リンクは、各内容に応じて本文中に適宜リンクとして掲載しています。
