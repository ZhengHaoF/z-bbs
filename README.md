# Z-BBS

#### 介绍
Z-BBS是一个轻量级论坛系统，前端采用Bootstrap4，后端采用ThinkPHP，全部操作接口化，对接简单方便，前端自适应手机平板等。

网站设计成前后端分离，网页渲染在前端实现，后端只做数据传递，开放空间大。

### 详情

#### 在线测试

[Z-Blog (zhfblog.top)](https://bbs.zhfblog.top/)

#### 接口文档

#### 更新历史：

v0.0.6 Beta 2022.02.25 更新：

- 新增用户注册功能，更新安装教程

v0.0.6 Beta 2021.12.04 更新：

- 修改头像上传功能，不在数据库中存储图片Base64编码，大幅提升响应速度
- 后台增加图像压缩，减少资源消耗
- 修改博客界面评论后不刷新的问题
- 修改博客界面评论后模态框不关闭的问题

v0.0.5 Beta 2021.12.03 更新：

- 新增修改头像功能
- 优化数据库逻辑，支持超长博文

v0.0.4 Beta 2021.11.30 更新：

- 新增用户管理界面
- 新增删除博文功能
- 新增编辑博文功能
- 优化主页样式
- 修改用户交互逻辑，去除不必要的动画。

v0.0.3 Beta 2021.11.22 更新：

- 评论逻辑优化
- 二级评论功能完善

v0.0.2 Beta 2021.11.17 更新：

- 一级评论
- 展开评论

v0.0.1 Beta 2021.11.09 基础框架：

- 查看博文
- 添加博文
  - 用户登录


#### 安装流程

该项目前后端分离，前后端需分开部署，在这里以宝塔为例

假设网站域名 为 `bbs.zhfblog.top`

##### 后端搭建

新建网站用作后台，建议取名为 `api.bbs.zhfblog.top` 

 - 安装`Composer`
 - 选择合适的PHP版本
 - 执行参数改为自定义命令
 - 补充命令填写 `composer create-project topthink/think tp`
 - 镜像源选择阿里
 - 执行目录选择网站目录
 - 点击执行安装ThinkPHP
 - 安装好后，上传并替换程序
 - 设置网站路径为`tp/public`
 - 访问网站，如果出现了欢迎界面，则为安装完成

![](https://i.bmp.ovh/imgs/2022/01/22d38056e0f9d19f.png)

根据实际修改`.env`文件，替换`tp\app\controller`中的`Index.php`文件和

##### 前端搭建

新建网站，上传`Z-BBS-Web`文件夹中的所有文件，修改config.js，刷新测试即可

#### 感谢以下开源项目

[ThinkPHP框架 ](https://www.thinkphp.cn/)

[Vue.js (vuejs.org)](https://cn.vuejs.org/)

[Bootstrap v4 ](https://v4.bootcss.com/)

[炫酷弹窗插件 hsycmsAlert.js](https://gitee.com/sywlgzs/hsycmsAlert)

[Cropper 前端图像裁切](https://fengyuanchen.github.io/cropper/)	
