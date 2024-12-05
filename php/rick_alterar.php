<?php
require 'banco1.php';

if (!isset($_GET['gender']) || !isset($_GET['species']) || !isset($_GET['origin.name']) || !isset($_GET['status']) || !isset($_GET['id'])){
    echo 'Erro, id, origin.name, status, species e gender são obrigatórios';
    exit();
}

$Id = $_GET['id'];
$Espécie = $_GET['species'];
$Status = $_GET['status'];
$Genero = $_GET['gender'];
$Origem = $_GET['origin.name'];

$sql = "UPDATE tabela SET species = :Espécie, status = :Status, gender = :Genero, origin_name = :Origem WHERE id = :Id";
$qry = $con->prepare($sql);

$qry->bindParam(':id', $Id, PDO::PARAM_INT);
$qry->bindParam(':species', $Espécie, PDO::PARAM_STR);
$qry->bindParam(':status', $Status, PDO::PARAM_STR);
$qry->bindParam(':gender', $Genero, PDO::PARAM_STR);
$qry->bindParam(':originName', $Origem, PDO::PARAM_STR);


$qry->execute();

$nr = $qry->rowCount();
echo $nr;
?>
