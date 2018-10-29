var FormWizard = function() {

	return {
		// main function to initiate the module
		init : function() {
			if (!jQuery().bootstrapWizard) {
				return;
			}

			function format(state) {
				if (!state.id)
					return state.text; // optgroup
				return "<img class='flag' src='assets/img/flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;"	+ state.text;
			}

			$("#ap_version").select2({
				placeholder : "Select",
				allowClear : true,
				formatResult : format,
				formatSelection : format,
				escapeMarkup : function(m) {
					return m;
				}
			});

			var form = $('#submit_form');
			var error = $('.alert-error', form);
			var success = $('.alert-success', form);

			var displayConfirm = function() {
			}

			// default form wizard
			$('#form_wizard_1').bootstrapWizard({
					'nextSelector' : '.button-next',
					'previousSelector' : '.button-previous',
					onTabClick : function(tab, navigation, index) {
//									 alert('on tab click disabled');
						return false;
					},
					onNext : function(tab, navigation, index) {
						success.hide();
						error.hide();

						if (form.valid() == false) {
							return false;
						}

						var total = navigation.find('li').length;
						var current = index + 1;
						// set wizard title
						$('.step-title', $('#form_wizard_1')).text('Step ' + (index + 1) + ' of ' + total);
						// set done steps
						jQuery('li', $('#form_wizard_1')).removeClass("done");
						var li_list = navigation.find('li');
						for (var i = 0; i < index; i++) {
							jQuery(li_list[i]).addClass("done");
						}
						
						if(current == 2){
							//在第一步 点击下一步的时候 需要存储部署的数据
							saveUpgradeData();
						}
						if(current == 3){
							//在第二步 点击下一步的时候 需要存储部署的数据
							submitWangJianConfig();
						}
						
						if (current == 1) {
							$('#form_wizard_1').find('.button-previous').hide();
						} else {
							$('#form_wizard_1').find('.button-previous').show();
						}

						if (current >= total) {
							$('#form_wizard_1').find('.button-next').hide();
							$('#form_wizard_1').find('.button-submit').show();
							displayConfirm();
						} else {
							$('#form_wizard_1').find('.button-next').show();
							$('#form_wizard_1').find('.button-submit').hide();
						}
						App.scrollTo($('.page-title'));
					},
					onPrevious : function(tab, navigation, index) {
						success.hide();
						error.hide();

						var total = navigation.find('li').length;
						var current = index + 1;
						// set wizard title
						$('.step-title', $('#form_wizard_1')).text('Step ' + (index + 1) + ' of ' + total);
						// set done steps
						jQuery('li', $('#form_wizard_1')).removeClass("done");
						var li_list = navigation.find('li');
						for (var i = 0; i < index; i++) {
							jQuery(li_list[i]).addClass("done");
						}

						if (current == 1) {
							$('#form_wizard_1').find('.button-previous').hide();
						} else {
							$('#form_wizard_1').find('.button-previous').show();
						}

						if (current >= total) {
							$('#form_wizard_1').find('.button-next').hide();
							$('#form_wizard_1').find('.button-submit').show();
						} else {
							$('#form_wizard_1').find('.button-next').show();
							$('#form_wizard_1').find('.button-submit').hide();
						}

						App.scrollTo($('.page-title'));
					},
					onTabShow : function(tab, navigation, index) {
						var total = navigation.find('li').length;
						var current = index + 1;
						var $percent = (current / total) * 100;
						$('#form_wizard_1 div[name=ap_config_step_bar]').find('.bar').css({width : $percent + '%'});
					}
				});

			$('#form_wizard_1').find('.button-previous').hide();
			$('#form_wizard_1 .button-submit').click(function() {
				
				var confirm = window.confirm("确认进行网监配置推送？");
				if(confirm){
					$('#form_wizard_1 .button-submit').hide();
					createApReleaseInstance();
				}
			}).hide();
		}

	};

}();