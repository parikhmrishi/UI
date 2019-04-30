import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { DataService } from '../services/userData.service';
import { IUserDetails } from '../model/IUserDetail'
import { Homequiz } from './../services/homequiz'
import { HomequizsService } from '../services/homequizs.service';
import { Userquiz } from '../services/userquiz';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  UserQuizs: Userquiz[] = [];

  takenquizzes: Homequiz[] = [];
  homequizzes: Homequiz[] = [];
  upcomingquizs: Homequiz[] = [];
  ongoingquizs: Homequiz[] = [];
  expiredquizs: Homequiz[] = [];
  userQuizIds: number[] = [];


  currentdate: Date = new Date();

  response: string;
  id: string;
  name: string;
  email: string;
  admin: boolean = false;
  selectedQuiz: Homequiz;
  LastActiveQuiz: boolean;

  lastSelectedQuiz: Homequiz;

  Editorview: boolean = false;

  public lastselectedquiz() {
    this.lastSelectedQuiz;
    this.Editorview = false;
  }
  public editorview(quiz) {

    this.lastselectedquiz();
    this.selectedQuiz = quiz;

    if (this.lastSelectedQuiz == this.selectedQuiz) {

      if (!this.Editorview) {
        this.Editorview = true;
      }
      else {
        this.Editorview = false;
      }
      this.lastSelectedQuiz = quiz;
    }
    else {

      if (!this.Editorview) {
        this.Editorview = true;
      }
      // else {
      //   this.Editorview = false;
      // }
      this.lastSelectedQuiz = quiz;
    }


  }

  public viewquizpage(id: number) {
    this.questionservice.quizId = id;
    this.router.navigate(['viewquiz']);
  }


  public isvalid: boolean = false;
  public iscreate: boolean = false;
  public displaysidemenu(valid) {
    if (this.isvalid == true)
      this.isvalid = false;
    else if (this.isvalid == false)
      this.isvalid = true;
  }
 
  constructor(private authService: AuthService, private router: Router, private dataService: DataService, private homequizservice: HomequizsService, private questionservice: QuestionService) {

  }

  ngOnInit() {

    this.homequizservice.gethomequizes().subscribe(homequizs => {
      this.homequizzes = homequizs;
      console.log(this.homequizzes);
      this.homequizservice.getuserquizs().subscribe(userquizs => {
        this.UserQuizs = userquizs;
        this.UserQuizs.forEach(data => {
          this.userQuizIds.push(data.quizId);
        })
        this.homequizzes.forEach(data => {
          this.userQuizIds.forEach(iddata => {

            if (iddata == data.id) {
              this.takenquizzes.push(data);
              var index: number = this.homequizzes.indexOf(data);
              this.homequizzes.splice(index, 1);
            }

          }
          )
        })

      })

      this.homequizzes.forEach(data => {



        var edate = new Date(data.endTime);
        var sDate = new Date(data.startTime);
        if (sDate > this.currentdate) {
          this.upcomingquizs.push(data);
        }
        else if (edate < this.currentdate) {
          this.expiredquizs.push(data);
        }
        else if (edate > this.currentdate) {
          this.ongoingquizs.push(data);
        }
      });
    });


  }

}

