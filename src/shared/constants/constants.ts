export const TYPES = {
    MikroORM: Symbol.for("MikroORM"),
    EntityManager: Symbol.for("EntityManager"),
    PatientRepository: Symbol.for("IPatientRepository"),
    GenericUserRepository: Symbol.for("IGenericUserRepository"),
    ProfessionalRepository: Symbol.for("IProfessionalRepository"),

    LoginService: Symbol.for("LoginService"),

    CreatePatientService: Symbol.for("CreatePatientService"),
    ListPatientsService: Symbol.for("ListPatientsService"),
    UpdatePatientService: Symbol.for("UpdatePatientService"),
    DeletePatientService: Symbol.for("DeletePatientService"),

    LoginController: Symbol.for("LoginController"),

    CreatePatientController: Symbol.for("CreatePatientController"),
    ListPatientsController: Symbol.for("ListPatientsController"),
    UpdatePatientController: Symbol.for("UpdatePatientController"),
    DeletePatientController: Symbol.for("DeletePatientController"),

    CreateProfessionalService: Symbol.for("CreateProfessionalService"),

    CreateProfessionalController: Symbol.for("CreateProfessionalController"),
};
