# 🥈 Module Service — MyPetly

## 🚀 Objectifs

* CRUD complet des services (création, édition, suppression, activation)
* Gestion multilingue (fr, en, it) des labels/descriptions
* Assignation/déliaison des providers (relation n-n)
* Activation/désactivation rapide

---

## 🧩 Schéma des endpoints API

| Action                   | Méthode | Endpoint                                 | Description                               |
| ------------------------ | ------- | ---------------------------------------- | ----------------------------------------- |
| Lister tous les services | GET     | `/services`                              | Liste paginée + recherche/filtre          |
| Ajouter un service       | POST    | `/services`                              | Créer un service multilingue              |
| Détail d’un service      | GET     | `/services/{id}`                         | Infos détaillées + providers liés         |
| Modifier un service      | PUT     | `/services/{id}`                         | Editer label, description, is\_active     |
| Supprimer un service     | DELETE  | `/services/{id}`                         | Suppression définitive                    |
| Assigner providers       | POST    | `/services/{id}/providers`               | Lier un ou plusieurs providers au service |
| Délier un provider       | DELETE  | `/services/{id}/providers/{provider_id}` | Retirer un provider d’un service          |

---

## 🗂️ Structure type d’un service

```json
{
  "id": 1,
  "label": { "fr": "Toilettage", "en": "Grooming", "it": "Toelettatura" },
  "description": { "fr": "...", "en": "...", "it": "..." },
  "is_active": true,
  "providers": [
    {
      "id": 10,
      "name": "Cabinet du Chien",
      "status": "active"
    }
  ],
  "created_at": "...",
  "updated_at": "..."
}
```

---

## 📝 Détail des endpoints

### 1. Lister les services

**GET `/services`**

* Query params : `page`, `search`, `is_active`
* **Réponse** :

```json
{
  "data": [ ... ], "meta": { "current_page": 1, ... }
}
```

---

### 2. Ajouter un service

**POST `/services`**

* Payload :

```json
{
  "label": { "fr": "...", "en": "...", "it": "..." },
  "description": { "fr": "...", "en": "...", "it": "..." },
  "is_active": true
}
```

* Réponse : Service créé

---

### 3. Détail d’un service

**GET `/services/{id}`**

* Affiche le détail, y compris la liste des providers liés.

---

### 4. Modifier un service

**PUT `/services/{id}`**

* Payload : identique à POST

---

### 5. Supprimer un service

**DELETE `/services/{id}`**

* Réponse : Succès/échec (204/404)

---

### 6. Assigner des providers

**POST `/services/{id}/providers`**

* Payload :

```json
{
  "providers": [12, 13]
}
```

* Réponse : Liste des providers assignés

---

### 7. Délier un provider

**DELETE `/services/{id}/providers/{provider_id}`**

* Réponse : Succès/échec

---

## 🌐 Champs principaux Service

| Champ       | Type  | Description                              |
| ----------- | ----- | ---------------------------------------- |
| id          | int   | Identifiant unique du service            |
| label       | objet | Labels multilingues `{fr, en, it}`       |
| description | objet | Descriptions multilingues `{fr, en, it}` |
| is\_active  | bool  | Service actif/inactif                    |
| providers   | array | Liste des providers liés                 |
| created\_at | date  | Date création                            |
| updated\_at | date  | Date mise à jour                         |

---

## 🔗 Relations

* Un service ⇄ plusieurs providers (relation plusieurs-à-plusieurs)
* Assignation/déliaison via endpoints dédiés

---

## 📦 Exemple de workflow

1. Lister les services
2. Ajouter/modifier un service multilingue
3. Activer/désactiver en un clic
4. Gérer les providers associés depuis la fiche service

---
