Foto = function() {

    let ultimaimagem, form, win;

    this.Exibir = function () {

        win = new dhtmlXWindows();
        let winfoto = win.createWindow('obterfoto', 0, 0, 780, 340);

        winfoto.setText('Obter foto');
        winfoto.denyResize();
        winfoto.centerOnScreen();
        winfoto.button('park').hide();
        winfoto.button('minmax1').hide();

        form = winfoto.attachForm([
            { type: "settings", labelAlign: "left", inputHeight: "18", offsetLeft: "4", offsetTop: "8", position: "label-top"},
            { type: "block", list: [
                {type: "container", name: "displayfoto", inputWidth: 300, inputHeight: 225},
                {type: "newcolumn"},
                {type: "container", name: "fotocadastro", inputWidth: 300, inputHeight: 225},
                {type: "newcolumn"},
                {type: "button", name: "obter", value: "Obter foto"},
                {type: "button", name: "confirmar", value: "Confirmar"}
            ]}
        ]);

        form.getContainer('displayfoto').innerHTML = "<video class='foto' autoplay='autoplay' id='localVideo'>";

        let video = document.querySelector("#localVideo");

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({video: true})
                .then(function (stream) {
                    video.srcObject = stream;
                })
                .catch(function (err) {
                    console.log(err);
                });
        }

        form.attachEvent("onButtonClick", function (name) {
            if (name === 'obter') {
                obterImagem();
            } else if (name === 'confirmar') {
                createeventConfirmarFoto();
            }
        });
    };
    
    this.AoConfirmarFoto = function (callback) {
        window.addEventListener('FotoConfirmada', function (e) {
            callback(e.detail);
        });
    };

    function createeventConfirmarFoto() {
        let evt = new CustomEvent('FotoConfirmada', {detail: ultimaimagem});
        window.dispatchEvent(evt);
        win.window('obterfoto').close();
    }

    function obterImagem() {

        var video = document.getElementById('localVideo');
        var canvas = document.createElement('canvas');
        var ratio = 400 / video.videoHeight;

        canvas.width = ratio * video.videoWidth;
        canvas.height = 400;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, canvas.width, canvas.height);
        ultimaimagem = canvas.toDataURL("image/png;base64;charset=utf-8");

        var fotocadastro = form.getContainer("fotocadastro");
        if (fotocadastro != null)
            fotocadastro.innerHTML = '<img class="foto" src="' + ultimaimagem + '">';

    }
    
};