$(function() {
	initAPReleaseInstance();
});

function initAPReleaseInstance() {
	currentAjax = $.ajax({
		url : '/AutoPublishedSystem/viewAPReleaseInstance',
		data : {

		},
		type : "GET",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		beforeSend : function(XMLHttpRequest) {
			// $("#content").empty();
		},
		success : function(content, textStatus) {
			$("#release_ap_content").html(content);
		},
		complete : function(XMLHttpRequest, textStatus) {
			initTable2();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Ajax异常信息: " + XMLHttpRequest.responseText
					+ " textStatus : " + textStatus);
			if (XMLHttpRequest.status == 400) {

			} else if (XMLHttpRequest.status == 500) {

			} else if (textStatus != "abort") {

			}
		}
	});

}
$("#ap_releaseInstanceView").on("click", function() {
	initAPReleaseInstance();
});

$("#ap_create_releaseInstance")
		.on(
				"click",
				function() {
					currentAjax = $
							.ajax({
								url : '/AutoPublishedSystem/viewCreateAPReleaseInstance',
								data : {

								},
								type : "GET",
								contentType : "application/x-www-form-urlencoded; charset=utf-8",
								beforeSend : function(XMLHttpRequest) {
									// $("#content").empty();
								},
								success : function(content, textStatus) {
									$("#release_ap_content").html(content);
								},
								complete : function(XMLHttpRequest, textStatus) {
									FormWizard.init();
									
									// 初始化子选项卡事件
									initTabEnvent();
									
									// 初始化网监配置页面表单元素
									handleUniform();

									// 初始化文件上传框
									initFileUploader();
								},
								error : function(XMLHttpRequest, textStatus,
										errorThrown) {
									console.log("Ajax异常信息: "
											+ XMLHttpRequest.responseText
											+ " textStatus : " + textStatus);
									if (XMLHttpRequest.status == 400) {

									} else if (XMLHttpRequest.status == 500) {

									} else if (textStatus != "abort") {

									}
								}
							});

				});

//初始化详细面板
function initReleaseInstanceViewDetail(_releaseInstancId){
	if(_releaseInstancId==null){
		_data={}
	}else{
		$("#ap_releaseInstanceView").removeClass("active");
		$("#ap_releaseInstanceViewDetail").addClass("active");
		_data={"releaseInstanceId" : _releaseInstancId}
	}
	currentAjax = $
	.ajax({
		url : '/AutoPublishedSystem/viewReleaseInstanceDetail',
		data : _data,
		type : "GET",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		beforeSend : function(XMLHttpRequest) {
			// $("#content").empty();
		},
		success : function(content, textStatus) {
			$("#release_ap_content").html(content);
		},
		complete : function(XMLHttpRequest, textStatus) {
			$("#release_shop_table").dataTable();
			$("#release_mac_table").dataTable();
		},
		error : function(XMLHttpRequest, textStatus,
				errorThrown) {
			console.log("Ajax异常信息: "
					+ XMLHttpRequest.responseText
					+ " textStatus : " + textStatus);
			if (XMLHttpRequest.status == 400) {

			} else if (XMLHttpRequest.status == 500) {

			} else if (textStatus != "abort") {

			}
		}
	});
}

//释放页面锁
function releaseTheLock(){
	var flag = window.confirm("警告！确定释放该页面锁，你将不能进行创建发布单操作！");
	if(flag){
		currentAjax = $
		.ajax({
			url : '/AutoPublishedSystem/releaseTheLock',
			type : "GET",
			contentType : "application/x-www-form-urlencoded; charset=utf-8",
			beforeSend : function(XMLHttpRequest) {
				// $("#content").empty();
			},
			success : function(content, textStatus) {
				$("#release_ap_content").html(content);
			},
			complete : function(XMLHttpRequest, textStatus) {
				
			},
			error : function(XMLHttpRequest, textStatus,
					errorThrown) {
				console.log("Ajax异常信息: "
						+ XMLHttpRequest.responseText
						+ " textStatus : " + textStatus);
				if (XMLHttpRequest.status == 400) {

				} else if (XMLHttpRequest.status == 500) {

				} else if (textStatus != "abort") {

				}
			}
		});
	}
	
}

$("#ap_releaseInstanceViewDetail").on("click",	function() {
	initReleaseInstanceViewDetail(null);
});

