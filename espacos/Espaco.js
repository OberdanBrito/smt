class Espaco {

    Info(id, Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'select',
                fields: '*',
                from: 'espacos.cadastro',
                where: 'id=' + id
            })
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback(null);
                return;
            }

            Callback(webservice.PreparaLista('query', http.response));
        });

    };

    Listar(Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'select',
                fields: 'id,nome,localizacao',
                from: 'espacos.cadastro',
                order: 'id'
            })
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback(null);
                return;
            }

            Callback(webservice.PreparaGrid('query', http.response));
        });

    };

    Adicionar(dados, Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'insert',
                fields: dados,
                from: 'espacos.cadastro',
                returning: 'id'
            })
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback(null);
                return;
            }

            Callback(webservice.PreparaLista('query', http.response));
        });

    };

    Editar(dados, Callback) {

        let params = JSON.stringify({
            command: 'update',
            fields: dados,
            from: 'espacos.cadastro',
            where: 'id=' + dados.id,
            returning: 'id'
        });

        console.debug(params);

        webservice.Request({
            process: 'query',
            params: params
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback(null);
                return;
            }

            Callback(webservice.PreparaLista('query', http.response));
        });

    };

    Remover(id, Callback) {

        dhtmlx.confirm({
            type: "confirm-warning",
            title: "Atenção",
            text: "Você confirma a exclusão deste registro?",
            ok: "Sim", cancel: "Não",
            callback: function (result) {

                if (result !== true)
                    return;

                let params = JSON.stringify({
                    command: 'delete',
                    from: 'espacos.cadastro',
                    where: 'id=' + id,
                    returning: 'id'
                });

                console.debug(params);

                webservice.Request({
                    process: 'query',
                    params: params
                }, function (http) {

                    if (http.response === 'null' || http.response === 'false') {
                        Callback(null);
                        return;
                    }

                    Callback(webservice.PreparaLista('query', http.response));
                });
            }
        });
    };

}