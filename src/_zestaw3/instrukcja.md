Opis zadania:
Zadanie polega na stworzeniu fragmentu interfejsu webowego systemu typu smart home. Na ten moment system powinien wspierać trzy typy inteligentnych urządzeń: żarówkę, gniazdko elektryczne i czujnik temperatury. W przyszłości może zostać rozbudowany o wsparcie dla kolejnych typów.

Główny ekran powinien zawierać listę urządzeń podpiętych do systemu. Forma prezentacji listy jest dowolna, ale dla każdego urządzenia powinny być widoczne podstawowe informacje jak: typ, nazwa i stan połączenia.

Po kliknięciu na element z listy powinno otworzyć się okno wizualizujące stan urządzenia. Zawartość zależy od typu uorządzenia, które zostało wybrane. Pza tym okno:
Powinno wspierać opcję dragging. W tym celu zalecana jest biblioteka interact.js.
Nie powinno blokować wyboru innego urządzenia z listy.
Jeżeli jest już otwarte w momencie wybrania kolejnego urządzenia, powinno pozostać otwarte, a jego zawartość podmieniona.
Po ponownym otwarciu powinno się pojawiać w tym samym miejscu, w którym było ostatni raz wyświetlone.
Stan urządzeń powinien być aktualizowany (symulowany) na bieżąco. W tym celu można periodycznie (co jakiś czas) odpytywać REST-owe endpointy w API, ale dodatkowe punkty można otrzymać za aktualizację przy użyciu protokołu WebSocket. Aktualizacje powinny być odwzorowywane w interfejsie użytkownika (zarówno na liście, jak również w oknie ze szczegółami).

Backend API
Należy założyć, że mamy do czyniania z sytuacją, gdzie zespół backendowy nie jest gotowy udostępnić API, ale została ustalona jego specyfikacja (poniżej). Żeby nie czekać, frontend developer powinien zamockować je w dowolny sposób, tak aby móc przygotować i przetestować swoją implementację frontendu.

GET /api/v1/devices => zwraca SmartDevice[]
GET /api/v1/devices{deviceId} => zwraca SmartDeviceDetails
GET /api/v1/refresh => endpoint typy WebSocket

Format odpowiedzi to JSON
Jako dane w message po WebSocket przychodzi SmartDeviceDetails i zawiera informacja o aktualnym stanie urządzenia
Format danych jest następujący:

SmartDeviceDetails => SmartBulb, SmartOutlet or SmartTemperatureSensor
