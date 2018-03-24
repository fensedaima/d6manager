$(function () {
	//下拉框
	getbaseList();
	//增加回车事件
	$("#baseForm").keydown(function(e){
		 keycode = e.which || e.keyCode;
		 if (keycode==13) {
			 search();
		 } 
	});
	//新加
	$('#addBtn').on('click', function(e) {
		//通知浏览器不要执行与事件关联的默认动作		
		e.preventDefault();
		cleanForm();	
		JY.Model.editwithsize("auDiv","新增",500,500,function(){
			 if(JY.Validate.form("auForm")){
				 var that =$(this);
				 JY.Ajax.doRequest("auForm",jypath +'/backstage/squareclasses/add',null,function(data){
				     that.dialog("close");      
				     layer.msg(data.resMsg);search();
				 });
			 }	
		});
	});
	
	//清除
	$('#reset').on('click', function(e) {
		//通知浏览器不要执行与事件关联的默认动作		
		e.preventDefault();
		$("#baseForm input[name$='keyWord']").val("");
	});
});
function search(){
	$("#searchBtn").trigger("click");
	$('#reset').trigger("click");
}

function getbaseList(init){
	if(init==1)$("#baseForm .pageNum").val(1);	
	JY.Model.loading();
	JY.Ajax.doRequest("baseForm",jypath +'/backstage/squareclasses/findByPage',null,function(data){
		 $("#baseTable tbody").empty();
        	 var obj=data.obj;
        	 var list=obj.list;
        	 var results=list.results;
        	 var permitBtn=obj.permitBtn;
         	 var pageNum=list.pageNum,pageSize=list.pageSize,totalRecord=list.totalRecord;
        	 var html="";
    		 if(results!=null&&results.length>0){
        		 var leng=(pageNum-1)*pageSize;//计算序号
        		 for(var i = 0;i<results.length;i++){
            		 var l=results[i];
            		 html+="<tr>";
            		 html+="<td class='center'>"+(i+leng+1)+"</td>";
            		 html+="<td class='center'>"+l.classesname+"</td>";
            		 html+="<td class='center'>"+JY.Date.Default(parseInt(l.updatetime))+"</td>";
            		 
            		 if(l.keyWord!="0"){
            			 html+="<td class='center '><a href='javascript:checkFormmakesure("+l.ids+")'>"+JY.Object.notEmpty(l.keyWord)+"篇文章</a></td>";
            		 }else{
            			 if(l.ids!="1"){
            				 html+="<td class='center ' ><font color='red'>暂无文章</font></td>"; 
            			 }
            			 else{
            				 html+="<td class='center ' ><font color='green'>默认分类</font></td>";
            			 }
            		 }
            		 html+=JY.Tags.setFunction(l.ids,permitBtn);
            		 html+="</tr>";		 
            	 } 
        		 $("#baseTable tbody").append(html);
        		 JY.Page.setPage("baseForm","pageing",pageSize,pageNum,totalRecord,"getbaseList");
        	 }else{
        		html+="<tr><td colspan='5' class='center'>没有相关数据</td></tr>";
        		$("#baseTable tbody").append(html);
        		$("#pageing ul").empty();//清空分页
        	 }	
 	 
    	 JY.Model.loadingClose();
	 });
}

function del(ids){
	if(ids=="1"){
		JY.Model.error("默认分类，不允许删除");
	}else{
		JY.Model.confirm("确认删除吗？",function(){	
			JY.Ajax.doRequest(null,jypath +'/backstage/squareclasses/del',{ids:ids},function(data){
				layer.msg(data.resMsg);search();
			});
		});
	}
}

function check(ids){
	cleanForm();
	JY.Ajax.doRequest(null,jypath +'/backstage/squareclasses/find',{ids:ids},function(data){
	    setForm(data);
	    JY.Model.check("auDiv");       
	});
}

function edit(ids){
	cleanForm();
		JY.Ajax.doRequest(null,jypath +'/backstage/squareclasses/find',{ids:ids},function(data){
		    setForm(data);   
		    JY.Model.editwithsize("auDiv","修改",600,600,function(){
		    	if(JY.Validate.form("auForm")){
					var that =$(this);
					JY.Ajax.doRequest("auForm",jypath +'/backstage/squareclasses/update',null,function(data){
					    that.dialog("close");
					    layer.msg(data.resMsg);search();	
					});
				}	
		    });
		});
}

function checkFormmakesure(ids){
	JY.Ajax.doRequest(null,jypath +'/backstage/square/findByPage',{pageNum:1,pageSize:20,classesid:ids},function(data){
		setFormmakesure(data);
	   JY.Model.editwithsizeusermakesure("makesure","广场列表(仅显示前20条)",1000,800); 
	});
}

function setFormmakesure(data){
		 $("#itemsTable tbody").empty();
   		 var obj=data.obj;
       	 var list=obj.list;
       	 var results=list.results;
       	 var html="";
   		 if(results!=null&&results.length>0){
   			for(var i = 0;i<results.length;i++){
       		 var l=results[i];
       		 html+="<tr>";
       		 html+="<td class='center'>"+JY.Object.notEmpty(l.ids)+"</td>";
       		 html+="<td class='center '>"+JY.Object.notEmpty(l.title)+"</td>";
       		 html+="<td class='center'>"+JY.Date.Default(parseInt(l.updatetime))+"</td>";
       		 html+="</tr>";		 
       	 } 
   		 $("#itemsTable tbody").append(html);
       	 }else{
       		html+="<tr><td colspan='3' class='center'>没有相关数据</td></tr>";
       		$("#itemsTable tbody").append(html);
       	 }	
}

function cleanForm(){
	JY.Tags.d6cleanForm("auForm");
	$("#innerimg").attr("src",jypath +"/static/images/system/d6wait.png");
	$("#auForm input[name$='squareclassesorder']").val(1);
	batch();
}
function setForm(data){
	var l=data.obj;
	$("#auForm input[name$='ids']").val(l.ids);
	$("#auForm input[name$='classesname']").val(JY.Object.notEmpty(l.classesname));
	
	if(l.coverurl==null||l.coverurl==""){
		$("#innerimg").attr("src",jypath +"/static/images/system/d6wait.png");
	}else{
		$("#innerimg").attr("src",l.coverurl);
	}
	$("#auForm input[name$='squareclassesorder']").val(l.squareclassesorder);
	$("#auForm input[name$='coverurl']").val(JY.Object.notEmpty(l.coverurl));
	
	batch();
}
