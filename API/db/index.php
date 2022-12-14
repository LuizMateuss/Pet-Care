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
    $app->map(['get', 'post'], '/verifyRegistration/{email}', 'getVerifyRegistration');
    $app->map(['get', 'post'], '/registration/{name}/{email}/{password}/{birthday}/{phone}/{isCare}/{cep}/{addressNumber}/{logradouro}/{addressComplement}/{bairro}/{localidade}/{uf}', 'getRegistration');
    $app->map(['get', 'post'], '/updateUser/{id}/{newName}/{newEmail}/{newPhone}/{zipCode}/{newHouseNumber}/{street}/{newComplement}/{district}/{city}/{uf}', 'getUpdateUser');
    $app->map(['get', 'post'], '/changepasswd/{id}/{currentpasswd}/{newpasswd}', 'getChangePasswd');
    $app->map(['get', 'post'], '/addressInformations/{id}', 'getAddressInformations');
    $app->map(['get', 'post'], '/registrationAnimal/{id}/{name}/{birth}/{gender}/{weight}/{description}/{size}/{race}', 'getregistrationAnimal');
    $app->map(['get', 'post'], '/petInformations/{id}', 'getPetInformations');
    $app->map(['get', 'post'], '/deletePet/{id}', 'getDeletePet');
    $app->map(['get', 'post'], '/updatePet/{id}/{petName}/{petWeight}/{petDescription}', 'getUpdatePet');
    $app->map(['get', 'post'], '/setService/{selectedPet}/{servico}/{formatedDate}/{serviceStatus}/{servicePrice}/{serviceZipCode}/{serviceHouseNumber}/{serviceHouseComplement}', 'getSetService');
    $app->map(['get', 'post'], '/requestedServices/{id}', 'getRequestedServices');
    $app->map(['get', 'post'], '/confirmedServices/{id}/{isCare}', 'getConfirmedServices');
    $app->map(['get', 'post'], '/requests', 'getRequests');
    $app->map(['get', 'post'], '/requestAccept/{id}/{serviceID}', 'getRequestAccept');


    //FUN????ES DE CONC????O
    
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

    function getVerifyRegistration(Request $request, Response $response, array $args){
        $email = $args['email'];
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

    function getRegistration(Request $request, Response $response, array $args){
        $name = $args['name'];
        $email = $args['email'];
        $password = $args['password'];
        $birthday = $args['birthday'];
        $phone = $args['phone'];
        $isCare = $args['isCare'];

        $cep = $args['cep'];
        $addressNumber = $args['addressNumber'];
        $logradouro = $args['logradouro'];
        $addressComplement = $args['addressComplement'];
        $bairro = $args['bairro'];
        $localidade = $args['localidade'];
        $uf = $args['uf'];
        $conn = getConn();
        
        $sql = "INSERT INTO usuario 
                    SET nm_usuario=:nm_usuario, nm_email=:nm_email, nm_senha=:nm_senha, dt_nascimento=:dt_nascimento, cd_telefone=:cd_telefone, cd_isCare=:cd_isCare";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam("nm_usuario", $name);
        $stmt->bindParam("nm_email", $email);
        $stmt->bindParam("nm_senha", $password);
        $stmt->bindParam("dt_nascimento", $birthday);
        $stmt->bindParam("cd_telefone", $phone);
        $stmt->bindParam("cd_isCare", $isCare);
        $stmt->execute();

        $sql = "SELECT cd_usuario, nm_usuario FROM usuario WHERE nm_email=:nm_email";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam("nm_email", $email);
        $stmt->execute();
        $message=$stmt->fetchObject();

        $id=$message->cd_usuario;

        $sql = "INSERT INTO endereco
            SET nm_logradouro=:logradouro, cd_numero_rua=:addressNumber,nm_complemento=:addressComplement, nm_bairro=:bairro, nm_cidade=:localidade, nm_uf=:uf, cd_cep=:cep, cd_usuario=:id";
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

    function getUpdateUser(Request $request, Response $response, array $args){
        $id=$args['id'];
        $newName=$args['newName'];
        $newEmail=$args['newEmail'];
        $newPhone=$args['newPhone'];
        $zipCode=$args['zipCode'];
        $newHouseNumber=$args['newHouseNumber'];
        $street=$args['street'];
        $newComplement=$args['newComplement'];
        $district=$args['district'];
        $city=$args['city'];
        $uf=$args['uf'];

        $sql = "UPDATE usuario 
                    SET nm_usuario=:UserName, nm_email=:newEmail, cd_telefone=:newPhone 
                WHERE cd_usuario=:id";
        $stmt = getConn()->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->bindParam("UserName", $newName);
        $stmt->bindParam("newEmail", $newEmail);
        $stmt->bindParam("newPhone", $newPhone);
        $stmt->execute();

        $sql = "UPDATE endereco
                    SET cd_cep=:zipCode, cd_numero_rua=:newHouseNumber, nm_logradouro=:street, nm_complemento=:newComplement, nm_bairro=:district, nm_cidade=:city, nm_uf=:uf
                WHERE cd_usuario=:id";
        $stmt = getConn()->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->bindParam("zipCode", $zipCode);
        $stmt->bindParam("newHouseNumber", $newHouseNumber);
        $stmt->bindParam("street", $street);
        $stmt->bindParam("newComplement", $newComplement);
        $stmt->bindParam("district", $district);
        $stmt->bindParam("city", $city);
        $stmt->bindParam("uf", $uf);
        $stmt->execute();
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

    function getDeletePet(Request $request, Response $response, array $args){
        $id=$args['id'];
        $conn = getConn();

        $sql="DELETE FROM animal WHERE cd_animal=:id";
        $stmt=$conn->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
    }

    function getUpdatePet(Request $request, Response $response, array $args){
        $id=$args['id'];
        $petName=$args['petName'];
        $petWeight=$args['petWeight'];
        $petDescription=$args['petDescription'];
        $conn = getConn();

        $sql="UPDATE animal
                 SET nm_animal=:petName, cd_peso_animal=:petWeight, ds_animal=:petDescription
                WHERE cd_animal=:id;";
        $stmt=$conn->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->bindParam("petName", $petName);
        $stmt->bindParam("petWeight", $petWeight);
        $stmt->bindParam("petDescription", $petDescription);
        $stmt->execute();
    }

    function getSetService(Request $request, Response $response, array $args){
        $servico=$args['servico'];
        $formatedDate=$args['formatedDate'];
        $serviceStatus=$args['serviceStatus'];
        $servicePrice=$args['servicePrice'];
        $selectedPet=$args['selectedPet'];
        $serviceZipCode=$args['serviceZipCode'];
        $serviceHouseNumber=$args['serviceHouseNumber'];
        $serviceHouseComplement=$args['serviceHouseComplement'];
        $conn = getConn();

        $sql = "INSERT INTO servico SET nm_tipo_servico=:servico, dt_time_servico=:formatedDate, sg_estado_servico=:serviceStatus, vl_servico=:servicePrice, cd_animal=:selectedPet, cd_cep_historico=:serviceZipCode, cd_numero_rua_historico=:serviceHouseNumber, nm_complemento_historico=:serviceHouseComplement";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam("servico", $servico);
        $stmt->bindParam("formatedDate", $formatedDate);
        $stmt->bindParam("serviceStatus", $serviceStatus);
        $stmt->bindParam("servicePrice", $servicePrice);
        $stmt->bindParam("selectedPet", $selectedPet);
        $stmt->bindParam("serviceZipCode", $serviceZipCode);
        $stmt->bindParam("serviceHouseNumber", $serviceHouseNumber);
        $stmt->bindParam("serviceHouseComplement", $serviceHouseComplement);

        $stmt->execute();

        $message = "Cadastrado";
        $response->getBody()->write(json_encode($message));
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
            where sg_estado_servico='s' and s.cd_usuario is null");
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