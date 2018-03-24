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
				 JY.Ajax.doRequest("auForm",jypath +'/backstage/banner/add',null,function(data){
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
		$("#baseForm input[name$='title']").val("");
	});
});
function search(){
	$("#searchBtn").trigger("click");
	$('#reset').trigger("click");
}

function getbaseList(init){
	if(init==1)$("#baseForm .pageNum").val(1);	
	JY.Model.loading();
	JY.Ajax.doRequest("baseForm",jypath +'/backstage/banner/findByPage',null,function(data){
		 $("#baseTable tbody").empty();
        	 var obj=data.obj;
        	 var list=obj.list;
        	 var results=list.results;
        	 var permitBtn=obj.permitBtn;
         	 var pageNum=list.pageNum,pageSize=list.pageSize,totalRecord=list.totalRecord;
        	 var html="";
        	 
        	 if(results!=null&&results.length>0){
        		for(var i = 0;i<results.length;i++){
            		 var l=results[i];
            		 html+="<tr>";
            		 html+="<td class='center'>"+JY.Object.notEmpty(l.newsid)+"</td>";
            		 html+="<td class='center '>"+JY.Object.notEmpty(l.title)+"</td>";
            		 html+="<td class='center'><label> <img width='50' height='50' nodedelete='false' modal='zoomImg' src=' "+JY.Object.notEmpty(l.picurl)+"'/></td>";
            		 html+="<td class='center'>"+JY.Date.Default(parseInt(l.createTime))+"</td>";
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
    	 batch();
	 });
}

function del(ids){
		JY.Model.confirm("确认删除吗？",function(){	
			JY.Ajax.doRequest(null,jypath +'/backstage/banner/del',{ids:ids},function(data){
				layer.msg(data.resMsg);search();
			});
		});
}

function edit(ids){
	cleanForm();
		JY.Ajax.doRequest(null,jypath +'/backstage/banner/find',{ids:ids},function(data){
		    setForm(data);   
		    JY.Model.editwithsize("auDiv","修改",600,600,function(){
		    	if(JY.Validate.form("auForm")){
					var that =$(this);
					JY.Ajax.doRequest("auForm",jypath +'/backstage/banner/update',null,function(data){
					    that.dialog("close");
					    layer.msg(data.resMsg);search();	
					});
				}	
		    });
		});
}

function cleanForm(){
	JY.Tags.d6cleanForm("auForm");
	$("#innerimg").attr("src",jypath +"/static/images/system/d6wait.png");
	$("#auForm input[name$='bannerorder']").val(1);
	batch();
}
function setForm(data){
	var l=data.obj;
	$("#auForm input[name$='ids']").val(l.ids);
	$("#auForm input[name$='bannerkey']").val(JY.Object.notEmpty(l.bannerkey));
	$("#auForm textarea[name$='title']").val(JY.Object.notEmpty(l.title));
	$("#auForm input[name$='newsid']").val(JY.Object.notEmpty(l.newsid));
	$("#auForm input[name$='bannerorder']").val(l.bannerorder);
	if(l.picurl==null||l.picurl==""){
		$("#innerimg").attr("src",jypath +"/static/images/system/d6wait.png");
	}else{
		$("#innerimg").attr("src",l.picurl);
	}
	
	$("#auForm input[name$='picurl']").val(JY.Object.notEmpty(l.picurl));
	
	batch();
}
