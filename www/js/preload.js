if(window.localStorage.getItem('authToken') != null && window.localStorage.getItem('authToken') != "") {
  LoginService.loginToken(window.localStorage.getItem('authToken')).success(function(data) {
    //Le token existe déjà et fonctionne
    $window.location.href = "#/listcams"
  }).error(function(data) {
    //Le token n'est pas bon
    window.localStorage.setItem('authToken', "");
  })
} else {
  //Le token n'a pas été trouvé
}
