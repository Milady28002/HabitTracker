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
Cloner le projer:
```bash
git clone <https://github.com/Milady28002/habit-tracker.git>