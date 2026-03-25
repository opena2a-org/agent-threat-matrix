# Skill-Based Exfiltration (SKILL-EXFIL)

**Severity:** Medium
**Category:** supply-chain

## Description

Using legitimate tool capabilities for unauthorized data transfer

## Techniques

| ID | Name | Tactic |
|----|------|--------|
| [T-5001](../techniques/T-5001.md) | SSRF via Tool | lateral-movement |
| [T-7003](../techniques/T-7003.md) | API Data Harvesting | collection |
| [T-8001](../techniques/T-8001.md) | Email Exfiltration | exfiltration |
| [T-8002](../techniques/T-8002.md) | HTTP Callback | exfiltration |
| [T-8003](../techniques/T-8003.md) | DNS Exfiltration | exfiltration |
| [T-8004](../techniques/T-8004.md) | Tool Chain Exfiltration | exfiltration |
| [T-8006](../techniques/T-8006.md) | Webhook Exfiltration | exfiltration |

## Detection

- **HMA Checks:** SKILL-006, NET-001, NET-002, NET-003
