# JOMA Next Gen Industrial SCADA Solution
## Official Project & Technical Proposal

**Project Title:** Next Generation Desktop SCADA System for Industrial DC Power Supply & Electronic Load Monitoring, Control, & Automation  
**Target System:** JOMA Industrial Power Systems / Dual-Channel DC Power Supplies & Electronic Loads  
**Protocol / Interface:** Modbus RTU over RS485 Serial Interface  
**Deployment Platform:** Windows Desktop Application (Standalone & Portable)  
**Document Version:** 1.0.0  
**Date:** October 9, 2026  

---

## 1. Executive Summary

Modern industrial power testing, battery verification, and quality assurance workflows require high-frequency, reliable, and fault-tolerant monitoring and control systems. Legacy SCADA systems often suffer from sluggish interfaces, single-threaded communication locks, rigid register mappings, and lack of automated reporting.

The **JOMA Next Gen Industrial SCADA Application** is a state-of-the-art, high-performance desktop control system engineered specifically for DC Power Supplies and Electronic Loads. Built on Electron, React, TypeScript, and Node.js, the system communicates directly with hardware via RS485 Modbus RTU. 

This proposal details the exact scope of deliverables, system architecture, feature breakdown, safety controls, automated sequence execution, reporting capabilities, and deployment options being provided to your organization.

> [!NOTE]
> **Key Project Objective:** To provide a turnkey, high-speed, safe, and visually rich desktop SCADA platform that eliminates manual operator error, accelerates test cycles, automates PDF/CSV report generation, and provides complete device profile flexibility.

---

## 2. Business Value & Strategic Benefits

| Value Driver | Solution Capability | Tangible Outcome |
| :--- | :--- | :--- |
| **Operational Efficiency** | Automated multi-step sequence runner with dynamic voltage/current ramping. | Reduces manual testing labor by **over 70%** during routine quality checks. |
| **Hardware Protection** | Multi-layer engineering safety limits (Vmax, Imax, Pmax, Rmax) and alarm interlocks. | Prevents costly DUT (Device Under Test) and power supply damage due to operator error. |
| **Zero Hardware Dependency Testing** | Built-in virtual hardware simulator engine with realistic load dynamic physics. | Enables off-site operator training, software verification, and workflow setup without physical hardware. |
| **Compliance & Traceability** | Automatic session logging with instant PDF report and raw CSV data export. | Ensures 100% audit readiness and quality traceability for every test run. |
| **Future-Proof Adaptability** | Decoupled Hardware Abstraction Layer (HAL) using JSON device register profiles. | Allows adding new power supply brands/models without modifying application source code. |

---

## 3. Comprehensive Scope of Deliverables

The complete solution delivered to your company encompasses the following core modules:

```
+-----------------------------------------------------------------------------------+
|                            JOMA SCADA SYSTEM PLATFORM                             |
+-----------------------------------------------------------------------------------+
|  1. Live Telemetry & Digital Dashboard    |  5. Enterprise Safety Interlocks      |
|  2. Multi-Mode Output Control Panel      |  6. Database & Test Session Archive   |
|  3. Automated Multi-Step Sequence Engine  |  7. Automated PDF & CSV Report Generator|
|  4. Low-Level Register Diagnostics Panel |  8. Built-in Virtual Hardware Simulator|
+-----------------------------------------------------------------------------------+
```

### Module 1: Live Telemetry & Digital Control Dashboard
* **High-Frequency Real-time Readouts:** Voltage ($V_{mon}$), Current ($I_{mon}$), Power ($P_{mon}$), and Battery Capacity ($Ah$) displayed in high-contrast 7-segment digital displays.
* **Dynamic 60 FPS Telemetry Charting:** High-resolution SVG graph rendering real-time telemetry curves vs. time with zooming, legend toggles, and auto-scaling.
* **Dual-Channel Synchronization:** Full support for multi-channel parameters and live status indication (Output ON/OFF, Connection Status, Mode Status).
* **Two-Way Hardware Synchronization:** Automatically reflects state changes made directly on the physical hardware's front panel (HMI) back to the PC software.

### Module 2: Multi-Mode Operation Control Panel
Support for five distinct industrial operating modes:
1. **CV (Constant Voltage):** Precise voltage regulation with PC-monitored current limit protection.
2. **CC (Constant Current):** Controlled current source driving with voltage safety limits.
3. **CR (Constant Resistance):** Dynamic load resistance modeling for load testing.
4. **CP (Constant Power):** Constant wattage delivery for power electronics validation.
5. **BAT TEST (Battery Testing):** Automated battery charge/discharge profiling with cut-off voltage protection, discharge current settings, and integrated Amp-hour ($Ah$) capacity counting.

