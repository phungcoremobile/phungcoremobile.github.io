# phungprofile.github.io
# 環境
ウェブ： EC-Cube4
DB: PostgreSQL
PHP: 5.3.3

# TODO
- DockerのVolume設定
- Log not showing
- set proper pgadmin

# Dockerコマンド
```
docker-compose up -d    # コンテナーを起動する
docker-compose down     # コンテナーを停止する
``` 

# ウェブ
[アクセス](http://localhost:8080)

# サーバログ
PHPのエラーが発生したら、`/data/logs/site.log`というファイルにログを吐き出します。\
ファイルがない場合自分で作れば良いです。

# 残り作業
- set proper pgadmin
