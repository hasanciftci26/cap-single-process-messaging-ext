using {
    Personnels             as per,
    PersonnelRegistrations as perReg
} from '../db/data-models';

service PersonnelManagement @(impl : './data-provider') {
    entity Personnels as projection on per;

    event newPersonnelCreated {
        personnelNo : Personnels:personnelNo;
    };
};

service EducationManagement @(impl : './data-provider') {
    entity PersonnelRegistrations as projection on perReg;
};
