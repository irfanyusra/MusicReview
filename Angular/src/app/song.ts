export class Song {
  constructor(
    // public id: String,
    public title: String,
    public artist: String,
    public album: String,
    public year: Number,
    public genre: String,
    public comment : String,
    public hidden: Boolean,
    public copyRightViolation: Boolean,
    public noOfReviews: Number,
    public avgRatings: Number
  ) {}
}
