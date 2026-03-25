# SOUL/System Prompt Injection (SOUL-INJECT)

**Severity:** Medium
**Category:** governance

## Description

Directly manipulating or overriding the agent's system-level instructions and behavioral boundaries

## Techniques

| ID | Name | Tactic |
|----|------|--------|
| [T-1003](../techniques/T-1003.md) | System Prompt Extraction | reconnaissance |
| [T-2001](../techniques/T-2001.md) | Direct Prompt Injection | initial-access |
| [T-2003](../techniques/T-2003.md) | Role-Play Jailbreak | initial-access |
| [T-2007](../techniques/T-2007.md) | Multi-Turn Manipulation | initial-access |
| [T-2008](../techniques/T-2008.md) | System Prompt Boundary Bypass | initial-access |

## Detection

- **HMA Checks:** SOUL-IH-001, SOUL-IH-002, PROMPT-001, PROMPT-002, PROMPT-003, PROMPT-004, SOUL-OVERRIDE-001
