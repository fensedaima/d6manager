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
	$('#addBtn').on('click', function(e) {
		//通知浏览器不要执行与事件关联的默认动作		
		e.preventDefault();
		cleanForm();	
		createselect();
		
	    JY.Model.editwithsize("auDiv","新增",1000,800,function(){
			 if(JY.Validate.form("auForm")){
				 if($("#auForm input[name$='userid']").val()==""){
						JY.Model.error("请选择会员");
						return false;
			     }
				 if($("#auForm textarea[name$='content']").val()==""){
						JY.Model.error("请填写文章内容");
						return false;
	    		 }
					var savePath=$("#savePath").val();
			        var array=savePath.split(",");
			        if(array.length>9){
			        	JY.Model.error("最多上传9张内容图片");
			        	return false;
			        }
				 var that =$(this);
				 that.dialog("close"); 
				 JY.Ajax.doRequest("auForm",jypath +'/backstage/square/add',null,function(data){
				     layer.msg(data.resMsg);search();
				 });
			 }	
		});
	});
	
	//清除
	$('#reset').on('click', function(e){
		//通知浏览器不要执行与事件关联的默认动作		
		e.preventDefault();
		$("#keyWord").val("");
	});
	
	 $( "#userid" ).autocomplete({    
         source: function( request, response ) {  
               $.ajax({    
                   url: jypath +'/backstage/account/findauto',    
                   data:{"name": $("#userid").val(),"canpublishsquare":"1"},  
                   type: "POST",    
                   dataType: "json",    
                   success: function(data){   
                	       var dataArray=[]; 
                    	   var reslist = data.obj; 
                    	   
                    	   response($.map(reslist,function(item){  
                               var name = item.name;  
                               return {  
                            	   label:"【昵称】"+item.name+"  【手机号】"+item.phone+"  【登录名】"+item.loginName,//下拉框显示值  
                                   value:(item.name==null||item.name=="")?item.phone+"【手机号】":item.name+"【昵称】",//选中后，填充到下拉框的值   
                                   id:item.accountId//选中后，填充到id里面的值  
                               }  
                           }));  
                   }    
           });   
         },
         max: 12,    //列表里的条目数  
         minChars: 1,    //自动完成激活之前填入的最小字符  
         width: 400,     //提示的宽度，溢出隐藏  
         scrollHeight: 300,   //提示的高度，溢出显示滚动条  
         matchContains: false,    //包含匹配，就是data参数里的数据，是否只要包含文本框里的数据就显示  
         autoFill: true,    //自动填充  
         minLength: 0,
         select : function(event, ui) {  
             JY.Ajax.doRequest(null,jypath +'/backstage/account/findauto',{accountId:ui.item.id},function(data){
         		var reslist = data.obj; 
         		for(var i=0; i<reslist.length; i++){ 
                     var vo = reslist[i]; 
                 	$("#auForm input[name$='userid']").val(JY.Object.notEmpty(vo.accountId));
                 }
         	});
         } 
     });  
});
function search(){
	$("#searchBtn").trigger("click");
	$('#reset').trigger("click");
}

