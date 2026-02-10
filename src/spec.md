# Specification

## Summary
**Goal:** Let the teacher/admin manage payment receiving details and the class timetable from within the app, with both persisted in the backend and reflected across student-facing screens.

**Planned changes:**
- Add backend storage (stable state) and methods to fetch/update teacher-managed payment settings (UPI VPA/ID `pa` and payee name `pn`), including sensible defaults when unset.
- Add an Admin “Payment Settings” screen to view/edit `pa` and `pn`, validate inputs, and save to the backend with English success/error messages.
- Update the Pay Fees screen to fetch and use the latest backend payment settings when generating the UPI deep link, including loading and default fallback behavior.
- Add backend storage (stable state) and methods to fetch/update the teacher-managed timetable, including defaults matching the current static timetable when unset.
- Add an Admin “Timetable Editor” screen to add/edit/remove timetable entries (day, subject, time), validate inputs, and save to the backend with English success/error messages.
- Update the Timetable screen to fetch and display timetable entries from the backend, including loading and empty-state messaging.

**User-visible outcome:** Teacher/admins can update payment account details and edit the timetable in dedicated admin screens; students see the updated timetable, and Pay Fees uses the latest saved payment details.
