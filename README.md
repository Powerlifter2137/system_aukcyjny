# Autorzy: Maksymilian Majek 51323, Patryk Łoboda 42931, Tomasz Kądziela 50018, Michał Nowacki 51331, Karolina Karczewska 53835

# System Aukcyjny

## Cel projektu

Celem projektu było stworzenie **systemu rozproszonego** z komunikacją REST API, umożliwiającego użytkownikom tworzenie oraz udział w aukcjach internetowych. Projekt został wykonany zgodnie z architekturą MVC, przy użyciu technologii **.NET 8 (ASP.NET Core)** oraz frontendem w **React.js**.

## Technologie

- **Backend**: ASP.NET Core, Entity Framework Core, SQLite
- **Frontend**: React.js (JavaScript)
- **Baza danych**: SQLite (trwałe przechowywanie danych)
- **Komunikacja**: REST API
- **Stylowanie**: CSS (możliwość rozszerzenia o Tailwind)

##  Funkcjonalności

###  Użytkownicy (Users)
-  Rejestracja i logowanie z hashowaniem haseł
-  Pobieranie informacji o użytkowniku
-  Edycja i usuwanie konta
###  Aukcje (Auctions)
-  Dodawanie nowej aukcji (przedmiotu)
-  Edytowanie aukcji
-  Usuwanie aukcji
-  Pobieranie szczegółów aukcji
-  Zamknięcie aukcji po czasie (automatycznie, backend)
###  Oferty (Bids)
-  Składanie ofert z walidacją minimalnej kwoty
-  Historia ofert w czasie rzeczywistym
-  Określenie zwycięzcy po zakończeniu aukcji

##  Jak uruchomić?

### Backend  oraz Frontend (`AuctionSystemAPI`) (`auction-client`)

```bash

cd AuctionSystemAPI
dotnet build
dotnet ef database update
dotnet run

cd auction-client
npm install
npm start
