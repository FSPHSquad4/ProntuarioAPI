export type UpdatePatientDTO = {
    id: number;
    fullName?: string;
    cpf?: string;
    birthDate?: Date;
    gender?: string;
    maritalStatus?: string;
    companionName?: string;
    companionCpf?: string;
};
