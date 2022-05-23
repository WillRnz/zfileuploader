// Visit https://github.com/WillRnz/zfileuploader for more details.

let lista = new DataTransfer();
function PegaArquivo(ev) {
  ev.preventDefault();
  if (ev.dataTransfer.items) {
    // Use a interface DataTransferItemList para acessar o (s) arquivo (s) 
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      // Se os itens soltos não forem arquivos, rejeite-os
      if (ev.dataTransfer.items[i].kind === 'file') {
        var file = ev.dataTransfer.items[i].getAsFile();
        let arquivo = new File([file], file.name);
        lista.items.add(arquivo);

        var file64 = btoa(file.name);
        var totalBytes = file.size;
        if(totalBytes < 1000000){
           var _size = Math.floor(totalBytes/1000) + 'KB';
        }else{
           var _size = Math.floor(totalBytes/1000000) + 'MB';  
        }
        let elemento = `<div onclick="arqremove(this);" name="${file.name}" class="arq" id="arq-${file64}"><span class="header">${_size}</span>${file.name}<span class="bottom">Remover</span></div>`;
        document.getElementById('uploader').innerHTML += elemento;  
        ValidaArquivos();
      }
    }
    let arquivosdalista = lista.files;
    inputarquivo.files = arquivosdalista;
  } else {
    // Use a interface DataTransfer para acessar o (s) arquivo (s)
    for (var i = 0; i < ev.dataTransfer.files.length; i++) {
        var file = ev.dataTransfer.files[i];
        console.log('... file[' + i + '].name = ' + file.name);
        let arquivo = new File([file], file.name);
        lista.items.add(arquivo);
    }
    let arquivosdalista = lista.files;
    inputarquivo.files = arquivosdalista;
  }
}

function arqremove(e) {
  let name = atob(e.id.replace("arq-", ""));
  for(let i = 0; i < lista.items.length; i++){
    if(name === lista.items[i].getAsFile().name){
      lista.items.remove(i);
      continue;
    }
  }
  e.remove();
  inputarquivo.files = lista.files;
  ValidaArquivos();
}

function ValidaArquivos() {
  if (lista.items.length > 0) {
    uploader.className = "uploader2";
    arraste.hidden = true;

    return true;
  } else {
    arraste.hidden = false;
    uploader.className = "uploader";
    return false;
  }
}

function ArquivoEnviado() {
  uploader.className = "uploader dragover";
  arraste.hidden = true;
  enviado.hidden = false;
  uploader.id = "enviado";
}

function pcss(evento) {
  switch (evento) {
    case 'dragover':
      
      return false;
     // break;
    case 'drop':
      uploader.className = "uploader";
      break;
    default:
      uploader.className = "uploader";
  }
}

document.addEventListener("dragover", event => {
  event.preventDefault();
  uploader.className = "uploader dragover";
});

document.addEventListener("dragleave", event => {
  if (!ValidaArquivos) {
    pcss('drop');
  }
});

document.addEventListener("drop", event => {
  PegaArquivo(event);
  if (!ValidaArquivos) {
    pcss('drop');
  }
});