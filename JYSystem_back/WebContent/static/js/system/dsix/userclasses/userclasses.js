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
		 JY.Model.editwithsize("auDiv","新增",600,600,function(){
			 if(JY.Validate.form("auForm")){
				 var that =$(this);
				 JY.Ajax.doRequest("auForm",jypath +'/backstage/userclasses/add',null,function(data){
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
	JY.Ajax.doRequest("baseForm",jypath +'/backstage/userclasses/findByPage',null,function(data){
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
            		 html+="<td class='center hidden-480'>"+JY.Object.notEmpty(l.classesname)+"</td>";
            		 html+="<td class='center'>"+JY.Object.notEmpty(l.describes)+"</td>";
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
	if(ids=="7"){
		JY.Model.error("默认用户分类，不允许删除");
	}else{
		JY.Model.confirm("确认删除吗？",function(){	
			JY.Ajax.doRequest(null,jypath +'/backstage/userclasses/del',{ids:ids},function(data){
				layer.msg(data.resMsg);search();
			});
		});
	}
}

function edit(ids){
	cleanForm();
		JY.Ajax.doRequest(null,jypath +'/backstage/userclasses/find',{ids:ids},function(data){
		    setForm(data);   
		    JY.Model.editwithsize("auDiv","修改",600,600,function(){
		    	if(JY.Validate.form("auForm")){
					var that =$(this);
					JY.Ajax.doRequest("auForm",jypath +'/backstage/userclasses/update',null,function(data){
					    that.dialog("close");
					    layer.msg(data.resMsg);search();	
					});
				}	
		    });
		});
}

function cleanForm(){
	JY.Tags.d6cleanForm("auForm");
	$("#auForm input[name$='flag'][value='1']").parent("label").trigger("click");
	$("#auForm input[name$='sex'][value='1']").parent("label").trigger("click");
	$("#auForm input[name$='userclassesorder']").val(1);
}
function setForm(data){
	var l=data.obj;
	$("#auForm input[name$='ids']").val(l.ids);
	$("#auForm input[name$='classesname']").val(JY.Object.notEmpty(l.classesname));
	$("#auForm textarea[name$='describes']").val(JY.Object.notEmpty(l.describes));
	$("#auForm input[name$='flag'][value='"+(JY.Object.notNull(l.flag)?l.flag:"0")+"']").parent("label").trigger("click");
	$("#auForm input[name$='sex'][value='"+(JY.Object.notNull(l.sex)?l.sex:"0")+"']").parent("label").trigger("click");
	$("#auForm input[name$='talkcount']").val(JY.Object.notEmpty(l.talkcount));
	$("#auForm input[name$='userclassesorder']").val(l.userclassesorder);
}
