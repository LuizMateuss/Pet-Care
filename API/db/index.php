<?php
    require 'vendor/autoload.php';
    use \Psr\Http\Message\ServerRequestInterface as Request;
    use \Psr\Http\Message\ResponseInterface as Response;
    use \Sct\Common\Environment;
    Environment::load(__DIR__);
    
    $app = new \Slim\App;
    
    $app->get('/', function(Request $request, Response $response, array $args){
        $response->getBody()->write("Teste API - HOME");
        return $response;
    });
    
    // rotas
    $app->map(['get', 'post'], '/view/{id}', 'getViews');
    $app->map(['get', 'post'], '/cuidador/{id}', 'getCuidador');
    
    
    //conectando com o banco
    function getConn(){
        return new PDO('mysql:host='.getenv('HOST').':'.getenv('PORT').';dbname='.getenv('DATABASE'),
            getenv('USER'),
            getenv('PASSWD'),
            array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
        );
    }

    //FUNÇÕES DE CONCÇÃO
    
    function getViews(Request $request, Response $response, array $args){   
        $view = $args['id']; 
        switch ($view) {
            case 1:
                $sql = "SELECT * FROM nomeTutorAnimal";
                $stmt = getConn()->query($sql);
                $cuidadores = $stmt->fetchAll(PDO::FETCH_OBJ);
                $response->getBody()->write(json_encode($cuidadores));
                return $response;
                break;
            case 2:
                $sql = "SELECT * FROM cepUsuario";
                $stmt = getConn()->query($sql);
                $cuidadores = $stmt->fetchAll(PDO::FETCH_OBJ);
                $response->getBody()->write(json_encode($cuidadores));
                return $response;
                break;
            case 3:
                $sql = "SELECT * FROM nomeAnimalServico";
                $stmt = getConn()->query($sql);
                $cuidadores = $stmt->fetchAll(PDO::FETCH_OBJ);
                $response->getBody()->write(json_encode($cuidadores));
                return $response;
                break;
            case 4:
                $sql = "SELECT * FROM portePesoAnimal";
                $stmt = getConn()->query($sql);
                $cuidadores = $stmt->fetchAll(PDO::FETCH_OBJ);
                $response->getBody()->write(json_encode($cuidadores));
            
                return $response;
                break;
            case 5:
                $sql = "SELECT * FROM servicoPagamento";
                $stmt = getConn()->query($sql);
                $cuidadores = $stmt->fetchAll(PDO::FETCH_OBJ);
                $response->getBody()->write(json_encode($cuidadores));
                return $response;
                break;
            case 6:
                $sql = "SELECT * FROM tiposPagamentos";
                $stmt = getConn()->query($sql);
                $cuidadores = $stmt->fetchAll(PDO::FETCH_OBJ);
                $response->getBody()->write(json_encode($cuidadores));
                return $response;
                break;
            case 7:
                $sql = "SELECT * FROM generoRacaAnimal";
                $stmt = getConn()->query($sql);
                $cuidadores = $stmt->fetchAll(PDO::FETCH_OBJ);
                $response->getBody()->write(json_encode($cuidadores));
                return $response;
                break;
            case 8:
                $sql = "SELECT * FROM dadosDoServico";
                $stmt = getConn()->query($sql);
                $cuidadores = $stmt->fetchAll(PDO::FETCH_OBJ);
                $response->getBody()->write(json_encode($cuidadores));
                return $response;
                break; 
            case 9:
                $sql = "SELECT * FROM servicoTotalAnimal";
                $stmt = getConn()->query($sql);
                $cuidadores = $stmt->fetchAll(PDO::FETCH_OBJ);
                $response->getBody()->write(json_encode($cuidadores));
                return $response;
                break;
            case 10:
                $sql = "SELECT * FROM codigosUsuarioAnimalServicoPagamento";
                $stmt = getConn()->query($sql);
                $cuidadores = $stmt->fetchAll(PDO::FETCH_OBJ);
                $response->getBody()->write(json_encode($cuidadores));
                return $response;
                break;
            default: 
                $response->getBody()->write(json_encode("Selecione uma view de 1 a 10"));
                return $response;
                break;
        }
    }

    $app->run();

