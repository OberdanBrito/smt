let Cliente = function () {

    this.Listar = function(Callback) {


        if (sessionStorage.cliente !== undefined) {
            Callback(webservice.PreparaLista('query',sessionStorage.cliente));
            return;
        }

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'select',
                fields: '*',
                from: 'controldesk.cliente',
                order: 'id'
            })
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback(null);
                return;
            }

            sessionStorage.cliente = http.response;
            Callback(webservice.PreparaLista('query',sessionStorage.cliente));
        });

    }
};