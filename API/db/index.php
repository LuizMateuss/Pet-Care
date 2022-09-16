<?php
    require 'vendor/autoload.php';
    use \Psr\Http\Message\ServerRequestInterface as Request;
    use \Psr\Http\Message\ResponseInterface as Response;
    use \Sct\Common\Environment;
    Environment::load(__DIR__);
    
    $app = new \Slim\App;

    //conectando com o banco
    function getConn(){
        return new PDO('mysql:host='.getenv('HOST').':'.getenv('PORT').';dbname='.getenv('DATABASE'),
            getenv('USER'),
            getenv('PASSWD'),
            array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
        );
    }
    
    // rotas
    $app->get( '/usuario', 'getUsuario');
    $app->map(['get', 'post'], '/login/{email}/{password}/{isCare}', 'getLogin');
    $app->map(['get', 'post'], '/registration/{name}/{email}/{password}/{birthday}/{phone}/{isCare}', 'getRegistration');

    //FUNÇÕES DE CONCÇÃO
    
    $app->get('/', function(Request $request, Response $response, array $args){
        $response->getBody()->write("Teste API - HOME");
        return $response;
    });

    function getUsuario(Request $request, Response $response, array $args){
        //para teste com o banco
        $sql = "SELECT cd_usuario, nm_usuario FROM usuario";
        $stmt = getConn()->query($sql);
        $usuario = $stmt->fetchAll(PDO::FETCH_OBJ);
        $response->getBody()->write(json_encode($usuario));
        // $response->json_encode($usuario);
        return $response;
    }

    function getLogin(Request $request, Response $response, array $args){
        $email = $args['email'];
        $password = $args['password'];
        $isCare = $args['isCare'];

        $conn = getConn();
        $sql ="SELECT nm_email, nm_senha, cd_isCare FROM usuario WHERE nm_email=:nm_email AND nm_senha=:nm_senha AND cd_isCare=:cd_isCare";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam("nm_email", $email);
        $stmt->bindParam("nm_senha", $password);
        $stmt->bindParam("cd_isCare", $isCare);
        $stmt->execute();
        $informations=$stmt->fetchObject();

        $response->getBody()->write(json_encode($informations));
        return $response;
    }

    function getRegistration(Request $request, Response $response, array $args){
        $name = $args['name'];
        $email = $args['email'];
        $password = $args['password'];
        $birthday = $args['birthday'];
        $phone = $args['phone'];
        $isCare = $args['isCare'];
        $conn = getConn();

        $sql = "INSERT INTO usuario 
                     SET nm_usuario=:nm_usuario, nm_email=:nm_email, nm_senha=:nm_senha, dt_data=:dt_data, cd_telefone=:cd_telefone, cd_isCare=:cd_isCare";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam("nm_usuario", $name);
        $stmt->bindParam("nm_email", $email);
        $stmt->bindParam("nm_senha", $password);
        $stmt->bindParam("dt_data", $birthday);
        $stmt->bindParam("cd_telefone", $phone);
        $stmt->bindParam("cd_isCare", $isCare);
        $stmt->execute();
        
        $message = "Cadastrado";
        $response->getBody()->write(json_encode($message));
        return $response;
    }

    $app->run();