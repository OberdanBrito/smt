class Agenda {

    Espacos(Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'select',
                fields: 'id as key, nome as label, custo_hora, custo_hora_extra, custo_multa',
                from: 'espacos.cadastro',
                order: 'id'
            })
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback(null);
                return;
            }

            Callback(webservice.PreparaLista('query',http.response));
        });

    };

    Tipos(Callback) {

        if (sessionStorage.agenda_tipos !== undefined) {
            Callback(webservice.PreparaLista('query',sessionStorage.agenda_tipos));
            return;
        }

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'select',
                fields: 'id as key, nome as label',
                from: 'espacos.agenda_tipo',
                order: 'id'
            })
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback(null);
                return;
            }

            sessionStorage.agenda_tipos = http.response;
            Callback(webservice.PreparaLista('query',sessionStorage.agenda_tipos));
        });

    };
    
    Listar(Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'select',
                fields: '*',
                from: 'espacos.reservas'
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

        dados.command = 'insert';
        webservice.Request({
            process: 'espacos.reserva',
            params: JSON.stringify(dados)
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback(null);
                return;
            }

            console.debug(JSON.parse(http.response));
            Callback(webservice.PreparaLista('reserva', http.response));
        });

    };

    Editar(dados, Callback) {

        dados.command = 'update';
        webservice.Request({
            process: 'espacos.reserva',
            params: JSON.stringify(dados)
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback(null);
                return;
            }

            console.debug(JSON.parse(http.response));
            Callback(webservice.PreparaLista('reserva', http.response));
        });

    };

    Remover(id, Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'delete',
                from: 'espacos.agenda',
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
    };

}

class AgendaConvidados {

    constructor(agenda) {
        AgendaConvidados._agenda = agenda;
    }

    Info(id, Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'select',
                fields: '*',
                from: 'espacos.convidados',
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
                fields: 'id,nome,documento',
                from: 'espacos.convidados',
                where: 'agenda='+AgendaConvidados._agenda,
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
                from: 'espacos.convidados',
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
            from: 'espacos.convidados',
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
                    from: 'espacos.convidados',
                    where: 'id=' + AgendaConvidados._agenda,
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