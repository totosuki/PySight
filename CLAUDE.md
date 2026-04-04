# 1. 概要
PySight (https://pysight.dev) は、Pythonに関する知見をまとめた個人技術サイトです。
公式ドキュメントだけでは掴みにくい、Pythonの仕様や内部の仕組みについて、調査・実験した結果を記事としてまとめています。
ちょっとマニアックだけど、読み物としても楽しめる内容を目指しています。

※ 現在PySightはリニューアルを行っています。詳細は、「2. 構成」にて説明しています。

# 2. 構成
## 2.1. 現在
- HTML・CSS・JSで静的ファイルでGitHub Pagesに載せる構成としている。
- 記事のアップロード方法
	- .ipynbファイルで記事を作成する。
	- jupyter nbconvertコマンドで、Markdownファイルに変換する。
	- StackeditのExport機能を利用して、HTMLファイルに変換する。
- CSSはすべて手動とStackeditのCSSを利用している、TOCはStackeditの機能を利用している。

## 2.2. 目標
- Next.js + TypeScriptのSSG構成にする。
- デプロイ先は、Cloudflare Pagesとする。
- CSSフレームワークにTailwind CSSを使用する。
- Markdownのフロントマターを読み込み、メタ情報を取得する。
- Markdownから動的にHTMLファイルを生成する仕組みを作成する。

# 3. 開発方針
## 3.1. ブランチ戦略
- mainへの直接コミットは禁止。必ずPRを経由する。
- mainブランチは常にデプロイ可能な状態を保つ。
- 作業は必ずfeatureブランチで行う。
- ブランチ名は `issues/<Issue番号>` とする。（例: `issue/5`）
- 但し、軽微な修正でIssueが存在しない場合は `chore/<簡素な説明>` とする。

## 3.2. コミットメッセージ
- 日本語で、変更内容がわかるように簡潔に記述する。（詳細な説明が必要な場合はDescriptionにて行う）
- 例: `Markdownから動的ページを実装`

## 3.3. Pull Request
- PR本文に `closes #<Issue番号>` を記載する。
- マージ後、ブランチは削除する。

## 3.4. Issue運用
- 実装タスクはGitHub Issueとして管理する。
- やることが伝わる粒度でタイトルと本文を書く。
