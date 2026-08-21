# ShopSphere — Cloud Service Classification
**Student ID:** EYOUTH-30910011725377

This document classifies the three cloud services used in the ShopSphere production deployment (Task 1) by their service model — IaaS, PaaS, or SaaS.

| Service | Role in ShopSphere | Classification | Reason |
|---|---|---|---|
| **Vercel** | Hosts the Frontend (React/Vite) and the Backend (Express, as a serverless function) | **PaaS** (Platform as a Service) | Vercel provides a full build, deployment, and serverless runtime platform — the team pushes code and Vercel handles the underlying servers, operating system, and scaling, without any infrastructure management. |
| **Supabase** | Hosts the production PostgreSQL database | **PaaS** (Platform as a Service) | Supabase provides a fully managed PostgreSQL database platform — the team only manages the schema, data, and connection strings, without provisioning, installing, or maintaining the database server or its underlying OS. |
| **UptimeRobot** | Monitors the `/api/health` endpoint and reports uptime status | **SaaS** (Software as a Service) | UptimeRobot is a complete, ready-to-use monitoring application accessed entirely through its own dashboard — the team only configures a monitor inside the existing software, with no control over or visibility into any platform or infrastructure layer beneath it. |
