entity Personnels {
    key personnelNo : Integer;
        firstName   : String(50);
        lastName    : String(50);
        country     : String(2);
};

entity PersonnelRegistrations {
    key personnelNo        : String(50);
        mandatoryEducation : String(50);
};
