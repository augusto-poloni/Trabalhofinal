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

$sql = "SELECT * FROM tabela 
        WHERE id = :Id 
        AND origin_name = :Origem 
        AND status = :Status 
        AND species = :Espécie 
        AND gender = :Genero 
        ORDER BY rickapi";	

$qry = $con->prepare($sql);

$qry->bindParam(':id', $Id, PDO::PARAM_INT);
$qry->bindParam(':originName', $Origem, PDO::PARAM_STR);
$qry->bindParam(':status', $Status, PDO::PARAM_STR);
$qry->bindParam(':species', $Espécie, PDO::PARAM_STR);
$qry->bindParam(':gender', $Genero, PDO::PARAM_STR);

$qry->execute();

$registros = $qry->fetchAll(PDO::FETCH_OBJ);

echo json_encode($registros);
?>
