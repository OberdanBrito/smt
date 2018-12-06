class Inventario {

    static Setor() {
        return new InventarioSetores();
    }

    static Situacao() {
        return new InventarioSituacao();
    }

    Info(id, Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'select',
                fields: '*',
                from: 'inventario.cadastro',
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
                from: 'inventario.lista_inventario',
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
                from: 'inventario.cadastro',
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
            from: 'inventario.cadastro',
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

                webservice.Request({
                    process: 'query',
                    params: JSON.stringify({
                        command: 'delete',
                        from: 'inventario.cadastro',
                        where: 'id=' + id,
                        returning: 'id'
                    })
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

class InventarioSituacao {

    Listar(Callback) {


        if (sessionStorage.inventario_situacao !== undefined) {
            Callback(webservice.PreparaLista('query',sessionStorage.inventario_situacao));
            return;
        }

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'select',
                fields: '*',
                from: 'inventario.situacao',
                order: 'id'
            })
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback(null);
                return;
            }

            sessionStorage.inventario_situacao = http.response;
            Callback(webservice.PreparaLista('query',sessionStorage.inventario_situacao));
        });

    }

}
class InventarioSetores {

    Listar(Callback) {


        if (sessionStorage.inventario_setores !== undefined) {
            Callback(webservice.PreparaLista('query',sessionStorage.inventario_setores));
            return;
        }

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'select',
                fields: '*',
                from: 'inventario.setores',
                order: 'id'
            })
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback(null);
                return;
            }

            sessionStorage.inventario_setores = http.response;
            Callback(webservice.PreparaLista('query',sessionStorage.inventario_setores));
        });

    }

}