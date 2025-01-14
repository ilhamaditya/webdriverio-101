# WebdriverIO 101 🚀  
Simulasi menggunakan WebdriverIO dengan Allure, Docker, GitHub Actions, dan integrasi Slack.
## 🚀 Youtube Link : [Short Demo](https://youtu.be/96q6sg6UcNY)
## 🚀 Baca Link : [Short Reading](https://medium.com/@muxsdn/simulation-webdriverio-with-ci-cd-docker-allure-reports-and-slack-notifications-f493bd8d34e8)

## 📋 Prasyarat
Pastikan Anda memiliki:
- **Node.js**: v18 atau lebih tinggi
- **Docker**: Terinstal dan berjalan
- **Allure**: Terinstal (opsional untuk laporan lokal)
---
## 🚀 Cara Menjalankan Proyek
### 1. **Menjalankan Secara Lokal**
Ikuti langkah-langkah berikut untuk menjalankan pengujian secara lokal:
```bash
# Instal dependensi
npm install
# Membersihkan hasil laporan sebelumnya
npm run clean-allure-results
# Menjalankan pengujian
npm run wdio
# Menghasilkan laporan Allure
npm run allure-generate
# Membuka laporan Allure
npm run allure-open
```
### 2. **Menjalankan dengan Docker**
Untuk menjalankan pengujian menggunakan Docker dan Selenoid:
```bash
# Pastikan Docker sudah berjalan
docker-compose up -d
# Membersihkan hasil laporan sebelumnya
npm run clean-allure-results
# Menjalankan pengujian dengan konfigurasi Docker
npm run wdio:dock
# Menunggu laporan Allure tersedia
npm run wait-for-allure
# Membuka laporan Allure di browser
npm run allure-open-dock
```

## 📊 CI/CD dengan GitHub Actions

Workflow WebdriverIO CI/CD tersedia di file .github/workflows/ci.yml. Proses ini akan secara otomatis:

1. Menginstal dependensi
2. Memulai layanan Docker (Selenoid dan Allure)
3. Menjalankan pengujian
4. Menghasilkan laporan Allure
5. Mengirim notifikasi ke Slack jika gagal atau berhasil.

Trigger:
- Push ke branch main
- Pull Request ke branch main

## 📂 Struktur Direktori
Berikut adalah struktur direktori utama proyek:
```bash
.
├── .github/workflows/ci.yml         # Konfigurasi GitHub Actions
├── config                           # Konfigurasi WebdriverIO & Docker
│   ├── browsers.json                # Browser untuk Selenoid
│   ├── wdio.conf.local.js           # Konfigurasi lokal
│   ├── wdio.conf.dock.js            # Konfigurasi Docker
│   ├── waitForAllure.js             # Script menunggu laporan Allure
├── docker-compose.yml               # Konfigurasi Docker untuk Selenoid dan Allure
├── features                         # File Gherkin (BDD)
├── helpers                          # Helper files (e.g., environment variables)
├── allure-results                   # Hasil pengujian
├── allure-report                    # Laporan Allure
└── package.json                     # Dependensi & script npm
```

## 🧰 Skrip NPM
Berikut adalah skrip utama yang tersedia:
| Perintah                  | Deskripsi                                                        |
|---------------------------|------------------------------------------------------------------|
| `npm run wdio`            | Menjalankan pengujian lokal menggunakan konfigurasi default.    |
| `npm run wdio:dock`       | Menjalankan pengujian dengan Docker.                            |
| `npm run allure-generate` | Menghasilkan laporan Allure dari hasil pengujian.              |
| `npm run allure-open`     | Membuka laporan Allure di browser.                              |
| `npm run dock`            | Menjalankan pengujian lengkap dengan Docker dan Allure.         |

## 🌐 URL Penting
- Selenoid UI: http://localhost:8080
- Allure Report: http://localhost:5050/allure-docker-service/projects/default/reports/latest/index.html

## 💡 Tips: Pastikan file .env Anda terisi dengan benar, seperti contoh di bawah:
```bash
WEB_URL=https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
WEB_USERNAME=Admin
WEB_PASSWORD=admin123
SLACK_WEBHOOK=https://hooks.slack.com/services/your/slack/webhook
```
