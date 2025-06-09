import type { ListProfessionalsDTO } from "@domain/dto/professionals/list-professionals.dto";
import type { IProfessionalRepository } from "@domain/interfaces/repositories/professional.irepository";
import { TYPES } from "@shared/constants/constants";
import { inject, injectable } from "inversify";

@injectable()
export class ListProfessionalsService {
    constructor(
        @inject(TYPES.ProfessionalRepository)
        private readonly _professionalRepository: IProfessionalRepository,
    ) {}

    async execute(): Promise<ListProfessionalsDTO[]> {
        const professionals = await this._professionalRepository.listAll();

        return professionals;
    }
}
