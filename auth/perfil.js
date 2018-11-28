let Perfil = function () {

    let that = this;

    this.Info = function(id, Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'select',
                fields: 'nome',
                from: 'portal.perfil',
                where: 'num='+id
            })
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback(null);
                return;
            }

            that.Permissoes(id, function (response) {

                let perfil = {
                    id: id,
                    nome: JSON.parse(JSON.parse(http.response)[0].query).nome,
                    permissoes: response
                };
                Callback(perfil);
            });


        });
    };

    this.Permissoes = function (id, Callback) {

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'select',
                fields: '*',
                from: 'portal.permissoes',
                where: 'perfil='+id
            })
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback(null);
                return;
            }

            Callback(webservice.PreparaLista('query',http.response));
        });

    };

    this.Recursos = function (Callback) {

        if (sessionStorage.estrutura !== undefined) {
            Callback(webservice.PreparaLista('query',sessionStorage.recursos));
            return;
        }

        webservice.Request({
            process: 'query',
            params: JSON.stringify({
                command: 'select',
                fields: 'num as id,nome',
                from: 'portal.perfil_recurso',
                order: 'num'
            })
        }, function (http) {

            if (http.response === 'null' || http.response === 'false') {
                Callback(null);
                return;
            }

            sessionStorage.recursos = http.response;
            Callback(webservice.PreparaLista('query',sessionStorage.recursos));
        });

    };

    this.RestringirAcesso = function (info) {

        let recurso = recursos.find(x=>x.nome === info.recurso);
        let permissao = info.permissoes.find(x=>x.recurso === recurso.id);

        if (permissao.adicionar === 0 && info.adicionar !== undefined) {
            info.adicionar.filter(function (item) {
                info.form.hideItem(item);
            });
        }

        if (permissao.editar === 0 && info.editar !== undefined) {
            info.editar.filter(function (item) {
                info.form.hideItem(item);
            });
        }

        if (permissao.remover === 0 && info.remover !== undefined) {
            info.remover.filter(function (item) {
                info.form.hideItem(item);
            });
        }

        if (permissao.documentos === 0 && info.documentos !== undefined) {
            info.documentos.filter(function (item) {
                info.form.hideItem(item);
            });
        }

        if (permissao.telefones === 0 && info.telefones !== undefined) {
            info.telefones.filter(function (item) {
                info.form.hideItem(item);
            });
        }

        if (permissao.imagens === 0 && info.imagens !== undefined) {
            info.imagens.filter(function (item) {
                info.form.hideItem(item);
            });
        }

        if (permissao.listar_registros === 0 && info.listar_registros !== undefined) {
            info.listar_registros.filter(function (item) {
                info.form.hideItem(item);
            });
        }

        if (permissao.importar === 0 && info.importar !== undefined) {
            info.importar.filter(function (item) {
                info.form.hideItem(item);
            });
        }

        if (permissao.exportar === 0 && info.exportar !== undefined) {
            info.exportar.filter(function (item) {
                info.form.hideItem(item);
            });
        }
    };

};