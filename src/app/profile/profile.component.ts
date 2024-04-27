import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';

import { FormGroup, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user: any = {};
  //photoPreview: any;
  photoPreview: string | undefined;
  userId: string = '';
  profilePhoto: string | undefined;
  registrationForm!: FormGroup;

  constructor(
    private userService: UserServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  /*ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = params['id'];
      this.userService.getUserData(userId).subscribe((userData) => {
        this.user = userData;
      });
    });
  }
*/
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = params['id'];
      this.userService.getUserData(userId).subscribe((userData) => {
        this.user = userData;
        this.photoPreview = userData.photoUrl; // Update photoPreview with the user's photo URL
      });
    });
  }
  /*ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      this.userService.getUserData(userId).subscribe(userData => {
        this.user = userData;
      });
    });
  }

 
  

  submitForm() {
    if (this.registrationForm.valid && this.userId !== null) { // Check if userId is not null
      const userData = {
        // Populate with form data
      };
      this.userService.updateUser(Number(this.userId), userData).subscribe(updatedUser => {
        // Update user data in the component
        this.user = updatedUser;
      });
    }
  }*/

  editPhoto() {
    this.router.navigate(['/registeration-form'], {
      state: { userData: this.user, editPhoto: true },
    });
  }

  editProfile() {
    this.router.navigate(['/registeration-form'], {
      state: { userData: this.user },
    });
  }

  /*chooseFile() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }*/
}

