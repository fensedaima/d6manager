<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html >
<html lang="en">
<head>
<%@include file="../../common/includeBaseSet.jsp" %>
<%@include file="../../common/includeSystemSet.jsp" %>
<script type="text/javascript" src="${jypath}/static/plugins/echarts/3.0/echarts.min.js"></script>
</head>
<body>
	<div class="page-content">
		<div class="row-fluid">		
			<div class="col-xs-12">
				<!-- <div class="row">												
					<div class="col-sm-4">
						<div class="widget-box">
							<div class="widget-header widget-header-flat">
								<h4 class="widget-title smaller">
									<i class="ace-icon fa fa-signal smaller-80"></i> 系统内存
								</h4>
								<span class="widget-toolbar"> 
									<a title="重新爬取数据" onclick="getMemInfo();return false;" href="#"><i class="fa fa-bug "></i></a> 
								</span>
							</div>
							<div class="widget-body">
								<div class="widget-main">
									<div class="row">
										<div class="col-xs-12">
											<div id="mem" style="width:100%;height:320px;"></div>				
										</div>
									</div>
								</div>							
							</div>
						</div>
					</div>
					<div class="col-sm-4">
						<div class="widget-box">
							<div class="widget-header widget-header-flat">
								<h4 class="widget-title smaller">
									<i class="ace-icon fa fa-signal smaller-80"></i> 虚拟内存
								</h4>
								<span class="widget-toolbar"> 
									<a title="重新爬取数据" onclick="getMemInfo();return false;" href="#"><i class="fa fa-bug "></i></a> 
								</span>
							</div>
							<div class="widget-body">
								<div class="widget-main">
									<div class="row">
										<div class="col-xs-12">
											<div id="swap" style="width:100%;height:320px;"></div>				
										</div>
									</div>
								</div>							
							</div>
						</div>
					</div>
					<div class="col-sm-4">
						<div class="widget-box">
							<div class="widget-header widget-header-flat">
								<h4 class="widget-title smaller">
									<i class="ace-icon fa fa-signal smaller-80"></i> JVM内存
								</h4>
								<span class="widget-toolbar"> 
									<a title="重新爬取数据" onclick="getMemInfo();return false;" href="#"><i class="fa fa-bug "></i></a> 
								</span>
							</div>
							<div class="widget-body">
								<div class="widget-main">
									<div class="row">
										<div class="col-xs-12">
											<div id="runtimeMemory" style="width:100%;height:320px;"></div>				
										</div>
									</div>
								</div>							
							</div>
						</div>
					</div>		
				</div> -->
				<div class="row">
					<div class="col-sm-4">
						<div class="widget-box">
							<div class="widget-header widget-header-flat">
								<h4 class="widget-title smaller">
									<i class="ace-icon fa fa-certificate smaller-80"></i> 主机配置
								</h4>
								<span class="widget-toolbar"> 
									<a title="重新爬取数据" onclick="getSysEnvironment();return false;" href="#"><i class="fa fa-bug "></i></a> 
								</span>
							</div>
							<div class="widget-body sysMonitor">
								<div class="widget-main">
									<span class="title">主机IP地址：</span> <span id="localIP"
										class="content"></span>
									<hr>
									<span class="title">主机名称：</span> <span id="localHostName"
										class="content"></span>
									<hr>
									<span class="title">操作系统的名称：</span> <span id="osName"
										class="content"></span>
									<hr>
									<span class="title">操作系统的构架：</span> <span id="osArch"
										class="content"></span>
								</div>
							</div>							
						</div>
					</div>
					<div class="col-sm-4">
						<div class="widget-box">
							<div class="widget-header widget-header-flat">
								<h4 class="widget-title smaller">
									<i class="ace-icon fa fa-caret-square-o-right  smaller-80"></i> CPU情况
								</h4>
								<span class="widget-toolbar"> 
									<a title="重新爬取数据" onclick="getCPUInfo();return false;" href="#"><i class="fa fa-bug "></i></a> 
								</span>
							</div>
							<div class="widget-body sysMonitor">
								<div class="widget-main">
									<span class="title">CPU个数：</span> <span
										id="availableProcessors" class="content"></span>
									<hr>
									<span class="title">总处理器利用率：</span> <span id="cpuUsage"
										class="content"></span>
								</div>
							</div>							
						</div>
						<div class="widget-box">
							<div class="widget-header widget-header-flat">
								<h4 class="widget-title smaller">
									<i class="ace-icon fa fa-caret-square-o-right  smaller-80"></i> 硬盘状况
								</h4>
								<span class="widget-toolbar"> 
									<a title="重新爬取数据" onclick="getDiskInfo();return false;" href="#"><i class="fa fa-bug "></i></a> 
								</span>
							</div>
							<div class="widget-body sysMonitor">
								<div class="widget-main">
									<div id="disk" ></div>
								</div>
							</div>							
						</div>
					</div>
					<div class="col-sm-4">
						<div class="widget-box">
							<div class="widget-header widget-header-flat">
								<h4 class="widget-title smaller">
									<i class="ace-icon fa fa-caret-square-o-right  smaller-80"></i> 运行环境
								</h4>
							</div>
							<div class="widget-body sysMonitor">
								<div class="widget-main">
									<span class="title">Java的运行环境版本：</span> <span id="javaVersion"
										class="content"></span>
									<hr>
									<span class="title">Java的运行环境供应商：</span> <span id="javaVendor"
										class="content"></span>
									<hr>
									<span class="title">Java的安装路径：</span> <span id="javaHome"
										class="content"></span>
									<hr>
									<span class="title">默认的临时文件路径：</span> <span id="javaIoTmpdir"
										class="content"></span>
								</div>
							</div>							
						</div>
					</div>
				</div>
				
			</div>			
		</div>
		<%@include file="../../common/dialog.jsp" %>	
	</div>
	<script src="${jypath}/static/js/system/monitor/sys.js"></script>
</body>
</html>