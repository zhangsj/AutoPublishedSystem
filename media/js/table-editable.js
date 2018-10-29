var TableEditable = function () {
    return {
        //main function to initiate the module
        init: function (areaIdList) {
            function retrieveMacData(sSource, aoData, fnCallback){
            	$.ajax( {     
                    type: "POST",      
                    //contentType: "application/json",   //这段代码不要加，我时延的是否后台会接受不到数据  
                    url: sSource,   
                    dataType:"json",  
                    data:{
                    	"jsonparam":JSON.stringify(aoData),
                    	"areaIds[]": areaIdList
                    	
                    }, //以json格式传递(struts2后台还是以string类型接受),year和month直接作为参数传递。  
                	beforeSend : function(XMLHttpRequest) {
                		$('#form_wizard_1').find('.button-next').hide();
            		},
                    success: function(data) {   
                       
                        fnCallback(data); //服务器端返回的对象的returnObject部分是要求的格式     
                    },
                    complete : function(XMLHttpRequest, textStatus) {
                    	$('#form_wizard_1').find('.button-next').show();
            		}
                });   
            } 
            
            var oTable = $('#sample_editable_1').dataTable({
                "aoColumns": [ //这个属性下的设置会应用到所有列，按顺序没有是空
                               {"mData": 'mac'}, //mData 表示发请求时候本列的列明，返回的数据中相同下标名字的数据会填充到这一列
                               {"mData": 'brandName'},
                               {"mData": 'shopName'},
                               {"mData": 'province'},
                               {"mData": 'city'},
                               {"mData": 'area'},
                               //{"sDefaultContent": ''}, // sDefaultContent 如果这一列不需要填充数据用这个属性，值可以不写，起占位作用
                              // {"sDefaultContent": '', "sClass": "action"},//sClass 表示给本列加class
                           ],
           		"fnServerData":retrieveMacData,
        		"sAjaxSource" : "/AutoPublishedSystem/findMacByAreaId",
        		"bDestroy": true,
                "aLengthMenu": [
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"] // change per page values here
                ],
                // set the initial value
                "iDisplayLength": 5,
                "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
                "sPaginationType": "bootstrap",
                "oLanguage": {
                    "sLengthMenu": "_MENU_ records per page",
                    "oPaginate": {
                        "sPrevious": "Prev",
                        "sNext": "Next"
                    }
                },
                "aoColumnDefs": [{
                        'bSortable': false,
                        'aTargets': [0]
                    }
                ]
            });

        }

    };

}();

var TableLocalData = function () {
    return {
        //main function to initiate the module
        init: function (macData) {
        	console.log(macData);
            var oTable = $('#sample_editable_1').dataTable({
                "aaData":macData,
                "aoColumns": [ //这个属性下的设置会应用到所有列，按顺序没有是空
                               {"mData": 'mac'}, //mData 表示发请求时候本列的列明，返回的数据中相同下标名字的数据会填充到这一列
                               {"mData": 'brandName'},
                               {"mData": 'shopName'},
                               {"mData": 'province'},
                               {"mData": 'city'},
                               {"mData": 'area'},
                               //{"sDefaultContent": ''}, // sDefaultContent 如果这一列不需要填充数据用这个属性，值可以不写，起占位作用
                              // {"sDefaultContent": '', "sClass": "action"},//sClass 表示给本列加class
                           ],
        		"bDestroy": true,
                "aLengthMenu": [
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"] // change per page values here
                ],
                // set the initial value
                "iDisplayLength": 5,
                "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
                "sPaginationType": "bootstrap",
                "oLanguage": {
                    "sLengthMenu": "_MENU_ records per page",
                    "oPaginate": {
                        "sPrevious": "Prev",
                        "sNext": "Next"
                    }
                },
               
            });

        }

    };

}();



var TableConfirmData = function () {
    return {
        //main function to initiate the module
        init: function (shopData) {
        	console.log(shopData);
        	 var oTable = $('#ap_upgrade_confirm_table').dataTable({
                 "aaData":shopData,
 				"aoColumns": [ //这个属性下的设置会应用到所有列，按顺序没有是空
 				   
 				   {"mData": 'brandName'},//mData 表示发请求时候本列的列明，返回的数据中相同下标名字的数据会填充到这一列
 				   {"mData": 'shopName'},
 				   {"mData": 'province'},
 				   {"mData": 'city'},
 				   {"mData": 'area'},
 				   {"mData": 'macNums'},
 				   {"mData": 'shopId'},
 				   {"mData": 'businessId'},
 				],
         		"bDestroy": true,
                 "aLengthMenu": [
                     [5, 15, 20, -1],
                     [5, 15, 20, "All"] // change per page values here
                 ],
                 // set the initial value
                 "iDisplayLength": 5,
                 "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
                 "sPaginationType": "bootstrap",
                 "oLanguage": {
                     "sLengthMenu": "_MENU_ records per page",
                     "oPaginate": {
                         "sPrevious": "Prev",
                         "sNext": "Next"
                     }
                 },
                
             });

        }

    };

}();


