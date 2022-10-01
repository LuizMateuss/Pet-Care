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
    $app->map(['get', 'post'], '/changepasswd/{id}/{currentpasswd}/{newpasswd}', 'getChangePasswd');
    $app->map(['get', 'post'], '/registrationAdress/{id}/{cep}/{addressNumber}/{logradouro}/{addressComplement}/{bairro}/{localidade}/{uf}', 'getAddressRegistration');
    $app->map(['get', 'post'], '/addressInformations/{id}', 'getAddressInformations');
    $app->map(['get', 'post'], '/registrationAnimal/{id}/{name}/{birth}/{gender}/{weight}/{description}/{size}/{race}', 'getregistrationAnimal');
    $app->map(['get', 'post'], '/petInformations/{id}', 'getPetInformations');


    //FUNÇÕES DE CONCÇÃO
    
    $app->get('/', function(Request $request, Response $response, array $args){
        $response->getBody()->write("Teste API - HOME");
        return $response;
    });

    function getUsuario(Request $request, Response $response, array $args){
        //para teste com o banco
        $sql = "SELECT * FROM usuario";
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
        $sql ="SELECT cd_usuario, nm_usuario, nm_email, nm_senha, cd_isCare FROM usuario WHERE nm_email=:nm_email AND nm_senha=:nm_senha AND cd_isCare=:cd_isCare";
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
        
        $sql = "SELECT nm_email FROM usuario WHERE nm_email=:nm_email";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam("nm_email", $email);
        $stmt->execute();
        $verifyEmail=$stmt->fetchObject();

        if($verifyEmail){
            $message = false;
            $response->getBody()->write(json_encode($message));
            return $response;
        }else{
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

            $sql = "SELECT cd_usuario, nm_usuario FROM usuario WHERE nm_email=:nm_email";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam("nm_email", $email);
            $stmt->execute();
            $message=$stmt->fetchObject();
            $response->getBody()->write(json_encode($message));
            return $response;
        }
    }

    function getAddressRegistration(Request $request, Response $response, array $args){
        $id = $args['id'];
        $cep = $args['cep'];
        $addressNumber = $args['addressNumber'];
        $logradouro = $args['logradouro'];
        $addressComplement = $args['addressComplement'];
        $bairro = $args['bairro'];
        $localidade = $args['localidade'];
        $uf = $args['uf'];
        $conn = getConn();
    
        $sql = "INSERT INTO endereco
            SET nm_logradouro=:logradouro, cd_numero_rua=:addressNumber,nm_complemento=:addressComplement, nm_bairro=:bairro, nm_cidade=:localidade, sg_estado=:uf, cd_cep=:cep, cd_usuario=:id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->bindParam("logradouro", $logradouro);
        $stmt->bindParam("addressNumber", $addressNumber);
        $stmt->bindParam("addressComplement", $addressComplement);
        $stmt->bindParam("bairro", $bairro);
        $stmt->bindParam("localidade", $localidade);
        $stmt->bindParam("uf", $uf);
        $stmt->bindParam("cep", $cep);
        $stmt->execute();
    }

    function getAddressInformations(Request $request, Response $response, array $args){
        $id=$args['id'];
        $conn = getConn();

        $sql="SELECT e.*, u.nm_usuario, u.nm_email, u.cd_telefone FROM endereco AS e
            INNER JOIN usuario AS u
            ON e.cd_usuario=u.cd_usuario
            WHERE u.cd_usuario=:id";
        $stmt=$conn->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();

        $message=$stmt->fetchAll(PDO::FETCH_OBJ);
        $response->getBody()->write(json_encode($message));
        return $response;
    }

    function getChangePasswd(Request $request, Response $response, array $args){
        $id = $args['id'];
        $cpass = $args['currentpasswd'];
        $npass = $args['newpasswd'];
        $sql = "UPDATE usuario 
                     SET nm_senha=:nm_novaSenha WHERE cd_usuario=:cd_usuario AND nm_senha=:nm_senha";
        $stmt = getConn()->prepare($sql);
        $stmt->bindParam("cd_usuario", $id);
        $stmt->bindParam("nm_senha", $cpass);
        $stmt->bindParam("nm_novaSenha", $npass);
        $stmt->execute();

        $message = "Atualizado";
        $response->getBody()->write(json_encode($message));
        return $response;
    }

    function getregistrationAnimal(Request $request, Response $response, array $args){
        $id = $args['id'];
        $name = $args['name'];
        $birth = $args['birth'];
        $gender = $args['gender'];
        $weight = $args['weight'];
        $description = $args['description'];
        $size = $args['size'];
        $race = $args['race'];
        $conn = getConn();

        $sql = "INSERT INTO animal
            SET nm_animal=:AnimalName, dt_nascimento_animal=:birth, nm_genero_animal=:gender, cd_peso_animal=:animalWeight, ds_animal=:animalDescription, cd_usuario=:id, cd_porte_animal=:size, cd_raca_animal=:race";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->bindParam("AnimalName", $name);
        $stmt->bindParam("birth", $birth);
        $stmt->bindParam("gender", $gender);
        $stmt->bindParam("animalWeight", $weight);
        $stmt->bindParam("animalDescription", $description);
        $stmt->bindParam("size", $size);
        $stmt->bindParam("race", $race);
        $stmt->execute();

        $message = "Cadastrado";
        $response->getBody()->write(json_encode($message));
        return $response;
    }

    function getPetInformations(Request $request, Response $response, array $args){
        $id=$args['id'];
        $conn = getConn();

        $sql="SELECT a.*, r.nm_raca_animal, t.nm_tipo_animal, p.nm_porte_animal FROM usuario AS u
                    JOIN animal AS a ON u.cd_usuario=a.cd_usuario
                    JOIN raca_animal AS r ON r.cd_raca_animal=a.cd_raca_animal
                    JOIN tipo_animal AS t ON t.cd_tipo_animal=r.cd_tipo_animal
                    JOIN porte_animal AS p ON p.cd_porte_animal=a.cd_porte_animal
                WHERE u.cd_usuario=:id ORDER BY a.nm_animal";
        $stmt=$conn->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();

        $message=$stmt->fetchAll(PDO::FETCH_OBJ);
        $response->getBody()->write(json_encode($message));
        return $response;
    }

    $app->run();