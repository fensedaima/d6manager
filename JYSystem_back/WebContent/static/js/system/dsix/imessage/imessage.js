
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
	
	getImessageList();
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
		createselect();
			JY.Model.editwithsize("auDiv","新增",800,600,function(){
			 if(JY.Validate.form("auForm")){
				 var that =$(this);
				 JY.Ajax.doRequest("auForm",jypath +'/backstage/imessage/add',null,function(data){
					 that.dialog("close");
					  JY.Model.info(data.resMsg,function(){search();});	
				 });	
			 }
		});
	});
	
	
	$("#auForm input[name$='sex']").change(function (){ //拨通
		$("#userSelect").empty();
		$("#userSelect").append("<select  name='userclassesid' id='userclassesid' style='width:75%;'></select>");
		JY.Ajax.doRequest(null,jypath +'/backstage/userclasses/findauto',{sex:$(this).val()},function(data){
			var reslist = data.obj; 
			var theselect=$("#userclassesid");
			for(var i=0; i<reslist.length; i++){ 
	            var thevo = reslist[i]; 
	            theselect.append("<option value='" + thevo.ids + "'>" + thevo.classesname + "</option>");
	        }
			theselect.chosen();
			theselect.trigger("liszt:updated");
		});
		
	});
	
	//清除
	$('#reset').on('click', function(e){
		//通知浏览器不要执行与事件关联的默认动作		
		e.preventDefault();
		$("#baseForm input[name$='title']").val("");
		$("#baseForm input[name$='beginTime']").val("");
		$("#baseForm input[name$='endTime']").val("");
	});
});


function createselect(l){
	$("#userSelect").empty();
	$("#userSelect").append("<select  name='classesid' id='classesid' style='width:75%;'></select>");
	
	$("#guoneidiqu").empty();
	$("#guoneidiqu").append("<select  name='lookwhere' id='lookwhere' multiple='multiple' style='width:75%;'></select> ");

	$("#guowaidiqu").empty();
	$("#guowaidiqu").append("<select  name='handlookwhere' id='handlookwhere' multiple='multiple' style='width:75%;'></select> ");
	
	if(typeof(l)!="undefined"&&l.lookwhere!=null&&l.lookwhere=="全部"){
		$("#gnquanbu").prop("checked", true);
	}
	else{
		$("#gnquanbu").prop("checked",false);
	}
	
	if(typeof(l)!="undefined"&&l.handlookwhere!=null&&l.handlookwhere=="全部"){
		$("#gwquanbu").prop("checked", true);
	}
	else{
		$("#gwquanbu").prop("checked",false);
	}
	
	JY.Ajax.doRequest(null,jypath +'/backstage/userclasses/findauto',{sex:typeof(l)=="undefined"?1:l.sex},function(data){
		var reslist = data.obj; 
		var theselect=$("#classesid");
		for(var i=0; i<reslist.length; i++){ 
            var vo = reslist[i]; 
            if(typeof(l)=="undefined"){
            	theselect.append("<option value='" + vo.ids + "'>" + vo.classesname + "</option>");
            }else{
            	 if(vo.ids==l.classesid){
                 	theselect.append("<option value='" + vo.ids + "' selected='selected'>" + vo.classesname + "</option>");
                 }else{
                 	theselect.append("<option value='" + vo.ids + "'>" + vo.classesname + "</option>");
                 }
            }
        }
		theselect.chosen();
		theselect.trigger("liszt:updated");
	});
	
	JY.Ajax.doRequest(null,jypath +'/backstage/sysDict/findauto',{paramKey:0},function(data){
		var reslist = data.obj; 
		var theselect=$("#lookwhere");
		for(var i=0; i<reslist.length; i++){ 
            var vo = reslist[i]; 
            if(typeof(l)=="undefined"){
            	theselect.append("<option value='" + vo.paramName + "'>" + vo.paramName + "</option>");
            }else{
            	if(l.lookwhere!=null&&l.lookwhere.indexOf(vo.paramName)>=0){
                	theselect.append("<option value='" + vo.paramName + "' selected='selected'>" + vo.paramName + "</option>");
                }else{
                	theselect.append("<option value='" + vo.paramName + "'>" + vo.paramName + "</option>");
                }
            }
        }
		theselect.chosen();
		theselect.trigger("liszt:updated");
	});
	
	JY.Ajax.doRequest(null,jypath +'/backstage/sysDict/findauto',{paramKey:1},function(data){
		var reslist = data.obj; 
		var theselect=$("#handlookwhere");
		for(var i=0; i<reslist.length; i++){ 
            var vo = reslist[i]; 
            if(typeof(l)=="undefined"){
            	theselect.append("<option value='" + vo.paramName + "'>" + vo.paramName + "</option>");
            }else{
            	if(l.handlookwhere!=null&&l.handlookwhere.indexOf(vo.paramName)>=0){
                	theselect.append("<option value='" + vo.paramName + "' selected='selected'>" + vo.paramName + "</option>");
                }else{
                	theselect.append("<option value='" + vo.paramName + "'>" + vo.paramName + "</option>");
                }
            }
        }
		theselect.chosen();
		theselect.trigger("liszt:updated");
	});
}

