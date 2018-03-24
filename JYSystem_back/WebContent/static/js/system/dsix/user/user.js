$(function () {
	
//	$("#onlineflag").chosen(); 
	
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
		   if($("#password").val()!=null&&$("#password").val()!=""){
		    	 //var re =  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;  //判断字符串是否为数字和字母组合     //判断正整数 /^[1-9]+[0-9]*]*$/  
	   		     if ($("#password").val().length<6){
	   		    	JY.Model.error("密码应为6-16位");	
					return;
	   		     }
	    		
		    	if($("#surepassword").val()!=$("#password").val()){
					JY.Model.error("密码和确认密码不一致");	
					return;
				}
	    	}
		   
		   var val_payPlatform = $('#auForm input[name="guoneiguowai"]:checked ').val();
		   
		   if(val_payPlatform=="0"){
			   if($("#auForm input[name$='phone']").val().indexOf("-")==-1){
	   		    	JY.Model.error("请输入国外电话号码的区号，以-号分隔");	
					return;
			   }
		   }
		   
			 if(JY.Validate.form("auForm")){
				 var that =$(this);
				 JY.Ajax.doRequest("auForm",jypath +'/backstage/account/upuseradd',null,function(data){
				     that.dialog("close");      
				     layer.msg(data.resMsg);search();
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
		$("#baseForm input[name$='name']").val("");
		$("#baseForm input[name$='loginName']").val("");
		$("#baseForm input[name$='phone']").val("");
	});
	
	
});

function search(){
	$("#searchBtn").trigger("click");
	$('#reset').trigger("click");
}

function getbaseList(init){
	if(init==1)$("#baseForm .pageNum").val(1);	
	JY.Model.loading();
	JY.Ajax.doRequest("baseForm",jypath +'/backstage/account/userFindByPage',null,function(data){
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
            		 if(l.phone!=null&&l.phone.indexOf("-")!=-1){
            			 html+="<td class='center'><font color='red'>"+JY.Object.notEmpty(l.phone)+"</font></td>";
            		 }else{
            			 html+="<td class='center'>"+JY.Object.notEmpty(l.phone)+"</td>";
            		 }
            		 
            		 html+="<td class='center'>"+JY.Object.notEmpty(l.name)+"</td>";
            		 if(l.screen==1) html+="<td class='center'><span class='label label-sm label-success'>已认证</span></td>";
            		 else             html+="<td class='center'><span class='label label-sm arrowed-in'>未认证</span></td>";
            		 html+="<td class='center'>"+JY.Object.notEmpty(l.city)+"</td>";
            		 html+="<td class='center' >"+JY.Object.notEmpty(l.classesname)+"</td>";
            		 if(l.sex=="1"){
            			 html+="<td class='center'><font color='green'>男</font></td>";
            		 }
            		 else{
            			 html+="<td class='center'><font color='red'>女</font></td>";
            		 }
            		 
            		 html+="<td class='center' >"+l.createTime+"</td>";
            		 if(l.isValid=="1"){
            			 html+="<td class='center' >正常</td>";
            		 }
            		 else{
            			 html+="<td class='center' ><font color='blue'>禁用</font></td>";
            		 }
            			 
            		 html+=JY.Tags.setFunction(l.accountId,permitBtn);
            		 html+="</tr>";		 
            	 } 
        		 $("#baseTable tbody").append(html);
        		 JY.Page.setPage("baseForm","pageing",pageSize,pageNum,totalRecord,"getbaseList");
        	 }else{
        		html+="<tr><td colspan='10' class='center'>没有相关数据</td></tr>";
        		$("#baseTable tbody").append(html);
        		$("#pageing ul").empty();//清空分页
        	 }	
 	 
    	 JY.Model.loadingClose();
	 });
}

function del(accountId){
	if(accountId=='5'){
		 JY.Model.error("客服账号，不得删除");	
		 return;
	}
	JY.Model.confirm("确认删除吗？",function(){	
		JY.Ajax.doRequest(null,jypath +'/backstage/account/del',{accountId:accountId},function(data){
			layer.msg(data.resMsg);search();
		});
	});
}

