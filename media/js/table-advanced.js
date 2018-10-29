$(document).ready(function() {

	console.log("TableAdvanced.init();");
	TableAdvanced.init();

});


var TableAdvanced = function() {

	var initTable1 = function() {

		/* Formating function for row details */
		function fnFormatDetails(oTable, nTr) {
			var sb_id = $.getUrlVar("sb_id");
			var aData = oTable.fnGetData(nTr);
			var rid = aData[1];
			var reviewStatusId = $("#reviewStatusId_"+rid).val();
			var deployStatusId = $("#deployStatusId_"+rid).val();
			var buildStatusId = $("#buildStatusId_"+rid).val();
			var continueToRelease=$("#continueToRelease").val();
			var role=$("#current_business_"+sb_id).val();
			var sOut = '<table width="100%">';
			if(reviewStatusId!=7&&buildStatusId==3&&role!=1){
				sOut += '<tr><td>发布者: </td><td>' + aData[7] + '</td><td><button type="button" id="btn_QAReview" data-toggle="modal" data-target="#remarkModal" class="btn green" onclick="reviewReleasByQA('+rid+')"><i class="icon-ok"></i>QA批准</button></td></tr>';
			}
			if(reviewStatusId!=1&&deployStatusId==1){
				sOut += '<tr><td>发布版本号:</td><td>' + aData[3] + '</td><td><button type="button" id="btn_deploy" class="btn blue" onclick="deployReleaseFilter('+rid+',false)"><i class="icon-ok"></i>部署</button></td.</tr>';
			}
			if(reviewStatusId!=1&&deployStatusId==4){
				sOut += '<tr><td>发布版本号:</td><td>' + aData[3] + '</td><td><button type="button" id="btn_deploy" class="btn blue" onclick="deployReleaseFilter('+rid+',true)"><i class="icon-ok"></i>回滚</button></td.</tr>';
			}
			if(continueToRelease=='True'){
				sOut += '<tr><td>发布版本号:</td><td>' + aData[3] + '</td><td><button type="button" id="btn_deploy" class="btn blue" onclick="deployReleaseFilter('+rid+',false)"><i class="icon-ok"></i>部署剩余</button></td.</tr>';
			}
			if(deployStatusId!=4&&role!=1){
				sOut += '<tr><td>发布状态:</td><td>' + aData[6] + '</td><td><button type="button" class="btn red" onclick="deleteReleaseInstance('+rid+')" >删除</button></td></tr>';
			}
			sOut += '<tr><td>创建者:</td><td>'+aData[2]+'</td><td><button type="button" class="btn yellow" onclick="goToDetailPage('+rid+')" >查看详细</button></td></tr>';
			sOut += '</table>';
			
			return sOut;
		}

		/*
		 * Insert a 'details' column to the table
		 */
		var nCloneTh = document.createElement('th');
		var nCloneTd = document.createElement('td');
		nCloneTd.innerHTML = '<span class="row-details row-details-close"></span>';

		$('#sample_1 thead tr').each(function() {
			this.insertBefore(nCloneTh, this.childNodes[0]);
		});

		$('#sample_1 tbody tr').each(function() {
			this.insertBefore(nCloneTd.cloneNode(true), this.childNodes[0]);
		});

		/*
		 * Initialse DataTables, with no sorting on the 'details' column
		 */
		var oTable = $('#sample_1').dataTable({
			"aoColumnDefs" : [ {
				"bSortable" : false,
				"aTargets" : [ 0 ]
			} ],
			"aaSorting" : [ [ 11, 'desc' ] ],
			"aLengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] // change
																		// per
																		// page
																		// values
																		// here
			],
			// set the initial value
			"iDisplayLength" : 10,
		});

		jQuery('#sample_1_wrapper .dataTables_filter input').addClass(
				"m-wrap small"); // modify table search input
		jQuery('#sample_1_wrapper .dataTables_length select').addClass(
				"m-wrap small"); // modify table per page dropdown
		//jQuery('#sample_1_wrapper .dataTables_length select').select2(); // initialzie
																			// select2
																			// dropdown

		/*
		 * Add event listener for opening and closing details Note that the
		 * indicator for showing which row is open is not controlled by
		 * DataTables, rather it is done here
		 */
		$('#sample_1').on(
				'click',
				' tbody td .row-details',
				function() {
					var nTr = $(this).parents('tr')[0];
					if (oTable.fnIsOpen(nTr)) {
						/* This row is already open - close it */
						$(this).addClass("row-details-close").removeClass(
								"row-details-open");
						oTable.fnClose(nTr);
						console.log("test open detail");
					} else {
						/* Open this row */
						$(this).addClass("row-details-open").removeClass("row-details-close");
						oTable.fnOpen(nTr, fnFormatDetails(oTable, nTr),'details');
					}
				});
	}


	return {
		// main function to initiate the module
		init : function() {

			if (!jQuery().dataTable) {
				return;
			}

			initTable1();
		}

	};

}();