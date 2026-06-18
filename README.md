# Smart Voltage Breakage Detection System (LV_AC)

**Detecting Breaks, Securing Power**

A web dashboard for monitoring low-voltage (LV) AC distribution poles and coordinating field repairs. Pole-mounted sensors (accelerometer, gyroscope, current) report their readings over LoRa, and this Flask app turns that data into a live health status board that officers and field staff can act on.

> Built by Team **SYNKTRA**.

## Overview

Damaged or leaning electricity poles are often discovered only after they've already caused an outage or safety hazard. This project simulates an early-warning pipeline: each pole reports tilt (accelerometer/gyroscope) and load (current) readings, which are classified into a health status (`Healthy`, `Warning`, `Alert`). Grid officers monitor all poles from a central dashboard, drill into individual pole readings and location, and assign repair tasks to field staff, who track and complete them from their own task view.

## 🚀 Live Demo
https://overhead-conductor-fault-detection-1.onrender.com

## Features

- **Role-based login** — `Officer` accounts see the full grid and manage staff; `Staff` accounts see only their own assigned tasks.
- **Officer dashboard** — table of every pole with current status, location, and live current draw, linking to detailed pole pages.
- **Pole detail view** — accelerometer, gyroscope, and current readings plus an embedded Google Map pinned to the pole's coordinates.
- **Task assignment** — officers assign a repair task to a staff member with a due date directly from a pole's page.
- **Staff task tracking** — staff can view their assigned tasks, refresh the list, and mark tasks complete.
- **Staff management** — officers can add, edit, and remove staff records.
- **Simulated LoRa feed** — a `/data` endpoint mimics the raw payload, RSSI, and SNR a LoRa gateway would report.

## Tech Stack

| Layer       | Technology                                  |
|-------------|----------------------------------------------|
| Backend     | Python, Flask                                |
| Frontend    | HTML, CSS, vanilla JavaScript                |
| Maps        | Google Maps Embed API                        |
| Data store  | In-memory Python data structures (no DB yet) |

## Project Structure

```
LV_AC/
├── app.py                  # Flask routes and in-memory data
├── requirements.txt
├── static/
│   ├── css/                # Per-page stylesheets
│   ├── js/                 # Per-page client-side scripts
│   └── uploads/
└── templates/
    ├── index.html           # Login / landing page
    ├── dashboard.html        # Officer pole overview
    ├── pole.html              # Single pole detail + task assignment
    ├── person.html             # Staff "My Tasks" view
    ├── staff.html                # Staff management list (officer only)
    ├── staffadd.html              # Add staff form
    └── staffedit.html              # Edit staff form
```

## Getting Started

### Prerequisites
- Python 3.10+

### Installation

```bash
git clone https://github.com/<your-username>/LV_AC.git
cd LV_AC

python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

pip install -r requirements.txt
```

### Run the app

```bash
python app.py
```

The app starts on **http://localhost:5001**.

## Demo Credentials

| Username  | Password      | Role    |
|-----------|---------------|---------|
| saadgi    | officer123    | Officer |
| komal     | komal123      | Staff   |
| mayurika  | mayurika123   | Staff   |
| shreya    | shreya123     | Staff   |
| sejal     | sejal123      | Staff   |
| navami    | navami123     | Staff   |

These are placeholder accounts for demoing the app locally — see **Security Notes** below before using this anywhere beyond a local demo.

## Security Notes (read before deploying)

This started as a hackathon/prototype build, so a few things should be cleaned up before it goes anywhere public or production-facing:

- `app.secret_key` is currently a hardcoded string in `app.py`. Move it to an environment variable (`os.environ.get("SECRET_KEY")`).
- The Google Maps embed key in `pole.html` is hardcoded in the source. Move it to an environment variable or a build-time config, and restrict/rotate the key in the Google Cloud Console.
- Passwords are stored and compared in plaintext in `app.py`. For anything beyond a local demo, hash passwords (e.g. with `werkzeug.security`) and move user storage out of source code.
- All data (`users`, `staff_list`, `pole_data`, `tasks`) lives in memory and resets every time the server restarts — there's no database persistence yet.

## Limitations / Roadmap

- Sensor and LoRa data are simulated placeholders, not a live gateway integration.
- No persistent database — adding one (SQLite/Postgres) is the natural next step.
- No automated tests yet.

## License

Add a license of your choice (e.g. MIT) before publishing, or remove this section if the repo will stay private.
