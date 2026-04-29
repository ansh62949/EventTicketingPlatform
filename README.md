# 🎟️ EVENTIX: The Digital Experience Vault

**EVENTIX** is a high-performance, mobile-first ticketing and event management ecosystem. Built with a "Digital Vault" philosophy, it combines a robust Spring Boot backend with a cinematic React frontend to deliver a premium, high-contrast discovery and gate-entry experience.

---

## ⚡ Core Paradigms

### 🌍 Experience Discovery
*   **Localized Intelligence**: Real-time Geolocation and Reverse Geocoding automatically detect your city to show nearby experiences.
*   **Cinematic Feed**: A high-impact, visual-first discovery interface utilizing the signature "Stadium-Pill" design language.
*   **Dynamic Filtering**: Instant category modulation (Music, Tech, Arts, Sports) with high-performance search telemetry.

### 🛡️ The Digital Vault (Wallet)
*   **Verified Assets**: Your tickets are treated as secure digital assets, stored in a high-contrast vault.
*   **Gate-Ready QR Codes**: Authenticated blob-fetching ensures QR codes are only loaded for authorized holders, featuring a "Ticket Stub" design with side-pill cutouts.
*   **Telemetry Status**: Real-time verification status (ShieldCheck) for seamless entry at event gates.

### 🏗️ Event Architect (Organizer Hub)
*   **Live Telemetry Dashboard**: Real-time monitoring of revenue, ticket sales, and network pulse.
*   **Experience Initialization**: A premium "Architect" module for deploying new events with curated visual atmosphere presets.
*   **Role-Based Command**: Secure routing specifically for organizers and staff members.

---

## 🛠️ Technology Stack

### Backend (System Core)
- **Java 22 & Spring Boot 3**: The bedrock of the platform.
- **Spring Security (JWT/OAuth2)**: Enterprise-grade authentication and route protection.
- **Spring Data JPA & PostgreSQL**: High-integrity relational data management.
- **MapStruct**: High-performance object mapping between domain and DTO layers.
- **Jackson & Validation**: Strict JSON contract enforcement and data sanitization.

### Frontend (User Interface)
- **React & Vite**: Modern, high-speed frontend runtime.
- **Tailwind CSS**: Custom "Stadium-Pill" design system with glassmorphic elements.
- **Framer Motion**: Cinematic transitions and micro-animations for an "alive" interface.
- **Lucide Icons**: Consistent, high-fidelity iconography.
- **Axios & Interceptors**: Secure, token-aware API communication layer.

---

## 🚀 Getting Started

### 1. System Requirements
*   **Java 22** or higher
*   **Node.js 18+**
*   **PostgreSQL** instance

### 2. Backend Initialization
```bash
# Navigate to root
./mvnw spring-boot:run
```
*The API will be available at `http://localhost:8080`*

### 3. Frontend Deployment
```bash
cd event-ticket-frontend/event-ticket-frontend
npm install
npm run dev
```
*The interface will launch at `http://localhost:5173`*

---

## 🏗️ Architecture

The platform follows a **Clean Layered Architecture**:
1.  **Controller Layer**: Handles REST contracts and JWT principal extraction.
2.  **Service Layer**: Implements core business logic and transactional integrity.
3.  **Repository Layer**: High-performance data access with custom PostgreSQL telemetry queries.
4.  **Security Layer**: Unified authentication filter chain protecting sensitive gate and organizer nodes.

---

## 🎨 Design Philosophy: "Stadium-Pill"
EVENTIX utilizes a unique design language characterized by:
- **Deep Corner Radii**: `rounded-[2.5rem]` and `rounded-[3rem]` elements.
- **High Contrast**: `#121212` background with `#FF5D22` (Eventix Orange) accents.
- **Glassmorphism**: Translucent headers and navigation nodes using `backdrop-blur-xl`.
- **Telemetry Aesthetic**: Monospaced typography and tracking for technical data points.

