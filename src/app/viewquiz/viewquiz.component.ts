import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { DataService } from '../services/userData.service';
import { QuizService } from '../services/quizdetails.service';
import { Homequiz } from '../services/homequiz';
import {QuestionAndAnswer} from '../services/questionAndAnswer';
import {QuizQuestions} from '../services/quizQuestions'

@Component({
  selector: 'app-viewquiz',
  templateUrl: './viewquiz.component.html',
  styleUrls: ['./viewquiz.component.scss']
})
export class ViewquizComponent implements OnInit {

  quizDescription: Homequiz[];
  QuizQuestions:QuizQuestions;
  id: number;
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  numberOfQuestionsDisplayed: number;
  createdby: string;
  lastUpdatBy: string;
  isReactive: boolean;
  showQuestionAndAnswers:boolean=false;

  public showquestionandasnwers(){
    this.showQuestionAndAnswers=true;
  }
  public showDescription()
  {
    this.showQuestionAndAnswers=false;
  }



  constructor(private questionservice: QuestionService) { }
  quizid: number;


  ngOnInit() {
    this.quizid = this.questionservice.quizId;

    this.questionservice.getQuestionAndAnswers().subscribe(QuizData=>{
      this.QuizQuestions=QuizData;
      console.log(this.QuizQuestions);
      this.QuizQuestions.questions.forEach(question=>{
        console.log(question.id);
        console.log(question.questionText);
        console.log(question.questionTypeId);
        console.log(question.quizId);
        console.log(question.questionOptions);
        question.questionOptions.forEach(option=>{
          console.log(option.option);
          console.log(option.isCorrect);
        })

      })

  
      

    })


    this.questionservice.getQuizDesc().subscribe(detail => {
        this.id = detail.id;
        this.name = detail.name;
        this.description = detail.description;
        this.startTime = detail.startTime;
        this.endTime = detail.endTime;
        this.numberOfQuestionsDisplayed = detail.numberOfQuestionsDisplayed;
        this.createdby = detail.createdby;
        this.lastUpdatBy = detail.lastUpdatBy;
        this.isReactive = detail.isReactive;
      
    }
    )

  }

}
