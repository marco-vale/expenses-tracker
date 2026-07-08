import path from 'path';
import { unlink } from 'fs/promises';
import { ExpenseImportRow } from '../types/types.js';
import { Expense, ExpenseType, PrismaClient, User } from '../../generated/prisma/client.js';
import XLSX from 'xlsx';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(customParseFormat);
dayjs.extend(utc);

const isExpenseImportRowValid = (row: ExpenseImportRow): boolean => {
  const debit: number = parseRowNumberString(row['Débito ']);
  const credit: number = parseRowNumberString(row['Crédito ']);

  return !!row['Data mov. '] && (debit > 0 || credit > 0);
}

const parseRowNumberString = (numberString?: string): number => {
  if (!numberString || !numberString.trim()) {
    return 0;
  }

  return Number(numberString.trim().replace(/\./g, '').replace(',', '.')) || 0;
};

const parseRowDateString = (dateString: string): Date => {
  return dayjs.utc(dateString.trim(), 'DD-MM-YYYY').toDate();
};

const importExpenses = async (
  filePath: string,
  prisma: PrismaClient,
  user: User,
  importCategories?: boolean
): Promise<Expense[]> => {
  const absoluteFilePath = path.join(process.cwd(), filePath);
  const file = XLSX.readFile(absoluteFilePath, { raw: true });
  const sheetName = file.SheetNames[0];
  const sheet = file.Sheets[sheetName];

  const rows: ExpenseImportRow[] = XLSX.utils.sheet_to_json<ExpenseImportRow>(sheet, { range: 6 })
    .filter(isExpenseImportRowValid);

  try {
    return await prisma.$transaction(
      rows.map((r: ExpenseImportRow) => {
        const debit: number = parseRowNumberString(r['Débito ']);
        const credit: number = parseRowNumberString(r['Crédito ']);

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
            description: (r['Descrição '] ?? '').trim(),
            type,
            amount: type === ExpenseType.EXPENSE ? -amount : amount,
            date: parseRowDateString(r['Data mov. ']),
            category: category
              ? {
                connectOrCreate: {
                  where: { name_userId: { name: category, userId: user.id } },
                  create: {
                    name: category,
                    user: { connect: { id: user.id } },
                  },
                }
              }
              : undefined,
            user: { connect: { id: user.id } },
          },
        });
      })
    );
  } finally {
    // The uploaded file has been parsed; remove it so uploads/ doesn't accumulate.
    await unlink(absoluteFilePath).catch(() => undefined);
  }
};

export default importExpenses;
