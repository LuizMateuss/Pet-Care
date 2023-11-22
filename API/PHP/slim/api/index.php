<?php
    require 'vendor/autoload.php';
    use \Psr\Http\Message\ServerRequestInterface as Request;
    use \Psr\Http\Message\ResponseInterface as Response;
    use Slim\Factory\AppFactory;
    use Sct\Common\Environment;

    // Carrega o ambiente .env
    Environment::load(__DIR__);

    // Criação do aplicativo
    $app = AppFactory::create();

    // Configuração para aparecer erros
    $app->addRoutingMiddleware();

    /**
     * Add Error Middleware
     *
     * @param bool                  $displayErrorDetails -> Should be set to false in production
     * @param bool                  $logErrors -> Parameter is passed to the default ErrorHandler
     * @param bool                  $logErrorDetails -> Display error details in error log
     * @param LoggerInterface|null  $logger -> Optional PSR-3 Logger  
     *
     * Note: This middleware should be added last. It will not handle any exceptions/errors
     * for middleware added after it.
     */
    $errorMiddleware = $app->addErrorMiddleware(getenv('DISPLAY_ERROR'), true, true);

    //conectando com o banco
    function getConn(){
        return new PDO(
            getenv('SGBD').':host='.getenv('HOST').';port='.getenv('PORT').';dbname='.getenv('DATABASE'),
            getenv('USER'),
            getenv('PASSWD')
        );
    }
    
    // rotas
    $app->get( '/usuario', 'getUsuario');
    $app->post('/login', 'getLogin');
    $app->post('/verifyRegistration', 'getVerifyRegistration');
    $app->post('/registration', 'getRegistration');
    $app->put('/updateUser', 'getUpdateUser');
    $app->map(['get', 'post'], '/changepasswd/{id}/{currentpasswd}/{newpasswd}', 'getChangePasswd');
    
    $app->get('/addressInformations/{id}', 'getAddressInformations');

    $app->map(['get', 'post'], '/registrationAnimal/{id}/{name}/{birth}/{gender}/{weight}/{description}/{size}/{race}', 'getregistrationAnimal');
    $app->map(['get', 'post'], '/petInformations/{id}', 'getPetInformations');
    $app->delete('/deletePet/{id}', 'getDeletePet');
    $app->put('/updatePet/{id}', 'getUpdatePet');

    $app->post('/setService/{selectedPet}', 'getSetService');
    $app->map(['get', 'post'], '/requestedServices/{id}', 'getRequestedServices');
    $app->map(['get', 'post'], '/confirmedServices/{id}/{isCare}', 'getConfirmedServices');
    $app->get('/requests', 'getRequests');
    $app->put('/requestAccept/{id}/{serviceID}', 'getRequestAccept');


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

    function getLogin(Request $request, Response $response, array $args): Response{
        $email = $request->getParsedBody()['email'];
        $password = $request->getParsedBody()['password'];
        $isCare = $request->getParsedBody()['isCare'];

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

    function getVerifyRegistration(Request $request, Response $response, array $args): Response{
        $email = $request->getParsedBody()['email'] ?? '';
        $conn = getConn();

        $sql = "SELECT nm_email FROM usuario WHERE nm_email=:nm_email";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam("nm_email", $email);
        $stmt->execute();
        $verifyEmail=$stmt->fetchObject();

        if($verifyEmail){
            $message = false;
        }else{
            $message = true;
        }
        $response->getBody()->write(json_encode($message));
        return $response;
    }

    function getRegistration(Request $request, Response $response, array $args): Response{
        $name = $request->getParsedBody()['name'];
        $email = $request->getParsedBody()['email'];
        $password = $request->getParsedBody()['password'];
        $birthday = $request->getParsedBody()['birthday'];
        $phone = $request->getParsedBody()['phone'];
        $isCare = $request->getParsedBody()['isCare'];
        $cpf = $request->getParsedBody()['cpf'];
        $cep = $request->getParsedBody()['cep'];
        $addressNumber = $request->getParsedBody()['addressNumber'];
        $logradouro = $request->getParsedBody()['logradouro'];
        $addressComplement = $request->getParsedBody()['addressComplement'];
        $bairro = $request->getParsedBody()['bairro'];
        $localidade = $request->getParsedBody()['localidade'];
        $uf = $request->getParsedBody()['uf'];

        $conn = getConn();
        try {
            $conn->beginTransaction();

            $sql = "INSERT INTO usuario (nm_usuario, nm_email, nm_senha, dt_nascimento, cd_telefone, cd_isCare, cd_cpf)
                        VALUES (:nm_usuario, :nm_email, :nm_senha, :dt_nascimento, :cd_telefone, :cd_isCare, :cpf)
            ";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam("nm_usuario", $name);
            $stmt->bindParam("nm_email", $email);
            $stmt->bindParam("nm_senha", $password);
            $stmt->bindParam("dt_nascimento", $birthday);
            $stmt->bindParam("cd_telefone", $phone);
            $stmt->bindParam("cd_isCare", $isCare);
            $stmt->bindParam("cpf", $cpf);
            $stmt->execute();

            $sql = "SELECT cd_usuario, nm_usuario FROM usuario WHERE nm_email=:nm_email";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam("nm_email", $email);
            $stmt->execute();
            $message=$stmt->fetchObject();

            $id=$message->cd_usuario;

            $sql = "INSERT INTO endereco 
                    (nm_logradouro, cd_numero_rua, nm_complemento, nm_bairro, nm_cidade, nm_uf, cd_cep, cd_usuario)
                VALUES 
                    (:logradouro, :addressNumber, :addressComplement, :bairro, :localidade, :uf, :cep, :id)
            ";
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

            $conn->commit();
        } catch (Exception $e) {
            $conn->rollBack();
            $message = $e;
        }
        $response->getBody()->write(json_encode($message));
        return $response;
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

    function getUpdateUser(Request $request, Response $response, array $args): Response{
        $id = $request->getParsedBody()['id'];
        $newName = $request->getParsedBody()['newName'];
        $newEmail = $request->getParsedBody()['newEmail'];
        $newPhone = $request->getParsedBody()['newPhone'];
        $zipCode = $request->getParsedBody()['zipCode'];
        $newHouseNumber = $request->getParsedBody()['newHouseNumber'];
        $street = $request->getParsedBody()['street'];
        $newComplement = $request->getParsedBody()['newComplement'];
        $district = $request->getParsedBody()['district'];
        $city = $request->getParsedBody()['city'];
        $uf = $request->getParsedBody()['uf'];

        $conn = getConn();
        try {
            $conn->beginTransaction();

            $sql = "UPDATE usuario 
                        SET nm_usuario=:UserName, nm_email=:newEmail, cd_telefone=:newPhone 
                    WHERE cd_usuario=:id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->bindParam("UserName", $newName);
            $stmt->bindParam("newEmail", $newEmail);
            $stmt->bindParam("newPhone", $newPhone);
            $stmt->execute();

            $sql = "UPDATE endereco
                        SET cd_cep=:zipCode, cd_numero_rua=:newHouseNumber, nm_logradouro=:street, nm_complemento=:newComplement, nm_bairro=:district, nm_cidade=:city, nm_uf=:uf
                    WHERE cd_usuario=:id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->bindParam("zipCode", $zipCode);
            $stmt->bindParam("newHouseNumber", $newHouseNumber);
            $stmt->bindParam("street", $street);
            $stmt->bindParam("newComplement", $newComplement);
            $stmt->bindParam("district", $district);
            $stmt->bindParam("city", $city);
            $stmt->bindParam("uf", $uf);
            $stmt->execute();

            $conn->commit();
            $response = $response->withStatus(200);
            $response->getBody()->write(json_encode(['success' => 'OK']));
        } catch (Exception $e) {
            $conn->rollBack();
            $response = $response->withStatus(406);
            $response->getBody()->write(json_encode(['erro' => $e]));
        }
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
        (nm_animal, dt_nascimento_animal, nm_genero_animal, cd_peso_animal, ds_animal, cd_usuario, cd_porte_animal, cd_raca_animal)
        VALUES 
        (:AnimalName, :birth, :gender, :animalweight, :animaldescription, :id, :size, :race);
        ";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->bindParam("AnimalName", $name);
        $stmt->bindParam("birth", $birth);
        $stmt->bindParam("gender", $gender);
        $stmt->bindParam("animalweight", $weight);
        $stmt->bindParam("animaldescription", $description);
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
        foreach ($message as $key) {
            $petBirth=$key->dt_nascimento_animal;
            $petBirthYear = explode("-", $petBirth);
            $petYear = date('Y') - $petBirthYear[0];
            $key->dt_nascimento_animal=$petYear;

            if($key->ds_animal=="null"){
                $key->ds_animal=" ";
            }
        }
        $response->getBody()->write(json_encode($message));
        return $response;
    }

    function getDeletePet(Request $request, Response $response, array $args): Response{
        $id=$args['id'];
        $conn = getConn();

        $sql="DELETE FROM animal WHERE cd_animal=:id";
        $stmt=$conn->prepare($sql);
        $stmt->bindParam("id", $id);
        try{
            $stmt->execute();
            $response = $response->withStatus(200);
            $response->getBody()->write(json_encode(['success' => 'OK']));
        }catch(Exception $error){
            $response = $response->withStatus(406);
            $response->getBody()->write(json_encode(['error' => $error]));
        }
        return $response;
    }

    function getUpdatePet(Request $request, Response $response, array $args): Response{
        $id=$args['id'];
        $petName=$request->getParsedBody()['petName'];
        $petWeight=$request->getParsedBody()['petWeight'];
        $petDescription=$request->getParsedBody()['petDescription'];
        $conn = getConn();

        $sql="UPDATE animal
                 SET nm_animal=:petName, cd_peso_animal=:petWeight, ds_animal=:petDescription
                WHERE cd_animal=:id;";
        $stmt=$conn->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->bindParam("petName", $petName);
        $stmt->bindParam("petWeight", $petWeight);
        $stmt->bindParam("petDescription", $petDescription);
        try{
            $stmt->execute();
            $response = $response->withStatus(200);
            $response->getBody()->write(json_encode(['success' => 'OK']));
        }catch(Exception $error){
            $response = $response->withStatus(406);
            $response->getBody()->write(json_encode(['error' => $error]));
        }
        return $response;
    }

    function getSetService(Request $request, Response $response, array $args){
        $servico=$request->getParsedBody()['servico'];
        $formatedDate=$request->getParsedBody()['formatedDate'];
        $serviceStatus=$request->getParsedBody()['serviceStatus'];
        $servicePrice=$request->getParsedBody()['servicePrice'];
        $selectedPet=$args['selectedPet'];
        $serviceZipCode=$request->getParsedBody()['serviceZipCode'];
        $serviceHouseNumber=$request->getParsedBody()['serviceHouseNumber'];
        $serviceHouseComplement=$request->getParsedBody()['serviceHouseComplement'];
        $conn = getConn();

        $sql = "INSERT INTO servico 
        (nm_tipo_servico, dt_time_servico, sg_estado_servico, vl_servico, cd_animal, 
        cd_cep_historico, cd_numero_rua_historico, nm_complemento_historico)
        VALUES 
        (:servico, :formatedDate, :serviceStatus, :servicePrice, :selectedPet, 
        :serviceZipCode, :serviceHouseNumber, :serviceHouseComplement);
        ";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam("servico", $servico);
        $stmt->bindParam("formatedDate", $formatedDate);
        $stmt->bindParam("serviceStatus", $serviceStatus);
        $stmt->bindParam("servicePrice", $servicePrice);
        $stmt->bindParam("selectedPet", $selectedPet);
        $stmt->bindParam("serviceZipCode", $serviceZipCode);
        $stmt->bindParam("serviceHouseNumber", $serviceHouseNumber);
        $stmt->bindParam("serviceHouseComplement", $serviceHouseComplement);

        try{
            $stmt->execute();
            $response = $response->withStatus(200);
            $response->getBody()->write(json_encode(['success' => 'OK']));
        }catch(Exception $error){
            $response = $response->withStatus(406);
            $response->getBody()->write(json_encode(['error' => $error]));
        }
        return $response;
    }

    function getRequestedServices(Request $request, Response $response, array $args){
        $id=$args['id'];
        $conn = getConn();

        $sql = "SELECT s.cd_servico, u.cd_usuario, s.nm_tipo_servico, s.dt_time_servico, s.vl_servico, 
        s.sg_estado_servico, a.cd_animal, a.nm_animal, s.cd_usuario as cuidador, u.cd_isCare
            from servico as s join animal as a
                on a.cd_animal = s.cd_animal
                    join usuario as u
                        on u.cd_usuario = a.cd_usuario 
                            where s.sg_estado_servico = 'S' and u.cd_usuario=:id and s.cd_usuario is null";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam("id", $id);

        $stmt->execute();

        $message=$stmt->fetchAll(PDO::FETCH_OBJ);
        $response->getBody()->write(json_encode($message));
        return $response;
    }

    function getConfirmedServices(Request $request, Response $response, array $args){
        $id=$args['id'];
        $isCare=$args['isCare'];
        $conn = getConn();

        if($isCare == "true"){
            $sql = "SELECT s.cd_servico, tutor.cd_usuario as tutor, tutor.nm_usuario as tutorName, s.nm_tipo_servico, s.dt_time_servico, s.vl_servico, 
            s.sg_estado_servico, a.nm_animal, cuidador.cd_usuario as cuidador, cuidador.nm_usuario as cuidadorName, cuidador.cd_isCare
                from servico as s join animal as a
                    on a.cd_animal = s.cd_animal
                        join usuario as tutor
                            on tutor.cd_usuario = a.cd_usuario
                                join usuario as cuidador
                                    on cuidador.cd_usuario = s.cd_usuario
                where s.sg_estado_servico = 'S' and cuidador.cd_usuario=:id and s.cd_usuario is not null";
        }else if($isCare == "false"){
            $sql = "SELECT s.cd_servico, tutor.cd_usuario as tutor, tutor.nm_usuario as tutorName, s.nm_tipo_servico, s.dt_time_servico, s.vl_servico, 
            s.sg_estado_servico, a.nm_animal, cuidador.cd_usuario as cuidador, cuidador.nm_usuario as cuidadorName, cuidador.cd_isCare
                from servico as s join animal as a
                    on a.cd_animal = s.cd_animal
                        join usuario as tutor
                            on tutor.cd_usuario = a.cd_usuario
                                join usuario as cuidador
                                    on cuidador.cd_usuario = s.cd_usuario
                where s.sg_estado_servico = 'S' and tutor.cd_usuario=:id and s.cd_usuario is not null";
        }

        $stmt = $conn->prepare($sql);
        $stmt->bindParam("id", $id);

        $stmt->execute();

        $message=$stmt->fetchAll(PDO::FETCH_OBJ);
        $response->getBody()->write(json_encode($message));
        return $response;
    }

    function getRequests(Request $request, Response $response, array $args){
        $stmt = getConn()->prepare(
            "SELECT s.*, tp.nm_tipo_animal as specie, rc.nm_raca_animal as race, u.nm_usuario, a.cd_peso_animal, a.dt_nascimento_animal, a.nm_genero_animal from servico as s 
                join animal as a on a.cd_animal = s.cd_animal
                    join raca_animal as rc on rc.cd_raca_animal = a.cd_raca_animal
                        join tipo_animal as tp on tp.cd_tipo_animal = rc.cd_tipo_animal
                    join usuario as u on u.cd_usuario = a.cd_usuario
            where sg_estado_servico='S' and s.cd_usuario is null");
        $stmt->execute();
        $message=$stmt->fetchAll(PDO::FETCH_OBJ);
        $response->getBody()->write(json_encode($message));
        return $response;
    }

    function getRequestAccept(Request $request, Response $response, array $args){
        $id=$args['id'];
        $serviceID=$args['serviceID'];
        $stmt = getConn()->prepare(
            "UPDATE servico SET cd_usuario=:id where cd_servico=:serviceID");
        $stmt->bindParam("id", $id);
        $stmt->bindParam("serviceID", $serviceID);
        $stmt->execute();
        $message = "Cadastrado";
        $response->getBody()->write(json_encode($message));
        return $response;
    }

    $app->run();