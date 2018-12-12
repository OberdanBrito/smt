let Categorias = function () {

    this.Listar = function(Callback) {


        if (sessionStorage.categorias !== undefined) {
            Callback(webservice.PreparaLista('query',sessionStorage.categorias));
            return;
        }

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'select',
                fields: '*',
                from: 'controldesk.atendimento_categoria',
                order: 'id'
            })
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback(null);
                return;
            }

            sessionStorage.categorias = http.response;
            Callback(webservice.PreparaLista('query',sessionStorage.categorias));
        });

    }
};