/** *通过省份ID查询区域* */
function findAreaByProvinceId(_cityid) {
	currentAjax = $.ajax({
		url : '/AutoPublishedSystem/findAreaByProvinceId',
		data : {
			cityid : _cityid
		},
		type : "GET",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		beforeSend : function(XMLHttpRequest) {
			// $("#content").empty();
		},
		success : function(data, textStatus) {
			console.log(data);
			areaCheckbox = "";
			for (areaIndex in data.areaList) {
				var areaObj = data.areaList[areaIndex]
				areaCheckbox += '<label class="checkbox">'
						+ '<input type="checkbox" value="'+areaObj.areaid+'" />' + areaObj.area
						+ '</label>'

			}
			$("#div_area_" + _cityid).html(areaCheckbox);

		},
		complete : function(XMLHttpRequest, textStatus) {
			// 初始化checkbox
			$("#div_area_" +  _cityid +" input[type=checkbox]").on("change",function(){
				console.log("------------------------");
				area_list = []
				$("#div_area_" +  _cityid +" .checked input[type=checkbox]").each(function(index,element){
					var area_id = $(this).val();
					console.log("area_id: "+area_id);
					
// area_list["areaIds[" + index + "]"] = area_id;
					
					area_list[index] = area_id;
					 
				});
				console.log(area_list);
				TableEditable.init(area_list);
			})
			handleUniform();

		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Ajax异常信息: " + XMLHttpRequest.responseText
					+ " textStatus : " + textStatus);
			if (XMLHttpRequest.status == 400) {

			} else if (XMLHttpRequest.status == 500) {

			} else if (textStatus != "abort") {

			}
		}
	});
}

/* 配置管理--上传文件 */
function initFileUploader() {
	var fileuploader;
	var count = 0;
	fileuploader = $('#fileupload').fileupload(
					{
						url : "/AutoPublishedSystem/uploadMacFile",// 文件上传地址，当然也可以直接写在input的data-url属性内
						type : "POST",
						dataType : "json",// 数据类型
						formData : {},
						options : {
							fileInput : $('input#fileupload'),
							uploadedBytes : false,
							singleFileUploads : false,
							uploadedBytes : 5000000,
							limitMultiFileUploads : 1
						},
						// 传递pool_code
						add : function(e, data) {
							$('#form_wizard_1').find('.button-next').hide();
							// 通过上传按钮上传
							$('input#fileupload').attr('disabled', "true");
							
							$("#upload_mac_file_name").text(data.files[0].name);
							$("#upload_mac_file_size").text(data.files[0].size/1000 + "KB");
							
							$('button#upload_start').click(function() {
										var result = window.confirm("确定上传文件："	+ data.files[0].name + "?");
										if (result) {
											console.log("开始上传.");
											// 禁用上传按钮
											$('button#upload_start').attr('disabled', "true");
											data.submit();// 上传文件
										} else {
											console.log("已取消上传.");
										}
									});
							
							// 取消上传--重新生成
							$('button#upload_cancel').click(function() {
// 停止
								data.abort();
							});
						},
						done : function(e, data) {
							// 启用上传按钮
							$('button#upload_start').removeAttr("disabled");
							$.each(data.files,function(index, file) {
								if (data.result["result"]) {
									$('div#upload_progress').removeClass("progress-bar-danger");
									$('div#upload_progress').addClass("progress-bar-success");
									$("div#uploadfile_result").html("<br/><span class='alert alert-success'>文件:"	+ file.name	+ "上传成功.消息:" + data.result['message']	+ "</div>");
									$("input#uploadfile_path").val(data.result);
								} else {
									$('div#upload_progress').removeClass("progress-bar-success");
									$('div#upload_progress').addClass("progress-bar-danger");
									$("div#uploadfile_result").html("<div class='alert alert-warning'>文件:" + file.name + "上传失败.<strong>失败信息:</strong>" + data.result['message'] + "</div>");
								}
// $('input#fileupload').removeAttr("disabled");
							});
							// 初始化表格数据
							// 为啥没数据？格式问题！！！！！！！！！
							TableLocalData.init(JSON.parse(data.result['dataTable']));
							
							$('#form_wizard_1').find('.button-next').show();
						},
						stop : function(e, data) {
							
							showSuccess("上传文件完成了");
						},
						fail : function(e, data) {
							// 错误提示
							$('div#upload_progress').removeClass("progress-bar-success");
							$('div#upload_progress').addClass("progress-bar-danger");
							$('div#upload_progress').html("上传失败");
							$("div#uploadfile_result").html(data.textStatus + "=====>" + data.errorThrown);
							$("div#uploadfile_result").html("<br/><div class='alert alert-warning'>" + data.textStatus + "=====>" + data.errorThrown + "</div>");
							// 启用上传按钮
// $('button#upload_start').removeAttr("disabled");
// $('input#fileupload').removeAttr("disabled");
						},
						progressall : function(e, data) {
							// 进度条
							var progress = parseInt(data.loaded / data.total * 100, 10);
							$('div#upload_progress').css('width', progress + '%');
							$('div#upload_progress').html(progress + '%');
						},

					})
}

