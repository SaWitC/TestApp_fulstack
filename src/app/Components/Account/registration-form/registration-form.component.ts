import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder, FormArray } from '@angular/forms';
import { RegistrationValidatorsServiceService } from 'src/app/services/registration-validators-service.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  public registrationForm:FormGroup;
  public isSubmitted:boolean=false;
  public isOpenAdditionalPanel:boolean=false;
  public formValue:string="";

  public isPasswordVisable:boolean=true ;
  public changetype:boolean=true;

  public LagArray:string[]=["en","ru","fr","ge"]
 
  constructor(private formBuilder: FormBuilder,
    private accountValidationService: RegistrationValidatorsServiceService,) { }
    
    
  ngOnInit(): void {

    let p =new PhoneNumber();
    p.code="1111";
    p.number="1111";

    this.registrationForm=this.formBuilder.group({
      "login":new FormControl(null,[Validators.required,Validators.maxLength(25)]),
      "email":new FormControl(null,[Validators.email,Validators.required]),
      "password":new FormControl(null,[Validators.required]),
      "confirmPass":new FormControl(null,[Validators.required]),
      "phoneNumbers":this.formBuilder.array([new FormControl(null,[Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im),])]),
      "languages":new FormArray([new FormControl]),
    },
    {
      validator: this.accountValidationService.MatchPassword('password', 'confirmPass'),
    })
  }

  get registerFormControls() {
    return this.registrationForm.controls;
  }


  get getPhoneNumbersArray() {
    return this.registrationForm.controls["phoneNumbers"] as FormArray;
  }

  public AddAlternatePhone(){
    if(this.getPhoneNumbersArray.length<3){
      this.getPhoneNumbersArray.push(this.formBuilder.control('',[Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)]))
    }
  }
  public RemoveAlternatePhone(i:any){
      this.getPhoneNumbersArray.removeAt(i);
  }

  get languagesArray() {
    return this.registrationForm.controls["languages"] as FormArray;
  }

  public AddAlternateLanguage(){
    if(this.languagesArray.length<3){
      this.languagesArray.push(this.formBuilder.control(''))
    }
  }

  public RemoveAlternateLanguage(i:any){
    this.languagesArray.removeAt(i);
}

  public Submit(){
    this.isSubmitted=true;

    this.formValue =JSON.stringify(this.registrationForm.value);
  }


  public getUnusbleLanguages(i:any):string[]{
    let difference = this.LagArray.filter(x => !this.registrationForm.value.languages.includes(x));
    difference.push(this.registrationForm.value.languages[i])
    return difference;
    //debugger;
  }

  public changePanelStatus(){
    if(this.isOpenAdditionalPanel)this.isOpenAdditionalPanel=false;
    else this.isOpenAdditionalPanel=true;
  }

  viewPass(){
    this.isPasswordVisable=!this.isPasswordVisable;
    this.changetype=!this.changetype;
  }

}

export class PhoneNumber{
  public code:string;
  public number:string;
}
