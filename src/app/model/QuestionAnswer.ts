export interface QuestionAnswer
{
    questionText:String
    questionTypeId:number
    questionOptions : QuestionOption[]
    
}
export interface QuestionOption {
    option: string;
    isCorrect: boolean;
  }
  ``
  export interface QuestionCollection {
    Questions : QuestionAnswer[]
  }