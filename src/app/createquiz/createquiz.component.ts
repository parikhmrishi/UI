import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/model/Quiz';
import { environment } from '../../environments/environment.prod';
import { QuestionService } from '../services/question.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { QuestionAnswer, QuestionOption } from 'src/app/model/QuestionAnswer';
import { QuizService } from '../services/quizdetails.service';
import { Router } from '@angular/router';
import { DataService } from '../services/userData.service';


@Component({
  selector: 'app-createquiz',
  templateUrl: './createquiz.component.html',
  styleUrls: ['./createquiz.component.scss']
})
export class CreatequizComponent implements OnInit {

  statusQuiz: boolean;
  statusQuestion: boolean;
  statusPreview: boolean;
  step: number = 1;
  questionJSON: JSON;
  arrCase : string;
  Questions : object [];
  Answers :  string[] ;
  Name:string;
  Description:string;
  NumberOfQuestion:number;
  StartDate:Date;
  EndDate:Date;
  today:Date;
  form: FormGroup;
  Qtype: boolean = true;
  loadComponent: boolean;
  questionCount: number = 1;
  test = true;
  oneQuestion:boolean = true;
  maxOption:number=4;
  minOption:number=2;

  public quiz : Quiz= {} as Quiz
  public questions = [] as QuestionAnswer[];
  
  constructor( private questionService: QuestionService,private router: Router, private fb: FormBuilder,private quizService: QuizService, private userService: DataService) { 
    this.quiz.name = "";
    this.quiz.description = "";
    
    this.quiz.numberOfQuestionsDisplayed =0;
    this.quiz.createdBy = "";
    // this.quiz.startDate = "";
    // this.quiz.endDate = "";
  }

  ngOnInit() {

    // if ( this.userService.getRole() === false) {
    //   this.router.navigate(['home']);
    // }
    this.step = environment.step;

    this.questions = this.questionService.getJSON();
    console.log(this.questions);
    this.today = new Date(this.today);
    console.log(this.today);

    this.form = this.fb.group({
      'Questions': this.fb.array([
        this.initQuestion()
      ])
    });
  
  }



  onSubmit(quizDescForm) {
 
    
    this.quiz.name = quizDescForm.value.title;
    this.quiz.description = quizDescForm.value.description;
    
    this.quiz.numberOfQuestionsDisplayed = quizDescForm.value.noofqstn;
    this.quiz.createdBy = localStorage.getItem("userId");
    this.quiz.startTime = quizDescForm.value.startdate;
    this.quiz.endTime = quizDescForm.value.enddate; 
    // if(this.quiz.startDate <= this.today)
    // alert("Start date should be greater than current");

    if(!(this.quiz.startTime < this.quiz.endTime))
    alert("End date should be greater than start date");
    console.log(this.quiz);
  
    this.quizService.PostQuizDetails(this.quiz).subscribe(() => this.increaseStep() ),
    (err: any) => alert("Bad Request");

  } 
  increaseStep() {
    this.step++;
    if(this.step >= 3)
    {
      this.step = 3;
    }
    environment.step = this.step;
    console.log(this.step);
    console.log(environment.step);
  }

  decreaseStep() {
    this.step--;
    if(this.step <= 1)
    {
      this.step = 1;
    }
    environment.step = this.step;
    console.log(this.step);
    console.log(environment.step);

  }

  
  public onChange(questionindex): void {
   
    const questionType = this.form["controls"].Questions["controls"][questionindex].controls.questionType.value;
    if (questionType == "MCQ") {
      this.Qtype = true;
    }
    else {
      this.Qtype = false;
    }
  }

  public returnChange(questionindex): boolean {
   
    const questionType = this.form["controls"].Questions["controls"][questionindex].controls.questionType.value;
    if (questionType == "MCQ") {
      return true;
    }
    else {
      return false;
    }
  }


  initQuestion() {
    return this.fb.group({
      //  ---------------------forms fields on x level ------------------------
      'questionText': [''],
      'questionType' : [''],
      // ---------------------------------------------------------------------
      'questionOptions': this.fb.array([
        this.initOption()
      ])
    });
    
  }

  initOption() {
    return this.fb.group({
      'option': [''],
      'isCorrect': [false],
    })
  }


  addQuestion() {
    
    const control = <FormArray>this.form.controls['Questions'];
    control.push(this.initQuestion());
    this.questionCount++;
    console.log(this.questionCount);
  }
 
  addOption(questionindex) {
    const control = (<FormArray>this.form.controls['Questions']).at(questionindex).get('questionOptions') as FormArray;
    if(control.length<this.maxOption) {
      control.push(this.initOption());
 }
 else {
   alert ("Option cannot be added");
 }
   
  }

  removeOption(questionindex,optionindex) {
    const control = (<FormArray>this.form.controls['Questions']).at(questionindex).get('questionOptions') as FormArray;
    var optionLength = control.length;
    console.log(optionLength);
if(optionLength>(this.minOption-1)) {
     control.removeAt(optionindex);
}
else {
  alert ("Option cannot be removed");
}
  }

  removeQuestion(questionindex) {
    if(this.questionCount >=2)
    {
    const control = <FormArray>this.form.controls['Questions'];
    control.removeAt(questionindex);
    this.questionCount--;
    console.log(this.questionCount);
    }
    else {
      alert("Cannot delete");
    }
    
  }

  preview(questionanswerform: QuestionAnswer[] ) {
    // this.quest.questionText=form.questionText
    // this.quest.questionTypeId = 2
    
    this.questions = questionanswerform;
    console.log(this.questions);
    this.questionService.questionAnswerJson(questionanswerform);
    this.increaseStep();

    

  }
 
  proceedtopreview() {

    this.loadComponent = true;

  }
}
