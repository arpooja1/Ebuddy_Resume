import { Component } from '@angular/core';
import { Resume, Languages,Interests,ProjectExperiences,TechnicalTrainings,Educations, FunctionalSkills,TechnicalSkills,Certifications } from './resume';
import { ScriptService } from './script.service';
declare let pdfMake: any ;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  resume = new Resume();

  degrees = ['B.E.', 'M.E.', '10th', '12th','BCA'];

  constructor(private scriptService: ScriptService) {
    this.resume = JSON.parse(sessionStorage.getItem('resume')) || new Resume();
    if (!this.resume.projectExperiences || this.resume.projectExperiences.length === 0) {
      this.resume.projectExperiences = [];
      this.resume.projectExperiences.push(new ProjectExperiences());
    }
    if (!this.resume.educations || this.resume.educations.length === 0) {
      this.resume.educations = [];
      this.resume.educations.push(new Educations());
    }
    if (!this.resume.technicalTrainings || this.resume.technicalTrainings.length === 0) {
      this.resume.technicalTrainings = [];
      this.resume.technicalTrainings.push(new TechnicalTrainings());
    }
    if (!this.resume.technicalSkills || this.resume.technicalSkills.length === 0) {
      this.resume.technicalSkills = [];
      this.resume.technicalSkills.push(new TechnicalSkills());
    }

    if (!this.resume.functionalSkills || this.resume.functionalSkills.length === 0) {
      this.resume.functionalSkills = [];
      this.resume.functionalSkills.push(new FunctionalSkills());
    }
    if (!this.resume.certifications || this.resume.certifications.length === 0) {
      this.resume.certifications = [];
      this.resume.certifications.push(new Certifications());
    }
    if (!this.resume.languages || this.resume.languages.length === 0) {
      this.resume.languages = [];
      this.resume.languages.push(new Languages());
    }
    if (!this.resume.interests || this.resume.interests.length === 0) {
      this.resume.interests = [];
      this.resume.interests.push(new Interests());
    }


    console.log('Loading External Scripts');
    this.scriptService.load('pdfMake', 'vfsFonts');
  }

  addProjectExperiences() {
    this.resume.projectExperiences.push(new ProjectExperiences());
  }

  addEducations() {
    this.resume.educations.push(new Educations());
  }
  addTechnicalTrainings(){
    this.resume.technicalTrainings.push(new TechnicalTrainings());
  }
  addCertifications(){
    this.resume.certifications.push(new Certifications());
  }


  generatePdf(action = 'open') {
    console.log(pdfMake);
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }


  resetForm() {
    this.resume = new Resume();
  }

  getDocumentDefinition() {
    sessionStorage.setItem('resume', JSON.stringify(this.resume));
    return {
      content: [
        {
          text: this.resume.name,
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [
            {
              text: this.resume.location
              
            },
            {
              text:  this.resume.email,
            },
            {
              text: + this.resume.contactNo,
            }
            /**{
              text: 'GitHub: ' + this.resume.socialProfile,
              link: this.resume.socialProfile,
              color: 'blue',
            }*/
            ],
            [
              this.getProfilePicObject()

            ]
          ]
        },
        {
          text: 'Funcational Skills',
          style: 'header',
          alignment: 'left'
        },
        {
          columns : [
            {
              ul : [
                ...this.resume.functionalSkills.filter((value, index) => index % 3 === 0).map(s => s.value)
              ]
            },
            {
              ul : [
                ...this.resume.functionalSkills.filter((value, index) => index % 3 === 1).map(s => s.value)
              ]
            },
            {
              ul : [
                ...this.resume.functionalSkills.filter((value, index) => index % 3 === 2).map(s => s.value)
              ]
            }
          ]
        },
        {
          text: 'Project Experience',
          style: 'header',
          alignment: 'right'
        },
        this.getProjectExperiencesObject(this.resume.projectExperiences),

        {
          text: 'Education',
          style: 'header'
        },
        this.getEducationsObject(this.resume.educations),
        
        /**{
          text: 'Other Details',
          style: 'header'
        },
        {
          text: this.resume.otherDetails
        },
        {
          text: 'Signature',
          style: 'sign'
        },
        {
          columns : [
              { qr: this.resume.name + ', Contact No : ' + this.resume.contactNo, fit : 100 },
              {
              text: `(${this.resume.name})`,
              alignment: 'right',
              }
          ]
        }*/
      ],
      info: {
        title: this.resume.name + '_RESUME',
        author: this.resume.name,
        subject: 'RESUME',
        
      },
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 20, 0, 10],
            decoration: 'underline'
          },
          name: {
            fontSize: 16,
            bold: true
          },
          jobTitle: {
            fontSize: 14,
            bold: true,
            italics: true
          },
         /** sign: {
            margin: [0, 50, 0, 10],
            alignment: 'right',
            italics: true
          },*/
          tableHeader: {
            bold: true,
          }
        }
    };
  }

  getProjectExperiencesObject(projectExperiences: ProjectExperiences[]) {

    const exs = [];

    projectExperiences.forEach(projectExperience => {
      exs.push(
        [{
          columns: [
            [{
              text: projectExperience.role,
              style: 'jobTitle'
            },
            {
              text: projectExperience.employer,
            },
            {
              text: projectExperience.description,
            }],
            {
              text: 'Project Experience : ' + projectExperience.startDate,
              alignment: 'right'
            }
          ]
        }]
      );
    });

    return {
      table: {
        widths: ['*'],
        body: [
          ...exs
        ]
      }
    };
  }

  getEducationsObject(educations: Educations[]) {
    return {
      table: {
        widths: ['*', '*', '*', '*'],
        body: [
          [{
            text: 'Degree',
            style: 'tableHeader'
          },
          {
            text: 'College',
            style: 'tableHeader'
          },
          {
            text: 'Passing Year',
            style: 'tableHeader'
          },
          {
            text: 'Stream',
            style: 'tableHeader'
          },
          ],
          ...educations.map(ed => {
            return [ed.degree, ed.college, ed.passingYear, ed.stream];
          })
        ]
      }
    };
  }

  getProfilePicObject() {
    if (this.resume.profilePic) {
      return {
        image: this.resume.profilePic ,
        width: 75,
        alignment : 'left'
      };
    }
    return null;
  }

  fileChanged(e) {
    const file = e.target.files[0];
    this.getBase64(file);
  }

  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.resume.profilePic = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  addTecnicalSkills() {
    this.resume.technicalSkills.push(new TechnicalSkills());
  }
  addFunctionalSkills() {
    this.resume.functionalSkills.push(new FunctionalSkills());
  }
  addLanguages() {
    this.resume.languages.push(new Languages());
  }
  addInterests() {
    this.resume.interests.push(new Interests());
  }

}
