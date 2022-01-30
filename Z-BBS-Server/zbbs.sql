/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50726
Source Host           : localhost:3306
Source Database       : zbbs

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2022-01-25 17:21:09
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for z_blog_info
-- ----------------------------
DROP TABLE IF EXISTS `z_blog_info`;
CREATE TABLE `z_blog_info` (
  `blog_title` varchar(255) DEFAULT NULL COMMENT '博客标题',
  `blog_text` longtext COMMENT '博客内容',
  `blog_time` datetime DEFAULT NULL COMMENT '创建时间',
  `blog_user` varchar(255) DEFAULT NULL COMMENT '博客发布用户',
  `blog_group` varchar(255) DEFAULT NULL COMMENT '博客组',
  `blog_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '博客id',
  `blog_modify_time` datetime DEFAULT NULL,
  PRIMARY KEY (`blog_id`)
) ENGINE=MyISAM AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of z_blog_info
-- ----------------------------
INSERT INTO `z_blog_info` VALUES ('世界地图', '<p><img src=\"https://oss.shandianpan.com/322b309193805e6cdbcf7d2491a95c90\" style=\"max-width:100%;\" contenteditable=\"false\"/></p>', '2021-10-29 13:04:17', 'ZHF', 'public', '15', '2021-10-29 13:04:17');
INSERT INTO `z_blog_info` VALUES ('SQL表结构修复', '<p>&nbsp;昨天因为升级win11 出现了BUG ，导致系统重装，数据库软件自然也就没了，当我尝试用MySQL/bin目录下的文件替换过去时，发现表能正常显示，但尝试打开表的时候报错，提示：<code>Tbale ‘表名’ doesn\'t exist</code></p><p>	我尝试了网上的许多办法都不好使，猜测如下：</p><p>在MySQL8.0之前，一个数据库在计算机中的存储结构如下：</p><p> <strong>myisam</strong></p><pre>db.opt<br/>表名.frm //表定义，是描述表结构的文件。<br/>表名.MYD //数据信息文件，是表的数据文件。<br/>表名.MYI //索引信息文件，是表数据文件中任何索引的数据树</pre><p><strong>InnoDB</strong></p><pre>db.opt<br/>表名.frm //表定义，是描述表结构的文件。<br/>表名.ibd //表数据和索引的文件。该表的索引(B+树)的每个非叶子节点存储索引，叶子节点存储索引和索引对应的数据。</pre><p>如果不小心丢失了<code>.MYD/.MYI/ibd</code>文件，数据肯定是找不回来了，但是我们的表结构是可以恢复的</p><h3>具体操作方法如下：</h3><p>在虚拟机中准备Ubuntu系统，网络选择直链，能访问WEB就行</p><h4>1.安装python2.7环境</h4><pre>sudo apt-get install python2.7</pre><h3>2.使用mysql-utilities</h3><pre>wget https://cdn.mysql.com/archives/mysql-utilities/mysql-utilities-1.6.5.tar.gz<br/>tar -xvzf mysql-utilities-1.6.5.tar.gz<br/>cd mysql-utilities-1.6.5<br/>python2.7 setup.py build<br/>sudo python2.7 setup.py install</pre><h3>3.分析frm文件</h3><pre>mysqlfrm --diagnostic *.frm</pre><p>如果成功的话，则会生成CREAT TABLE语句，复制到数据库中执行就好了，如果失败，则说明表有索引或其他原因，操作如下：</p><h4>3.1安装MySQL5.5 或 MySQL5.1</h4><p>使用宝塔在本机安装，或者在实体机中使用任意工具安装，怎么方便怎么来。</p><h4>3.2 借助数据库分析 frm文件</h4><pre>mysqlfrm --diagnostic --server=用户名:密码@数据库名:3306 --port=3310 *.frm</pre><p>如果提示在命令行中输入密码不安全，就代表数据库版本太新，降到5.1或5.5就行，如果执行成功，也是生成CREAT TABLE语句，复制到数据库中执行就好了。</p>', '2021-10-09 14:23:19', 'ZHF', 'public', '12', '2021-10-09 14:23:19');
INSERT INTO `z_blog_info` VALUES ('Z-BBS有什么特点', '<h2 id=\"buyy5\">1. 完全开源</h2><p>&nbsp;&nbsp;&nbsp;&nbsp;Z-BBS使用主流框架开发， 完全开源，代码逻辑清晰，注释完整，新手也能看懂。</p><h2 id=\"usbk2\">2.结构简单</h2><p>&nbsp;&nbsp;&nbsp;&nbsp;Z-BBS前后端完全分离，所有操作均通过API实现，逻辑清晰，您甚至可以根据接口自己写一个前端。</p><h2 id=\"gvqw6\">3.二次开发要求低</h2><p>&nbsp; - 您只需会基础的HTML/Vue/JavaScript 就可以随意修改前端代码</p><p>&nbsp; - 您只需要会基础的ThinkPHP 就可以随意修改后端代码</p><p><br/></p>', '2021-12-04 14:25:40', 'ZFY', 'public', '31', '2021-12-04 14:25:40');
INSERT INTO `z_blog_info` VALUES ('我的电影单', '<h2 id=\"wamtw\">堕落天使 - 王家卫</h2><p><img src=\"https://s3.bmp.ovh/imgs/2022/01/bc40a8d53e13675c.jpg\" style=\"max-width:100%;\" contenteditable=\"false\"/></p><blockquote><p>导演:&nbsp;<a href=\"https://movie.douban.com/celebrity/1041024/\" style=\"background-color: rgb(241, 241, 241);\">王家卫</a><br/></p><p>编剧:&nbsp;<a href=\"https://movie.douban.com/celebrity/1041024/\">王家卫</a><br/>主演:&nbsp;<a href=\"https://movie.douban.com/celebrity/1036978/\">黎明</a>&nbsp;/&nbsp;<a href=\"https://movie.douban.com/celebrity/1139540/\">李嘉欣</a>&nbsp;/&nbsp;<a href=\"https://movie.douban.com/celebrity/1027883/\">金城武</a>&nbsp;/&nbsp;<a href=\"https://movie.douban.com/celebrity/1018373/\">杨采妮</a>&nbsp;/&nbsp;<a href=\"https://movie.douban.com/celebrity/1018248/\">莫文蔚</a>&nbsp;/&nbsp;<a href=\"javascript:;\">更多...</a><br/>类型:&nbsp;剧情&nbsp;/&nbsp;喜剧&nbsp;/&nbsp;爱情&nbsp;/&nbsp;犯罪<br/>制片国家/地区:&nbsp;中国香港<br/>语言:&nbsp;粤语<br/>上映日期:&nbsp;1995-09-06(中国香港)<br/>片长:&nbsp;99分钟<br/>又名:&nbsp;Fallen Angels<br/>IMDb:&nbsp;tt0112913<br/>豆瓣评分：8.3</p></blockquote><p>&nbsp;&nbsp;&nbsp;&nbsp;天使1号（黎明）很懒惰，所以选择做了时间、地点、谁该死都不用操心的杀手。天使2号（李嘉欣）很冷艳，是1号的上线，喜欢华服夜出为1号清理房间。天使3号（金城武）很怪异，从不讲话的他爱做的事是半夜撬开别人的店面做生意和拿着摄像机将老爸拍个遍。天使4号（杨采妮）很“现实”，虽无法忘记旧 男友，却也能转身用另外的方式将自己安慰。天使5号（莫文蔚）很神经，喜欢在大雨夜冒出。<br/>　　五位天使在自己的生活轨道上固执寂寞地前行着，为了避免换回更多伤心，他们在轨迹交叉时会提醒自己“忘记他是他”，可是，他们的真情还是会不由自主地流露出来。&nbsp;<a href=\"https://movie.douban.com/help/movie#t0-qs\">©豆瓣</a><br/></p><p>在线观看：<a href=\"https://mo.own-cloud.cn/s/webNIR\" target=\"_blank\" style=\"background-color: rgb(255, 255, 255); font-size: 1rem;\">https://mo.own-cloud.cn/s/webNIR</a></p><hr/><h2 id=\"pufj9\">让子弹飞 - 姜文</h2><p><img src=\"https://s3.bmp.ovh/imgs/2022/01/c5a76e089a0d5782.jpg\" style=\"max-width:100%;\" width=\"100%\" contenteditable=\"false\"/></p><blockquote><p>导演:&nbsp;<a href=\"https://movie.douban.com/celebrity/1021999/\">姜文</a><br/>编剧:&nbsp;<a href=\"https://movie.douban.com/celebrity/1275244/\">朱苏进</a>&nbsp;/&nbsp;<a href=\"https://movie.douban.com/celebrity/1275245/\">述平</a>&nbsp;/&nbsp;<a href=\"https://movie.douban.com/celebrity/1021999/\">姜文</a>&nbsp;/&nbsp;<a href=\"https://movie.douban.com/celebrity/1274911/\">郭俊立</a>&nbsp;/&nbsp;<a href=\"https://movie.douban.com/celebrity/1275961/\">危笑</a>&nbsp;/&nbsp;<a href=\"https://movie.douban.com/celebrity/1275962/\">李不空</a>&nbsp;/&nbsp;<a href=\"https://movie.douban.com/celebrity/1275963/\">马识途</a><br/>主演:&nbsp;<a href=\"https://movie.douban.com/celebrity/1021999/\">姜文</a>&nbsp;/&nbsp;<a href=\"https://movie.douban.com/celebrity/1000905/\">葛优</a>&nbsp;/&nbsp;<a href=\"https://movie.douban.com/celebrity/1044899/\">周润发</a>&nbsp;/&nbsp;<a href=\"https://movie.douban.com/celebrity/1036905/\">刘嘉玲</a>&nbsp;/&nbsp;<a href=\"https://movie.douban.com/celebrity/1053618/\">陈坤</a>&nbsp;/&nbsp;<a href=\"javascript:;\">更多...</a><br/>类型:&nbsp;剧情&nbsp;/&nbsp;喜剧&nbsp;/&nbsp;动作&nbsp;/&nbsp;西部<br/>制片国家/地区:&nbsp;中国大陆 / 中国香港<br/>语言:&nbsp;汉语普通话 / 四川话 / 山西话<br/>上映日期:&nbsp;2010-12-16(中国大陆)<br/>片长:&nbsp;132分钟<br/>又名:&nbsp;让子弹飞一会儿 / 火烧云 / Let The Bullets Fly<br/>IMDb:&nbsp;tt1533117<br/></p></blockquote><p>&nbsp;&nbsp;&nbsp;&nbsp;民国年间，花钱捐得县长的马邦德（葛优 饰）携妻（刘嘉玲 饰）及随从走马上任。途经南国某地，遭劫匪张麻子（姜文 饰）一伙伏击，随从尽死，只夫妻二人侥幸活命。马为保命，谎称自己是县长的汤 师爷。为汤师爷许下的财富所动，张麻子摇身一变化身县长，带着手下赶赴鹅城上任。有道是天高皇帝远，鹅城地处偏僻，一方霸主黄四郎（周润发 饰）只手遮天，全然不将这个新来的县长放在眼里。张麻子痛打了黄的武教头（姜武 饰），黄则设计害死张的义子小六（张默 饰）。原本只想赚钱的马邦德，怎么也想不到竟会被卷入这场土匪和恶霸的角力之中。鹅城上空愁云密布，血雨腥风在所难免……<br/>　　本片根据马识途的小说《夜谭十记》中的《盗官记》一章改编。&nbsp;<a href=\"https://movie.douban.com/help/movie#t0-qs\">©豆瓣</a><br/></p><p>在线观看：<a href=\"https://mo.own-cloud.cn/s/ED0LHj\" target=\"_blank\" style=\"background-color: rgb(255, 255, 255); font-size: 1rem;\">https://mo.own-cloud.cn/s/ED0LHj</a></p><hr/><h2 data-we-empty-p=\"\" id=\"ln66d\">情书 - 岩井俊二</h2><p><img src=\"https://s3.bmp.ovh/imgs/2022/01/a7788e72d9d0c95d.webp\" style=\"max-width:100%;\" width=\"100%\" contenteditable=\"false\"/><br/></p><blockquote><p>\r\n<img/><span>导演:&nbsp;<a href=\"https://movie.douban.com/celebrity/1005064/\">岩井俊二</a></span><br/><span>编剧:&nbsp;<a href=\"https://movie.douban.com/celebrity/1005064/\">岩井俊二</a></span><br/><span>主演:&nbsp;<span><a href=\"https://movie.douban.com/celebrity/1032915/\">中山美穗</a><span>&nbsp;/&nbsp;</span><a href=\"https://movie.douban.com/celebrity/1032989/\">丰川悦司</a><span>&nbsp;/&nbsp;</span><a href=\"https://movie.douban.com/celebrity/1033533/\">酒井美纪</a><span>&nbsp;/&nbsp;</span><a href=\"https://movie.douban.com/celebrity/1033202/\">柏原崇</a><span>&nbsp;/&nbsp;</span><a href=\"https://movie.douban.com/celebrity/1004171/\">范文雀</a><span>&nbsp;/&nbsp;</span><a href=\"javascript:;\">更多...</a></span></span><br/>类型:<span>&nbsp;</span>剧情<span>&nbsp;/&nbsp;</span>爱情<br/>制片国家/地区:<span>&nbsp;日本</span><br/>语言:<span>&nbsp;日语</span><br/>上映日期:<span>&nbsp;</span>1999-03(中国大陆)<span>&nbsp;/&nbsp;</span>2021-05-20(中国大陆重映)<span>&nbsp;/&nbsp;</span>1995-03-25(日本)<br/>片长:<span>&nbsp;</span>117分钟<br/>又名:<span>&nbsp;When I Close My Eyes / Letters of Love</span><br/>IMDb:<span>&nbsp;tt0113703</span>\r\n</p></blockquote><p>&nbsp;&nbsp;&nbsp; 日本神户某个飘雪的冬日，渡边博子（中山美穗）在前未婚夫藤井树的两周年祭日上又一次悲痛到不能自已。正因为无法抑制住对已逝恋人的思念，渡边博子在其中学同学录里发现“藤井树” 在小樽市读书时的地址时，依循着寄发了一封本以为是发往天国的情书。<br/>　　不想不久渡边博子竟然收到署名为“藤 井树（中山美穗）”的回信，经过进一步了解，她知晓此藤井树是一个同她年纪相仿的女孩，且还是男友藤井树（柏原崇）少年时代的同班同学。为了多了解一些昔日恋人在中学时代的情况，渡边博子开始与女性藤井树书信往来。而藤井树在不断的回忆中，渐渐发现少年时代与她同名同姓的那个藤井树曾对自己藏了一腔柔情。<span>&nbsp;</span><a href=\"https://movie.douban.com/help/movie#t0-qs\">©豆瓣</a></p><p>在线观看：<a href=\"https://mo.own-cloud.cn/s/v1qrS8\" target=\"_blank\">https://mo.own-cloud.cn/s/v1qrS8</a></p><p><br/></p><h2 data-we-empty-p=\"\" id=\"towka\">驴得水 - 周申 / 刘露</h2><p><img src=\"https://s3.bmp.ovh/imgs/2022/01/d65742478e6a5b9b.webp\" style=\"max-width:100%;\" contenteditable=\"false\"/><br/></p><blockquote><p><span>导演:&nbsp;<a href=\"https://movie.douban.com/celebrity/1362256/\">周申</a><span>&nbsp;/&nbsp;<a href=\"https://movie.douban.com/celebrity/1362257/\">刘露</a></span></span><br/><span>编剧:&nbsp;<a href=\"https://movie.douban.com/celebrity/1362256/\">周申</a><span>&nbsp;/&nbsp;<a href=\"https://movie.douban.com/celebrity/1362257/\">刘露</a></span></span><br/><span>主演:&nbsp;<span><a href=\"https://movie.douban.com/celebrity/1362973/\">任素汐</a><span>&nbsp;/&nbsp;</span><a href=\"https://movie.douban.com/celebrity/1355797/\">大力</a><span>&nbsp;/&nbsp;</span><a href=\"https://movie.douban.com/celebrity/1337891/\">刘帅良</a><span>&nbsp;/&nbsp;</span><a href=\"https://movie.douban.com/celebrity/1362975/\">裴魁山</a><span>&nbsp;/&nbsp;</span><a href=\"https://movie.douban.com/celebrity/1362970/\">阿如那</a><span>&nbsp;/&nbsp;</span><a href=\"javascript:;\">更多...</a></span></span><br/>类型:<span>&nbsp;</span>剧情<span>&nbsp;/&nbsp;</span>喜剧<br/>制片国家/地区:<span>&nbsp;中国大陆</span><br/>语言:<span>&nbsp;汉语普通话</span><br/>上映日期:<span>&nbsp;</span>2016-10-28(中国大陆)<br/>片长:<span>&nbsp;</span>111分钟<br/>又名:<span>&nbsp;Mr. Donkey</span><br/>IMDb:<span>&nbsp;tt6167014</span></p></blockquote><p>&nbsp;&nbsp;&nbsp; 一群“品行不端”却怀揣教育梦想的大学教师，从大城市来到偏远乡村开办了一所小学校。学校待遇惨淡、生活艰苦，但老师们都自得其乐，每天嘻嘻哈哈打成一片。然而教育部特派员要来突击检查的消息打破了安宁，因为学校有一位“驴得水老师”隐藏着不可告人的秘密。就在所有人都担心丑事即将败露的时候，一个神奇天才的出现拯救了大家，然而谁能料到真正的麻烦才刚刚开始……</p><p>在线观看：<a href=\"https://mo.own-cloud.cn/s/WmJecG\" target=\"_blank\">https://mo.own-cloud.cn/s/WmJecG</a></p>', '2022-01-11 20:38:04', 'ZHF', 'public', '36', '2022-01-13 12:57:25');

-- ----------------------------
-- Table structure for z_reply_info
-- ----------------------------
DROP TABLE IF EXISTS `z_reply_info`;
CREATE TABLE `z_reply_info` (
  `reply_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '评论的ID',
  `blog_id` int(11) DEFAULT NULL COMMENT '博客ID',
  `reply_text` varchar(255) NOT NULL COMMENT '回复文本',
  `reply_time` datetime DEFAULT NULL COMMENT '回复时间',
  `reply_for` int(11) NOT NULL COMMENT '父对象',
  `reply_user` varchar(50) DEFAULT NULL COMMENT '评论用户',
  PRIMARY KEY (`reply_id`)
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of z_reply_info
-- ----------------------------

-- ----------------------------
-- Table structure for z_users
-- ----------------------------
DROP TABLE IF EXISTS `z_users`;
CREATE TABLE `z_users` (
  `uname` varchar(10) NOT NULL,
  `pwd` varchar(255) DEFAULT NULL,
  `user_head_img` varchar(100) DEFAULT 'img/head.jpg',
  `reg_time` date DEFAULT NULL COMMENT '注册时间',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_group` set('admin','user') DEFAULT 'user',
  PRIMARY KEY (`uname`,`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of z_users
-- ----------------------------
INSERT INTO `z_users` VALUES ('ZHF', 'e10adc3949ba59abbe56e057f20f883e', 'https://api.bbs.zhfblog.top/upload/2021-12-04-8c783afb4640c1b9f34866d38954f31f1638596675.jpeg', '2021-10-06', '1', 'user');
INSERT INTO `z_users` VALUES ('ZFY', 'e10adc3949ba59abbe56e057f20f883e', 'https://api.bbs.zhfblog.top/upload/2021-12-04-2100b964903b7a08a2f32249029ca4fd1638598001.jpeg', '2021-12-04', '2', 'user');

-- ----------------------------
-- Table structure for z_users_token
-- ----------------------------
DROP TABLE IF EXISTS `z_users_token`;
CREATE TABLE `z_users_token` (
  `uname` varchar(50) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uname`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of z_users_token
-- ----------------------------
INSERT INTO `z_users_token` VALUES ('ZHF', '4415a488692d6e0eb3455c461795f29cfc5d091467a63bf5a3bf65222c86ffcb');
INSERT INTO `z_users_token` VALUES ('ZFY', '45739c97fc6ae3ab943c108ed008a15c84d177490afa8ed1d004e638c35a67f1');
