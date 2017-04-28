// Generated by CoffeeScript 1.12.4
(function() {
  var name, server, ws_scheme;

  if (window.location.protocol === 'https:') {
    ws_scheme = 'wss://';
  } else {
    ws_scheme = 'ws://';
  }

  server = new ReconnectingWebSocket(ws_scheme + location.host + "/server");

  name = '';

  server.onmessage = function(message) {
    message = JSON.parse(message.data);
    console.out(message);
    if (message.type === 'welcome') {
      $('#ready').css('display', 'inline');
    }
    if (message.type === 'start') {
      $('#ready').css('display', 'none');
      $('#draw').css('display', 'inline');
    }
  };

  $('#ready').click(function(e) {
    var data, message, type;
    e.preventDefault();
    type = 'ready';
    data = '';
    message = JSON.stringify({
      name: name,
      type: type,
      data: data
    });
    console.log(message);
    server.send(message);
  });

  $('#draw').click(function(e) {
    var data, message, type;
    e.preventDefault();
    type = 'draw';
    data = '';
    message = JSON.stringify({
      name: name,
      type: type,
      data: data
    });
    console.log(message);
    server.send(message);
  });

  $('#enter').on('submit', function(e) {
    var data, message, type;
    e.preventDefault();
    if ($('#name')[0].value !== '') {
      name = $('#name')[0].value;
      type = 'add';
      data = '';
      message = JSON.stringify({
        name: name,
        type: type,
        data: data
      });
      console.log(message);
      server.send(message);
    }
  });

}).call(this);

//# sourceMappingURL=test.js.map