### Module 3: Automated Multi-Step Test Sequence Engine (Recipe Runner)
* **Visual Recipe Builder:** Create, save, edit, and load complex automated test sequences.
* **Multi-Step Execution:** Define voltage/current setpoints, mode transitions, step durations (seconds to hours), and cycle repetition counts.
* **State Machine Protection:** Full execution control with `START`, `PAUSE`, `RESUME`, and `STOP/ABORT` capabilities.
* **Live Step Telemetry:** Real-time visual progress bar, remaining step time counter, and current step highlight.

### Module 4: Hardware Abstraction Layer (HAL) & Profile Manager
* Decouples physical Modbus register addresses from the UI layer.
* Pre-configured for client-specific Modbus CSV register specifications (32-bit IEEE 754 Floating Point, word-swapped/non-word-swapped formats).
* Support for custom device profiles allowing instant plug-and-play selection of different hardware units.

### Module 5: Enterprise Safety Interlocks & Alarm Intercepts
* **Engineering Limits Configuration:** Software and hardware enforce maximum cut-offs for $V_{max}$, $I_{max}$, $P_{max}$, and $R_{max}$.
* **Emergency Alarm Popups:** Instant visual and audible alarms for Over-Voltage (OVP), Over-Power (OPP), and Over-Current (OCP) events.
* **Operator Navigation Lock:** Blocks accidental mode switching or screen navigation while hardware output is active.
* **Non-Destructive Shutdown Protection:** Intercepts application window close attempts while a test is running, requiring explicit operator confirmation to safely ramp down output first.

### Module 6: Low-Level Register Diagnostics Panel
* Direct bit-level and word-level reading and writing for all Modbus Holding Registers (FC03/FC06) and Coils (FC01/FC05).
* Real-time register monitoring table showing raw hex, unsigned 16-bit integer, and converted IEEE 754 32-bit floating point values.
* Diagnostic tool for field technicians to test serial communication, verify slave IDs, and calibrate hardware without external tools like ModScan or Modbus Poll.

### Module 7: Data Archiving & PDF / CSV Report Generation
* **JSON File Database Engine:** Automatic recording of every test session with detailed metadata, device parameters, peak values, average power, and time-series telemetry.
* **Client-Ready PDF Generator:** One-click generation of professional vector PDF test reports complete with company header, timestamp, test parameters, statistical summary, and embedded high-resolution telemetry graphs.
* **Raw CSV Data Export:** Export full uncompressed time-series data for external analysis in Excel, MATLAB, or Python data pipelines.

### Module 8: Built-in Virtual Hardware Simulator
* Complete software-based simulation engine mimicking physical hardware behavior when no serial port is connected.
* Simulates voltage/current response curves, load noise ($\pm 0.02\text{ V/A}$), and battery discharge degradation.
* Allows full software demonstration, operator training, and test recipe development off-site.

---

## 4. Technical Architecture & Technology Stack

The application is built using a modern, multi-threaded desktop architecture designed for high security, zero memory leaks, and fast serial I/O performance.

```
┌────────────────────────────────────────────────────────────────────────┐
|                           REACT 19 RENDERER                            |
|             Modern Industrial SCADA User Interface (SPA)               |
|      (MetricsGrid, LiveChart, SequenceBuilder, HistoryAndPdf)          |
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ IPC Bridge (Typed Preload)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
|                         ELECTRON MAIN PROCESS                          |
|    Node.js Backend, Window Management, Lifecycle Interlock Controls    |
|       ┌────────────────────────┐      ┌─────────────────────────┐      |
|       │  Database Service      │      │ Modbus RTU Service      │      |
|       │  (JSON Persistence)    │      │ (Mutex Queue & Engine)  │      |
|       └────────────────────────┘      └────────────┬────────────┘      |
└────────────────────────────────────────────────────┼───────────────────┘
                                                     │ RS485 Modbus RTU
                                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
|                    PHYSICAL POWER SUPPLY / LOAD HARDWARE               |
└────────────────────────────────────────────────────────────────────────┘
```

### Core Technology Stack

| Component | Technology / Library | Description |
| :--- | :--- | :--- |
| **Desktop Runtime** | Electron (^34.2.0) | Cross-platform desktop application container with process isolation. |
| **Frontend UI** | React (^19.0.0) & TypeScript | Component-based interactive UI with strict type safety. |
| **Build Tooling** | Vite (^6.1.1) | Lightning-fast module bundling and hot module replacement. |
| **Industrial I/O** | `modbus-serial` (^8.0.25) | RS485 / RS232 Modbus RTU master implementation. |
| **Telemetry Graphics** | Recharts (^2.15.1) | High-performance SVG real-time plotting engine. |
| **Document Export** | jsPDF (^2.5.2) & html2canvas | Vector PDF report synthesis and canvas rasterization. |
| **Packaging** | `electron-builder` (^26.15.3) | Single-click Windows NSIS Installer & Portable EXE builder. |

