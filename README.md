### Visiting Card Extractor Backend

### steps to run the server
1. ```node version 18``` required
2. ```npm i```
3. ```npm start```

### apis
1. ```GET /health``` - to check the health of the server
2. ```POST /api/v1/upload``` - to upload the png/jpg file
3. ```POST /api/v1/save/card``` - to save the card 
4. ```GET /api/v1/get/cards``` - to get the paginated card data (send ```page_no``` in the query)

### Visiting Card Extractor Frontend [repo](https://github.com/azad1947/visiting-card-extractor-frontend)