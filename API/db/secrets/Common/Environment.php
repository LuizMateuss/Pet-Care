<?php
namespace Sct\Common;

class Environment{
    /**
     * Carrega as variáveis de ambiente
     * @param string $dir Caminho da pasta do .env
     */
    public static function load($dir){
        //Verifica se o arquivo .env está no projeto
        if(!file_exists($dir.'/.env')){
            return false;
        }
        //Define as variáveis de ambiente
        $lines = file($dir.'/.env');
        foreach ($lines as $line) {
            putenv(trim($line));
        }
        
    }
}