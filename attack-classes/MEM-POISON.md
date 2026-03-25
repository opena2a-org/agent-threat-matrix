# Memory Poisoning (MEM-POISON)

**Severity:** Medium
**Category:** supply-chain

## Description

Injecting malicious entries into agent persistent memory to maintain control across sessions

## Techniques

| ID | Name | Tactic |
|----|------|--------|
| [T-3004](../techniques/T-3004.md) | Memory Credential Mining | credential-harvest |
| [T-6001](../techniques/T-6001.md) | Memory Injection | persistence |
| [T-6002](../techniques/T-6002.md) | Self-Replicating Memory Entry | persistence |
| [T-7004](../techniques/T-7004.md) | Memory Dump | collection |

## Detection

- **HMA Checks:** MEM-001, MEM-002, MEM-003, MEM-004, MEM-005, MEM-006