/**
 * 当点击下一步 进入第二步的时候 提交升级的Mac数据，触发升级的数据保存
 */
function saveUpgradeData(){
	
	currentAjax = $.ajax({
		url : '/AutoPublishedSystem/saveUpgradeData',
		type : "POST",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		beforeSend : function(XMLHttpRequest) {
			// $("#content").empty();
		},
		success : function(data, textStatus) {
			console.log(data);
			TableConfirmData.init(data.macUpgradeLists);
		},
		complete : function(XMLHttpRequest, textStatus) {
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Ajax异常信息: " + XMLHttpRequest.responseText
					+ " textStatus : " + textStatus);
			if (XMLHttpRequest.status == 400) {

			} else if (XMLHttpRequest.status == 500) {

			} else if (textStatus != "abort") {

			}
		}
	});
}


/**
 * 当点击下一步 进入第三步 也就是最后一步提交的时候 提交表单数据，网监配置
 */
function submitWangJianConfig(){
	// 智能开关
	var _intelligent_switch = getRadioValue("intelligent_switch");
	// 网监同步类型
	var _wangjian_type = $("#wangjian_type").val();
	// 网监服务器地址
	var _wangjian_host_server = $("#wangjian_host_server").val();
	// 网监服务器端口
	var _wangjian_host_port = $("#wangjian_host_port").val();
	// 无线探针开关
	var _wireless_probed = getRadioValue("wireless_probed");
	// 终端嗅探上报开关
	var _terminal_sniffer = getRadioValue("terminal_sniffer");
	// IP-PORT映射
	var _ip_port_map = getRadioValue("ip_port_map");

	// 新增参数 嗅探服务器
	var _sniffer_server = $("#sniffer_server").val();
	// 新增参数 嗅探服务器端口
	var _sniffer_port = $("#sniffer_port").val();
	// 新增参数 嗅探上报路径
	var _sniffer_path = $("#sniffer_path").val();
	// 新增参数 嗅探上报间隔
	var _sniffer_interval = $("#sniffer_interval").val();
	// 新增参数 嗅探上报auth信息
	var _sniffer_auth = $("#sniffer_auth").val();
	
	currentAjax = $.ajax({
		url : '/AutoPublishedSystem/saveWangJianConfig',
		data : {
			intelligent_switch : _intelligent_switch,
			wangjian_type : _wangjian_type,
			wangjian_host_server : _wangjian_host_server,
			wangjian_host_port : _wangjian_host_port,
			wireless_probed : _wireless_probed,
			terminal_sniffer : _terminal_sniffer,
			ip_port_map : _ip_port_map,
			sniffer_server : _sniffer_server,
			sniffer_port : _sniffer_port,
			sniffer_path : _sniffer_path,
			sniffer_interval : _sniffer_interval,
			sniffer_auth : _sniffer_auth
			
		},
		type : "POST",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		beforeSend : function(XMLHttpRequest) {
			// $("#content").empty();
		},
		success : function(data, textStatus) {
			console.log(data);

		},
		complete : function(XMLHttpRequest, textStatus) {

		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Ajax异常信息: " + XMLHttpRequest.responseText
					+ " textStatus : " + textStatus);
			if (XMLHttpRequest.status == 400) {

			} else if (XMLHttpRequest.status == 500) {

			} else if (textStatus != "abort") {

			}
		}
	});
}

/**
 * 当确认时 创建一个发布单
 */
