<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<title>D6后台管理系统</title>
<c:set var="jypath" value="${pageContext.request.contextPath}"/>

<script>
    var jypath = '${jypath}';
</script>
<!--[if !IE]> -->
<script src="${jypath}/static/js/jquery/jquery-2.0.3.min.js"></script>
<!-- <![endif]-->
<!--[if IE]>
<script src="${jypath}/static/js/jquery/jquery.ie.min.js"></script>
<![endif]-->

<!--[if lte IE 8]>
<script src="${jypath}/static/js/bootstrap/respond.js"></script>
<script src="${jypath}/static/js/bootstrap/html5.js"></script>
<script src="${jypath}/static/js/bootstrap/jquery.placeholder.min.js"></script>
<script src="${jypath}/static/js/bootstrap/jy-ie8.js"></script>
<![endif]-->

<script type="text/javascript">
			if("ontouchend" in document) {
				//手机适应;
				document.write("<script src='"+jypath+"/static/js/jquery/jquery.mobile.custom.min.js'><"+"/script>");
				//document.write("<script src='"+jypath+"/static/js/jquery/jquery.mobile-1.4.5.min.js'><"+"/script>");
			}
</script>
<!--提示组件start-->
<script type="text/javascript" src="${jypath}/static/js/jquery/jquery.tips.js"></script>
<script type="text/javascript" charset="utf-8">window.UEDITOR_HOME_URL = "${jypath}/static/plugins/ueditor/";</script>
<script type="text/javascript" charset="utf-8" src="${jypath}/static/plugins/ueditor/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="${jypath}/static/plugins/ueditor/ueditor.all.js"></script>
<!--提示组件end-->
<link rel="icon" href="${jypath}/favicon.ico" type="image/x-icon" />
<link rel="shortcut icon" href="${jypath}/favicon.ico" type="image/x-icon" />
<link rel="bookmark" href="${jypath}/favicon.ico" type="image/x-icon" />
