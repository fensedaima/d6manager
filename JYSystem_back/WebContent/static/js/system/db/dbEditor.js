var curType;
var curResult;
function executeSQL() {
	var sqlStr = $("#sqlStr").val();
	if(JY.Object.notNull(sqlStr)){
		JY.Model.loading();
		$("#information").empty();
		$("#baseTable thead").empty(); 
		$("#baseTable tbody").empty();
		$("#pageing ul").empty();//清空分页
		curType="";//清空类型
		curResult=0;//置为失败
		JY.Ajax.doRequest("baseForm", jypath + '/backstage/db/dbEditor/executeSQL',{sqlStr : sqlStr}, function(data) {		
			var obj=data.obj,res=obj.res;
			var information_html="",resultList_html="";
			var lines=obj.lines,resMsg=obj.resMsg,rTime=obj.rTime,executesql=sqlStr;	
			if(JY.Object.notNull(obj.executesql)){
				executesql=obj.executesql;
			}								
			information_html+="[SQL] "+executesql+"<br><br>";	
			if(res==1){			
				information_html+="受影响的行: "+lines+"<br>";	
				information_html+="响应时间: "+(rTime/1000)+"s<br>";	
				var type=obj.type;
				curType=type;
				if("query"==type){
					var list=obj.list;
					var results=list.results;
		        	var thHtml ="",tbHtml="";
		         	var pageNum=list.pageNum,pageSize=list.pageSize,totalRecord=list.totalRecord;
		         	if(results!=null&&results.length>0){
		    			var leng=(pageNum-1)*pageSize;//计算序号		
		        		for(var i = 0;i<results.length;i++){
		        			var datas=results[i];
		        			if(i==0){
		        				thHtml+="<tr><th style='width:3%' class='center'>序号</th>";
		        				var wh=parseInt(97/datas.length);
		        				for(var j = 0;j<datas.length;j++){		
		            				thHtml+="<th style='width:"+wh+"%' class='center' >"+datas[j]+"</th>";         				
		            			}
		        				thHtml+="</tr>";	
		        			}else{	
		        				tbHtml+="<tr>";
		        				tbHtml+="<td class='center '>"+(i+leng)+"</td>";
		        				for(var j = 0;j<datas.length;j++){		
		            				tbHtml+="<td class='center'>"+datas[j]+"</td>";
		            			}   
		        				tbHtml+="</tr>";
		        			}      			
		            	} 
		        		if(results.length==1){
		        			tbHtml+="<tr><td colspan='30' class='center'>没有相关数据</td></tr>";
		        		}
		        		$("#baseTable thead").append(thHtml);
		        		$("#baseTable tbody").append(tbHtml);
		        		JY.Page.setPage("baseForm","pageing",pageSize,pageNum,totalRecord,"executeSQL");
		        	 }else{
		        		tbHtml+="<tr><td colspan='30' class='center'>没有相关数据</td></tr>";
		        		$("#baseTable tbody").append(tbHtml);				        		
		        	 }
		         	 //查询激活
		         	$("#reslistLi a").click(); 		
		         	curResult=1;
				}else{
					$("#infoLi a").click(); 	
				}		        	 
			}else{								
				information_html+="<font color='red'>[Err] "+resMsg+"</font><br>";
				 //查询激活
	         	$("#infoLi a").click(); 		
			}		
			$("#information").html(information_html);
			JY.Model.loadingClose();
		});		
	}else{
		JY.Model.info("sql语句不能为空");
	}			
}

function exportExl(){	
	var sqlStr = $("#sqlStr").val();
	if(JY.Object.notNull(sqlStr)){
		if(curResult==1){
			if('query'==curType){				
				JY.Model.confirm("确认要导出数据吗?",function(){	
					window.location.href=jypath+"/backstage/db/dbEditor/exportExl?sqlStr="+sqlStr;
				});	
			}else{
				 JY.Model.info("查询语句才能导出");
			}
		}else{
			JY.Model.info("请先运行成功再导出，以免报错");			 
		}
	}else{
		JY.Model.info("sql语句不能为空");
	}	
}