function createApReleaseInstance(){
	
	currentAjax = $.ajax({
		url : '/AutoPublishedSystem/createApReleaseInstance',
		data : {
			
		},
		type : "POST",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		beforeSend : function(XMLHttpRequest) {
			// $("#content").empty();
		},
		success : function(data, textStatus) {
			console.log(data);
			if(data.result){
				showSuccess(data.message);
			}else{
				showError("推送失败！异常信息："+data.message);
			}
		},
		complete : function(XMLHttpRequest, textStatus) {
			window.location.reload();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Ajax异常信息: " + XMLHttpRequest.responseText
					+ " textStatus : " + textStatus);
			if (XMLHttpRequest.status == 400) {

			} else if (XMLHttpRequest.status == 500) {

			} else if (textStatus != "abort") {

			}
		}
	});
}

function getRadioValue(radioName){
	var result = null;
	$("input[name="+radioName+"]").each(function(){
		if($(this).parent().hasClass("checked")){
			result = $(this).val();
		}
	});
	return result;
}


var initTable2 = function() {
	var oTable = $('#releaseInstance_table').dataTable({
//		"aoColumnDefs" : [ {
//			"aTargets" : [ 0 ]
//		} ],
		"aaSorting" : [ [ 0, 'desc' ] ],
		"aLengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] // change
		// per page
		// values
		// here
		],
		// set the initial value
		"iDisplayLength" : 5,
	});

	jQuery('#sample_2_wrapper .dataTables_filter input').addClass(
			"m-wrap small"); // modify table search input
	jQuery('#sample_2_wrapper .dataTables_length select').addClass(
			"m-wrap small"); // modify table per page dropdown
	jQuery('#sample_2_wrapper .dataTables_length select').select2(); // initialzie
	// select2
	// dropdown

	$('#sample_2_column_toggler input[type="checkbox"]').change(function() {
		/*
		 * Get the DataTables object again - this is not a recreation, just a
		 * get of the object
		 */
		var iCol = parseInt($(this).attr("data-column"));
		var bVis = oTable.fnSettings().aoColumns[iCol].bVisible;
		oTable.fnSetColumnVis(iCol, (bVis ? false : true));
	});
}

var initTabEnvent = function() {
	
	//为什么要隐藏 下一步按钮？为防止还未从数据库读取出 需要升级的mac地址，用户则已经进入下一步误操作
	//显示：当完全加载好datatable的数据
	$('#form_wizard_1').find('.button-next').hide();
	
	$("#category_ul li").on("click", function() {

		var activeLi = $("#category_ul .active");
		activeLi.removeClass("active");
		$("#" + activeLi.attr("name")).removeClass("active")

		$(this).addClass("active");
		var tab_div_id = $(this).attr("name");
		console.log(tab_div_id);
		$("#" + tab_div_id).addClass("active");

	});

	$("#category_district_ul li").on("click", function() {

		var activeLi = $("#category_district_ul .active");
		activeLi.removeClass("active");
		$("#" + activeLi.attr("name")).removeClass("active")

		$(this).addClass("active");
		var tab_div_id = $(this).attr("name");
		console.log(tab_div_id);
		$("#" + tab_div_id).addClass("active");

	});

	$("#category_province_ul li").on("click", function() {

		var activeLi = $("#category_province_ul .active");
		activeLi.removeClass("active");
		$("#" + activeLi.attr("name")).removeClass("active")

		$(this).addClass("active");
		var tab_div_id = $(this).attr("name");
		console.log(tab_div_id);
		$("#" + tab_div_id).addClass("active");

	});
	
	$("#category_wangjian_ul li").on("click", function() {

		var activeLi = $("#category_wangjian_ul .active");
		activeLi.removeClass("active");
		$("#" + activeLi.attr("name")).removeClass("active")

		$(this).addClass("active");
		var tab_div_id = $(this).attr("name");
		console.log(tab_div_id);
		$("#" + tab_div_id).addClass("active");

	});
	

	$("#category_city_ul li").on("click", function() {

		var activeLi = $("#category_city_ul .active");
		activeLi.removeClass("active");
		$("#" + activeLi.attr("name")).removeClass("active")

		$(this).addClass("active");
		var tab_div_id = $(this).attr("name");
		console.log(tab_div_id);
		$("#" + tab_div_id).addClass("active");

		li_name = $(this).attr("name");
		var _cityid = li_name.split("_")[2];
		findAreaByProvinceId(_cityid);
	});

};

