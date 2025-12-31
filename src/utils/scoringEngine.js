export const calculateHygiene = (address, data) => {
  let score = 100;
  let findings = [];

  // Penalty: High Approval Count
  if (data?.approvalCount > 5) {
    const penalty = 20;
    score -= penalty;
    findings.push({ id: 'apps', label: `${data.approvalCount} Token Approvals`, severity: 'high', penalty });
  }

  // Penalty: New/Inactive Wallet
  if (data?.txCount < 5) {
    const penalty = 15;
    score -= penalty;
    findings.push({ id: 'age', label: 'Low Transaction History', severity: 'medium', penalty });
  }

  return { finalScore: Math.max(score, 0), findings };
};