# Survey data redux

Raw reusable (non-personalized) survey data

- Read-only for pet-owner
- Clinic admin replaces entire store on submit
- Persisted
- Re-fetched only when user changed clinic or when survey remote version is newer than local

When survey gets initialized, a personalized copy is stored in survey reducer

- placeholders (e.g. "[name]") get replaced with pet props (e.g. pet.name)
