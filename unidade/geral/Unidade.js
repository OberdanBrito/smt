let Unidade = function (unidade) {

    this.Params = unidade;

    this.Adicionar = function (info, Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'insert',
                fields: info,
                from: 'condominio.unidades',
                returning: 'num'
            })
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback();
                return;
            }

            Callback(webservice.PreparaLista('query',http.response)[0]);
        });


    };

    this.Editar = function (info, Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'update',
                fields: info,
                from: 'condominio.unidades',
                where: 'num='+info.id,
                returning: 'num'
            })
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback();
                return;
            }

            Callback(true);
        });

    };

    this.Remover = function (id, Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'delete',
                from: 'condominio.unidades',
                where: 'num='+id,
                returning: 'num'
            })
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback();
                return;
            }
            Callback(id);

        });

    };

    this.Info = function (id, Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'select',
                fields: '*',
                from: 'condominio.unidade_info',
                where: 'num='+id
            })
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback();
                return;
            }

            Callback(webservice.PreparaLista('query',http.response)[0]);

        });
    };

    this.Listar = function (id, Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'select',
                fields: 'num,nome,nascimento',
                from: 'condominio.unidades',
                order: 'num'
            })
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback(null);
                return;
            }

            Callback(webservice.PreparaLista('query',http.response));

        });
    };

};