function getbaseList(init){
	if(init==1)$("#baseForm .pageNum").val(1);	
	JY.Model.loading();
	JY.Ajax.doRequest("baseForm",jypath +'/backstage/square/findByPage',null,function(data){
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
            		 html+="<td class='center'>"+l.ids+"</td>";
            		 html+="<td class='center '>"+JY.Object.notEmpty(l.title)+"</td>";
            		 html+="<td class='center'>"+JY.Date.Default(parseInt(l.updatetime))+"</td>";
            		 if(l.commentcount!="0"){
            			 html+="<td class='center '><a href='javascript:checkFormmakesure("+l.ids+")'>"+JY.Object.notEmpty(l.commentcount)+"条评论</a></td>";
            		 }else{
            			 html+="<td class='center ' ><font color='red'>暂无评论</font></td>";
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
	JY.Model.confirm("确认删除吗？",function(){	
		JY.Ajax.doRequest(null,jypath +'/backstage/square/del',{ids:ids},function(data){
			layer.msg(data.resMsg);search();
		});
	});
}

function edit(ids){
	cleanForm();
		JY.Ajax.doRequest(null,jypath +'/backstage/square/find',{ids:ids},function(data){
		    setForm(data);   
		    createselect(data.obj);
		    JY.Model.editwithsize("auDiv","修改",1000,800,function(){
		    	if(JY.Validate.form("auForm")){
					var that =$(this);
					 if($("#auForm textarea[name$='content']").val()==""){
						JY.Model.error("请填写文章内容");
						return false;
		    		 }
					var savePath=$("#savePath").val();
			        var array=savePath.split(",");
			        if(array.length>9){
			        	JY.Model.error("最多上传9张内容图片");
			        	return false;
			        }
					JY.Ajax.doRequest("auForm",jypath +'/backstage/square/update',null,function(data){
					    that.dialog("close");
					    layer.msg(data.resMsg);search();	
					});
				}	
		    });
		});
}

function cleanForm(){
	JY.Tags.d6cleanForm("auForm");
	$("#imagelist").empty();
	$("#auForm input[name$='homepagerecommend'][value='1']").parent("label").trigger("click");
	$("#auForm input[name$='orders']").val(1);
	$("#innerimg").attr("src",jypath +"/static/images/system/d6wait.png");
	$("#userid").removeAttr("disabled");
	//ue.setContent("");
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
////////////////////////////////////////////////////////////setFormmakesure////////////////////////////////////////////////////////////

function checkFormmakesure(ids){
	JY.Ajax.doRequest(null,jypath +'/backstage/comments/findByPage',{pageNum:1,pageSize:20,newsId:ids},function(data){
		setFormmakesure(data);
	   JY.Model.editwithsizeusermakesure("makesure","评论详情",1000,800); 
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
           		 html+="<td class='center'><label>"+l.ids+" <span class='lbl'></span></label></td>";
           		 html+="<td class='center '>"+JY.Object.notEmpty(l.memberName)+"</td>";
           		 html+="<td class='center '>"+JY.Date.Default(parseInt(l.createTime))+"</td>";
           		 html+="<td class='center '>"+JY.Object.notEmpty(l.content)+"</td>";
           		 html+="</tr>";		 
           	 } 
       		 $("#itemsTable tbody").append(html);
       	 }else{
       		html+="<tr><td colspan='4' class='center'>没有相关数据</td></tr>";
       		$("#itemsTable tbody").append(html);
       	 }	
}
////////////////////////////////////////////////////////////setForm////////////////////////////////////////////////////////////
function setForm(data){
	var l=data.obj;
	$("#userid").attr("disabled","disabled");
	$("#auForm input[name$='userid']").val(l.userid);
	$("#auForm input[name$='ids']").val(l.ids);
	$("#auForm input[name$='title']").val(JY.Object.notEmpty(l.title));
	$("#auForm input[name$='orders']").val(JY.Object.notEmpty(l.orders));
	$("#auForm input[name$='coverurl']").val(JY.Object.notEmpty(l.coverurl));
	$("#auForm input[name$='homepagerecommend'][value='"+(JY.Object.notNull(l.homepagerecommend)?l.homepagerecommend:"0")+"']").parent("label").trigger("click");
	
//	ue.addListener('ready',function(editor){
//		ue.setContent(JY.Object.notEmpty(l.content));
//	});
//	ue.setContent(JY.Object.notEmpty(l.content));
	
	$("#auForm textarea[name$='content']").val(JY.Object.notEmpty(l.content));
	
	$("#imagelist").empty();
	if(l.coverurl!=null&&l.coverurl!=""){
		var coverurlarray=l.coverurl.split(",");
		for(var i=0;i<coverurlarray.length;i++){
			$("#imagelist").append("<img  width='100' height='100' src='"+coverurlarray[i]+"' nodedelete='true' modal='zoomImg'/> ");
		}
	}
	
	$("#auForm input[name$='squarepics']").val(JY.Object.notEmpty(l.squarepics));
	
	if(l.squarepics==null||l.squarepics==""){
		$("#innerimg").attr("src",jypath +"/static/images/system/d6wait.png");
	}else{
		$("#innerimg").attr("src",l.squarepics);
	}
	
	batch();
}

function createselect(l){
	$("#squareSelect").empty();
	$("#squareSelect").append("<select  name='classesid' id='classesid' style='width:70%;'></select>");
	
	if(typeof(l)!="undefined"){
		$("#userid").val(l.name);
	}
	
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
