<?php
    use \Psr\Http\Message\ServerRequestInterface as Request;
    use \Psr\Http\Message\ResponseInterface as Response;
    
    require 'vendor/autoload.php';
    
    $app = new \Slim\App;

    $app->get('/', function(Request $request, Response $response, array $args){
        $response->getBody()->write("Teste API - HOME");
        return $response;
    });

    //conectando com o banco
    $app->map(['get', 'post'], '/cuidadores', 'getCuidadores');
    $app->map(['get', 'post'], '/cuidador/{id}', 'getCuidador');


    function getConn(){
        return new PDO('mysql:host=localhost:3306;dbname=mydb',
        'root',
        '',
        array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
    );
    }
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