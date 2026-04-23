# Habit Tracker - frontend

## Description

Habit Tracker est une application web permettant à un utilisateur de suivre ses habitudes quotidiennes.

Cette partie frontend a été développée avec **React** et **Vite**. Elle permet à un utilisateur de :

- se connecter à l’application ;
- consulter ses habitudes ;
- ajouter une nouvelle habitude ;
- modifier une habitude existante ;
- supprimer une habitude ;
- changer le statut d’une habitude ;
- filtrer ses habitudes selon différents critères.

Le frontend communique avec une API REST sécurisée développée en Symfony.

---

## Fonctionnalités

- Interface utilisateur développée avec React
- Gestion des états avec les hooks `useState` et `useEffect`
- Authentification utilisateur via un formulaire de connexion
- Stockage et gestion du token côté client
- Envoi du token dans les headers HTTP (`X-AUTH-TOKEN`)
- Affichage conditionnel selon l’état de connexion
- Ajout / modification / suppression d’habitudes
- Changement de statut d’une habitude
- Filtres dynamiques :
  - habitudes du jour ;
  - toutes les habitudes ;
  - habitudes à faire ;
  - habitudes terminées ;
  - habitudes par jour sélectionné
- Gestion des erreurs utilisateur
- Mise à jour dynamique de l’interface
- Centralisation des appels API via un service dédié

---

## Technologies utilisées

- React
- Vite
- JavaScript (ES6)
- HTML5
- CSS3
- Fetch API
- Node.js (environnement de développement)

---

## Structure du projet
```bash
src/
   components/
   - HabitForm.jsx
   - HabitItem.jsx
   - HabitList.jsx
   - LoginForm.jsx
   pages/
   services/
   - api.js
   - auth.js
   - habitService.js
   App.jsx
   main.jsx
   index.css
   main.css

```
## Points techniques travaillés
Ce projet m’a permis de travailler :

- la structuration d’une application React ;
- la gestion des états et des interactions utilisateur ;
- la mise à jour dynamique de l’interface ;
- la communication avec une API REST ;
- l’authentification côté frontend ;
- la séparation des responsabilités dans le code.

---

👩‍💻 Autrice
Projet réalisé par Sylvie
Formation Graduate Développeur Web Full Stack
