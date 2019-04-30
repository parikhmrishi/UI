export interface Homequiz{
        id:number;
        name :  string ;
        description :  string ;
        startTime :Date ;
        endTime: Date;
        numberOfQuestionsDisplayed:number;
        createdby :string ;
        lastUpdatBy :string ;
        isReactive :boolean;
}