let Veiculo = function (unidade) {

    this.Params = unidade;

    this.Adicionar = function (info, Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'insert',
                fields: info,
                from: 'condominio.veiculos',
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
                from: 'condominio.veiculos',
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
                from: 'condominio.veiculos',
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

    this.Info = function (origem, id, Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'select',
                fields: '*',
                from: origem,
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

    this.Transferir = function (info, Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'update',
                fields: {
                    foto1: info.foto
                },
                from: 'condominio.veiculos',
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

    this.Listar = function (origem, Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'select',
                fields: 'num,modelo,placa,cor',
                from: origem,
                where: 'unidade='+unidade.pk_unidade,
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

    this.ListarPassagem = function (criterios, Callback) {

        webservice.Request({
            process: 'condominio.pesquisa_passagem_veiculo',
            params: JSON.stringify(criterios)
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback(null);
                return;
            }

            Callback(webservice.PreparaLista('pesquisa_passagem_veiculo',http.response));

        });
    }

};