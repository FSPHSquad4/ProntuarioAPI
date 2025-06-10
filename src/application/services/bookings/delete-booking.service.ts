import { inject, injectable } from "inversify";
import { TYPES } from "@shared/constants/constants";
import type { IBookingRepository } from "@domain/interfaces/repositories/booking.irepository";
import { AppError } from "@infrastructure/middlewares/handlers/errorHandler";

@injectable()
export class DeleteBookingService {
    constructor(
        @inject(TYPES.BookingRepository)
        private readonly _bookingRepository: IBookingRepository,
    ) {}

    async execute(id: number): Promise<void> {
        const booking = await this._bookingRepository.findById(id);

        if (!booking) {
            throw new AppError("Booking not found", 404);
        }

        await this._bookingRepository.delete(id);
    }
}