/*类型八配置隐藏配置栏*/
function show_option(value) {
	var eight_select = $("#eight_option");
	var config_option = $("#config_option");
	if (value == "8"){
		eight_select.show();
		config_option.show();
		excelupload();
	}else {
		eight_select.hide();
		config_option.hide();
	}
}


/* 类型八配置管理--上传excel文件 */
function excelupload() {
	var fileuploader;
	var count = 0;
	fileuploader = $('#excelupload').fileupload(
		{
			url: "/AutoPublishedSystem/uploadexcelFile",
			type: "POST",
			dataType: "json",// 数据类型
			formData: {},
			options: {
				fileInput: $('input#excelupload'),
				uploadedBytes: false,
				singleFileUploads: false,
				uploadedBytes: 5000000,
				limitMultiFileUploads: 1
			},
			// 传递pool_code
			add: function (e, data) {
				$('#form_wizard_1').find('.button-next').hide();
				// 通过上传按钮上传
				$('input#excelupload').attr('disabled', "true");

				$("#upload_config_file_name").text(data.files[0].name);
				$("#upload_config_file_size").text(data.files[0].size / 1000 + "KB");

				$('button#start_upload').click(function () {
					var result = window.confirm("确定上传文件：" + data.files[0].name + "?");
					if (result) {
						console.log("开始上传.");
						// 禁用上传按钮
						$('button#start_upload').attr('disabled', "true");
						data.submit();// 上传文件
					} else {
						console.log("已取消上传.");
					}
				});

				// 取消上传--重新生成
				$('button#cancel_upload').click(function () {
// 停止
					data.abort();
				});
			},
			done: function (e, data) {
				// 启用上传按钮
				$('button#start_upload').removeAttr("disabled");
				$.each(data.files, function (index, file) {
					if (data.result["result"]) {
						$('div#upload__file_progress').removeClass("progress-bar-danger");
						$('div#upload__file_progress').addClass("progress-bar-success");
						$("div#excelupload_result").html("<br/><span class='alert alert-success'>文件:" + file.name + "上传成功.消息:" + data.result['message'] + "</div>");
						$("input#uploadfile_path").val(data.result);
					} else {
						$('div#upload__file_progress').removeClass("progress-bar-success");
						$('div#upload__file_progress').addClass("progress-bar-danger");
						$("div#excelupload_result").html("<div class='alert alert-warning'>文件:" + file.name + "上传失败.<strong>失败信息:</strong>" + data.result['message'] + "</div>");
					}
				});
				showConfigure();
				$('#form_wizard_1').find('.button-next').show();
			},
			stop: function (e, data) {

				showSuccess("上传文件完成");
			},
			fail: function (e, data) {
				// 错误提示
				$('div#upload__file_progress').removeClass("progress-bar-success");
				$('div#upload__file_progress').addClass("progress-bar-danger");
				$('div#upload__file_progress').html("上传失败");
				$("div#excelupload_result").html(data.textStatus + "=====>" + data.errorThrown);
				$("div#excelupload_result").html("<br/><div class='alert alert-warning'>" + data.textStatus + "=====>" + data.errorThrown + "</div>");
				// 启用上传按钮
			},
			progressall: function (e, data) {
				// 进度条
				var progress = parseInt(data.loaded / data.total * 100, 10);
				$('div#upload__file_progress').css('width', progress + '%');
				$('div#upload__file_progress').html(progress + '%');
			},

		})
}


function showConfigure(){
	currentAjax = $.ajax({
		url : '/AutoPublishedSystem/showConfigure',
		data : {
		},
		type : "GET",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		beforeSend : function(XMLHttpRequest) {
		},
		success : function(content, textStatus) {
			$("#reviewconfig").html(content);
		},
		complete : function(XMLHttpRequest, textStatus) {
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Ajax异常信息: " + XMLHttpRequest.responseText
					+ " textStatus : " + textStatus);
			if (XMLHttpRequest.status == 400) {

			} else if (XMLHttpRequest.status == 500) {

			} else if (textStatus != "abort") {

			}
		}
	});
}

function handleClick(sniffer_Radio) {
	if (sniffer_Radio == 1){
		$("#sniffer_options").show();
	}else {
		$("#sniffer_options").hide();
	}
}