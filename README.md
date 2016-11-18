# appMobile
<p>Application Mobile réalisée en Ionic v1</p>
# groupe 1
<p>Loïs Lachaud, Baptiste Lanusse, Yoann Murat, Alexandre Plaitant</p>
<p>Cours IOT - Ingésup Bordeaux - 2016/2017</p>
<br/>
----------------------------------------------------------------------
<br/>
<p>JSMPG ajouté à l'application pour récupérer le flux vidéo de la caméra depuis un serveur node.</p>
<p>Les socket ouverts par l'application (à part celui pour le flux vidéo) sont issus de sails.io.js</p>
<p>L'url de l'api est stockée dans le fichier "js/constants.js" dans la variable urlBaseApi.</p>
<p>Dans le fichier app.js, lors de l'accès à la page de login, l'application vérifie que le token existe, si c'est le cas, qu'il est valide afin de rediriger directement vers l'écran de gestion des caméras et des groupes.</p>
<p>Une directive a été créée dans "js/directives.js" afin de controler (pour la page de création de user) que les deux mots de passes sont les mêmes.</p>
