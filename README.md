# 🎓 System Zarządzania Szkoleniami HR

Aplikacja webowa do zarządzania szkoleniami dla zespołu HR, umożliwiająca wprowadzanie informacji o szkoleniach, zarządzanie uczestnikami oraz monitorowanie danych szkoleniowych.

## ✨ Funkcjonalności

### Moduł 1: Zarządzanie Szkoleniami

- **Dodawanie szkoleń** z pełnym zakresem informacji:
  - Okres szkolenia (miesiąc, kwartał, rok)
  - Departament
  - Nazwa szkolenia
  - Typ szkolenia (On-site, On-line, Off-site)
  - Informacje o dostawcy (wewnętrzne/zewnętrzne)
  - Koszty (koszt szkolenia, inne koszty, suma automatycznie obliczana)
  - Kategoria szkolenia
  - Zakres dat szkolenia
  - Automatyczne zapisywanie daty wprowadzenia

- **Lista szkoleń** z możliwościami:
  - Przegląd wszystkich szkoleń w formie tabeli
  - Edycja istniejących wpisów
  - Usuwanie szkoleń
  - Przejście do zarządzania uczestnikami

### Moduł Uczestników

- **Dodawanie uczestników** do szkolenia:
  - Imię i nazwisko
  - Departament
  - Automatyczne obliczanie godzin na podstawie długości szkolenia
  - Sprawdzanie/potwierdzanie obecności

- **Zarządzanie uczestnikami**:
  - Lista wszystkich uczestników szkolenia
  - Edycja danych uczestników
  - Usuwanie uczestników
  - Status obecności (potwierdzona/oczekuje)

### ⭐ Moduł Statystyk Uczestników

- **Dashboard ze zbiorczymi statystykami**:
  - 6 kart z kluczowymi wskaźnikami:
    - Liczba unikalnych uczestników
    - Całkowita liczba uczestnictw w szkoleniach
    - Suma wszystkich godzin szkoleniowych
    - Średnia liczba szkoleń na osobę
    - Średnia liczba godzin na osobę
    - Ogólny wskaźnik obecności

- **Szczegółowa tabela uczestników** zawierająca:
  - Imię i nazwisko
  - Departament
  - Liczba szkoleń w których uczestniczył
  - Łączna liczba godzin
  - Średnia godzin na szkolenie
  - Liczba potwierdzonych obecności
  - Wizualny pasek wskaźnika obecności
  - Rozwijalna lista wszystkich szkoleń

- **Kluczowe wskaźniki**:
  - Najbardziej aktywny uczestnik
  - Uczestnik z największą liczbą godzin
  - Liczba osób z 100% frekwencją

## 🚀 Technologie

- **React 19** - biblioteka UI
- **TypeScript** - bezpieczeństwo typów
- **Vite** - szybkie narzędzie budowania
- **React Router** - nawigacja między widokami
- **Context API** - zarządzanie stanem aplikacji
- **CSS3** - stylizacja z gradient i animacjami

## 📦 Instalacja

1. Sklonuj repozytorium:
```bash
git clone <repository-url>
cd LYR_L-D
```

2. Zainstaluj zależności:
```bash
npm install
```

3. Uruchom aplikację deweloperską:
```bash
npm run dev
```

4. Otwórz przeglądarkę i wejdź na:
```
http://localhost:5173
```

Albo użyj wersji online:
🌐 **https://polejek.github.io/LYR_L-D/**

## 🛠️ Dostępne Komendy

```bash
npm run dev      # Uruchom serwer deweloperski
npm run build    # Zbuduj wersję produkcyjną
npm run preview  # Podgląd wersji produkcyjnej
```

## 💾 Eksport i Import Danych

Aplikacja posiada funkcjonalność eksportu i importu danych w formacie JSON:

- **📥 Eksportuj do JSON** - pobiera plik z wszystkimi szkoleniami i uczestnikami
- **📤 Importuj z JSON** - wczytuje dane z wcześniej wyeksportowanego pliku

Dane są przechowywane lokalnie w przeglądarce. Używaj eksportu do:
- Tworzenia kopii zapasowych
- Przenoszenia danych między przeglądarkami/urządzeniami
- Udostępniania danych innym użytkownikom

## 📂 Struktura Projektu

```
src/
├── components/           # Komponenty React
│   ├── TrainingForm.tsx              # Formularz dodawania/edycji szkoleń
│   ├── TrainingList.tsx              # Lista szkoleń
│   ├── ParticipantManagement.tsx    # Zarządzanie uczestnikami
│   ├── ParticipantStats.tsx         # Dashboard statystyk uczestników
│   ├── DataExportImport.tsx         # Eksport/Import danych JSON
│   └── *.css                         # Style komponentów
├── context/             # Context API
│   └── TrainingContext.tsx          # Stan aplikacji
├── types/               # Definicje typów TypeScript
│   └── training.types.ts            # Typy dla szkoleń i uczestników
├── App.tsx              # Główny komponent aplikacji z zakładkami
├── main.tsx            # Punkt wejścia
└── index.css           # Globalne style
```

## 💡 Jak Używać

### Nawigacja

