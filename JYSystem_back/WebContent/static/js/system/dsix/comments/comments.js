
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
	JY.Ajax.doRequest("baseForm",jypath +'/backstage/comments/findByPage',null,function(data){
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
            		 html+="<td class='center hidden-480'>"+JY.Object.notEmpty(l.memberName)+"</td>";
            		 if(l.title!=null&&l.title!=""){
            			 html+="<td class='center '><a href='javascript:checkFormmakesure("+l.newsId+")'>"+JY.Object.notEmpty(l.title)+"</a></td>";
            		 }else{
            			 html+="<td class='center ' ></td>";
            		 }
            		 html+="<td class='center '>"+JY.Date.Default(parseInt(l.createTime))+"</td>";
            		 html+="<td class='center '>"+JY.Object.notEmpty(l.content)+"</td>";
            		 html+=JY.Tags.setFunction(l.ids,permitBtn);
            		 html+="</tr>";		 
            	 } 
        		 $("#baseTable tbody").append(html);
        		 JY.Page.setPage("baseForm","pageing",pageSize,pageNum,totalRecord,"getCommentsList");
        	 }else{
        		html+="<tr><td colspan='6' class='center'>没有相关数据</td></tr>";
        		$("#baseTable tbody").append(html);
        		$("#pageing ul").empty();//清空分页
        	 }	
        	 JY.Model.loadingClose();
	});
}

function del(id){
	JY.Model.confirm("确认删除吗？",function(){	
		JY.Ajax.doRequest(null,jypath +'/backstage/comments/del',{plid:id},function(data){
			layer.msg(data.resMsg);search();
		});
	});	
}
////////////////////////////////////////////////////////////checkFormmakesure////////////////////////////////////////////////////////////
function checkFormmakesure(ids){
	cleanMakeSureForm();
		JY.Ajax.doRequest(null,jypath +'/backstage/square/find',{ids:ids},function(data){
		    setMakeSureForm(data);   
		    createselect(data.obj);
		    JY.Model.checkwithsize("makesureauDiv","广场详情",1000,800,function(){
		    	if(JY.Validate.form("makesureauForm")){
					var that =$(this);
					JY.Ajax.doRequest("makesureauForm",jypath +'/backstage/square/update',null,function(data){
					    that.dialog("close");
					    layer.msg(data.resMsg);search();	
					});
				}	
		    });
		});
}
////////////////////////////////////////////////////////////check////////////////////////////////////////////////////////////
function check(id){
	cleanForm();
	JY.Ajax.doRequest(null,jypath +'/backstage/comments/find',{ids:id},function(data){
	    setForm(data);
	    JY.Model.editwithsizecomments("auDiv","评论详情",600,400,function(){
	    	if(JY.Validate.form("auForm")){
				var that =$(this);
				JY.Ajax.doRequest("auForm",jypath +'/backstage/comments/editIsShow',{plid:id},function(data){
				    that.dialog("close");
				    layer.msg("前台显示");search();
				});
			}	
	    },
	    function(){
	    	if(JY.Validate.form("auForm")){
				var that =$(this);
				JY.Ajax.doRequest("auForm",jypath +'/backstage/comments/editShow',{plid:id},function(data){
				    that.dialog("close");
				    layer.msg("禁止前台显示");search();
				});
			}	
	    }
	    );    
	});
}
////////////////////////////////////////////////////////////cleanMakeSureForm////////////////////////////////////////////////////////////
function cleanMakeSureForm(){
	JY.Tags.d6cleanForm("makesureauForm");
	$("#makesureimagelist").empty();
	$("#makesureauForm input[name$='makesurehomepagerecommend'][value='1']").parent("label").trigger("click");
	//ue.setContent("");
}
////////////////////////////////////////////////////////////cleanForm////////////////////////////////////////////////////////////
function cleanForm(){
	JY.Tags.d6cleanForm("auForm");
	$("#ids").text("");  
	$("#isShow").text("");  
	 $("#memberName").text("");
	 $("#createTime").text("");
	 $("#auForm textarea[name$='content']").val("");
}
////////////////////////////////////////////////////////////setMakeSureForm////////////////////////////////////////////////////////////
function setMakeSureForm(data){
	var l=data.obj;
	
	$("#makesureauForm input[name$='makesureids']").val(l.ids);
	$("#makesureauForm input[name$='makesuretitle']").val(JY.Object.notEmpty(l.title));
	$("#makesureauForm input[name$='makesureorders']").val(JY.Object.notEmpty(l.orders));
	$("#makesureauForm input[name$='makesurecoverurl']").val(JY.Object.notEmpty(l.coverurl));
	$("#makesureauForm input[name$='makesurehomepagerecommend'][value='"+(JY.Object.notNull(l.homepagerecommend)?l.homepagerecommend:"0")+"']").parent("label").trigger("click");
	
//	ue.addListener('ready',function(editor){
//		ue.setContent(JY.Object.notEmpty(l.content));
//	});
//	ue.setContent(JY.Object.notEmpty(l.content));
	
	$("#makesureauForm textarea[name$='makesurecontent']").val(JY.Object.notEmpty(l.content));
	
	$("#makesureimagelist").empty();
	if(l.coverurl!=null&&l.coverurl!=""){
		var coverurlarray=l.coverurl.split(",");
		for(var i=0;i<coverurlarray.length;i++){
			$("#makesureimagelist").append("<img  width='100' height='100' nodedelete='false' modal='zoomImg' src='"+coverurlarray[i]+"'/> ");
		}
	}
	batch();
}
////////////////////////////////////////////////////////////setForm////////////////////////////////////////////////////////////
function setForm(data){
	var l=data.obj;
	 $("#ids").text(l.ids);  
	 if(JY.Object.notEmpty(l.isShow)==1)
		 $("#isShow").text('前台显示');  
	 else
		 $("#isShow").text('禁止前台显示');  
	 
	 $("#memberName").text(JY.Object.notEmpty(l.memberName));
	 $("#createTime").text(JY.Date.Default(parseInt(l.createTime)));
	 $("#auForm textarea[name$='content']").val(JY.Object.notEmpty(l.content));
}
////////////////////////////////////////////////////////////createselect////////////////////////////////////////////////////////////
function createselect(l){
	$("#squareSelect").empty();
	$("#squareSelect").append("<select  name='classesid' id='classesid' style='width:70%;' disabled='disabled'></select>");
	
	JY.Ajax.doRequest(null,jypath +'/backstage/square/findauto',null,function(data){
		var reslist = data.obj; 
		var theselect=$("#classesid");
		for(var i=0; i<reslist.length; i++){ 
            var vo = reslist[i]; 
            if(typeof(l)=="undefined"){
            	if(vo.classesname!="全部"){
            		theselect.append("<option value='" + vo.ids + "'>" + vo.classesname + "</option>");
            	}
            }else{
            	 if(vo.ids==l.classesid){
            		 if(vo.classesname!="全部"){
            			 theselect.append("<option value='" + vo.ids + "' selected='selected'>" + vo.classesname + "</option>");
            		 }
                 	
                 }else{
                	 if(vo.classesname!="全部"){
                		 theselect.append("<option value='" + vo.ids + "'>" + vo.classesname + "</option>");
                	 }
                 }
            }
        }
		theselect.chosen();
		theselect.trigger("liszt:updated");
	});
}