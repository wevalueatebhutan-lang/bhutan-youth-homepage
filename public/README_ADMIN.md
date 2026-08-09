# Bhutan Youth Development Portal - Admin & Handover Guide

This guide is prepared for the administrators of the **Bhutan Taekwondo Federation (BTF)** to manage, update, and sustain the official portal.

---

## 1. Credentials & Platform Accounts

To manage the server infrastructure and domain settings, the federation uses a single unified Google Account.

*   **Official Google Email**: `wevalueatebhutan@gmail.com`
*   **Google Account Password**: *(Please change the password immediately after the transition and set the recovery phone number to the BTF administrator's phone)*
*   **Firebase Project Console**: [https://console.firebase.google.com/](https://console.firebase.google.com/)
*   **Cloudflare Domain Registrar**: [https://dash.cloudflare.com/](https://dash.cloudflare.com/)

---

## 2. Managing Website Content (Admin Dashboard)

You do not need any coding knowledge to publish announcements or upload event photos. Follow these steps:

### 2.1 Accessing the Dashboard
1. Open your browser and go to: `https://bhutantaekwondo.org/admin` (or `https://wevalueatebhutan-6a832.web.app/admin`)
2. Enter your authorized admin email and password on the **Admin Login** page.

### 2.2 Publishing Notices (📢)
1. Select the **Notices** tab from the admin sidebar.
2. In the "Publish New Notice" form:
   *   Enter the **Title** of the notice.
   *   Write the **Content** details.
   *   Choose the **Category Tag** (Construction Update, Event, or Annual Report).
3. Click **Publish**. The announcement will immediately go live on the **Community** page of the public website.

### 2.3 Uploading Photos to Gallery (📸)
1. Select the **Gallery** tab from the admin sidebar.
2. In the "Upload New Gallery Photo" form:
   *   Enter a brief **Title/Caption** describing the activity or photo.
   *   Click the file input to browse and select the **Image File** from your computer.
3. Click **Upload**. The system will save the file to Cloud Storage, and the photo will immediately render on the public **Community** gallery feed.

### 2.4 Deleting Content
*   Under the "Published Notices" or "Uploaded Gallery Photos" lists in the dashboard, click the red **Delete** button next to any item to permanently remove it from the website.

---

## 3. Server Maintenance ($0 Hosting)

The portal is hosted on **Firebase Spark Plan (Free Tier)**. It requires **$0** monthly maintenance cost as long as traffic stays within reasonable non-profit usage:
*   **Hosting Storage**: 10 GB limit (enough to hold thousands of photos).
*   **Data Transfer (Bandwidth)**: 360 MB/day limit.
*   **Database (Firestore)**: 50,000 free reads / 20,000 free writes per day.

---

*Thank you for supporting youth development in Bhutan through Sports, Health, and Values education.*
*Prepared by the Korea International Cooperation Agency (KOICA) & Project Management Consultant (PMC) Team.*
