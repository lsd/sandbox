$(document).foundation();
    $(document).ready(function() {
      //mac address input - client side validation
      var $devMAC = $('.wListDev.custom input.MACAddress');
      var select = $('.wListDev.custom .custom.dropdown');
      var devName = $('.wListDev.custom input.deviceName');
      var success = $('.addSuccess');
      var fail = $('.addSuccess');

      //creating var showDD to replace show() as it breaks custom dropdown css
      var showDD = function() { $(select).css('display','block'); };

      // Shakes field left to right if input error
      var quake = function(element, speed, wiggle) {
        var $moves = $([35, 25, 15, 5, 0]);
        $moves.each(function(x) {
          $(element).animate({left: x * wiggle, opacity: 1.0}, speed).stop()
                    .animate({left: -x * wiggle, opacity: 1.0}, speed);
        });
      };

      //checks for correct MAC address syntax
      var regex = /^([0-9A-F]{2}[-:]){5}([0-9A-F]{2})$/; //not in use - maskedinput.js already setting input restrictions
      var pass = function() {
        if ($('#customDropdown').val() == 'device not defined') {
          console.log('user did not choose label');
          quake(select, 200, 1.0);
          return false;
        } else {
          var flow = $('#customDropdown').val() !== 'device not defined';
          if (true == flow) { 
            $('.wListDev.custom .custom.dropdown').hide();
            $('.wListDev.custom input.deviceName').show();
          }
        }
      };

      $(select).hide();
      $(devName).hide();
      //$(success).hide();

      //activates mask plugin which forces user input into mac address format
      $('.wListDev input.MACAddress').mask("**:**:**:**:**:**",
        { completed: function() {
            $('.wListDev input.MACAddress').hide();
            showDD();
            pass();
          }
        }
      );

      $('.addDev').click(function() {
        if ($devMAC.val().length == 0) {
          quake($devMAC.closest('div'), 40, 1.25);
          $devMAC.addClass('error').keyup(function(event) {
            if ($(this).val().length) {
              if ($(this).hasClass('error')) {
                $(this).removeClass('error');
              }
            }
          });

          setTimeout(function() { $('input').focus(); }, 1000);
          return false;
        }
        pass();
      });

      //orbit tabs
      var $tab = $('.tab');
      var pos = 'activeTab';
      var neg = 'inactiveTab';

      $tab.click(function() {
        if ($tab.hasClass(pos)) {
          $tab.removeClass(pos).addClass(neg);
        } 
        if ($tab.hasClass(neg)) {
          $(this).removeClass(neg).addClass(pos);
        }
      });

      var editDev1 = $('.editDevice1 .editDev');
      var editDev2 = $('.editDevice2 .editDev');
      var editDev3 = $('.editDevice3 .editDev');
      var editDev4 = $('.editDevice4 .editDev');
      var editDev5 = $('.editDevice5 .editDev');
      var removeDev1 = $('.editDevice1 .removeDev');
      var removeDev2 = $('.editDevice2 .removeDev');
      var removeDev3 = $('.editDevice3 .removeDev');
      var removeDev4 = $('.editDevice4 .removeDev');
      var removeDev5 = $('.editDevice5 .removeDev');

      var deviceRemoval = function() {
        $(removeDev1).click(function() {
          $('.device1').addClass('remove');
          return false;
        });
        $(removeDev2).click(function() {
          $('.device2').addClass('remove');
          return false;
        });
        $(removeDev3).click(function() {
          $('.device3').addClass('remove');
          return false;
        });
        $(removeDev4).click(function() {
          $('.device4').addClass('remove');
          return false;
        });
        $(removeDev5).click(function() {
          $('.device5').addClass('remove');
          return false;
        });
      };
      deviceRemoval();

      var deviceUpdate = function() {
        var fields = new Array('1','2','3','4','5');
        var validate = function() {
          $(fields).each(function(x, f) {
            $('.dev' + f + 'MAC').keyup(function(event) {
              if ($(this).val().length) {
                if ($(this).hasClass('error')) {
                  $(this).removeClass('error');
                }
              }
            });

            $('.dev' + f + 'Label').keyup(function(event) {
              if ($(this).val().length) {
                if ($(this).hasClass('error')) {
                  $(this).removeClass('error');
                }
              }
            });

            $('.dev' + f + 'Name').keyup(function(event) {
              if ($(this).val().length) {
                if ($(this).hasClass('error')) {
                  $(this).removeClass('error');
                }
              }
            });
          });
        };

        $(editDev1).click(function() {
          var valid = true;
          $(fields).each(function(x, f) {
            var field = '.dev' + f + 'MAC';
            if ($(MACField).val().length == 0) {
              if (!$(MACField).hasClass('error')) {
                $(MACField).addClass("error");
                setTimeout(function() {
                  $(MACField).focus();
                }, 1000);
              }
              return false;
            }
          });
        });
        validate();
      };
      deviceUpdate();

    });



           /*
          if ($('#customDropdown').val() == 'device not defined') {
            console.log('user did not choose label');
            quake();
            return false;
          } else {
            $(select).hide();
            $(devName).show();
            if ($(devName).val() == '') {
              console.log('user did not choose name');
              $(devName).addClass('error');
              $(devName).keyup(function(event) {
                if ($(this).val().length) {
                  if ($(this).hasClass('error')) {
                    $(this).removeClass('error');
                  }
                }
              });
              setTimeout(function() {
                $(devName).focus();
              }, 1000);
              return false;
            } else {
              $(devName).hide();
              $(devMAC).show();
              //ajax post to backend
              $('.wListDev')[0].reset();
              $(success).show(300);
              setTimeout(function() {
                $(success).hide(300);
                }, 4000);
                return false;
            }
          };
          */ 
