import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {Observable} from 'rxjs';
import { QuestionAnswer, QuestionCollection } from '../model/QuestionAnswer';
import { Homequiz } from './homequiz';
import {AnswerOptions} from './answerOptions';
import {QuestionAndAnswer} from './questionAndAnswer'
import {QuizQuestions} from './quizQuestions'
//import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

    questionObject: QuestionAnswer[];

  constructor(private http: HttpClient) {

  }
  
  quizId:number;
  quizdesc="https://localhost:44304/api/Quiz";
  getQuizDesc()
  {
    return this.http.get<Homequiz>(this.quizdesc+'/'+this.quizId);
  }

  questionUrl="https://localhost:44304/api/question/18";
  getQuestionAndAnswers()
  {
    return this.http.get<QuizQuestions>(this.questionUrl);
  }





  questionAnswerJson(questionObject: QuestionAnswer[]) : void {
    
      this.questionObject = questionObject;
      console.log(this.questionObject);  
      
  }
  getJSON(): QuestionAnswer[] {    

    console.log(this.questionObject);  
      return this.questionObject;
      
  }

  POSTQuestionAnswer(questions : QuestionAnswer[]) : Observable<any>
  {
    const data : QuestionCollection = {
      Questions : questions
    };
    return this.http.post('https://localhost:44304/api/question/questionanswer/', data);  
    
  }
}