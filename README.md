# Habit Tracker - Frontend

## Description

Ce projet correspond au frontend de l’application **Habit Tracker**, développée dans le cadre de ma formation Graduate Développeur Web Full Stack.

L’application permet à un utilisateur connecté de gérer ses habitudes quotidiennes : création, modification, suppression, validation par jour, filtrage, consultation des statistiques et suivi de l’historique.

Le frontend communique avec une API REST développée en Symfony.

## Fonctionnalités principales

- Connexion utilisateur
- Déconnexion
- Affichage des habitudes
- Création d’une habitude
- Modification d’une habitude
- Suppression d’une habitude
- Validation d’une habitude selon une date
- Filtres par statut : aujourd’hui, toutes, à faire, terminées
- Filtres par jour de la semaine
- Affichage de statistiques du jour
- Consultation de l’historique

## Stack technique

- React
- JavaScript
- Vite
- CSS
- Fetch API
- Docker

## Architecture du projet

```txt
src/
|__ components/
│   |__ HabitForm.jsx
│   |__ HabitList.jsx
│   |__ HabitItem.jsx
│   |__ LoginForm.jsx
│   |__ Stats.jsx
│   |__ History.jsx
|__ services/
│   |__ api.js
│   |__ auth.js
│   |__ habitService.js
│   |__ statsService.js
|__ App.jsx
|__ main.jsx
|__ main.css
```

## Installation
Cloner le projet:
```bash
git clone <https://github.com/Milady28002/habit-tracker.git>
```

Se placer dans le dossier frontend :
```
cd HABIT-TRACKER
```

Installer les dépendances :
```bash
npm install
```

Lancer le projet en local :
```bash
npm run dev
```
Application :
http://localhost:5173/

## Configuration
L’URL de l’API est centralisée dans le fichier :
src/services/api.js

Exemple:
```
const API_URL = "http://localhost:8000/api";

export default API_URL;
```

## Communication avec l'API
Le frontend utilise fetch pour communiquer avec le backend Symfony.

Les appels API sont regroupés dans le dossier :
src/services/

Exemples de services :

- auth.js : gestion de la connexion, du token et de la déconnexion
- habitService.js : gestion des habitudes
- statsService.js : fichier conservé pour une évolution future des statistiques avancées

## Authentification
L’utilisateur se connecte via un formulaire de connexion.

Après validation des identifiants, le backend retourne un token d’authentification. Ce token est stocké côté frontend dans le localStorage, puis envoyé dans les requêtes API via le header :

X-AUTH-TOKEN

Cela permet de sécuriser les données et de récupérer uniquement les habitudes de l’utilisateur connecté.

## Gestion des habitudes
Les habitudes sont chargées depuis l’API selon la date sélectionnée.

Chaque habitude contient notamment :

un identifiant
un titre
une liste de jours associés
un statut de validation pour la date consultée

La validation d’une habitude est liée à une date précise afin d’éviter qu’une habitude cochée aujourd’hui soit automatiquement cochée sur les autres jours.

## Statistiques
Les statistiques du jour sont calculées directement côté frontend à partir des habitudes déjà chargées.

Ce choix permet :

- d’éviter un appel API supplémentaire
- d’améliorer les performances
- d’éviter les incohérences entre l’affichage principal et la page statistiques

Le fichier **statsService.js** est conservé pour une évolution future, notamment pour des statistiques avancées sur plusieurs jours.

## Docker
Le projet peut être lancé dans un environnement Docker si la configuration Docker est présente dans le repository.

Exemple de commande :
```bash
docker compose up --build
```

Lancer le projet en développement:
```bash
npm run dev
```

Construire le projet:
```bash
npm run build
```

Prévisualiser le build :
```bash
npm run preview
```

## Points techniques travaillés
Ce projet m'a permis de travailler plusieurs compétences importantes :
- structuration d'une application React
- création et organisation de composants
- gestion des états avec **useState**
- changement des données avec **useEffect**
- consommation d'une API REST
- hestion d'une authentification par token
- gestion des erreurs côté interface
- filtrage dynamique des données
- séparation entre logique d'affichage et appels API
- optimisation des performances côté frontend

## Evolutions possibles
- ajout d'un formulaire d'inscription
- amélioration de l'interface utilisateur
- ajout de statistiques sur 7 ou 30 jours
- ajout de graphiques
- amélioration de l'historique
- gestion d'objectifs personnalisés

### Auteur
Projet réalisé par Sylvie Mendez dans le cadre de ma formation Graduate Développeur Web Full Stack.