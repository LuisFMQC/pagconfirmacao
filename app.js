var vToken = '';
var vChave = '';
var vStatus = '';
function get(query, chave) {
  var half = query.split('&' + chave + '=')[1];
  if (!half) half = query.split(chave + '=')[1];
  return half !== undefined ? decodeURIComponent(half.split('&')[0]) : null;
}

function getp(queryString) {
  var half = decodeURIComponent(queryString.split('/confirmacao/')[1]);

  return half !== undefined ? half : null;
}

function getstatus(queryString) {
  var half = decodeURIComponent(queryString.split('/')[1]);
  return half !== undefined ? half : null;
}

function conf(e) {
  fetch(endApi + vChave + '/1', {
    method: 'POST',
    //mode: 'no-cors',
    //withCredentials: true,
    //credentials: 'include',
    headers: {
      Authorization: 'Bearer ' + vToken,
      'Access-Control-Allow-Origin': '*',
    },
  })
    .then(function (response) {
      console.log('vChave:', vChave);
      console.log('Token:', vToken);
      if (response.ok) {
        console.log('Confirmacao bem sucedida');
        alert('Obrigado. Sua confirmação foi enviada com sucesso!');
        if (e == null) {
          window.close();
        }
        return true;
      }
      throw new Error(
        'Desculpe, aconteceu algum erro! Essa confirmação já foi enviada? Caso não, favor entrar em contato com a clínica',
      );
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
    });
}

function des(e) {
  //window.location.replace(meusiteid+'/2');
  fetch(endApi + vChave + '/2', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + vToken,
      'Access-Control-Allow-Origin': '*',
    },
  })
    .then(function (response) {
      if (response.ok) {
        console.log('Desmaracacao bem sucedida');
        alert('Obrigado. Sua opção de Desmarcar foi enviada com sucesso!');
        if (e == null) {
          window.close();
        }
        return true;
      }
      throw new Error(
        'Desculpe, aconteceu algum erro! Essa opção já foi enviada? Caso não, favor entrar em contato com a clínica',
      );
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
    });
}

const endApi = 'https://apikonsist.ngrok.io/agendamento/confirmacao/';
var url = window.location.href;
var meuid = getp(url);
console.log(meuid);
vChave = meuid.split('£')[0];
vToken = meuid.split('£')[1];
vStatus = meuid.split('£')[2];
if (vStatus != undefined) {
  if (vStatus == '1') {
    conf(null);
  }
  if (vStatus == '2') {
    des(null);
  }
  //console.log('Status:',vStatus)
}
//console.log(vChave)
//console.log(vToken)
//console.log(vStatus)
if (meuid != null) {
  document.getElementById('linknaurl1').addEventListener('click', function (e) {
    conf(e);
  });
  document.getElementById('linknaurl2').addEventListener('click', function (e) {
    des(e);
  });
}
