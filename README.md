TRACKER RF BASIQUE
==================

Démonstrateur simple permettant de commander une application GNU Radio via une page web.

Le noyau utilise node-red pour l'affichage de la page web, le stockage et le traitement des informations.

L'affichage utilisateur se base sur une page web  avec un dialogue AJAX et Websocket vers le serveur node-red

Ce système est conçu pour fonctionner sur un Raspberry Pi avec un dongle RTL820T 


Installation
============
```
git clone https://github.com/phil-eqtech/SimpleRFTracker
cd SimpleRFTracker
./installer.sh
```


Execution
=========
*Execution directe :*
Depuis le dossier SimpleRFTracker, lancer la commande 
`node-red node-red-flow.json`

*Execution automatique :*
Editer le fichier "simplerftracker.service" pour modifier le dossier d'execution du script afin qu'il corresponde à celui utilisé,
puis copier le fichier dans /etc/systemd/system.
Lancer ensuite les commandes :
```
sudo systemctl start simplerftracker.service
sudo systemctl enable myscript.service
```

Consultation
============
Se connecter au Pi via le moyen ad-hoc (Wifi/Ethernet/RDC)
Consulter la page web sur le port 3000

Exemple : si l'IP du pi est 192.168.1.1
-> http://192.168.1.1:3000
