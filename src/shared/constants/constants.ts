export const TYPES = {
    MikroORM: Symbol.for("MikroORM"),
    EntityManager: Symbol.for("EntityManager"),
    PatientRepository: Symbol.for("IPatientRepository"),

    CreatePatientService: Symbol.for("CreatePatientService"),
    ListPatientsService: Symbol.for("ListPatientsService"),
    UpdatePatientService: Symbol.for("UpdatePatientService"),
    DeletePatientService: Symbol.for("DeletePatientService"),

    CreatePatientController: Symbol.for("CreatePatientController"),
    ListPatientsController: Symbol.for("ListPatientsController"),
    UpdatePatientController: Symbol.for("UpdatePatientController"),
    DeletePatientController: Symbol.for("DeletePatientController"),
};
