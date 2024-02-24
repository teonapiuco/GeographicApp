
## Descriere generală

Această aplicație web este dezvoltată folosind React.js și Google Maps API, permițând utilizatorilor să caute locații, să vizualizeze rute și să calculeze distanța între două puncte selectate pe hartă.

## Caracteristici

Căutare cu autocompletare pentru locații.
Afișare de marcaje pe hartă pentru locațiile selectate.
Vizualizarea rutei între locațiile desemnate.
Actualizare în timp real a distanței dintre cele două locații.

## Tehnologii utilizate

*React.js*
*Google Maps API*
*React Hot Loader*
*CSS* pentru stilizare

## Considerații privind securitatea

Aplicația restricționează utilizarea cheii API Google Maps exclusiv pentru a funcționa pe localhost, asigurând securitatea și integritatea datelor utilizatorilor.

## Instalare

Asigură-te că ai Node.js și npm instalate înainte de a începe. În cazul în care nu le ai instalate descarcă și instalează Node.js de pe site-ul oficial https://nodejs.org/en. Folosește **npm install** pentru instalarea dependențelor. La final, poți verifica versiunile instalate cu **node -v** și **npm -v**.

Actualizează pachetele:
**npm update**

Instalează dependențele:
**npm install react@18 react-dom@18**

Instalează React Hot Loader:
**npm install react-hot-loader@latest**

Instalează pachetele necesare pentru Google Maps și pentru autocompletare:
**npm install react-places-autocomplete@latest**
**npm install @react-google-maps/api@latest**


## Utilizare

Obține o cheie API Google Maps:
Accesează Google Cloud Console, creează un proiect nou, activează Google Maps JavaScript API, Places API, Directions API și generează o cheie API.

Configurează cheia API:
Înlocuiește cheia API aflată în fișierul App.js cu cheia ta reală: googleMapsApiKey: "CHEIA_TA_API_GOOGLE_MAPS".

Pornește serverul:
**npm start**

Acesta va lansa aplicația la adresa http://localhost:3000 în browser-ul tău web.
Utilizează câmpurile de căutare pentru a găsi și selecta două locații pe hartă.
Aplicația va afișa în timp real marcaje pentru locațiile selectate, va trasa ruta optimă între ele și va arăta distanța calculată în km.
Poți modifica aleatoriu una dintre cele două destinații alese, iar ruta și distanța se vor actualiza în timp real.

## Autor
Teona Piuco
Grupa: SDTW-1B