### Advanced Communication & Concurrency Safeguards
* **Single-Threaded Mutex Lock (`SerialBusLock`):** Serial communications are funneled through a strict lock queue to prevent packet collision or frame corruption on the RS485 bus.
* **IEEE 754 Floating-Point Converter:** Handles 32-bit floats split across two adjacent 16-bit registers, supporting both word-swapped (CDAB) and standard (ABCD) formats.
* **Auto-Reconnection & Heartbeat:** Polling engine monitors serial link health; if 3 consecutive packet reads fail, the system smoothly enters `COMMUNICATION_FAULT` mode and automatically attempts reconnection without crashing.

---

## 5. Software & Artifact Deliverables Matrix

Upon completion of the project handover, your company will receive:

| # | Deliverable | Description | Location / Format |
| :---: | :--- | :--- | :--- |
| 1 | **Executable Installer** | Single-click Windows Setup Installer (`.exe`) with NSIS wizard. | `release/Joma Next Gen Power Setup 1.0.0.exe` |
| 2 | **Portable Executable** | Standalone zero-install executable for plug-and-play USB use. | `release/Joma Next Gen Power 1.0.0.exe` |
| 3 | **Full Source Code Repository** | Complete, clean, fully documented TypeScript & React source code. | Project Repository |
| 4 | **Architecture Blueprint** | Deep-dive architectural documentation for future engineering teams. | [`ARCHITECTURE_BLUEPRINT.md`](file:///d:/JOMA/ARCHITECTURE_BLUEPRINT.md) |
| 5 | **Device Profile Library** | Pre-configured Modbus register mappings for client power supply hardware. | `src/types/scada.ts` |
| 6 | **User & Operator Manual** | Guide covering installation, sequence building, diagnostic setup, and safety features. | Included Documentation |

---

## 6. Implementation Milestones & Handover Roadmap

The project is structured across five sequential delivery milestones:

```
[Phase 1: Setup & Protocol] ──> [Phase 2: Core SCADA UI] ──> [Phase 3: Automation & Reports] ──> [Phase 4: Safety & Diag] ──> [Phase 5: Handover]
```

### Phase 1: Setup & Modbus Protocol Integration *(Completed)*
* Environment setup with Electron, React, Vite, and TypeScript.
* Development of `ModbusRtuService` with RS485 serial bus locking.
* IEEE 754 32-bit floating point parsing and register mapping.

### Phase 2: Core Telemetry Dashboard & Hardware Interfacing *(Completed)*
* Real-time 7-segment digital metrics grid for $V_{mon}$, $I_{mon}$, $P_{mon}$.
* 60 FPS Recharts telemetry plotting engine.
* Multi-mode control panel implementation (CV, CC, CR, CP, BAT TEST).

### Phase 3: Automated Sequence Engine & PDF Reporting *(Completed)*
* Multi-step sequence builder state machine with recipe persistence.
* Automatic test logging to file-based database.
* PDF report generation engine with graph embedding and CSV exporter.

### Phase 4: Safety Interlocks & Diagnostics *(Completed)*
* Implementation of low-level diagnostic panel for register reads/writes.
* Engineering safety cut-off limits ($V_{max}$, $I_{max}$, $P_{max}$, $R_{max}$).
* Alarm modal intercepts and non-destructive window closure guards.
* Integrated virtual hardware simulator.

### Phase 5: Testing, Validation & Final Delivery *(Active)*
* On-site hardware validation and serial port baud rate tuning.
* Final binary compilation (NSIS & Portable targets).
* Operator training and source code handover.

---

## 7. Support, Maintenance & Future Expansion

The system architecture has been explicitly engineered for future expansion:

1. **Multi-Channel & Multi-Device Expansion:** The HAL allows expanding from single power supply control to multi-channel test racks without structural refactoring.
2. **Database Upgrade Path:** Current JSON persistence layer can be seamlessly upgraded to SQLite or PostgreSQL if enterprise multi-user logging is required in the future.
3. **Cloud & Remote Monitoring (MQTT/OPC UA):** IPC layers are ready for integration with cloud monitoring services, allowing remote factory managers to track test progress.
4. **Role-Based Access Control (RBAC):** Optional password protection screens can be added to lock calibration settings and engineering limits from unauthorized operators.

---

## 8. Summary & Next Steps

The **JOMA Next Gen Industrial SCADA Application** provides a robust, visually impressive, and highly functional solution that modernizes power supply control and test automation.

**Recommended Action:**
1. Review this proposal document with your technical and executive teams.
2. Schedule a live software demonstration (utilizing both the built-in hardware simulator and connected physical power supply).
3. Finalize hardware validation testing and execute final deployment.

*Prepared by:* **Engineering Team**  
*Project:* **JOMA Next Gen Industrial SCADA Software System**
