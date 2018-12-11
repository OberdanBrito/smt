class Espaco {

    get Itens() {
        return Espaco._itens;
    }

    Info(id, Callback) {

        Espaco._itens = new EspacoItens(id);

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
                fields: '*',
                from: 'espacos.lista_espacos',
                order: 'id'
            })
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback(null);
                return;
            }

            Callback(webservice.PreparaLista('query', http.response));
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

class EspacoItens {

    constructor(espaco) {
        EspacoItens._espaco = espaco;
    }

    Info(id, Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'select',
                fields: '*',
                from: 'espacos.itens',
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
                fields: 'id,nome,quantidade,observacoes',
                from: 'espacos.itens',
                where: 'espaco='+EspacoItens._espaco,
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
                from: 'espacos.itens',
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
            from: 'espacos.itens',
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

    Remover(Callback) {

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
                    from: 'espacos.itens',
                    where: 'id=' + EspacoItens._espaco,
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