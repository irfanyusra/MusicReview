export class Review {
         constructor(
           public subject: string,
           public comment: string,
           public songId: string,
           public submittedBy: string,
           public rating: number
          //  public submittedOn: Date
         ) {}
       }
