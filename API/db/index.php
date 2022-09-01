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
    $app->map(['get', 'post'], '/cuidadores', 'getCuidadores');
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
    
    function getCuidadores(Request $request, Response $response, array $args){
        $sql = "SELECT * FROM Cuidador";
        $stmt = getConn()->query($sql);
        $cuidadores = $stmt->fetchAll(PDO::FETCH_OBJ);
        $response->getBody()->write(json_encode($cuidadores));
        // $response->json_encode($cuidadores);
        return $response;
    }

    function getCuidador(Request $request, Response $response, array $args){
        $id = $args['id'];
        $conn = getConn();
        $sql ="SELECT * FROM Cuidador WHERE cd_cuidador=:cd_cuidador";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam("cd_cuidador", $id);
        $stmt->execute();
        $cuidador=$stmt->fetchObject();

        $response->getBody()->write(json_encode($cuidador));
        return $response;
    }

    $app->run();