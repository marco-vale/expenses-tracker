import path from 'path';
import { parseNumber } from '../tools/parseNumber';
import { ExpenseImportRow } from '../types/types';
import { Expense, ExpenseType, PrismaClient } from '../../generated/prisma/client';
import XLSX from 'xlsx';
import { parseDate } from '../tools/parseDate';

const isExpenseImportRowValid = (row: ExpenseImportRow): boolean => {
  const debit: number = parseNumber(row['Débito ']);
  const credit: number = parseNumber(row['Crédito ']);

  return !!row['Data mov. '] && (debit > 0 || credit > 0);
}

const importExpenses = async (filePath: string, prisma: PrismaClient, importCategories?: boolean): Promise<Expense[]> => {
  const file = XLSX.readFile(path.join(process.cwd(), filePath), { raw: true });
  const sheetName = file.SheetNames[0];
  const sheet = file.Sheets[sheetName];

  const rows: ExpenseImportRow[] = XLSX.utils.sheet_to_json<ExpenseImportRow>(sheet, { range: 6 })
    .filter(isExpenseImportRowValid);

  return await prisma.$transaction(
    rows.map((r: ExpenseImportRow) => {
      const debit: number = parseNumber(r['Débito ']);
      const credit: number = parseNumber(r['Crédito ']);

      let type: ExpenseType = ExpenseType.EXPENSE;
      let amount: number = 0;

      if (debit > 0) {
        type = ExpenseType.EXPENSE;
        amount = debit;
      } else if (credit > 0) {
        type = ExpenseType.INCOME;
        amount = credit;
      }

      let category: string | undefined = undefined;
      if (importCategories && r['Categoria ']) {
        category = r['Categoria '].trim();
      }

      return prisma.expense.create({
        data: {
          description: r['Descrição '].trim(),
          type,
          amount: type === ExpenseType.EXPENSE ? -amount : amount,
          date: parseDate(r['Data mov. ']),
          category: category
            ? {
              connectOrCreate: {
                where: { name: category },
                create: { name: category },
              }
            }
            : undefined,
        },
      });
    })
  );
};

export default importExpenses;
