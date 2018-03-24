
$(function () {
	
	$("#theisshow").chosen();
	
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
	getCommentsList();
	//增加回车事件
	$("#baseForm").keydown(function(e){
		 keycode = e.which || e.keyCode;
		 if(keycode==13){
			 search();
		 }
	});
	//清除
	$('#reset').on('click', function(e){
		//通知浏览器不要执行与事件关联的默认动作		
		e.preventDefault();
		$("#baseForm input[name$='content']").val("");
		$("#baseForm input[name$='city']").val("");
		$("#baseForm input[name$='beginTime']").val("");
		$("#baseForm input[name$='endTime']").val("");
	});
});


function search(){
	$("#searchBtn").trigger("click");
	$('#reset').trigger("click");
}

function getCommentsList(init){
	if(init==1) $("#baseForm .pageNum").val(1);	
	JY.Model.loading();
	JY.Ajax.doRequest("baseForm",jypath +'/backstage/selfabout/findByPage',null,function(data){
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
            		 html+="<td class='center'>"+JY.Object.notEmpty(l.loginName)+"</td>";
            		 html+="<td class='center'>"+JY.Object.notEmpty(l.name)+"</td>";
            		 html+="<td class='center '>"+JY.Object.notEmpty(l.city)+"</td>";
            		 html+="<td class='center '>"+JY.Date.Default(parseInt(l.createTime))+"</td>";
            		 html+="<td class='center '>"+JY.Object.notEmpty(l.content)+"</td>";
            		 if(JY.Object.notEmpty(l.isshow)==1)
            			 html+="<td class='center '><font color='green'>通过</font></td>"; 
            		 if(JY.Object.notEmpty(l.isshow)==0)
            			 html+="<td class='center '><font color='red'>不通过</font></td>"; 
            		 
            		 html+=JY.Tags.setFunction(l.ids,permitBtn);
            		 html+="</tr>";		 
            	 } 
        		 $("#baseTable tbody").append(html);
        		 JY.Page.setPage("baseForm","pageing",pageSize,pageNum,totalRecord,"getCommentsList");
        	 }else{
        		html+="<tr><td colspan='7' class='center'>没有相关数据</td></tr>";
        		$("#baseTable tbody").append(html);
        		$("#pageing ul").empty();//清空分页
        	 }	
        	 JY.Model.loadingClose();
	});
}

function del(id){
	JY.Model.confirm("确认删除吗？",function(){	
		JY.Ajax.doRequest(null,jypath +'/backstage/selfabout/del',{ids:id},function(data){
			layer.msg(data.resMsg);search();
		});
	});	
}
////////////////////////////////////////////////////////////check////////////////////////////////////////////////////////////
function check(ids){
	cleanForm();
	JY.Ajax.doRequest(null,jypath +'/backstage/selfabout/find',{ids:ids},function(data){
	    setForm(data);
	    JY.Model.editwithsizeselfabout("auDiv","自主发布详情",800,600,
	    function(){
	    	if(JY.Validate.form("auForm")){
				var that =$(this);
				JY.Ajax.doRequest(null,jypath +'/backstage/selfabout/update',{ids:ids,isshow:1},function(data){
				    that.dialog("close");
				    layer.msg("审核通过");search();
				});
			}	
	    },
	    function(){
	    	if(JY.Validate.form("auForm")){
				var that =$(this);
				JY.Ajax.doRequest(null,jypath +'/backstage/selfabout/update',{ids:ids,isshow:0},function(data){
				    that.dialog("close");
				    layer.msg("审核不通过");search();
				});
			}	
	    }
	    );    
	});
}
////////////////////////////////////////////////////////////cleanForm////////////////////////////////////////////////////////////
function cleanForm(){
	JY.Tags.d6cleanForm("auForm");
	 $("#isshow").text("");  
	 $("#name").text("");
	 $("#selfnumber").text("");
	 $("#city").text("");
	 $("#lookwhere").text("");
	 $("#handlookwhere").text("");
	 $("#createTime").text("");
	 $("#auForm textarea[name$='content']").val("");
	 batch();
}

////////////////////////////////////////////////////////////setForm////////////////////////////////////////////////////////////
function setForm(data){
	var l=data.obj;
	 $("#ids").val(l.ids);  
	 $("#selfnumber").text(JY.Object.notEmpty(l.selfnumber));
	 $("#lookwhere").text(JY.Object.notEmpty(l.lookwhere));
	 $("#handlookwhere").text(JY.Object.notEmpty(l.handlookwhere));
	 $("#city").text(JY.Object.notEmpty(l.city));
	 if(JY.Object.notEmpty(l.isshow)==1)
		 $("#isshow").text('审核通过');  
	 if(JY.Object.notEmpty(l.isshow)==0)
		 $("#isshow").text('审核不通过');  
	 if(JY.Object.notEmpty(l.isshow)==2)
		 $("#isshow").text('待审核');  
	 
	 $("#imagelist").empty();
	 
	 if( l.selfpicurl!=null&&l.selfpicurl!=""){
		var coverurlarray= l.selfpicurl.split(",");
		for(var i=0;i<coverurlarray.length;i++){
			$("#imagelist").append("<img  width='100' nodedelete='false' modal='zoomImg' height='100' src='"+coverurlarray[i]+"'/> ");
		}
	 }
	 
	 $("#name").text(JY.Object.notEmpty(l.name));
	 $("#createTime").text(JY.Date.Default(parseInt(l.createTime)));
	 $("#auForm textarea[name$='content']").val(JY.Object.notEmpty(l.content));
	 batch();
}
