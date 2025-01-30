export const INDICATOR_CATEGORIES = {
    "Participation": [
        "Nombre total de participants",
        "Répartition par genre (Homme/Femme)",
        "Participants par tranche d'âge",
    ],
    "Performance": [
        "Taux de présence (inscrits vs présents)",
        "Nombre moyen d'activités suivies par participant",
        "Taux de rétention des participants",
        "Sessions réalisées vs prévues",
        "Taux de satisfaction des participants",
    ],
    "Impact": [
        "Nombre de startups/projets lancés",
        "Nombre de collaborations initiées",
        "Acquisition de nouvelles compétences",
        "Participants ayant trouvé un emploi",
        "Nombre de mentors/coachs mobilisés",
    ],
    "Financier": [
        "Coût total de l'activité",
        "Coût moyen par participant",
        "Montant des financements obtenus",
    ],
    "Numérique": [
        "Publications sur les réseaux sociaux",
        "Engagement des publications (likes, partages, commentaires)",
        "Visites sur le site web suite à l'activité",
    ],
};

export const INPUT_TYPES : { [key: string]: string } = {
    "Nombre total de participants": "number",
    "Répartition par genre (Homme/Femme/Autre)": "text",
    "Participants par tranche d'âge": "text",
    "Taux de présence (inscrits vs présents)": "number",
    "Nombre moyen d'activités suivies par participant": "number",
    "Taux de rétention des participants": "number",
    "Sessions réalisées vs prévues": "number",
    "Taux de satisfaction des participants": "number",
    "Nombre de startups/projets lancés": "number",
    "Nombre de collaborations initiées": "number",
    "Acquisition de nouvelles compétences": "text",
    "Participants ayant trouvé un emploi": "number",
    "Nombre de mentors/coachs mobilisés": "number",
    "Coût total de l'activité": "number",
    "Coût moyen par participant": "number",
    "Montant des financements obtenus": "number",
    "Publications sur les réseaux sociaux": "number",
    "Engagement des publications (likes, partages, commentaires)": "number",
    "Visites sur le site web suite à l'activité": "number",
};