function edit(ids){
	cleanForm();
		JY.Ajax.doRequest(null,jypath +'/backstage/account/find',{accountId:ids,roleId:"11"},function(data){
		    setForm(data);   
		    createselect(data.obj);
		    JY.Model.editwithsize("auDiv","修改",1000,800,function(){
		    	if(JY.Validate.form("auForm")){
					var that =$(this);
					
					if($("#password").val()!=null&&$("#password").val()!=""){
			    		//var re =  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;  //判断字符串是否为数字和字母组合     //判断正整数 /^[1-9]+[0-9]*]*$/  
						if ($("#password").val().length<6){
			   		    	JY.Model.error("密码应为6-16位");	
							return;
			   		     }
				    	if($("#surepassword").val()!=$("#password").val()){
							JY.Model.error("密码和确认密码不一致");	
							return;
						}
			    	}
					var val_payPlatform = $('#auForm input[name="guoneiguowai"]:checked ').val();
					   
					   if(val_payPlatform=="0"){
						   if($("#auForm input[name$='phone']").val().indexOf("-")==-1){
				   		    	JY.Model.error("请输入国外电话号码的区号，以-号分隔");	
								return;
						   }
					   }
					   
					JY.Ajax.doRequest("auForm",jypath +'/backstage/account/update',null,function(data){
					    that.dialog("close");
					    layer.msg(data.resMsg);search();	
					});
				}	
		    });
		});
}

////////////////////////////////////////////////////////////cleanForm////////////////////////////////////////////////////////////
function cleanForm(){
	JY.Tags.d6cleanForm("auForm");
	var Num="";
	for(var i=0;i<10;i++){
		Num+=Math.floor(Math.random()*10);
	}
	
	$("#auForm input[id$='loginName']").val(Num);
	$("#auForm input[name$='roleId']").val("11");
	$("#auForm input[name$='sex'][value='1']").parent("label").trigger("click");
	$("#auForm input[name$='isValid'][value='1']").parent("label").trigger("click");
	$("#auForm input[name$='screen'][value='0']").parent("label").trigger("click");
	$("#auForm input[name$='canpublishsquare'][value='1']").parent("label").trigger("click");
	$("#auForm input[name$='zizhuhoutai'][value='1']").parent("label").trigger("click");
	$("#auForm input[name$='guoneiguowai'][value='1']").parent("label").trigger("click");
	$("#innerimg").attr("src",jypath +"/static/images/system/d6upuser.png");
	batch();
}


