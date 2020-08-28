# Survey data redux

Raw reusable (non-personalized) survey data

- Read-only
- Persisted
- Re-fetched only when user changed clinic or when survey got updated by clinic admin

When survey gets initialized, a personalized copy is stored in survey reducer

- placeholders (e.g. "[name]") get replaced with pet props (e.g. pet.name)
