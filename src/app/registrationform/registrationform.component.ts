// import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { UserServiceService } from '../services/user-service.service';

// @Component({
//   selector: 'app-registrationform',
//   templateUrl: './registrationform.component.html',
//   styleUrls: ['./registrationform.component.scss']
// })
// export class RegistrationformComponent implements OnInit {
//   @Output() interestsChanged = new EventEmitter<string[]>();
//   registrationForm!: FormGroup;
//   photoPreview: any;
//   userData: any;
//   newInterest: string = '';
//   interests: string[] = [];
//   countries: string[] = ['USA', 'Canada', 'UK', 'Australia', 'India'];

//   constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserServiceService) {}

//   ngOnInit(): void {
//     // Initialize form
//     this.registrationForm = this.formBuilder.group({
//       photoUrl: ['', [Validators.required, Validators.pattern('^(https?://.*\\.(?:png|jpg))(\\?w=310&h=325)?$')]],
//       age: [18],
//       firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]{1,20}$')]],
//       lastName: [''],
//       email: [''],
//       country: [''],
//       addressType: [''],
//       address1: [''],
//       address2: [''],
//       companyAddress1: [''],
//       companyAddress2: ['']
//     });

//     // Retrieve user data from router state
//     this.userData = history.state.userData;
//     if (this.userData) {
//       // Populate form fields with user data
//       this.registrationForm.patchValue({
//         photoUrl: this.userData.photoUrl,
//         age: this.userData.age,
//         firstName: this.userData.firstName,
//         email: this.userData.email,
//         lastName: this.userData.lastName,
//         country: this.userData.country,
//         addressType: this.userData.addressType,
//         address1: this.userData.address1,
//         address2: this.userData.address2,
//         companyAddress1: this.userData.companyAddress1,
//         companyAddress2: this.userData.companyAddress2
//       });
//     }
//   }

//   addInterest() {
//     if (this.newInterest.trim() !== '' && !this.interests.includes(this.newInterest.trim())) {
//       this.interests.push(this.newInterest.trim());
//       this.newInterest = '';
//       this.emitInterests(); // Emit the updated interests array
//     }
//   }

//   removeInterest(interest: string) {
//     const index = this.interests.indexOf(interest);
//     if (index !== -1) {
//       this.interests.splice(index, 1);
//       this.emitInterests(); // Emit the updated interests array
//     }
//   }

//   private emitInterests() {
//     this.interestsChanged.emit(this.interests);
//   }

//   submitForm() {
//     if (this.registrationForm.valid) { 
//       const formData = this.registrationForm.value;
//       // Here, you would typically submit the formData to the server
//       // For demonstration purposes, let's assume submission was successful
//       this.userService.createUser(formData).subscribe(newUser => {
//         // Navigate to profile component with the new user's ID
//         this.router.navigate(['/profile', newUser.id]);
//       });
  
//       // Clear the form after submission
//       this.registrationForm.reset();
//       this.interests = []; // Reset interests array after submission
//       this.emitInterests(); // Emit empty interests array
//     } else {
//       // Mark all fields as touched to display validation errors
//       this.registrationForm.markAllAsTouched();
//     }
//   }

//   toggleAddressFields() {
//     const addressType = this.registrationForm.get('addressType')?.value;
//     if (addressType === 'Home') {
//       this.registrationForm.get('companyAddress1')?.reset();
//       this.registrationForm.get('companyAddress2')?.reset();
//     } else if (addressType === 'Company') {
//       this.registrationForm.get('address1')?.reset();
//       this.registrationForm.get('address2')?.reset();
//     }
//   }

//   cancel() {
//     this.router.navigate(['/home']);
//   }
// }
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

export interface Tags {
  name: string;
}

