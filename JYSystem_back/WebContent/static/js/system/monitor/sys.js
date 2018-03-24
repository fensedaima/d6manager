$(function () {
	getSysEnvironment();
	getMemInfo();
	getDiskInfo();
	getCPUInfo();
});

function getSysEnvironment(){
	JY.Ajax.doRequest("",jypath +'/backstage/monitor/sys/getSysEnvironment',null,function(data){
		var obj=data.obj;
		$("#localIP").html(obj.localIP);
		$("#localHostName").html(obj.localHostName);
		$("#osName").html(obj.osName+"（版本："+obj.osVersion+"）");
		$("#osArch").html(obj.osArch);
					
		$("#javaVersion").html(obj.javaVersion);
		$("#javaVendor").html(obj.javaVendor);
		$("#javaHome").html(obj.javaHome);
		$("#javaIoTmpdir").html(obj.javaIoTmpdir);					
	}); 
}
function getCPUInfo(){
	$("#cpuUsage").html("<i class='fa fa-refresh color-pale-yellow icon-animated-wrench'></i> 获取中数据中...");
	JY.Ajax.doRequest("",jypath +'/backstage/monitor/sys/getCPUInfo',null,function(data){
		var obj=data.obj;
		$("#availableProcessors").html(obj.availableProcessors);
		$("#cpuUsage").html(obj.cpuUsage+" %");
		
	}); 	
}

	
 function getMemInfo(){
	JY.Ajax.doRequest("",jypath +"/backstage/monitor/sys/getMemInfo",{uni:"g"},function(data){
		var obj=data.obj;
		var uni=obj.uni;
		var useRam=obj.useRam,freeRam=obj.freeRam,totalRam=obj.totalRam;//内存
		var uesSwap=obj.uesSwap,freeSwap=obj.freeSwap,totalSwap=obj.totalSwap;//虚拟内存
		var uesMemory=obj.uesMemory,freeMemory=obj.freeMemory,totalMemory=obj.totalMemory;//虚拟内存

		// 基于准备好的dom，初始化echarts实例
		if(JY.Object.notNull(uesMemory)){
			var runtimeMemoryChart = echarts.init(document.getElementById('runtimeMemory'));
			// 指定图表的配置项和数据
			var runtimeOption = {tooltip : {formatter: "{a} <br/>{b} : {c} GB"},
			    		    toolbox: {feature: {saveAsImage: {}}},
			    		    series: [{name: '使用状况',type: 'gauge',detail: {formatter:'{value}GB'},
			    		            data: [{value: uesMemory, name: ''}],max:totalMemory}]};		     
			runtimeMemoryChart.setOption(runtimeOption);// 使用刚指定的配置项和数据显示图表。
		}
	
			
		if(JY.Object.notNull(useRam)){
			var memoryChart = echarts.init(document.getElementById('mem'));
			// 指定图表的配置项和数据
			var memoryOption = {tooltip : {formatter: "{a} <br/>{b} : {c} "+ uni},
			    		    toolbox: {feature: {saveAsImage: {}}},
			    		    series: [{name: '使用状况',type: 'gauge',detail: {formatter:'{value}'+uni},
			    		            data: [{value: useRam, name: ''}],max:totalRam}]};		     
			memoryChart.setOption(memoryOption);// 使用刚指定的配置项和数据显示图表。
		}
		
		if(JY.Object.notNull(uesSwap)){
			var swapChart = echarts.init(document.getElementById('swap'));
			// 指定图表的配置项和数据
			var swapOption = {tooltip : {formatter: "{a} <br/>{b} : {c} "+ uni},
			    		    toolbox: {feature: {saveAsImage: {}}},
			    		    series: [{name: '使用状况',type: 'gauge',detail: {formatter:'{value}'+uni},
			    		            data: [{value: uesSwap, name: ''}],max:totalSwap}]};		     
			swapChart.setOption(swapOption);// 使用刚指定的配置项和数据显示图表。
		}		     		
	}); 
} 
	 
function getDiskInfo(){
	JY.Ajax.doRequest("",jypath +"/backstage/monitor/sys/getDiskInfo",{uni:"g"},function(data){
		var obj=data.obj;
		var uni=obj.uni;
		var useRam=obj.useRam,freeRam=obj.freeRam,totalRam=obj.totalRam;//内存
		var uesSwap=obj.uesSwap,freeSwap=obj.freeSwap,totalSwap=obj.totalSwap;//虚拟内存
		var memoryChart = echarts.init(document.getElementById('mem'));
		// 指定图表的配置项和数据
		var option = {tooltip : {formatter: "{a} <br/>{b} : {c} "+ uni},
		    		    toolbox: {feature: {restore: {},saveAsImage: {}}},
		    		    series: [{name: '使用状况',type: 'gauge',detail: {formatter:'{value}'+uni},
		    		            data: [{value: useRam, name: '内存'}],max:totalRam}]};		     
		memoryChart.setOption(option);// 使用刚指定的配置项和数据显示图表。
	}); 
} 
function getDiskInfo(){
 	$("#disk").empty();
 	JY.Ajax.doRequest("",jypath +"/backstage/monitor/sys/getDiskInfo",{uni:"m"},function(data){
		var list=data.obj;
		var html="";
		if(list!=null&&list.length>0){
			for(var i = 0;i<list.length;i++){
				var l=list[i];
				html+="<span class='title'>硬盘("+l.name+")：</span>";
				html+="<span class='content'> "+l.free+" "+l.uni+" 可用 ，共："+l.total+" "+l.uni+" （使用率："+parseInt((l.use/l.total)*100)+"%） </span>";				 
				if(i!=list.length-1){
					html+="<hr>";
				}
			}
		}
		$("#disk").html(html);
	}); 
 }