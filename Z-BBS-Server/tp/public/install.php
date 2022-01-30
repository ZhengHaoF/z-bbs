<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>后端安装</title>
    <style>
        body{
            width: 100%;
            margin: 0;
            padding: 0;
        }
        html{
            width: 100%;
        }
        #main{
            width: 60%;
            height: 90%;
            margin: 0 auto;
            background-color: #f0f0f0;
            text-align: center  ;
        }
    </style>
</head>
<body>
    <div id="main">
        <h2>
            Z-BBS后端安装程序
        </h2>
        数据库用户名：<input type="text" id="sql_name">
        数据库密码：<input type="text" id="sql_name">
    </div>
</body>
</html>
<?php
    $_sql = file_get_contents('../.env');
    echo $_sql;
?>