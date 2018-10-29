function showSuccess(content) {
        toastr.options = {
                "closeButton" : true,
                "debug" : false,
                "onclick" : null,
                "positionClass" : "toast-bottom-right",
                "showDuration" : "1000",
                "hideDuration" : "1000",
                "timeOut" : "5000",
                "extendedTimeOut" : "1000",
                "showEasing" : "swing",
                "hideEasing" : "linear",
                "showMethod" : "fadeIn",
                "hideMethod" : "fadeOut"
        };
        toastr.success(content, "成功提示");
}

function showError(content) {
        toastr.options = {
                "closeButton" : true,
                "debug" : false,
                "positionClass" : "toast-bottom-right",
                "onclick" : null,
                "showDuration" : "1000",
                "hideDuration" : "1000",
                "timeOut" : "5000",
                "extendedTimeOut" : "1000",
                "showEasing" : "swing",
                "hideEasing" : "linear",
                "showMethod" : "fadeIn",
                "hideMethod" : "fadeOut"
        };
        toastr.error(content, "错误提示");
}

function deployjob(sb) {
    var sb = $.getUrlVar("sb");
    var env = $("#select_env").val();
    var msg = "确认部署："+sb
    //if (confirm(msg)==true){
        currentAjax = $.ajax({
            url : "/AutoPublishedSystem/createReleaseInstance/",
            type : "GET",
            contentType : "application/x-www-form-urlencoded; charset=utf-8",
            data : {
                "sb" : sb,
                "env" : env,
                },
            beforeSend : function(XMLHttpRequest) {
            },
            success : function(data, textStatus) {
            //console.log(data.success);
                if (data.success == 'ok') {
                    showSuccess("创建Job成功");
                } else {
                    showError("创建失败");
                }
            },
            complete : function(XMLHttpRequest, textStatus) {
                location.reload();
                //setTimeout("reload()", 2000);
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(" textStatus : " + textStatus);
             }
            });
}

function viewjobinfo(sb) {
    var sb = $.getUrlVar("sb");
    currentAjax = $
        .ajax({
            url:"/AutoPublishedSystem/viewjob/",
            type:"GET",
            contentType:"application/x-www-form-urlencoded; charset=utf-8",
            data:{
                "sb":sb
            },
            beforeSend:function (XMLHttpRequest) {
            },
            success:function (content,textStatus) {
                alert(content.info)
            },
            complete:function (XMLHttpRequest,textStatus) {
            },
            error:function (XMLHttpRequest,textStatus) {
                console.log("Ajax异常信息: " + XMLHttpRequest.responseText + " textStatus : " + textStatus);
            }
        });
}

function isNull(msg){
	if (msg=="" || msg==null || msg==undefined){
		msg = ""
	}
	return msg
}

function showdeploy(sb) {
    var sb = $.getUrlVar("sb");
    $.ajax({
        url: "/AutoPublishedSystem/show_deploy_model/",
        type: "GET",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            "sb":sb
        },
        beforeSend: function (XMLHttpRequest) {
        },
        success: function (content, textStatus) {
            var env_list = content.env;
            var env_row = '<div class="form-group"><label>选择环境</label><select id="select_env">';
            for(var env in env_list) {
                env_row += '<option value="' + env_list[env] + '">' + env_list[env] + '</option>';
            };
            env_row += '</select></div></form>';

            var row = env_row;
            $("#add_deploy_table").html(row);
            $("#showenvModel").modal();
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function (XMLHttpRequest, textStatus) {
            console.log("Ajax异常信息: " + XMLHttpRequest.responseText + " textStatus : " + textStatus);
        }
    });
}