////////////////////////////////////////////////////////////setForm////////////////////////////////////////////////////////////
function setForm(data){
	var l=data.obj;
	$("#auForm input[name$='accountId']").val(l.accountId);
	$("#auForm input[name$='phone']").val(l.phone);
	$("#auForm input[name$='loginName']").val(JY.Object.notEmpty(l.loginName));
	$("#auForm input[name$='name']").val(JY.Object.notEmpty(l.name));
	$("#auForm input[name$='email']").val(JY.Object.notEmpty(l.email));
	$("#auForm input[name$='xingquaihao']").val(JY.Object.notEmpty(l.xingquaihao));
	$("#auForm input[name$='zhiye']").val(JY.Object.notEmpty(l.zhiye));
	$("#auForm input[name$='city']").val(JY.Object.notEmpty(l.city));
	$("#auForm input[name$='nianling']").val(JY.Object.notEmpty(l.nianling));
	$("#auForm input[name$='shengao']").val(JY.Object.notEmpty(l.shengao));
	$("#auForm input[name$='tizhong']").val(JY.Object.notEmpty(l.tizhong));
	$("#auForm input[name$='xingzuo']").val(JY.Object.notEmpty(l.xingzuo));
	$("#auForm input[name$='gexingqianming']").val(JY.Object.notEmpty(l.gexingqianming));
	$("#auForm input[name$='ziwojieshao']").val(JY.Object.notEmpty(l.ziwojieshao));
	$("#auForm textarea[name$='duifangyaoqiu']").val(JY.Object.notEmpty(l.duifangyaoqiu));
	$("#auForm input[name$='picUrl']").val(JY.Object.notEmpty(l.picUrl));
	$("#auForm input[name$='zuojia']").val(JY.Object.notEmpty(l.zuojia));
	
	//$("#auForm input[name$='onlineflag'][value='"+(JY.Object.notNull(l.onlineflag)?l.onlineflag:"1")+"']").parent("label").trigger("click");
	$("#auForm input[name$='sex'][value='"+(JY.Object.notNull(l.sex)?l.sex:"0")+"']").parent("label").trigger("click");
	$("#auForm input[name$='isValid'][value='"+(JY.Object.notNull(l.isValid)?l.isValid:"0")+"']").parent("label").trigger("click");
	$("#auForm input[name$='screen'][value='"+(JY.Object.notNull(l.screen)?l.screen:"0")+"']").parent("label").trigger("click");
	$("#auForm input[name$='zizhuhoutai'][value='"+(JY.Object.notNull(l.zizhuhoutai)?l.zizhuhoutai:"0")+"']").parent("label").trigger("click");
	$("#auForm input[name$='guoneiguowai'][value='"+(JY.Object.notNull(l.guoneiguowai)?l.guoneiguowai:"1")+"']").parent("label").trigger("click");
	$("#auForm input[name$='canpublishsquare'][value='"+(JY.Object.notNull(l.canpublishsquare)?l.canpublishsquare:"0")+"']").parent("label").trigger("click");
	
	if(l.picUrl==null||l.picUrl==""){
		$("#innerimg").attr("src",jypath +"/static/images/system/d6upuser.png");
	}else{
		$("#innerimg").attr("src",l.picUrl);
	}
	batch();
}
////////////////////////////////////////////////////////////createselect////////////////////////////////////////////////////////////
function createselect(l){
	$("#userSelect").empty();
	$("#userSelect").append("<select  name='userclassesid' id='userclassesid' style='width:75%;'></select>");
	JY.Ajax.doRequest(null,jypath +'/backstage/userclasses/findauto',{sex:typeof(l)=="undefined"?1:l.sex},function(data){
		var reslist = data.obj; 
		var theselect=$("#userclassesid");
		for(var i=0; i<reslist.length; i++){ 
            var vo = reslist[i]; 
            if(typeof(l)=="undefined"){
            	theselect.append("<option value='" + vo.ids + "'>" + vo.classesname + "</option>");
            }else{
            	 if(vo.ids==l.userclassesid){
                 	theselect.append("<option value='" + vo.ids + "' selected='selected'>" + vo.classesname + "</option>");
                 }else{
                 	theselect.append("<option value='" + vo.ids + "'>" + vo.classesname + "</option>");
                 }
            }
        }
		theselect.chosen();
		theselect.trigger("liszt:updated");
	});
	
	$("#guoneidiqu").empty();
	$("#guoneidiqu").append("<select  name='userlookwhere' id='userlookwhere' multiple='multiple' style='width:65%;'></select> ");
	
	$("#guowaidiqu").empty();
	$("#guowaidiqu").append("<select  name='userhandlookwhere' id='userhandlookwhere' multiple='multiple' style='width:65%;'></select> ");
	
	
	if(typeof(l)!="undefined"&&l.userlookwhere!=null&&l.userlookwhere=="全部"){
		$("#gnquanbu").prop("checked", true);
	}
	else{
		$("#gnquanbu").prop("checked",false);
	}
	
	if(typeof(l)!="undefined"&&l.userhandlookwhere!=null&&l.userhandlookwhere=="全部"){
		$("#gwquanbu").prop("checked", true);
	}
	else{
		$("#gwquanbu").prop("checked",false);
	}
	
	JY.Ajax.doRequest(null,jypath +'/backstage/sysDict/findauto',{paramKey:0},function(data){
		var reslist = data.obj; 
		var theselect=$("#userlookwhere");
		for(var i=0; i<reslist.length; i++){ 
            var vo = reslist[i]; 
            if(typeof(l)=="undefined"){
            	theselect.append("<option value='" + vo.paramName + "'>" + vo.paramName + "</option>");
            }else{
            	if(l.userlookwhere!=null&&l.userlookwhere.indexOf(vo.paramName)>=0){
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
		var theselect=$("#userhandlookwhere");
		for(var i=0; i<reslist.length; i++){ 
            var vo = reslist[i]; 
            if(typeof(l)=="undefined"){
            	theselect.append("<option value='" + vo.paramName + "'>" + vo.paramName + "</option>");
            }else{
            	if(l.userhandlookwhere!=null&&l.userhandlookwhere.indexOf(vo.paramName)>=0){
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
