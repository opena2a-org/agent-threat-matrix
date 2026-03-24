# Contributing to the AI Agent Threat Matrix

We welcome contributions of new techniques, attack classes, evidence reports, and detection methods.

## Evidence Requirements

Every technique in this matrix must meet one of these evidence bars:

| Tier | Requirement |
|------|------------|
| **Observed** | Documented in a real-world production system, security incident report, or internet-wide exposure assessment |
| **Validated** | Reproduced in a controlled lab environment with documented steps, expected output, and independent verification |
| **Adapted** | Well-understood technique from traditional security (MITRE ATT&CK) applied to the AI agent context with a clear explanation of how the agent-specific variant differs |

We do not accept purely theoretical techniques. If you have a plausible attack vector but no evidence, file an issue describing the hypothesis and we will evaluate it for future research.

## Proposing a New Technique

1. **Check for duplicates.** Search existing techniques in `techniques/` and `matrix.json` to ensure the technique is not already covered.

2. **Assign an ID.** Use the next available ID in the appropriate stage range:
   - T-1XXX: Reconnaissance
   - T-2XXX: Initial Access
   - T-3XXX: Credential Harvest
   - T-4XXX: Privilege Escalation
   - T-5XXX: Lateral Movement
   - T-6XXX: Persistence
   - T-7XXX: Collection
   - T-8XXX: Exfiltration
   - T-9XXX: Impact

3. **Create a technique file** in `techniques/` following the template:

```markdown
# T-XXXX: Technique Name

## Tactic
[Kill chain stage]

## Description
[What the technique does and why it works]

## Attack Class
[Which attack class this belongs to]

## Evidence
- **Tier:** Observed / Validated / Adapted
- **Source:** [Where this was observed or validated]

## Procedure Example
[Step-by-step description of how an attacker executes this]

## Detection
- **HMA Checks:** [Check IDs]
- **Detection Logic:** [What to look for]

## Validation
- **DVAA Challenge:** [Challenge ID or scenario name]
- **Reproduction Steps:** [How to reproduce in DVAA]

## Defense
- **OASB Controls:** [Control IDs]
- **Mitigation:** [How to prevent this]

## References
[Links to evidence, academic papers, incident reports]
```

4. **Update matrix.json** to include the new technique.

5. **Submit a pull request** with:
   - The technique file
   - Updated matrix.json
   - Evidence documentation (if new evidence)
   - A brief description of why this technique should be included

## Proposing a New Attack Class

Attack classes group related techniques. To propose a new class:

1. Identify 2+ techniques that share a common vulnerability pattern
2. Create a class file in `attack-classes/` with the class name, description, member techniques, and member HMA checks
3. Explain why this grouping is useful for practitioners

## Reporting Errors

If you find an error in a technique description, evidence citation, or cross-reference mapping, please file an issue with:

- The technique or class ID
- What is incorrect
- What the correct information should be
- A source for the correction

## Code of Conduct

Contributions must be:
- Factual and evidence-based
- Vendor-neutral (no product promotion)
- Responsible (no active exploit code against production systems)
- Respectful of coordinated disclosure timelines
