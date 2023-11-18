# Giphyhakemisto
Web-projekti animoitujen kuvien hakemistosta

## NOTE
This project requires for you to initialize a [Firebase](https://firebase.google.com/docs/projects/api/workflow_set-up-and-manage-project) project and get an api key from [Giphy](https://support.giphy.com/hc/en-us/articles/360020283431-Request-A-GIPHY-API-Key). Following the instructions on their sites, Firebase config needs to be put in `src/firebase.js` and the giphy api key in `src/app.js` into const `apiKey`. Also needs a mysql connection in `server.js`

## Käyttöohjeet
Ensin asenna tarvittavat kirjastot ylempää. Pelkkä `npm install` pitäisi riittää.

HUOM! Sovellus vaatii yhteyden Metropolian verkkoon joko Metropolia-VPN hyödyntäen tai Metropolian lähiverkkoa käyttäen.

Koska kyseessä on paikallinen tietokanta, täytyy projektin avata oma MySql-palvelin. Tämä tapahtuu siirtymällä projektin "src" kansioon, josta palvelin käynnistyy seuraavasti:

>cd giphyproject/src

>node server.js

Komento avaa palvelimen portille 5000, johon se tallentaa tykätyt kuvat sekä käyttäjät.
Tämän jälkeen itse sovelluksen voi avata uudella terminaalilla siirtymällä "src" kansioon ja käynnistämällä sieltä React sovelluksen.

>npm start

Komento avaa sovelluksen portille 3000 ja selaimeen.

Jos sinulla ei ole vielä käyttäjää sivulle, sen voi luoda `Register` napilla. Täytä lomakkeeseen koko nimi, sähköposti sekä salasana. Tämän jälkeen sivusto toimii oletetusti.

Kun olet rekisteröitynyt, pääset sen jälkeen käsiksi käyttäjäsi `favorites` sivulle. Täällä näkyvät kaikki tykkäämäsi kuvat.

Painamalla `log out` nappia kirjaudut käyttäjältäsi. `login` napilla pääset takaisin käyttäjällesi.

### Kuinka sivu sitten toimii?
Etusivulla löydät kaksi hakupalkkia, joista toinen on nimellä "Search term" ja toinen nimellä "Limit". Ensimmäiseen hakukenttään voit kirjoittaa haluamasi hakusanan. Toiseen hakukenttään voit kirjoittaa määrän kuinka monta kuvaa haluat sivulla näkyvän.

Kuvien tallentaminen onnistuu painamalla kuvan päällä olevaa pientä sydäntä. Kuva tallentuu tykätyihin. Kuvan saa pois tykätyistä siirtymällä ensin `favorites` sivulle ja sieltä klikkaamalla poistettavan kuvan päällä olevaa mustaa sydäntä. Sivu poistaa sen automaattisesti tietokannasta. 


## Johdanto
Animoidut kuvat, nykyisin tunnettuna GIF:it, ovat olleet jo lähes vuosikymmenen suuri osa internet-kulttuuria. Niitä käytetään yleensä tekstin kera tarkemman sanoman kertomisessa. 

Ryhmämme idea oli luoda hyödyllinen sivu, josta voi etsiä Giphy-API:n avulla sopivia GIF:ejä erilaisiin tilanteisiin. Tarkoituksena oli toteuttaa sivu, joka toimii sekä helposti, että tehokkaasti. Hakutoiminnolla löytää juuri sellaisen GIF:n mitä etsii, sekä paljon muutakin.

## Tavoite
Sivun tavoite on olla helppokäyttöinen tapa etsiä ja tallentaa haluamia GIF-kuvia vapaa-ajan käyttöön tai esimerkiksi reaktioiksi. Tämä toteutetaan käyttämällä ulkoista Api:a. Kuvia voi myös tallentaa tietokantaan, jotta jokainen käyttäjä voi tarkastella tallentamiaan kuvia. Lisäksi, koska kyseessä on oppimisprojekti, on tarkoitus myös oppia ymmärtämään miten React.js toimii ja kuinka sillä pystyy parantamaan projektejaan.

## Rajapinnat ja työkalut
Hakusivu hyödyntää Giphy-rajapintaa, joka hakee kuvat palvelimelta giphy.com ja näyttää ne omalla sivulla. Giphyn rajapinta tuo projektiin kaiken tarvittavan datan ulkopuolelta, joten projekti ei tarvitse omaa kuvatietokantaa. Tämän tilalla olisi myös voinut käyttää Tenor-API:a vaihtoehtoisena GIF tietokantana. Päätimme käyttää Giphy:a sen hyvän dokumentaation ja tuen takia. Giphyn noutoon käytämme Fetch API:a.

Sivu on toteutettu käyttäen JavaScriptin React-kirjastoa sekä Firebasen kirjautumista. React-kirjastoja ovat Popup jonka avulla kirjautumisikkunoista saatiin ponnahdusikkunoita, sekä React Router sivujen vaihtamista varten.

Tykättyjen kuvien tallentamiseen käytämme MySql tietokantaa ja verkkotietokantojen nouto on toteutettu expressin avulla.


## Yhteenveto
Projekti toi mukanaan haasteita, sekä esitti uusia käyttömahdollisuuksia React:lle. Vaikka kyseessä ryhmällemme uusi työympäristö, onnistui projekti mallikkaasti. Ulkonäkö ja intuitiivisuus muokkaantui projektin aikana ja lopullinen ilme selvisi vasta viimeisinä päivinä.
Jos toteuttaisimme projektin uudestaan, ottaisimme enemmän aikaa sivun suunnitteluun ja tarvittavien kirjastojen etsimiseen. Näin välttyisimme suurelta osalta projektissa esiintyneistä ongelmista.
Tykättyjen kuvien siirtäminen tietokantaan, sekä niiden noutaminen käyttäjälle henkilökohtaiseen näkymään tuottivat projektimme suurimmat haasteet. Koska kyseessä oli useampi rajapinta, joita käytettiin sisäänkirjautumiseen, kuvien noutamiseen ja kuvien tallentamiseen, niiden yhdistäminen aiheutti omia hankaluuksiaan. Projektin loppupuolella saimme ongelmat kuitenkin ratkaistua.
