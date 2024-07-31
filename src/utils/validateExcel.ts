export const validateExcel = (data: any[]) => {
  const validRows: any[] = [];
  const invalidRows: { row: any; errors: string[]; rowNumber: number }[] = [];

  data.forEach((row, index) => {
    if (index === 0) return; // Skip header row
    const [username, university, email] = row;
    const errors: string[] = [];

    if (!username) errors.push("Username is required");
    if (!university) errors.push("University is required");
    if (!email) errors.push("Email is required");

    if (errors.length > 0) {
      invalidRows.push({ row, errors, rowNumber: index + 1 });
    } else {
      validRows.push({ username, university, email });
    }
  });

  return { validRows, invalidRows };
};
