const HOURLY = 'hourly';
const FOR_WORK = 'forwork';

interface Posting {
  postingId: number;
  title: string;
  description: string;
  postingDate: Date;
  compensation: {
    type: 'hourly' | 'forwork',
    amount: number
  };
}

class DataService {
  private postings: Promise<Posting[]>;
  private firebaseRef: Firebase;

  constructor() {
    this.firebaseRef = new Firebase('https://gigapp.firebaseio.com/');

    this.postings = new Promise<Posting[]>((resolve, reject) => {
      this.firebaseRef.child('postings').on('value', (snapshot) => {
        resolve(snapshot.val().map((posting: any): Posting => {
          return _.assign({}, posting, {
            postingDate: new Date(posting.postingDate)
          }) as Posting;
        }));
      });
    });
  }

  getPostings(): Promise<Posting[]> {
    return this.postings;
  }

  getPosting(postingId: string | number): Promise<Posting> {
    return this.postings.then((postings) => {
      return postings.filter((posting) =>
        posting.postingId === parseInt(postingId.toString(), 10)
      )[0] || null
    });
  }

  private matchQuery(query: string, content: string): boolean {
    return new RegExp(query.split('').join('(\.+)?'), 'i').test(content);
  }

  searchPostings(query: string): Promise<Posting[]> {
    return this.postings.then(postings => {
      return postings.filter((posting) => {
        return this.matchQuery(query, posting.title) ||
          this.matchQuery(query, posting.description);
      });
    });
  }
}

angular.module('starter.services', [])
  .service('dataService', DataService)
