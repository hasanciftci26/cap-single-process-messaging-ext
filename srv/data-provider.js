const cds = require("@sap/cds");

class PersonnelManagement extends cds.ApplicationService {
    async init() {

        this.after("CREATE", "Personnels", (req, res) => {
            this.emit("newPersonnelCreated", { personnelNo: req.personnelNo });
        });

        await super.init();
    }
}

class EducationManagement extends cds.ApplicationService {
    async init() {

        const PersonnelManagementService = await cds.connect.to("PersonnelManagement"),
            { Personnels } = PersonnelManagementService.entities,
            db = await cds.connect.to("db"),
            { PersonnelRegistrations } = db.entities;

        PersonnelManagementService.on("newPersonnelCreated", async (msg) => {
            let oCreatedPersonnel = await PersonnelManagementService.run(SELECT.one.from(Personnels).where({ personnelNo: msg.data.personnelNo }));

            await INSERT.into(PersonnelRegistrations).entries({
                personnelNo: oCreatedPersonnel.personnelNo,
                mandatoryEducation: oCreatedPersonnel.country == "TR" ? "Hayatta kalma mücadelesi" : "Müthiş hayat"
            });
        });

        await super.init();
    }
}

module.exports = { PersonnelManagement, EducationManagement };