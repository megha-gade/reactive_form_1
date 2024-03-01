import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Reactive_Form_1';
defaultFirstName:string;
formStatus;



//for reactive form create 1 pproperty with name any but type'should be FormGroup'
reactiveForm:FormGroup;
OnSubmitform: boolean = false;
ngOnInit(): void {
this.reactiveForm=new FormGroup({


//'Group based on PersonAL details'
personalDetails:new FormGroup({
  firstname:new FormControl('John',[Validators.required,this.noSpaceAllowed]),
  email:new FormControl('John@gmail.com',[Validators.required,Validators.email,this.noSpaceAllowed]),
  dob:new FormControl('2024-02-19')
}),
gender:new FormControl('Male'),
course:new FormControl('java'),
message:new FormControl('Hi Community I am glad to present myself here  ....!',Validators.minLength(4))
,
skills:new FormArray([
new FormControl(null,Validators.required),

])

});


//'use of valueChanges()'

// this.reactiveForm.get('personalDetails.firstname').valueChanges.subscribe((val)=>{
// console.log(val);
// console.log(val.toUpperCase());
// })



this.reactiveForm.valueChanges.subscribe(v=>console.log(v))

//' use of the status changes event'

this.reactiveForm.statusChanges.subscribe(s=>{
  console.log('form Status : '+s)
this.formStatus=s})
}

setDefaultValues()
{
this.reactiveForm.setValue({
personalDetails:{
  firstname:'zain',
email:'zain@34gmail.com',
dob:'2024-12-23'
},
gender:'Female',
course:'angular',
message:'',
skills:['reading','swimming']
})
}


OnSubmit()
{
this.OnSubmitform=true;
console.log(this.reactiveForm);
console.log('Is Form Dirty  : '+this.reactiveForm.dirty);
console.log('FirstName Property  : '+this.reactiveForm.value.personalDetails.firstname);
console.log('Errors are as follows '+this.reactiveForm.errors);



}

addSkillsInput()
{
console.log('skill has been added');

//'get method can return anything like formGroup formArray or FormmControl
// so wrap that expression in formArray'

//(<FormArray>this.reactiveForm.get('skills')).push(new FormControl(null));

(<FormArray>this.reactiveForm.get('skills')).push(new FormControl('any',Validators.required));
}












//no'space allowed method'
noSpaceAllowed(control:FormControl)
{
if(control.value!=null && control.value.indexOf(' ')!=-1)
{
return {noSpaceAllowed:true}
}

return null;
}
}
