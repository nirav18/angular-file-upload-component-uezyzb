import { Component, VERSION, Input } from '@angular/core';
import { FileUploadService } from './file-upload.service';
import { ControlContainer, FormControl, FormBuilder, FormGroup } from '@angular/forms'
import { HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';

@Component({
  selector: 'file-upload',
  template: `
    <input type="file" (change)="upload($event.target.files)" /> {{progress}}%
  `
})
export class FileUploadComponent{
  public progress: number;
  private _control: FormControl;

  @Input() set control(value: FormControl){
    this._control = value;
  }
  @Input() set controlName(name: string){
    this._control = this.container.control.get(name) as FormControl;
  }

  constructor(
    private readonly fileService: FileUploadService,
    private readonly container: ControlContainer

  ) { }

  upload(files: FileList){
    //set it to nothing since we're about to upload a new value
    //also this means that it'll be validated correclty
    this._control.setValue(null); 

    this.fileService.uploadAndProgress(files)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = this.fileService.calcProgressPercent(event);
        } else if (event instanceof HttpResponse) {  
          
          // the actual should be returned as something like
          // this._control.setValue(event.body.url)        
          this._control.setValue('some url') 
        }
    });
  }

}


@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="form">
      <input formControlName="name" /> <br />
      <file-upload controlName="profilePicUrl"></file-upload>
    </form>

    <pre>{{form.value | json}}</pre>
  `

})
export class AppComponent  {

  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(){
    this.form = this.fb.group({
      name: '',
      profilePicUrl: ''
    })
  }

}
