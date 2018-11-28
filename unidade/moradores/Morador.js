let Morador = function (webservice) {

    this.Adicionar = function (info, Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'insert',
                fields: info,
                from: 'condominio.moradores',
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
                from: 'condominio.moradores',
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
                from: 'condominio.moradores',
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
                from: 'condominio.moradores_info',
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

    this.AtualizaFoto = function (info, Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'update',
                fields: {
                    foto1: info.foto
                },
                from: 'condominio.moradores',
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

    this.AtivarAcessos = function (info, Callback) {

        webservice.Request({
            process: 'condominio.ativa_registro',
            params: JSON.stringify({
                'bloco': info.bloco,
                'unidade': info.pk_unidade,
                'registro': info.id
            })
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback();
                return;
            }
            Callback(true);

        });

    };

    this.Listar = function (id, Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'select',
                fields: 'num,nome,nascimento',
                from: 'condominio.moradores_info',
                where: 'unidade='+id,
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