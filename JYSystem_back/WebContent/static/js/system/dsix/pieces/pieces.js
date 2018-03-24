$(function () {
	getPiecesList();
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
			JY.Model.editwithsize("auDiv","新增",1000,800,function(){
			 if(JY.Validate.form("auForm")){
				 var that =$(this);
				 JY.Ajax.doRequest("auForm",jypath +'/backstage/pieces/add',null,function(data){
					 that.dialog("close");
					  JY.Model.info(data.resMsg,function(){search();});	
				 });	
			 }
		});
	});
	
	//清除
	$('#reset').on('click', function(e){
		//通知浏览器不要执行与事件关联的默认动作		
		e.preventDefault();
		$("#baseForm input[name$='title']").val("");
	});
	
	ue=UE.getEditor('content');
});

var ue;

function search(){
	$("#searchBtn").trigger("click");
	$('#reset').trigger("click");
}



function getPiecesList(init){
	if(init==1) $("#baseForm .pageNum").val(1);	
	JY.Model.loading();
	JY.Ajax.doRequest("baseForm",jypath +'/backstage/pieces/findByPage',null,function(data){
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
            		 html+="<td class='center'>"+JY.Object.notEmpty(l.title)+"</td>";
            		 html+="<td class='center'>"+JY.Object.notEmpty(l.piecesMark)+"</td>";
            		 html+="<td class='center'>"+JY.Object.notEmpty(l.description)+"</td>";
            		 html+=JY.Tags.setFunction(l.ids,permitBtn);
            		 html+="</tr>";		 
            	 } 
        		 $("#baseTable tbody").append(html);
        		 JY.Page.setPage("baseForm","pageing",pageSize,pageNum,totalRecord,"getPiecesList");
        	 }else{
        		html+="<tr><td colspan='9' class='center'>没有相关数据</td></tr>";
        		$("#baseTable tbody").append(html);
        		$("#pageing ul").empty();//清空分页
        	 }	
        	 JY.Model.loadingClose();
	});
}

function del(ids){
	JY.Model.confirm("确认删除吗？",function(){	
		JY.Ajax.doRequest(null,jypath +'/backstage/pieces/del',{ids:ids},function(data){
			JY.Model.info(data.resMsg,function(){search();});	
		});
	});
}

function edit(id){
		cleanForm();
		JY.Ajax.doRequest(null,jypath +'/backstage/pieces/find',{ids:id},function(data){
		      setForm(data);  
		    JY.Model.editwithsize("auDiv","编辑",1000,800,function(){
		    	if(JY.Validate.form("auForm")){
					var that =$(this);
					JY.Ajax.doRequest("auForm",jypath +'/backstage/pieces/update',null,function(data){
					    that.dialog("close");
					    JY.Model.info(data.resMsg,function(){search();});		
					});
				}	
		    });
		});
}
function cleanForm(){
	JY.Tags.d6cleanForm("auForm");
	ue.setContent("");
	$("#imagelist").empty();
	batch();
}
function deleteimage(obj){
	var savePath=$("#savePath").val();
	var deletepath=$(obj).attr("src");
	if(savePath.indexOf(deletepath)==0){
		savePath=savePath.replace(deletepath+",","");
		savePath=savePath.replace(deletepath,"");
	}else{
		savePath=savePath.replace(","+deletepath,"");
	}
	$(obj).remove();
	$("#savePath").val(savePath);
}
function setForm(data){
	var l=data.obj;
	
	$("#auForm input[name$='ids']").val(l.ids);
	$("#auForm input[name$='piecesMark']").val(JY.Object.notEmpty(l.piecesMark));
	$("#auForm input[name$='title']").val(JY.Object.notEmpty(l.title));
	$("#auForm input[name$='keywork']").val(JY.Object.notEmpty(l.keywork));
	$("#auForm textarea[name$='description']").val(JY.Object.notEmpty(l.description));
	$("#auForm input[name$='sortId']").val(JY.Object.notEmpty(l.sortId));
	$("#auForm input[name$='picUrl']").val(JY.Object.notEmpty(l.picUrl));
	
	$("#auForm input[name$='ext1']").val(JY.Object.notEmpty(l.ext1));
	$("#auForm input[name$='ext2']").val(JY.Object.notEmpty(l.ext2));
	$("#auForm input[name$='ext3']").val(JY.Object.notEmpty(l.ext3));
	$("#auForm input[name$='ext4']").val(JY.Object.notEmpty(l.ext4));
	$("#auForm input[name$='ext5']").val(JY.Object.notEmpty(l.ext5));
	$("#auForm input[name$='ext6']").val(JY.Object.notEmpty(l.ext6));
	$("#auForm input[name$='ext7']").val(JY.Object.notEmpty(l.ext7));
	$("#auForm input[name$='ext8']").val(JY.Object.notEmpty(l.ext8));
	
	ue.addListener('ready',function(editor){
		ue.setContent(JY.Object.notEmpty(l.content));
	});
	ue.setContent(JY.Object.notEmpty(l.content));
	
	$("#imagelist").empty();
	if(l.picUrl!=null&&l.picUrl!=""){
		var coverurlarray=l.picUrl.split(",");
		for(var i=0;i<coverurlarray.length;i++){
			$("#imagelist").append("<img  width='100' height='100' src='"+coverurlarray[i]+"' nodedelete='true' modal='zoomImg'/> ");
		}
	}
	batch();
}