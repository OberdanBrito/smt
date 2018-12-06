class Agenda {

    Espacos(Callback) {

        if (sessionStorage.agenda_espacos !== undefined) {
            Callback(webservice.PreparaLista('query',sessionStorage.agenda_espacos));
            return;
        }

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

            sessionStorage.agenda_espacos = http.response;
            Callback(webservice.PreparaLista('query',sessionStorage.agenda_espacos));
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