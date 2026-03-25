# Retroactive Privilege Exploitation (RETROACTIVE-PRIV)

**Severity:** Medium
**Category:** infrastructure

## Description

Exploiting previously granted access or cached credentials to gain unauthorized capabilities

## Techniques

| ID | Name | Tactic |
|----|------|--------|
| [T-1001](../techniques/T-1001.md) | Endpoint Enumeration | reconnaissance |
| [T-1004](../techniques/T-1004.md) | Security Level Probing | reconnaissance |
| [T-1007](../techniques/T-1007.md) | Context Window Probing | reconnaissance |
| [T-3001](../techniques/T-3001.md) | System Prompt Credential Extraction | credential-harvest |
| [T-3003](../techniques/T-3003.md) | Tool Response Credential Capture | credential-harvest |
| [T-3005](../techniques/T-3005.md) | Configuration File Access | credential-harvest |
| [T-3006](../techniques/T-3006.md) | Context Window Credential Leak | credential-harvest |
| [T-5004](../techniques/T-5004.md) | Credential Reuse | lateral-movement |
| [T-8005](../techniques/T-8005.md) | Conversation Exfiltration | exfiltration |

## Detection

- **HMA Checks:** CRED-001, CRED-002, CRED-003, CRED-004, WEBEXPOSE-001, WEBEXPOSE-002, WEBEXPOSE-003, AGENT-CRED-001, WEBCRED-001
