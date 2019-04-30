import {AnswerOptions} from './answerOptions';
export interface QuestionAndAnswer{
    id : number;
    questionText: string;
    questionTypeId: number;
    quizId : number;
    questionOptions:AnswerOptions[];
}