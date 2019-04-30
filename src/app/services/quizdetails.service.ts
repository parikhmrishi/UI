import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Quiz } from '../model/Quiz'
import {Observable} from 'rxjs';
//import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) {

  }

  private apiurl = 'https://localhost:44304/api/quiz';


  PostQuizDetails(quiz : Quiz) : Observable<any>
  {
   return this.http.post('https://localhost:44304/api/quiz/createquiz', quiz);   
  }
 
  
}
