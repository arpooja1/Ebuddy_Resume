export class Resume {
    profilePic: string;
    name: string;
    location: string;
    contactNo: number;
    email: string;
    languages: Languages[]=[];
    interests: Interests[]=[];
    projectExperiences: ProjectExperiences[] = [];
    technicalTrainings: TechnicalTrainings[] = [];
    educations: Educations[] = [];
    functionalSkills: FunctionalSkills[] = [];
    technicalSkills: TechnicalSkills[]=[];
    certifications:Certifications[]=[]

    constructor() {
        this.projectExperiences.push(new ProjectExperiences());
        this.educations.push(new Educations());
        this.technicalTrainings.push(new TechnicalTrainings());
        this.certifications.push(new Certifications());
        this.functionalSkills.push(new FunctionalSkills());
        this.technicalSkills.push(new TechnicalSkills());
        this.languages.push(new Languages());
        this.interests.push(new Interests());

    }
}

export class ProjectExperiences {
    employer: string;
    role: string;
    description: string;
    startDate: string;
    
}
export class TechnicalTrainings{
    organisation: string;
    role: string;
    year:string;
    description: string;
}

export class Educations {
    degree: string;
    college: string;
    passingYear: string;
    stream: string;
    
}
export class Certifications{
    certificateName: string;
    organisation: string;
    year:string;

}

export class FunctionalSkills {
    value: string;
    
}
export class TechnicalSkills {
    value: string;
    
}
export class Languages{
    value:string;
}
export class Interests{
    value:string;
}

