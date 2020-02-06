$(function() {
	  var client = ZAFClient.init();
    client.invoke('resize', { width: '100%', height:'500px' });
    client.get('ticket.requester').then((data) => {
      console.log(data);
      if (!jQuery.isEmptyObject(data['errors'])) return ticket.errors;

      let userJson = data['ticket.requester'];
      constructUserIdentities(userJson['identities']);
      constructOtherDetails(userJson);
      initializeJqueryEvents();
      $('#user_name').html(userJson['name']);
      $('#user_photo').attr('src', userJson['avatarUrl']);
      $('#details_loading').hide();
      $('#user_details').show();
    }).then(errors => {
      console.log(errors);
	});
});

const constructOtherDetails = (userDetails) =>{
  
  const otherDetails = [{
    'id': 20001,
    'type': 'Company',
    'value': 'ShoeLala',
  },{
    'id': 20002,
    'type': 'Position',
    'value': 'Secretary',
  },{
    'id' : 20003,
    'type': 'Country',
    'value': 'United Kingdom',
  },{
    'id' : 20004,
    'type': 'Gender',
    'value': 'Female',
  },{
    'id': 20005,
    'type': 'Access',
    'value' : 'Can view and edit own tickets only'
  }];

  const ticketDetails = [{
    'id': 30001,
    'type': 'New Tickets',
    'value': '2',
  },{
    'id': 30002,
    'type': 'Closed Tickets',
    'value': '525',
  },{
    'id' : 30003,
    'type': 'Unassigned Tickets',
    'value': '5',
  },{
    'id' : 30004,
    'type': 'Suspended Tickets',
    'value': '1',
  },{
    'id' : 30005,
    'type': 'Total Tickets Sent',
    'value': '533',
  }];

  userDetails.otherDetails = otherDetails;
  userDetails.userTicketDetails = ticketDetails;
  let user = {"user" : userDetails};
  var source = $("#requester-template").html();
  var template = Handlebars.compile(source);
  var html = template(user);
  $("#content").html(html);

}

const constructUserIdentities=(userIdentities) =>{
  
  userIdentities.forEach(element => {
    switch (element.type){
      case 'email':
        element.type = 'Email';
        break;
      case 'phone_number':
        element.type = 'Phone';
        break;
      case 'twitter':
        element.type = 'Twitter';
        break;
      case 'facebook':
          element.type = 'Facebook';
          break;
      }
  });
  
  userIdentities.push({
    'id': 100001,
    'type': 'Mobile',
    'value': '+44 7911 123456',
  },{
    'id': 100002,
    'type': 'Landline',
    'value': '(020) 4124 4412',
  },{
    'id' : 100003,
    'type': 'Address',
    'value': '443 Oxford Street London, England',
  });

  let identities = { 'identities': userIdentities};
  let source = $("#requester-identities").html();
  let template = Handlebars.compile(source);
  let html = template(identities);
  $("#identities").html(html);
}

const initializeJqueryEvents=()=>{

  $(".identityValue").click(function() {
    $('#textToCopy').val($(this).html());
    copyToClipboard();
  });

  $(".identityValue").hover(function(){
    $(this).css("background-color", "rgb(206, 226, 242)");
    }, function(){
    $(this).css("background-color", "transparent");
    $(this).tooltip('hide');
  });

  $(".identityValue").tooltip({
    trigger: 'click'
  })

}

const copyToClipboard = () =>{
	var copyText = document.getElementById("textToCopy");
  $(copyText).show();
  copyText.select();
  document.execCommand("copy");
  $(copyText).hide();
}

