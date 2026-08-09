# Bhutan Youth Portal - Coding & Design Style Guide (GEMINI.md)

This rules file applies to all future code edits and layout changes for the Bhutan Youth Development Portal.

---

## 1. Design Principles (No "AI-like" Templates)

*   **No Unnecessary Emojis**: Do not use large emojis (e.g. 🥋, 🎓, 🏢, 🏫) inside UI cards or list items. Use clean typography, letter spacing, or subtle SVG icons if needed. Emojis make the portal look like an AI placeholder template.
*   **Flat, Professional Slate & Contrast**:
    *   Avoid exaggerated drop-shadows, blurred neon glowing cards, and high-saturation rainbow gradients.
    *   Use flat light panels with subtle, precise borders (`border: 1px solid #e2e8f0`).
    *   Use generous, consistent paddings (`padding: 32px` or `48px`) rather than squeezing text inside compact, colorful cards.
*   **Production-Level Data Structures**:
    *   Provide real, structured data views. For example, instead of cards with single sentences, build clean table listings for notices, multi-column feature breakdowns, and proper registration details.
    *   Use actual business fonts and letter-spacing (`letter-spacing: -0.02em`, `line-height: 1.6`) for premium layout vibes.
*   **Institutional Identity**: Emphasize the KOICA blue (`#115ec9`) and Bhutanese elements with restraint. Keep the UI looking like an official international ODA portal.

---

## 2. Technical Handover Integrity

*   Keep scripts extremely clean and self-explanatory.
*   Separate presentation logic from configuration so that local BTF staff can update news and configs by editing straightforward locale files (`ko.json`/`en.json`) or Firebase dashboard.
