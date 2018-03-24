
$(function () {
	$("input[name='beginTime']").datetimepicker({
		format:'yyyy-mm-dd',language:'zh-CN',weekStart:1,todayBtn:1,autoclose: 1,todayHighlight: 1,startView: 2,minView:2,
      }).on('changeDate', function(ev){
    	  	var beginTime=$("input[name='beginTime']").val();
    	  	$("input[name='endTime']").datetimepicker('setStartDate',beginTime);
    	 });
	
	$("input[name='endTime']").datetimepicker({
		format: 'yyyy-mm-dd',language:'zh-CN',weekStart: 1,todayBtn:1,autoclose:1,todayHighlight:1,startView:2,minView:2,
	}).on('changeDate', function(ev){
	  	var endTime=$("input[name='endTime']").val();
	  	$("input[name='beginTime']").datetimepicker('setEndDate',endTime);
	 });
	
	getWxkfList();
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
		 JY.Model.editwithsize("kfDiv","新增",800,600,function(){
			 if(JY.Validate.form("kfForm")){
				 var that =$(this);
				 JY.Ajax.doRequest("kfForm",jypath +'/backstage/wxkf/add',null,function(data){
				     that.dialog("close");      
				     layer.msg(data.resMsg);search();
				 });
			 }	
		});
	});
	
	//清除
	$('#reset').on('click', function(e){
		//通知浏览器不要执行与事件关联的默认动作		
		e.preventDefault();
		$("#baseForm input[name$='kfName']").val("");
		$("#baseForm input[name$='beginTime']").val("");
		$("#baseForm input[name$='endTime']").val("");
	});
});

function search(){
	$("#searchBtn").trigger("click");
	$('#reset').trigger("click");
}

function getWxkfList(init){
	if(init==1) $("#baseForm .pageNum").val(1);	
	JY.Model.loading();
	JY.Ajax.doRequest("baseForm",jypath +'/backstage/wxkf/findByPage',null,function(data){
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
            		 html+="<td class='center hidden-480'>"+JY.Object.notEmpty(l.kfName)+"</td>";
            		 html+="<td class='center'><label> <img width='50' height='50' nodedelete='false' modal='zoomImg' src=' "+JY.Object.notEmpty(l.kfPic)+"'/></td>";
            		 html+="<td class='center hidden-480' >"+JY.Object.notEmpty(l.description)+"</td>";
            		 html+="<td class='center '>"+JY.Date.Default(l.createTime)+"</td>";
            		 html+="<td class='center '>"+JY.Object.notEmpty(l.createusername)+"</td>";
            		 html+="<td class='center '>"+JY.Date.Default(l.updateTime)+"</td>";
            		 html+=JY.Tags.setFunction(l.ids,permitBtn);
            		 html+="</tr>";		 
            	 } 
        		 $("#baseTable tbody").append(html);
        		 JY.Page.setPage("baseForm","pageing",pageSize,pageNum,totalRecord,"getWxkfList");
        	 }else{
        		html+="<tr><td colspan='8' class='center'>没有相关数据</td></tr>";
        		$("#baseTable tbody").append(html);
        		$("#pageing ul").empty();//清空分页
        	 }	
        	 JY.Model.loadingClose();
        	 batch();
	});
}

function del(id){
	JY.Model.confirm("确认删除吗？",function(){	
		JY.Ajax.doRequest(null,jypath +'/backstage/wxkf/del',{kfid:id},function(data){
	      	layer.msg(data.resMsg);search();
		});
	});	
}
function edit(ids){
	cleanForm();
	JY.Ajax.doRequest(null,jypath +'/backstage/wxkf/find',{ids:ids},function(data){
    		setForm(data);   
    		   JY.Model.editwithsize("kfDiv","修改",800,600,function(){
    			 if(JY.Validate.form("kfForm")){
					 var that =$(this);
					 JY.Ajax.doRequest("kfForm",jypath +'/backstage/wxkf/update',null,function(data){
			        		 that.dialog("close");
			        		 layer.msg(data.resMsg);search();
					 });
				 }
    		});   
	});
}

function cleanForm(){
	JY.Tags.d6cleanForm("kfForm");
	$("#innerimg").attr("src",jypath +"/static/images/system/d6wait.png");
	$("#kfForm input[name$='status'][value='1']").parent("label").trigger("click");
	batch();
}

function setForm(data){
	var l=data.obj;
	$("#kfForm input[name$='ids']").val(l.ids);
	$("#kfForm input[name$='kfName']").val(JY.Object.notEmpty(l.kfName));
	$("#kfForm input[name$='kfPic']").val(JY.Object.notEmpty(l.kfPic));
	$("#kfForm textarea[name$='description']").val(JY.Object.notEmpty(l.description));
	$("#kfForm input[name$='status'][value='"+(JY.Object.notNull(l.status)?l.status:"0")+"']").parent("label").trigger("click");
	
	if(l.kfPic==null||l.kfPic==""){
		$("#innerimg").attr("src",jypath +"/static/images/system/d6wait.png");
	}else{
		$("#innerimg").attr("src",l.kfPic);
	}
	batch();
}

