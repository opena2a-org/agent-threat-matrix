# Credential Leakage (NEMO-CRED-LEAK)

**Severity:** Medium
**Category:** nemoclaw

## Description

Unintended exposure of credentials through environment variables, logs, or error messages

## Techniques

| ID | Name | Tactic |
|----|------|--------|
| [T-3002](../techniques/T-3002.md) | Environment Variable Leakage | credential-harvest |
| [T-7005](../techniques/T-7005.md) | Configuration Harvesting | collection |

## Detection

- **HMA Checks:** HMA-NMC-001, HMA-NMC-002, HMA-NMC-003, NEMO-004, NEMO-007
