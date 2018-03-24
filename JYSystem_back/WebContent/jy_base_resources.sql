INSERT INTO `jy_base_resources` VALUES ('09aacde82e1c4cd48a42a7db5e493743', '消息推送', '0', 1, 1, '/backstage/imessage/index', '', '', 'icon-envelope-alt ', 9, 1, '', '2017-12-20 09:55:44', NULL);

INSERT INTO `jy_base_resources` VALUES ('0e3ab948190a478d8296e0427d6aae38', '评论管理', '0', 1, 1, '/backstage/comments/index', '', '', 'icon-thumbs-up-alt ', 8, 1, '', '2017-12-18 11:10:39', NULL);

INSERT INTO `jy_base_resources` VALUES ('52ea83ffefbc48259fa557859601ee27', '官方微信管理', '0', 1, 1, '/backstage/wxkf/index', '', '', 'icon-user ', 20, 1, '', '2017-12-14 10:35:42', '2017-12-15 09:50:57');

INSERT INTO `jy_base_resources` VALUES ('dd2731b6137f45aabbe3366d8270af88', '碎片管理', '0', 1, 1, '/backstage/pieces/index', '', '', 'icon-table ', 7, 1, '', '2017-12-21 14:42:06', NULL);

INSERT INTO `jy_base_resources` VALUES ('64438655ca70454abaf6ac884fb067f9', '意见反馈', '0', 1, 1, '/backstage/opinions/index', '', '', 'icon-star ', 10, 1, '', '2017-12-16 13:02:15', '2017-12-18 10:04:29');

INSERT INTO `jy_base_resources` VALUES ('180992d2938d44d58ab6ff6cf3a2543f', '查看详情', '09aacde82e1c4cd48a42a7db5e493743', 1, 3, '/backstage/imessage/find', '', 'check', 'icon-zoom-in ', 1, 1, '', '2017-12-22 14:54:16', NULL);

INSERT INTO `jy_base_resources` VALUES ('ff0681530e0241689e0012f5bd206691', '删除', '09aacde82e1c4cd48a42a7db5e493743', 1, 3, '/backstage/imessage/del', '', 'del', 'icon-trash ', 2, 1, '', '2017-12-22 14:55:07', NULL);

INSERT INTO `jy_base_resources` VALUES ('038769d438d34fc3a1907099e2b6f04f', '禁止前台显示', '0e3ab948190a478d8296e0427d6aae38', 1, 3, '/backstage/comments/editIsShow', '', 'editIsShow', 'icon-star ', 2, 1, '', '2017-12-22 15:41:48', '2017-12-22 15:58:27');

INSERT INTO `jy_base_resources` VALUES ('1060b8375e8e4ddcb68cab7a0a68f974', '前台显示', '0e3ab948190a478d8296e0427d6aae38', 1, 3, '/backstage/comments/editShow', '', 'editShow', 'icon-heart ', 3, 1, '', '2017-12-22 15:59:10', NULL);

INSERT INTO `jy_base_resources` VALUES ('c8512bba1cfa4fafa525d49ed166cc75', '查看详情', '0e3ab948190a478d8296e0427d6aae38', 1, 3, '/backstage/comments/find', '', 'check', 'icon-zoom-in ', 1, 1, '', '2017-12-22 15:19:10', NULL);

INSERT INTO `jy_base_resources` VALUES ('7f98d1780e284abd9f5c7682f81177d3', '删除', '52ea83ffefbc48259fa557859601ee27', 1, 3, '/backstage/wxkf/del', '', 'del', 'icon-trash ', 2, 1, '', '2017-12-22 14:14:01', '2017-12-22 14:20:28');

INSERT INTO `jy_base_resources` VALUES ('d90ab70ad7df4ed5a97bb2f209b8def0', '编辑', '52ea83ffefbc48259fa557859601ee27', 1, 3, '/backstage/wxkf/update', '', 'edit', 'icon-edit ', 1, 1, '', '2017-12-22 14:11:20', '2017-12-22 14:20:12');

INSERT INTO `jy_base_resources` VALUES ('72c655849db446bda8e99dd17b9b5aba', '编辑', 'dd2731b6137f45aabbe3366d8270af88', 1, 3, '/backstage/pieces/update', '', 'edit', 'icon-edit ', 1, 1, '', '2017-12-22 16:07:56', NULL);


delete from jy_base_resources where id in('09aacde82e1c4cd48a42a7db5e493743','0e3ab948190a478d8296e0427d6aae38','52ea83ffefbc48259fa557859601ee27','dd2731b6137f45aabbe3366d8270af88',
'64438655ca70454abaf6ac884fb067f9','180992d2938d44d58ab6ff6cf3a2543f','ff0681530e0241689e0012f5bd206691','038769d438d34fc3a1907099e2b6f04f','1060b8375e8e4ddcb68cab7a0a68f974','c8512bba1cfa4fafa525d49ed166cc75',
'7f98d1780e284abd9f5c7682f81177d3','d90ab70ad7df4ed5a97bb2f209b8def0','72c655849db446bda8e99dd17b9b5aba')
select * from jy_base_resources;

