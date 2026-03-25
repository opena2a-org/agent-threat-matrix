# Unicode Steganography (UNICODE-STEGO)

**Severity:** Medium
**Category:** supply-chain

## Description

Using invisible Unicode characters, homoglyphs, and encoding tricks to bypass filters

## Techniques

| ID | Name | Tactic |
|----|------|--------|
| [T-2006](../techniques/T-2006.md) | Unicode/Encoding Bypass | initial-access |
| [T-4005](../techniques/T-4005.md) | Policy Bypass via Encoding | privilege-escalation |

## Detection

- **HMA Checks:** UNICODE-STEGO-001, UNICODE-STEGO-002, UNICODE-STEGO-003, UNICODE-STEGO-004, UNICODE-STEGO-005
