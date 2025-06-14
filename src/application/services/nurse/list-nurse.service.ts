import type { ListNurseDTO } from "@domain/dto/nurse/list-nurse.dto";
import type { INurseRepository } from "@domain/interfaces/repositories/nurse.irepository";
import { TYPES } from "@shared/constants/constants";
import { inject, injectable } from "inversify";

@injectable()
export class ListNurseService {
    constructor(
        @inject(TYPES.NurseRepository)
        private readonly _nurseRepository: INurseRepository,
    ) {}

    async execute(): Promise<ListNurseDTO[]> {
        const nurse = await this._nurseRepository.listAll();

        return nurse;
    }
}