function search(){
	$("#searchBtn").trigger("click");
	$('#reset').trigger("click");
}

function getImessageList(init){
	if(init==1) $("#baseForm .pageNum").val(1);	
	JY.Model.loading();
	JY.Ajax.doRequest("baseForm",jypath +'/backstage/imessage/findByPage',null,function(data){
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
            		 html+="<td class='center'><label>"+(i+leng+1)+" <span class='lbl'></span></label></td>";
            		 html+="<td class='center'>"+JY.Object.notEmpty(l.title)+"</td>";
            		 html+="<td class='center'>"+JY.Object.notEmpty(l.userid)+"</td>";
            		 html+="<td class='center '>"+JY.Date.Default(parseInt(l.createTime))+"</td>";
            		 html+="<td class='center '>"+JY.Object.notEmpty(l.content)+"</td>";
            		 html+=JY.Tags.setFunction(l.ids,permitBtn);
            		 html+="</tr>";		 
            	 } 
        		 $("#baseTable tbody").append(html);
        		 JY.Page.setPage("baseForm","pageing",pageSize,pageNum,totalRecord,"getImessageList");
        	 }else{
        		html+="<tr><td colspan='9' class='center'>没有相关数据</td></tr>";
        		$("#baseTable tbody").append(html);
        		$("#pageing ul").empty();//清空分页
        	 }	
        	 JY.Model.loadingClose();
	});
}

function del(id){
	JY.Model.confirm("确认删除吗？",function(){	
		JY.Ajax.doRequest(null,jypath +'/backstage/imessage/del',{plid:id},function(data){
			JY.Model.info(data.resMsg,function(){search();});	
		});
	});	
}

function check(id){
	cleanForm();
	JY.Ajax.doRequest(null,jypath +'/backstage/imessage/find',{ids:id},function(data){
		setForm(data);
		createselect(data.obj);
	    JY.Model.checkwithsize("auDiv",'推送详情',800,600);       
	});
}

function cleanForm(){
	JY.Tags.d6cleanForm("auForm");
	$("#auForm input[name$='sex'][value='1']").parent("label").trigger("click");
}

function setForm(data){
	var l=data.obj;
	$("#auForm input[name$='sex'][value='"+(JY.Object.notNull(l.sex)?l.sex:"0")+"']").parent("label").trigger("click");
	$("#auForm input[name$='userid']").val(JY.Object.notEmpty(l.userid));
	$("#auForm input[name$='title']").val(JY.Object.notEmpty(l.title));
	$("#auForm input[name$='createTime']").val(l.createTime);
	$("#auForm textarea[name$='content']").val(JY.Object.notEmpty(l.content));
}
