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
    $app->map(['get', 'post'], '/login/{email}/{password}/{isCare}', 'getLogin');
    $app->map(['get', 'post'], '/registration', 'getRegistration');
    ///{name}/{email}/{password}/{birthday}/{phone}/{isCare}

    //FUNÇÕES DE CONCÇÃO
    
    $app->get('/', function(Request $request, Response $response, array $args){
        $response->getBody()->write("Teste API - HOME");
        return $response;
    });

    // function getCuidadores(Request $request, Response $response, array $args){
    //     $sql = "SELECT * FROM Cuidador";
    //     $stmt = getConn()->query($sql);
    //     $cuidadores = $stmt->fetchAll(PDO::FETCH_OBJ);
    //     $response->getBody()->write(json_encode($cuidadores));
    //     // $response->json_encode($cuidadores);
    //     return $response;
    // }

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
        //https://discourse.slimframework.com/t/insert-data-in-db-with-form-using-slim/3003/3
        //https://discourse.slimframework.com/t/how-to-send-post-data-in-a-crud-class/3515
        //https://odan.github.io/2017/01/07/basic-crud-operations-with-pdo.html
         // Get POST data
        $post = (array)$request->getParsedBody();

        $row = [
            'nome' => "tetse2",//$post['nome'],
            'email' => "luiz@luiz.ll",//$post['email'],
            'senha' => "123" //$post['senha']
        ];

        $sql = "INSERT INTO usuario SET nm_usuario=:nome, nm_email=:email, nm_senha:senha";

        /** @var PDO $pdo */
        // $pdo = $this->get(PDO::class);
        $conn = getConn();
        $stmt = $conn->prepare($sql);
        $stmt->bindParam("nm_usuario", $row['nome']);
        $stmt->bindParam("nm_email", $row['email']);
        $stmt->bindParam("nm_senha", $row['senha']);
        // $smt->execute();
        // $success = $pdo->prepare($sql);//->execute($row);

    return $response->withJson(['success' => $row]);



        // $data = (array)$request->getParsedBody();

        // $name = $data[$args['name']];
        // $email = $data[$args['email']];
        // $password = $data[$args['password']];
        // $birthday = $data[$args['birthday']];
        // $phone = $data[$args['phone']];
        // $isCare = $data[$args['isCare']];

        // $conn = getConn();
        // $sql = "INSERT INTO usuario 
        //             SET nm_usuario=:nm_usuario, nm_email=:nm_email, nm_senha:nm_senha, dt_data=:dt_data, cd_telefone=:cd_telefone, cd_isCare=:cd_isCare";
        // $stmt = $conn->prepare($sql);
        // $stmt->bindParam("nm_usuario", $name);
        // $stmt->bindParam("nm_email", $email);
        // $stmt->bindParam("nm_senha", $password);
        // $stmt->bindParam("dt_data", $birthday);
        // $stmt->bindParam("cd_telefone", $phone);
        // $stmt->bindParam("cd_isCare", $isCare);
        // $stmt->execute();
        // // $informations=$stmt->fetchObject();
        // // $response->getBody()->write(json_encode($informations));
        // $response = "oi";
        // return $response;
    }

    $app->run();