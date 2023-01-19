NodeJS Exam

Sukurkite sistemą, kuri leistų registruotiems vartotojams prisijungti į grupes ir dalintis sąskaitomis. Įsivaizduokite, kad keliaujate su draugais ir dažnai sąskaitas apmoka vienas žmogus. Vėliau tas žmogus nori atgauti iš Jūsų pinigus , o Jūs jau pamiršote už ką turėtumėte su juo atsiskaityti. Ši sistema turėtų padėti išspręsti šią problemą, nes ji leis dalintis išlaidomis/sąskaitomis su pasirinkta grupe. Panašios programos pavyzdys yra Tricount, aišku, tik mes ją darysime truputį paprasčiau. Prieš pradedant darbą, taip pat, panagrinėkite prie užduoties prisegtus "screenshots", jie padės Jums suprasti, kaip turėtų atrodyti vartotojo sąsaja.

Mūsų kuriama sistema susidarys iš 3 dalių - duomenų bazės, serverio (back-end) ir klientinės dalies (front-end).

Duomenų bazė turėtų turėti 4 lenteles su skliausteliuose nurodytais stulpeliais:
users (id, full_name, email, password, reg_timestamp) <- šioje lentelėje saugomi registruoti vartotojai
groups (id, name) <- čia saugomos grupės. Į groups lentelę galite iš karto įsirašyti kelis įrašus bet kokiu kitu jums patogiu būdu (pvz. “Trip to Spain”, “Going to Alps”, “Dinner in Belgium”, “Trip to Finland”, “New Years Party”, ar panašiai)
bills (id, group_id, amount, description) <- šioje lentelėjė saugomos sąskaitos ir ryšys su grupe, kuriai priklauso sąskaita
accounts (id, group_id, user_id) <- ši lentelė skirta žinoti kokioms grupėms priklauso kiekvienas vartotojas

P.S. duomenų tipus ir constraints pasirinkite savo nuožiūra.
Back-end turės žemiau išvardintus maršrutus (angl. routes):
POST /register - gauname vartotojo duomenis, juos validuojame ir išsaugome į duomenų bazę.
POST  /login - gauname vartotojo duomenis, validuojame ir patikriname ar toks vartotojas egzistuoja pagal email ir password. Jei egzistuoja, sugeneruojame token su user_id ir jį grąžiname. Jei ne, grąžiname klaidą su žinute, kas buvo negerai.
POST /groups - tik prisijungusiems vartotojams sukuriama nauja grupė groups lentelėje.
GET /groups - grąžina groups lentelės informaciją (bus naudinga groups.html select laukui generuoti)
POST /accounts - endpoint'as skirtas priskirti vartotoją kažkuriai grupei. Vartotojas paduoda group_id ir savo token, iš kurio galite pasiimti user_id. Sukuriamas įrašas lentelėje accounts.
GET /accounts - paduoda visas prisijungusio vartotojo grupes (reikės JOIN operacijos su groups lentele). Vėl, user_id pasiimame iš token.
GET /bills/:group_id – endpointas skirtas grąžinti visas konkrečiai grupei skirtas sąskaitas/išlaidas.
POST /bills - įrašo naują sąskaitą specifinei grupei (šis endpoint'as turėtų priimti: group_id, amount, description).

Front-end turėtų turėti žemiau išvardintus puslapius:
register.html - vartotojas įrašo vardą, emailą ir slaptažodį du kartus (jeigu slaptažodžiai nesutampa ar yra kitokia validacijos klaida - vartotojas nėra sukuriamas).
login.html - vartotojas įrašo emailą, slaptažodį; gauna token; ir nukreipia į groups puslapį.
groups.html - vartotojas mato visas savo grupes (pagal accounts lentelę iš DB). Paspaudus - nuveda į tos grupės bills. Apačioje turėtų būti forma, kuri leistų vartotojui prisijungti į pasirinktą grupę.
bills.html - mato sąskaitas specifinės grupės ir gali pridėti naujas.

P.S. padalinimas į puslapius nebūtinai turi būti toks, kaip nurodyta. Svarbiausia, kad būtų išpildyti funkciniai reikalavimai. Jei norite, galite viską atvaizduoti ir dinamiškai viename puslapyje (ar HTML faile).