@Component({
  selector: 'app-registrationform',
  templateUrl: './registrationform.component.html',
  styleUrls: ['./registrationform.component.scss'],
})
export class RegistrationformComponent implements OnInit {
  @Output() interestsChanged = new EventEmitter<string[]>();
  registrationForm!: FormGroup;
  //photoPreview: any;
  userData: any;
  // newInterest: string = '';
  // interests: string[] = [];
  states: string[] = ['Maharashtra', 'Gujarat', 'Karnataka', 'Tamil Nadu'];
  countries: string[] = ['USA', 'Canada', 'UK', 'Australia', 'India'];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  myTag: Tags[] = [];
  profilePhoto: string | undefined;
  // imageValid: boolean = true;
  photoPreview: any;
  imageValid: boolean = true;
  interests: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    // Initialize form
    this.registrationForm = this.formBuilder.group({
      /* photoUrl: [
        '',
        [
          Validators.required,
          Validators.pattern('^(https?://.*\\.(?:png|jpg))(\\?w=310&h=325)?$'),
        ],
      ],*/
      photo: [''],
      firstName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z ]{1,20}$')],
      ],
      lastName: [''],
      interest: [''],
      email: [''],
      age: [20, ''],
      country: [''],
      state: [''],
      tags: [''],
      addressType: [''],
      address1: [''],
      address2: [''],
      companyAddress1: [''],
      companyAddress2: [''],
    });

    // Retrieve user data from router state
    this.userData = history.state.userData;
    if (this.userData) {
      // Populate form fields with user data
      this.registrationForm.patchValue({
        photoUrl: this.userData.photoUrl,
        age: this.userData.age,
        firstName: this.userData.firstName,
        email: this.userData.email,
        lastName: this.userData.lastName,
        country: this.userData.country,
        state: this.userData.state,
        addressType: this.userData.addressType,
        address1: this.userData.address1,
        address2: this.userData.address2,
        companyAddress1: this.userData.companyAddress1,
        companyAddress2: this.userData.companyAddress2,
      });
    }
  }

  /*addInterest() {
    if (
      this.newInterest.trim() !== '' &&
      !this.interests.includes(this.newInterest.trim())
    ) {
      this.interests.push(this.newInterest.trim());
      this.newInterest = '';
      this.emitInterests(); // Emit the updated interests array
    }
  }

  removeInterest(interest: string) {
    const index = this.interests.indexOf(interest);
    if (index !== -1) {
      this.interests.splice(index, 1);
      this.emitInterests(); // Emit the updated interests array
    }
  }

  addInterest2() {
    if (
      this.newInterest.trim() !== '' &&
      !this.interests.includes(this.newInterest.trim())
    ) {
      this.interests.push(this.newInterest.trim());
      this.newInterest = '';
    }
  }

  removeInterest2(interest: string) {
    const index = this.interests.indexOf(interest);
    if (index !== -1) {
      this.interests.splice(index, 1);
    }
  }

  addInterest3() {
    if (
      this.newInterest.trim() !== '' &&
      !this.interests.includes(this.newInterest.trim())
    ) {
      this.interests.push(this.newInterest.trim());
      this.newInterest = '';
      this.emitInterests();
    }
  }

  removeInterest3(interest: string) {
    const index = this.interests.indexOf(interest);
    if (index !== -1) {
      this.interests.splice(index, 1);
      this.emitInterests();
    }
  }

  private emitInterests() {
    this.interestsChanged.emit(this.interests);
  }*/

  /*onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.profilePhoto = e.target.result;
      this.checkResolution(file);
    };

    reader.readAsDataURL(file);
  }

  checkResolution(file: File) {
    const img = new Image();
    img.src = window.URL.createObjectURL(file);

    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      if (width !== 380|| height !== 350) {
        this.imageValid = false;
      } else {
        this.imageValid = true;
      }
    };
  }*/

  /*onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.profilePhoto = e.target.result;
      this.checkResolution(file);
    };

    reader.readAsDataURL(file);
  }

  // Method to check image resolution
  checkResolution(file: File) {
    const img = new Image();
    img.src = window.URL.createObjectURL(file);

    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      // Check if width is smaller than 310px and height is smaller than 325px
      this.imageValid = width < 600 && height < 700;
    };
  }
*/
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;

      img.onload = () => {
        const width = img.width;
        const height = img.height;

        // Check if both width and height are smaller than 310px and 325px respectively
        if (width < 500 && height < 525) {
          this.imageValid = true;
          this.photoPreview = reader.result;
        } else {
          this.imageValid = false;
        }
      };
    };

    reader.readAsDataURL(file);
  }
  addInterest(event: any) {
    const value = event.target.value;
    if (value.trim() !== '') {
      this.interests.push(value.trim());
      this.registrationForm.patchValue({ interest: '' }); // Clear input field after adding interest
    }
  }

  removeInterest(index: number) {
    this.interests.splice(index, 1);
  }
  submitForm() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      // Here, you would typically submit the formData to the server
      // For demonstration purposes, let's assume submission was successful
      this.userService.createUser(formData).subscribe((newUser) => {
        // Navigate to profile component with the new user's ID
        this.router.navigate(['/profile', newUser.id]);
      });

      // Clear the form after submission
      this.registrationForm.reset();
      //this.interests = []; // Reset interests array after submission
      // this.emitInterests(); // Emit empty interests array
    } else {
      // Mark all fields as touched to display validation errors
      this.registrationForm.markAllAsTouched();
    }
  }

  toggleAddressFields() {
    const addressType = this.registrationForm.get('addressType')?.value;
    if (addressType === 'Home') {
      this.registrationForm.get('companyAddress1')?.reset();
      this.registrationForm.get('companyAddress2')?.reset();
    } else if (addressType === 'Company') {
      this.registrationForm.get('address1')?.reset();
      this.registrationForm.get('address2')?.reset();
    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}
