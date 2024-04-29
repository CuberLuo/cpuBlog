## 总体操作

<img src="https://cdn.jsdelivr.net/gh/CuberLuo/Picture/pic/202404291225052.png" alt="image-20240429122513908" style="zoom:150%;" />



> git pull 等同于git fetch + git merge

## Git加速

Git查看代理

```shell
git config --global --get http.proxy
git config --global --get https.proxy
```

由于Git不走系统代理，需要自己配置Git代理端口

V2Ray的代理端口为10809（Clash Verge代理端口为7897），因此使用以下命令配置Git代理

```shell
git config --global http.proxy http://127.0.0.1:10809
git config --global https.proxy http://127.0.0.1:10809
```

## Git行尾序列问题

由于新版本的 `git` 在 `Windows` 下拉代码，默认是 `crlf`，每个文件行尾序列都被设置为 `crlf`

- `LF`："\n"，Linux的换行符；
- `CRLF`："\r\n"，Windows的换行符。

解决方案：

第一步，运行命令（禁止 git 自动将 lf 转换成 crlf）

```shell
git config --global core.autocrlf false
```

第二步，打开 `VSCode` 设置，搜索 `eol`，将其修改为 `auto`

## Git文件的4种状态

- Untracked（新添加的文件）
- Unmodified（已被Commit的文件）
- Modified（被修改的文件）
- Staged（添加到暂存区的文件）
