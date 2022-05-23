<!DOCTYPE html>
<html>
<head>
<link href="zfileup.css" rel="stylesheet">
</head>
<body>
<script src="zfileup.js"></script>
<form action="" method="post" enctype="multipart/form-data">
  
  <div id="uploader" class="uploader">
  <span id="arraste">Clique ou arraste os arquivos aqui</span>
  <span hidden id="enviado">Arquivo Enviado!</span>
  <input hidden type="file" name="file[]" id="inputarquivo" multiple>
  </div>
</br>
  <input type="submit" value="Enviar formulario" name="submit">
</form>

<?php
// Visit https://github.com/WillRnz/zfileuploader for more details.

if(isset($_POST["submit"])) {
  $diretorio_arquivos = getcwd() . "/uploads/";
  $arquivostotal = count($_FILES['file']['name']);

  for($i=0;$i<$arquivostotal;$i++){
    $nomearquivo = $_FILES['file']['name'][$i];
    $arquivotemporario = $_FILES['file']['tmp_name'][$i];
    $arquivofinal = $diretorio_arquivos . basename($nomearquivo);
    $arquivotipo = strtolower(pathinfo($arquivofinal,PATHINFO_EXTENSION));

    if (move_uploaded_file($arquivotemporario, $arquivofinal)) {
      echo "<script>ArquivoEnviado();</script>";
    } else {
      alert("Desculpe, ocorreu um erro ao processar seu arquivo.");
    }
  }
}
?>

</body>
</html>
