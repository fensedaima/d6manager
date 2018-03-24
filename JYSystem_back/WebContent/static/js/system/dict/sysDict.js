$(function () {
	$("#paramKeyselect").chosen();
	getbaseList();
	//增加回车事件
	$("#baseForm").keydown(function(e){
		 keycode = e.which || e.keyCode;
		 if(keycode==13){
			 search();
		 }
	});
	//新加
	$('#addBtn').on('click', function(e) {
		//通知浏览器不要执行与事件关联的默认动作		
		e.preventDefault();
		cleanForm();
		JY.Model.editwithsize("auDiv","新增",500,600,function(){
			 if(JY.Validate.form("auForm")){
				 var that =$(this);
				 JY.Ajax.doRequest("auForm",jypath +'/backstage/sysDict/add',null,function(data){
		        	that.dialog("close");      
		        	layer.msg(data.resMsg);search();  	
				 });
			 }	
		});
	});
	
	// 清除
	$('#reset').on('click', function(e) {
		// 通知浏览器不要执行与事件关联的默认动作
		e.preventDefault();
		$("#baseForm input[name$='paramName']").val("");
	});
});
function search(){
	$("#searchBtn").trigger("click");
	$('#reset').trigger("click");
}

function getbaseList(init){
	if(init==1) $("#baseForm .pageNum").val(1);	
	JY.Model.loading();
	JY.Ajax.doRequest("baseForm",jypath +'/backstage/sysDict/findByPage',null,function(data){
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
            		 html+="<td class='center hidden-480'>"+(i+leng+1)+"</td>";
            		 html+="<td class='center'>"+JY.Object.notEmpty(l.paramName)+"</td>";
            		 if(l.paramKey!=null&&l.paramKey=="1"){
            			 html+="<td class='center hidden-480' ><font color='red'>海外</font></td>";
            		 }else{
            			 html+="<td class='center hidden-480' ><font color='blue'>国内</font></td>";
            		 }
            		 if(l.isValid==1) html+="<td class='center hidden-480'><span class='label label-sm label-success'>热门地区</span></td>";
            		 else             html+="<td class='center hidden-480'><span class='label label-sm arrowed-in'>普通地区</span></td>";
            		 html+="<td class='center hidden-480'>"+JY.Date.Default(l.createTime)+"</td>";
            		 html+="<td class='center hidden-480'>"+JY.Object.notEmpty(l.lookorder)+"</td>";
            		 html+=JY.Tags.setFunction(l.id,permitBtn);
            		 html+="</tr>";		 
            	 } 
        		 $("#baseTable tbody").append(html);
        		 JY.Page.setPage("baseForm","pageing",pageSize,pageNum,totalRecord,"getbaseList");
        	 }else{
        		html+="<tr><td colspan='7' class='center'>没有相关数据</td></tr>";
        		$("#baseTable tbody").append(html);
        		$("#pageing ul").empty();//清空分页
        	 }	
        	 JY.Model.loadingClose();
	});
}
function check(id){
	cleanForm();
	JY.Ajax.doRequest(null,jypath +'/backstage/sysDict/find',{id:id},function(data){
    	setForm(data);
    	JY.Model.checkwithsize("auDiv","查看",500,600);     	
	});
}
function del(id){
	JY.Model.confirm("确认删除吗？",function(){	
		JY.Ajax.doRequest(null,jypath +'/backstage/sysDict/del',{id:id},function(data){
	      	layer.msg(data.resMsg);search();
		});
	});	
}
function edit(id){
	cleanForm();
	JY.Ajax.doRequest(null,jypath +'/backstage/sysDict/find',{id:id},function(data){
    		setForm(data);   
    		JY.Model.editwithsize("auDiv","修改",500,600,function(){
    			 if(JY.Validate.form("auForm")){
					 var that =$(this);
					 JY.Ajax.doRequest("auForm",jypath +'/backstage/sysDict/update',null,function(data){
						 if(data.res==1){
			        		 that.dialog("close");
			        		 layer.msg(data.resMsg);search();
			        	 }else{
			        		 JY.Model.error(data.resMsg);
			        	 } 		
					 });
				 }
    		});   
	});
}
function cleanForm(){
	JY.Tags.isValid("auForm","0");
	JY.Tags.cleanForm("auForm");
	$("#auForm input[name$='paramKey'][value='0']").parent("label").trigger("click");
	$("#auForm input[name$='lookorder']").val(1);
}
function setForm(data){
	var l=data.obj;
	$("#auForm input[name$='id']").val(l.id);
	$("#auForm input[name$='paramName']").val(JY.Object.notEmpty(l.paramName));
	$("#auForm input[name$='oldparamName']").val(JY.Object.notEmpty(l.paramName));
	$("#auForm input[name$='paramKey'][value='"+(JY.Object.notNull(l.paramKey)?l.paramKey:"0")+"']").parent("label").trigger("click");
	JY.Tags.isValid("auForm",(JY.Object.notNull(l.isValid)?l.isValid:"0"));
	$("#auForm textarea[name$='description']").val(JY.Object.notEmpty(l.description));
	 $("#auForm input[name$='lookorder']").val(l.lookorder);
}
