angular.module('DualdevApp', ['ngAnimate', 'ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            // Atributos utilizados no layout (index.html), através do ControllerPrincipal:
            // - nome: usado para aplicar um ID no elemento da view, permitindo customização por CSS de cada página.
            // - topo: FALSE para ocultar, STRING para mudar o título da página dinamicamente conforme a rota.
            .when('/', {
                templateUrl: 'home.html', nome: 'home', topo: false })
            .when('/quem-somos', {
                templateUrl: 'quem-somos.html', nome: 'quem-somos', topo: 'Quem somos' })
            .when('/blog', {
                templateUrl: 'blog.html', nome: 'blog', topo: 'Blog', controller: 'BlogController' })
            .when('/portfolio', {
                templateUrl: 'portfolio.html', nome: 'portfolio', topo: 'Portfolio', controller: 'PortfolioController'})
            .when('/portfolio/:id', {
                templateUrl: 'portfolio-detalhes.html', nome: 'portfolio-detalhes', topo: 'Portfolio',
                controller: 'PortfolioDetalhesController'})
            .when('/contato', {
                templateUrl: 'contato.html', nome: 'contato', topo: 'Contato' });
        $locationProvider.html5Mode(true);
    })
    .controller('MainController', ['$scope', '$route', function($scope, $route) {
        $scope.$on('$routeChangeSuccess', function(next, current) {
            $scope.MainController = {
                idPagina: current.nome,
                topoPagina: current.topo
            };
        });
    }])
    .controller('PortfolioController', ['$scope', 'PortfolioService', function($scope, PortfolioService) {
        $scope.PortfolioController = {
            paginaAtual: 1,
            itens: PortfolioService.getItens()
        };
    }])
    .controller('PortfolioDetalhesController', ['$scope', '$routeParams', 'PortfolioService',
                                                function($scope, $routeParams, PortfolioService) {
        $scope.PortfolioDetalhesController = {
            slideAtual: 1,
            item: PortfolioService.getItem($routeParams.id)
        };
    }])
    .factory('PortfolioService', [function() {
        var dados = {
            itens: [
                {
                    id: 'layout-eternizando',
                    titulo: 'Plataforma de Vendas',
                    cliente: 'Joalheria Eternizando',
                    imagens: ['site-eternizando.jpg', 'site-eternizando-2.jpg', 'site-eternizando-3.png',
                              'site-eternizando-4.png', 'site-eternizando-5.png'],
                    descricao: 'Criação de e-commerce da Joalheria Eternizando, com carrinho de compras, integração ' +
                               'com PagSeguro, em formato responsivo.',
                    funcoes: ['Análise', 'Desenvolvimento', 'Manutenção']
                },
                {
                    id: 'website-stillos',
                    titulo: 'Website Institucional',
                    cliente: "Stillo's Produções e Eventos",
                    imagens: ['site-stillos.jpg', 'site-stillos-2.jpg', 'site-stillos-3.jpg', 'site-stillos-4.jpg',
                              'site-stillos-5.png'],
                    descricao: "Concepção e criação do novo website institucional da Stillo's Produções e Eventos.",
                    funcoes: ['Análise', 'Gerência', 'Desenvolvimento']
                },
                {
                    id: 'website-medicinausp',
                    titulo: 'Website de Evento',
                    cliente: "Stillo's Produções e Eventos",
                    imagens: ['site-medusp.jpg'],
                    descricao: 'Criação de website para a organização e divulgação da formatura da 100ª Turma de ' +
                               'Medicina da USP.',
                    funcoes: ['Análise', 'Desenvolvimento']
                },
                {
                    id: 'plataforma-futebolcard',
                    titulo: 'Plataforma de Vendas',
                    cliente: "FutebolCard",
                    imagens: ['site-futebolcard.jpg'],
                    descricao: 'Manutenção de uma das maiores plataformas de venda de ingressos para eventos no Brasil.',
                    funcoes: ['Análise', 'Manutenção']
                },
                {
                    id: 'template-montenegro',
                    titulo: 'Vitrine de Websites',
                    cliente: 'Montenegro',
                    imagens: ['layouts-mev.jpg', 'layouts-mev-2.jpg', 'layouts-mev-3.jpg'],
                    descricao: 'Um template Joomla! dinâmico e uma interface para customização dos modelos, ' +
                               'permitindo a customização de vários modelos de websites, proporcionando ao cliente ' +
                               'maior interação e velocidade de entrega.',
                    funcoes: ['Desenvolvimento']
                },
                {
                    id: 'sistema-montenegro',
                    titulo: 'Sistema para Agências de Viagens',
                    cliente: 'Montenegro',
                    imagens: ['sistema-montenegro.jpg', 'sistema-montenegro-2.jpg'],
                    descricao: 'Criação de nova versão de sistema de relatórios e faturamento, integrado com ' +
                               'back-office de agências de agências de viagens.',
                    funcoes: ['Análise', 'Desenvolvimento', 'Manutenção']
                },
                {
                    id: 'formulario-aig',
                    titulo: 'Formulário',
                    cliente: 'AIG Seguros',
                    imagens: ['form-aig.jpg', 'form-aig-2.jpg'],
                    descricao: 'Formulário para uma das seções do website da AIG Seguros.',
                    funcoes: ['Desenvolvimento']
                },
                {
                    id: 'sistema-gestao',
                    titulo: 'Sistema de Gestão',
                    imagens: ['sistema-gestao.jpg'],
                    descricao: "Criação de um sistema de gestão de empresas, usando uma interface inovadora e intuitiva.",
                    funcoes: ['Análise', 'Desenvolvimento']
                },
                {
                    id: 'sgi',
                    titulo: 'Sistema de Gerenciamento de Impressoras',
                    imagens: ['sgi.png'],
                    descricao: 'Criação de um sistema multi-empresas de monitoramento e gerenciamento de impressoras ' +
                               'de rede.',
                    funcoes: ['Análise', 'Desenvolvimento']
                }
            ]
        };

        var PortfolioService = {
            getItens: function() {
                return dados.itens;
            },
            getItem: function(id) {
                for (i = 0; i < dados.itens.length; i++) {
                    if (dados.itens[i].id == id) {
                        return dados.itens[i];
                    }
                }
                return null;
            }
        };
        return PortfolioService;
    }])
    .controller('BlogController', ['$scope', function($scope) {
        $scope.BlogController = {
            postSelecionado: null,
            posts: [
                {
                    titulo: 'Ciclo de requisição do Laravel 4',
                    data: '10/04/2015'
                },
                {
                    titulo: 'Testando uma aplicação Laravel 5 com Jenkins CI',
                    data: '15/04/2015'
                },
                {
                    titulo: 'Deploy com Git - Aposente o FTP!',
                    data: '20/04/2015'
                },
                {
                    titulo: 'Gerenciando seus projetos com Redmine',
                    data: '17/04/2015'
                }
            ]
        };
    }]);