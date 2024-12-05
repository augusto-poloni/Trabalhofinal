<?php
require 'banco1.php';

if (!isset($_GET['id']) || !isset($_GET['origin.name']) || !isset($_GET['status']) || !isset($_GET['species']) || !isset($_GET['gender'])){
    echo 'Erro, id, origin.name, status, species e gender são obrigatórios';
    exit();
}

$Id = $_GET['id'];
$Origem = $_GET['origin.name'];
$Status = $_GET['status'];
$Espécie = $_GET['species'];
$Genero = $_GET['gender'];

$sql = "INSERT INTO tabela (id, origin_name, status, species, gender) 
        VALUES (:Id, :Origem, :Status, :Espécie, :Genero)";	

$qry = $con->prepare($sql);

$qry->bindParam(':id', $Id, PDO::PARAM_INT);
$qry->bindParam(':originName', $Origem, PDO::PARAM_STR);
$qry->bindParam(':status', $Status, PDO::PARAM_STR);
$qry->bindParam(':species', $Espécie, PDO::PARAM_STR);
$qry->bindParam(':gender', $Genero, PDO::PARAM_STR);

$qry->execute();

$nr = $qry->rowCount();

echo $nr;
?>
