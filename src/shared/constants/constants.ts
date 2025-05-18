export const TYPES = {
    MikroORM: Symbol.for("MikroORM"),
    EntityManager: Symbol.for("EntityManager"),
    PatientRepository: Symbol.for("IPatientRepository"),
    UserRepository: Symbol.for("IUserRepository"),
    ProfessionalRepository: Symbol.for("IProfessionalRepository"),

    LoginService: Symbol.for("LoginService"),
    CreateUserService: Symbol.for("CreateUserService"),

    CreatePatientService: Symbol.for("CreatePatientService"),
    ListPatientsService: Symbol.for("ListPatientsService"),
    UpdatePatientService: Symbol.for("UpdatePatientService"),
    DeletePatientService: Symbol.for("DeletePatientService"),

    LoginController: Symbol.for("LoginController"),
    CreateUserController: Symbol.for("CreateUserController"),

    CreatePatientController: Symbol.for("CreatePatientController"),
    ListPatientsController: Symbol.for("ListPatientsController"),
    UpdatePatientController: Symbol.for("UpdatePatientController"),
    DeletePatientController: Symbol.for("DeletePatientController"),
};
