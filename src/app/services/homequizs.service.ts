import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Homequiz } from './homequiz';
import { Userquiz } from './userquiz';



@Injectable({
  providedIn: 'root'
})
export class HomequizsService {
quizurl="https://localhost:44304/api/Quiz";
  constructor(private http:HttpClient) { }
  gethomequizes(){
    return this.http.get<Homequiz[]>(this.quizurl);
  }
  
  userquizurl="https://localhost:44304/api/QuizResult"
  getuserquizs(){
    return this.http.get<Userquiz[]>(this.userquizurl+'/'+localStorage.getItem('userId'));
  }
}
