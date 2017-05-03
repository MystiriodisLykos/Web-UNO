// Generated by CoffeeScript 1.12.4
(function() {
  var app, blue, ca, cardHeight, cardWidth, clearStage, drawHand, end, game, getCheck, getName, green, input, join, listDict, nameCount, nameStyle, pickColor, playerName, readyToPlay, red, scale, server, start, welcome, wild, ws_scheme, yellow;

  if (window.location.protocol === 'https:') {
    ws_scheme = 'wss://';
  } else {
    ws_scheme = 'ws://';
  }

  server = new ReconnectingWebSocket(ws_scheme + location.host + "/server");

  app = new PIXI.Application(window.innerWidth - 25, window.innerHeight - 25, {
    backgroundColor: 0x1099bb
  });

  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

  ca = [];

  listDict = {};

  start = 1;

  end = 9;

  nameCount = 0;

  scale = 0.2;

  cardWidth = 586;

  cardHeight = 878;

  red = blue = green = yellow = pickColor = input = join = playerName = '';

  nameStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 24,
    wordwrap: true
  });

  document.body.appendChild(app.view);

  window.ready = function(e) {
    welcome();
  };

  window.onresize = function(e) {
    var h, w;
    w = window.innerWidth - 25;
    h = window.innerHeight - 25;
    app.view.style.width = w + 'px';
    app.view.style.height = h + 'px';
    renderer.resize(w, y);
  };

  readyToPlay = function() {
    var check, ready;
    ready = PIXI.Sprite.fromImage('../static/assets/buttons/ready.png');
    ready.anchor.set(.5);
    ready.scale.x = ready.scale.y *= .04;
    ready.x = (window.innerWidth / 2) - 180;
    ready.y = (window.innerHeight / 2) + 55;
    ready.interactive = true;
    ready.buttonMode = true;
    app.stage.addChild(ready);
    ready.on('pointerdown', function() {
      var message;
      message = JSON.stringify({
        name: playerName,
        type: 'ready',
        data: ''
      });
      server.send(message);
    });
    check = new PIXI.Text("Click check mark when ready", nameStyle);
    check.x = (window.innerWidth / 2) - 555;
    check.y = (window.innerHeight / 2) + 25;
    app.stage.addChild(check);
    app.stage.removeChild(join);
  };

  welcome = function() {
    var border, boxStyle, nameHere, playas, welcStyle, welcomePageHead;
    welcStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 100,
      fontWeight: 'bold',
      fill: ['#ffe702', '#ff130a'],
      stroke: '#121000',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6
    });
    boxStyle = new PIXI.TextStyle({
      fontFamily: 'Comic Sans MS',
      fontSize: 30
    });
    join = PIXI.Sprite.fromImage('../static/assets/buttons/join.png');
    join.anchor.set(.5);
    join.scale.x = join.scale.y *= .35;
    join.x = (window.innerWidth / 2) - 55;
    join.y = (window.innerHeight / 2) - 32.5;
    join.interactive = true;
    join.buttonMode = true;
    join.on('pointerdown', function() {
      var message;
      playerName = input.text;
      message = JSON.stringify({
        name: playerName,
        type: 'add',
        data: ''
      });
      return server.send(message);
    });
    app.stage.addChild(join);
    border = PIXI.Sprite.fromImage('../static/assets/buttons/border.png');
    border.anchor.set(.5);
    border.scale.x = border.scale.y *= .45;
    border.x = (window.innerWidth / 2) + 400;
    border.y = (window.innerHeight / 2) + 40;
    app.stage.addChild(border);
    welcomePageHead = new PIXI.Text("Welcome to UNO!", welcStyle);
    welcomePageHead.x = (window.innerWidth / 2) - 610;
    welcomePageHead.y = (window.innerHeight / 2) - 300;
    app.stage.addChild(welcomePageHead);
    nameHere = new PIXI.Text("Enter your username:", nameStyle);
    nameHere.x = (window.innerWidth / 2) - 575;
    nameHere.y = (window.innerHeight / 2) - 45;
    app.stage.addChild(nameHere);
    playas = new PIXI.Text("PLAYERS", boxStyle);
    playas.x = (window.innerWidth / 2) + 340;
    playas.y = (window.innerHeight / 2) - 190;
    app.stage.addChild(playas);
    input = new PixiTextInput();
    input.width = 150;
    input.height = 40;
    input.position.x = (window.innerWidth / 2) - 315;
    input.position.y = (window.innerHeight / 2) - 53;
    input.text = "Name";
    app.stage.addChild(input);
  };

  game = function() {
    var faceDown, leftArr, noplay, rightArr, style, style1, ubutt, unableToPlay, welcomeToUno;
    clearStage();
    style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 11,
      wordWrap: true,
      wordWrapWidth: 75
    });
    style1 = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 100,
      fontWeight: 'bold',
      fill: ['#ffe702', '#ff130a'],
      stroke: '#121000',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6
    });
    leftArr = PIXI.Sprite.fromImage('../static/assets/buttons/leftArrow.png');
    leftArr.anchor.set(.5);
    leftArr.scale.x = leftArr.scale.y = scale;
    leftArr.x = (window.innerWidth / 2) - 290;
    leftArr.y = (window.innerHeight / 2) + 150;
    leftArr.interactive = true;
    leftArr.buttonMode = true;
    leftArr.on('pointerdown', function() {
      if (end !== ca.length - 1) {
        start++;
        end++;
      }
    });
    app.stage.addChild(leftArr);
    rightArr = PIXI.Sprite.fromImage('../static/assets/buttons/rightArrow.png');
    rightArr.anchor.set(.5);
    rightArr.scale.x = rightArr.scale.y = scale;
    rightArr.x = (window.innerWidth / 2) + 385;
    rightArr.y = (window.innerHeight / 2) + 150;
    rightArr.interactive = true;
    rightArr.buttonMode = true;
    rightArr.on('pointerdown', function() {
      if (start !== 0) {
        start--;
        end--;
      }
    });
    app.stage.addChild(rightArr);
    ubutt = PIXI.Sprite.fromImage('../static/assets/buttons/ubutton.png');
    ubutt.anchor.set(.5);
    ubutt.scale.x = ubutt.scale.y = scale;
    ubutt.x = (window.innerWidth / 2) - 420;
    ubutt.y = (window.innerHeight / 2) + 150;
    ubutt.interactive = true;
    ubutt.buttonMode = true;
    ubutt.on('pointerdown', function() {});
    app.stage.addChild(ubutt);
    noplay = PIXI.Sprite.fromImage('../static/assets/buttons/no.png');
    noplay.anchor.set(.5);
    noplay.scale.x = noplay.scale.y = scale;
    noplay.x = (window.innerWidth / 2) - 575;
    noplay.y = (window.innerHeight / 2) + 150;
    noplay.interactive = true;
    noplay.buttonMode = true;
    noplay.on('pointerdown', function() {});
    app.stage.addChild(noplay);
    unableToPlay = new PIXI.Text("Click red button if you do not have a card to play", style);
    unableToPlay.x = (window.innerWidth / 2) - 610;
    unableToPlay.y = (window.innerHeight / 2) + 175;
    app.stage.addChild(unableToPlay);
    welcomeToUno = new PIXI.Text("Let's Play UNO!!!", style1);
    welcomeToUno.x = (window.innerWidth / 2) - 500;
    welcomeToUno.y = window.innerHeight - 650;
    app.stage.addChild(welcomeToUno);
    faceDown = PIXI.Sprite.fromImage('../static/assets/cards/face_down.png');
    faceDown.anchor.set(.5);
    faceDown.scale.x = faceDown.scale.y = scale;
    faceDown.x = (window.innerWidth / 2) - 75;
    faceDown.y = (window.innerHeight / 2) - 75;
    app.stage.addChild(faceDown);
    drawHand();
  };

  drawHand = function() {
    var card, cardO, cardStr, i, index, len, offset, starter;
    for (index = i = 0, len = ca.length; i < len; index = ++i) {
      cardO = ca[index];
      if (index <= end && index >= start) {
        index -= start;
        offset = 5 - index;
        starter = '../static/assets/cards/';
        cardStr = starter + cardO.color + "_" + cardO.value + ".png";
        card = PIXI.Sprite.fromImage(cardO);
        card.anchor.set(.5);
        card.y = 500;
        card.x = app.renderer.width / 2;
        card.x += (cardWidth * scale / 2) * offset;
        card.scale.x = card.scale.y = scale;
        card.interactive = true;
        card.buttonMode = true;
        card.name = cardStr;
        card.on('pointerdown', function() {
          if (this.name.indexOf('wild') !== -1) {
            wild();
          }
        });
        app.stage.addChild(card);
      }
    }
  };

  wild = function() {
    var click;
    click = function() {
      app.stage.removeChild(red);
      app.stage.removeChild(blue);
      app.stage.removeChild(green);
      app.stage.removeChild(yellow);
      app.stage.removeChild(pickColor);
    };
    red = PIXI.Sprite.fromImage('../static/assets/colors/radam.png');
    red.scale.x = red.scale.y = scale;
    red.anchor.set(.5);
    red.x = (window.innerWidth / 2) - 450;
    red.y = (window.innerHeight / 2) - 100;
    red.interactive = true;
    red.buttonMode = true;
    red.on('pointerdown', click);
    app.stage.addChild(red);
    blue = PIXI.Sprite.fromImage('../static/assets/colors/blue.png');
    blue.scale.x = blue.scale.y = scale;
    blue.anchor.set(.5);
    blue.x = (window.innerWidth / 2) - 350;
    blue.y = (window.innerHeight / 2) - 100;
    blue.interactive = true;
    blue.buttonMode = true;
    blue.on('pointerdown', click);
    app.stage.addChild(blue);
    yellow = PIXI.Sprite.fromImage('../static/assets/colors/yellow.png');
    yellow.scale.x = yellow.scale.y = scale;
    yellow.anchor.set(.5);
    yellow.x = (window.innerWidth / 2) - 450;
    yellow.y = window.innerHeight / 2;
    yellow.interactive = true;
    yellow.buttonMode = true;
    yellow.on('pointerdown', click);
    app.stage.addChild(yellow);
    green = PIXI.Sprite.fromImage('../static/assets/colors/grain.png');
    green.scale.x = green.scale.y = scale;
    green.anchor.set(.5);
    green.x = (window.innerWidth / 2) - 350;
    green.y = window.innerHeight / 2;
    green.interactive = true;
    green.buttonMode = true;
    green.on('pointerdown', click);
    app.stage.addChild(green);
    pickColor = new PIXI.Text("Choose a color:", nameStyle);
    pickColor = new PIXI.Text("Choose a color:", nameStyle);
    pickColor.x = (window.innerWidth / 2) - 490;
    pickColor.y = (window.innerHeight / 2) - 180;
    app.stage.addChild(pickColor);
  };

  clearStage = function() {
    var child, i, len, ref;
    ref = app.stage.children;
    for (i = 0, len = ref.length; i < len; i++) {
      child = ref[i];
      app.stage.removeChild(child);
    }
  };

  getName = function(Pname) {
    var listName;
    listDict[Pname] = nameCount;
    nameCount++;
    listName = new PIXI.Text(Pname, nameStyle);
    listName.x = window.innerWidth / 2 + 300;
    listName.y = window.innerHeight / 2 + ((75 * nameCount) - 200);
    app.stage.addChild(listName);
  };

  getCheck = function(Pname) {
    var number, ready;
    number = listDict[Pname];
    ready = PIXI.Sprite.fromImage('../static/assets/buttons/ready.png');
    ready.scale.x = ready.scale.y = scale * .25;
    ready.x = window.innerWidth / 2 + 300 + 100;
    ready.y = window.innerHeight / 2 + ((75 * number) - 200);
    app.stage.addChild(ready);
  };

  server.onmessage = function(message) {
    message = JSON.parse(message.data);
    console.log(message);
    switch (message.type) {
      case 'welcome':
        if (!(message.data in listDict)) {
          getName(message.data);
          readyToPlay();
        }
        break;
      case 'ready':
        getCheck(message.data);
        break;
      case 'start':
        clearStage();
        clearStage();
        clearStage();
        clearStage();
        game();
        break;
      case 'error':
        console.log('error');
        break;
      case 'give':
        ca.push(message.data);
        break;
      case 'uno':
        console.log('uno');
        break;
      case 'turn':
        console.log('turn');
        break;
      case 'gg':
        console.log('gg');
        break;
      default:
        console.log('unknown response');
    }
  };

}).call(this);

//# sourceMappingURL=application.js.map