Aplikacja posiada dwie główne zakładki:
- **📚 Zarządzanie szkoleniami** - dodawanie i edycja szkoleń
- **📊 Statystyki uczestników** - dashboard z analizami

### Dodawanie Szkolenia

1. Przejdź do zakładki "Zarządzanie szkoleniami"
2. Wypełnij formularz w górnej części strony
3. Wszystkie pola są wymagane
4. Suma kosztów jest obliczana automatycznie
5. Kliknij "Dodaj szkolenie"

### Edycja Szkolenia

1. W liście szkoleń kliknij ikonę ✏️ przy szkoleniu
2. Zmodyfikuj dane w formularzu
3. Kliknij "Zapisz zmiany"

### Zarządzanie Uczestnikami

1. W liście szkoleń kliknij ikonę 👥 przy szkoleniu
2. Dodaj uczestników wypełniając formularz
3. Godziny szkolenia są automatycznie obliczane na podstawie długości szkolenia
4. Zaznacz checkbox "Obecność potwierdzona" dla potwierdzenia uczestnictwa

### Przeglądanie Statystyk

1. Przejdź do zakładki "📊 Statystyki uczestników"
2. Przejrzyj 6 kart z kluczowymi wskaźnikami
3. Sprawdź szczegółową tabelę z danymi każdego uczestnika
4. Kliknij "Pokaż" w kolumnie "Lista szkoleń", aby rozwinąć szczegóły
5. Zobacz kluczowe wskaźniki na dole strony

### Eksport i Import Danych

**Eksport:**
1. Kliknij przycisk "📥 Eksportuj do JSON" u góry strony
2. Plik JSON z wszystkimi danymi zostanie automatycznie pobrany
3. Nazwa pliku zawiera datę eksportu (np. `szkolenia-export-2025-12-16.json`)

**Import:**
1. Kliknij przycisk "📤 Importuj z JSON"
2. Wybierz wcześniej wyeksportowany plik JSON
3. Dane zostaną wczytane i zastąpią obecne dane w aplikacji

### Usuwanie

- Kliknij ikonę 🗑️ aby usunąć szkolenie lub uczestnika
- Potwierdź operację w oknie dialogowym

## 🎨 Funkcje UI

- **System zakładek** - łatwa nawigacja między modułami
- **Responsywny design** - działa na urządzeniach mobilnych i desktopowych
- **Gradient UI** - nowoczesny wygląd z gradientami
- **Animacje** - płynne przejścia i efekty hover
- **Ikony emoji** - intuicyjne przyciski akcji
- **Kolorowe statusy** - wizualne oznaczanie stanu obecności
- **Interaktywne karty statystyk** - wizualizacja kluczowych wskaźników
- **Paski postępu** - graficzne przedstawienie wskaźnika obecności
- **Rozwijane listy** - kompaktowy sposób prezentacji danych

## 📝 Typy Danych

### Training (Szkolenie)
```typescript
{
  id: string
  period: 'miesiąc' | 'kwartał' | 'rok'
  department: string
  name: string
  type: 'On-site' | 'On-line' | 'Off-site'
  provider: string
  providerType: 'wewnętrzne' | 'zewnętrzne'
  trainingCost: number
  otherCosts: number
  totalCost: number
  category: string
  dateRange: { startDate: string, endDate: string }
  entryDate: string
  participants: Participant[]
}
```

### Participant (Uczestnik)
```typescript
{
  id: string
  trainingId: string
  firstName: string
  lastName: string
  department: string
  hoursAttended: number
  attendanceChecked: boolean
}
```

## � GitHub Pages Deployment

Aplikacja jest automatycznie deployowana na GitHub Pages przy każdym push do brancha `main`.

**URL produkcyjny:** https://polejek.github.io/LYR_L-D/

### Jak to działa:

1. GitHub Actions automatycznie buduje aplikację po każdym push
2. Pliki produkcyjne są deployowane do branch `gh-pages`
3. GitHub Pages serwuje aplikację z tego brancha

### Manualne włączenie GitHub Pages:

Jeśli to pierwsza instalacja, musisz włączyć GitHub Pages w ustawieniach:

1. Przejdź do Settings → Pages
2. W sekcji "Source" wybierz "GitHub Actions"
3. Zapisz zmiany
4. Workflow automatycznie zbuduje i wdroży aplikację

## 🔮 Przyszłe Rozszerzenia

- ✅ ~~Dashboard z podsumowaniami i statystykami~~ (Zrealizowane!)
- ✅ ~~Eksport danych do JSON~~ (Zrealizowane!)
- ✅ ~~Import danych z JSON~~ (Zrealizowane!)
- ✅ ~~Deployment na GitHub Pages~~ (Zrealizowane!)
- Eksport danych do Excel/PDF
- Filtrowanie i wyszukiwanie szkoleń
- Wykresy i wizualizacje danych (Chart.js)
- Porównanie statystyk między departamentami
- Raporty dla zarządu
- Powiadomienia i przypomnienia
- Autoryzacja użytkowników
- Integracja z bazą danych (backend)
- Historia zmian i audyt

## 📄 Licencja

© 2025 System Zarządzania Szkoleniami HR


import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

