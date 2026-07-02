# Dynamic Filter Component System

A React + TypeScript + Vite application for exploring and filtering employee data with a configurable filter builder, dynamic table view, and CSV export support.

## Features

- Configurable filter builder for text, number, date, salary, select, multi-select, and boolean fields
- Live filtering with instant table updates
- Empty-state message when no records match
- Record count summary for total and filtered results
- Sortable employee table
- Export filtered or selected rows to CSV

## Tech Stack

- React 18
- TypeScript
- Vite
- Material UI
- MUI X Data Grid

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Run Locally

Start the development server:

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually http://localhost:5173.

## Build for Production

```bash
npm run build
```

## Project Structure

- src/components/filters - Filter builder and filter row UI
- src/components/inputs - Input components for each filter type
- src/components/table - Employee table and export support
- src/config - Field and operator configuration
- src/data - Mock employee dataset
- src/utils - Filtering logic

