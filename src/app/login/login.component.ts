import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  submitForm(): void {
    const data = {
      username: this.validateForm.value.username,
      password: this.validateForm.value.password
    };
    this.userService.login(this.validateForm.value).subscribe(res => {
      if (res.code === 200) {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      }
    });
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  goRegister() {
    this.router.navigate(['/register']);
  }
}
