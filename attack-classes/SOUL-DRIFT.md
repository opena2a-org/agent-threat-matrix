# SOUL/System Prompt Drift (SOUL-DRIFT)

**Severity:** Medium
**Category:** governance

## Description

Gradually displacing safety instructions from the active context through conversation manipulation

## Techniques

| ID | Name | Tactic |
|----|------|--------|
| [T-2004](../techniques/T-2004.md) | Context Window Exploitation | initial-access |
| [T-4006](../techniques/T-4006.md) | Safety Instruction Displacement | privilege-escalation |

## Detection

- **HMA Checks:** SOUL-TH-003, SOUL-TH-004
