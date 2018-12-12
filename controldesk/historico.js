class Historico {

    Grid(Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'select',
                fields: 'filedate,id,assunto,categoria,tipo,tecnico',
                from: 'controldesk.lista_atendimentos'
            })
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback(null);
                return;
            }

            Callback(webservice.PreparaGrid('query',http.response));
        });
    };

    Lista(Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'select',
                fields: 'filedate,id,chamado,categoria,tipo,tecnico,resposta,icone,classtipo',
                from: 'controldesk.mb_lista_atendimentos'
            })
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback(null);
                return;
            }

            Callback(webservice.PreparaLista('query',http.response));
        });
    };

    Info(id, Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'select',
                fields: '*',
                from: 'controldesk.atendimento_historico',
                where: 'id='+id
            })
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback(null);
                return;
            }

            Callback(webservice.PreparaLista('query',http.response));
        });

    };



    AdicionarItem (dados, Callback) {

        let params = {
            process: 'query',
            params: JSON.stringify({
                command: 'insert',
                fields:dados,
                from: 'controldesk.atendimento_historico',
                returning: 'id'
            })
        };

        webservice.Request(params, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback(null);
                return;
            }

            Callback(webservice.PreparaLista('query',http.response));
        });

    };

    EditarItem (dados, Callback) {

        let params = {
            process: 'query',
            params: JSON.stringify({
                command: 'update',
                fields:dados,
                from: 'controldesk.atendimento_historico',
                where: 'id='+dados.id,
                returning: 'id'
            })
        };

        webservice.Request(params, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback(null);
                return;
            }

            Callback(webservice.PreparaLista('query',http.response));
        });

    };


    RemoverItem (id, Callback) {

        dhtmlx.confirm({
            type:"confirm-warning",
            title:"Atenção",
            text:"Você confirma a exclusão deste registro?",
            ok:"Sim", cancel:"Não",
            callback:function(result){

                if (result !== true)
                    return;

                webservice.Request({
                    process: 'query',
                    params: JSON.stringify({
                        command: 'delete',
                        from: 'smt.controldesk.atendimento_historico',
                        where: 'id='+id,
                        returning: 'id'
                    })
                }, function (http) {

                    if (http.response === 'null' || http.response === 'false') {
                        Callback(null);
                        return;
                    }

                    Callback(webservice.PreparaLista('query',http.response));
                });
            }
        });
    };

}
