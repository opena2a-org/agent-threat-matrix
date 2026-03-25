# Agent Impersonation (AGENT-IMPERSONATE)

**Severity:** Medium
**Category:** identity

## Description

Impersonating trusted agents or administrative roles to gain unauthorized access

## Techniques

| ID | Name | Tactic |
|----|------|--------|
| [T-1006](../techniques/T-1006.md) | Agent Card Discovery | reconnaissance |
| [T-4002](../techniques/T-4002.md) | Admin Impersonation | privilege-escalation |
| [T-4004](../techniques/T-4004.md) | Delegation Abuse | privilege-escalation |
| [T-5002](../techniques/T-5002.md) | A2A Agent Pivoting | lateral-movement |

## Detection

- **HMA Checks:** AIM-001, AIM-002, AIM-003
