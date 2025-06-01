import { AppError } from "@infrastructure/middlewares/handlers/errorHandler";
import { isValid, parse } from "date-fns";

export function parseDateFormat(dateStr: string): Date {
    let parsedDate = parse(dateStr, "dd-MM-yyyy", new Date());

    if (!isValid(parsedDate)) {
        parsedDate = parse(dateStr, "dd/MM/yyyy", new Date());
    }

    if (!isValid(parsedDate)) {
        throw new AppError("Invalid date format", 400);
    }

    return parsedDate;
}
