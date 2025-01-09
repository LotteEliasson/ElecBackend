### Projekt udarbejdet af Lotte Facer Eliasson

# Electrical Parts
Et fullstack projekt der kan håndtere hvilke elektriske komponenter der har korrekt anvendelse på en specifik hovedmotor

## Webapplikationen
Her kan udføres alle CRUD operationer, dens primære formål er at administrere databasen.

Samtidig er det muligt at se dokumentation tilføjet fra brugerne af mobil applikationen.

Kræver login som er beskrevet i efterfølgende under Webapplikation

## Mobilapplikationen
Dens primære formål at vise den origanle dokumentation efter hvilken hovedmoter der arbejdes på.
Samtidig er det muligt at: 
  - Efterspørge nye komponenter via en autogeneret Email
  - Dokumentere eget arbejde.
  - Lave en Q/A-attest

### Efter login (beskrevet under mobilapp længere nede) kan man via TABS-menuen i bunden af skærmen vælge 
- **Cabinet Details**
  - Scan vedlagte QR-kode
    - Denne menu vil vise en liste af pressable komponenter, vis de trykkes på åbner en modal, hvor nye muligheder vises:
      - Order Component (mulighed for at efterspørge det komponent der er trykket på)
      - More Details (mulighed for at se pdf-dokumentation på komponentet
- **Picture Documentation**
  - Scan vedlagte GR-kode
    - Denne menu giver mulighed for at oprette dokumentation på udført arbejde
      - Udfyld felter
      - Tag et billede ved at trykke på kamera-ikon
- **Drawer-menuen venstre øverst giver flere muligheder for at se detaljer om**
  - Ship
  - Engine
  - Components
  - Own Work
  - Logout

**NB Picture Documentation virker ikke efter hensigten, anvend Cabinet Details for at teste QR-kode etc.**

QR-KODE der skal anvendes til at scanne i mobilapplikationen:

![image](https://github.com/user-attachments/assets/fc3b4b7f-48ac-41e7-ac88-fb02ae3c8832)

## Links til deployede versioner
- **Webapplikation**: https://happy-mushroom-0ed273703.4.azurestaticapps.net
- **Mobilapplikation (kun Android)**: https://play.google.com/apps/internaltest/4701738040560284851  


## GitHub Links til lokal kørsel af projektet
- **Backend:** https://github.com/LotteEliasson/ElecBackend.git
- **frontend:** https://github.com/LotteEliasson/ElecFrontend.git
- **mobil:** https://github.com/LotteEliasson/mobileElectricalParts.git

## DATABASE
### kør MySQL-Script i workbench:
**https://github.com/LotteEliasson/ElecBackend/blob/main/create_database.sql**

## BACKEND
### Naviger til backend-mappen og installer afhængigheder:  
cd ElecBackend  
### Installer dependencies:
npm install

### Opret en .env fil i roden af projektet
**.env-filens indhold:**

DB_HOST=localhost  
DB_USER=root  
DB_PASSWORD= Dit eget password 
DB_NAME=electrical_parts  
PORT=5000  
JWT_SECRET=Love3006_ForGood3103_AllwaysRemember  
EMAIL_USER=worker24121990@gmail.com  
EMAIL_PASS=giqprxavhbpfqgpp  

### Start backend:  
node server.js  

## WEBAPPLIKATIONEN
### Naviger til webapplikation-mappen og installer afhængigheder:  
cd ElecFrontend
### Installer dependencies:
npm install

### Start webapplikationen:  
npm run dev  

### Login-oplysninger
**Webapplikation**:  
User: alice@example.com  
Password: password123  


## MOBILAPPLIKATIONEN
### Naviger til mobilapplikation-mappen og installer afhængigheder:  
cd mobileElectricalParts/MobileFrontend  
### Installer dependencies:
npm install  

### API til lokal wifi ip-adresse
**MobileFrontend/service/api.js skift:**  
//wifi  
const API_URL = 'http://192.168.1.83:5000/api';  
Til egen ip-adresse: http://xxx.xxx.x.xx:5000/api   
https://github.com/LotteEliasson/mobileElectricalParts/blob/main/MobileFrontend/sevice/api.js  

### Start mobilapplikationen:  
npx expo  

### 

### Login-oplysninger
**Mobilapplikation**:  
User: alice@example.com  
Password: password123  
Engine no: KAA008026 


 
