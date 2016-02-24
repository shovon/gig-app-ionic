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
  private postings: Posting[];

  constructor() {
    this.postings = [
      {
        postingId: 0,
        title: 'Bouncer',
        description: 'We need a bouncer asap!',
        postingDate: new Date(),
        compensation: {
          type: 'forwork',
          amount: 500
        }
      },
      {
        postingId: 1,
        title: 'Server',
        description: 'Our server called in sick, and so, we need somebody!',
        postingDate: new Date(),
        compensation: {
          type: 'hourly',
          amount: 12
        }
      },
      {
        postingId: 2,
        title: 'Web Designer',
        description: 'We just need a single page site to put one paragraph in it',
        postingDate: new Date(),
        compensation: {
          type: 'forwork',
          amount: 200
        }
      },
      {
        postingId: 3,
        title: 'Stocker',
        description: 'We need someone to restock our warehouse. It\'s been badly damaged',
        postingDate: new Date(),
        compensation: {
          type: 'hourly',
          amount: 20
        }
      },
      {
        postingId: 4,
        title: 'Cleaner',
        description: 'Our office is a mess, and nobody is willing to clean it up. This is why we need somebody like you!',
        postingDate: new Date(),
        compensation: {
          type: 'hourly',
          amount: 15
        }
      },
      {
        postingId: 5,
        title: 'Social Media Cleaner',
        description: 'Someone hacked our social media account, and made a mess on our Facebook, Twitter, and Instagram accounts. We need someone to painstaikingly remove all troll posts.',
        postingDate: new Date(),
        compensation: {
          type: 'forwork',
          amount: 800
        }
      },
      {
        postingId: 6,
        title: 'Server',
        description: 'Our best server has left us, and we need a replacement asap. This may turn into a full-time, permanent gig',
        postingDate: new Date(),
        compensation: {
          type: 'hourly',
          amount: 25
        }
      }
    ];
  }

  getPostings(): Posting[] {
    return this.postings;
  }

  getPosting(postingId: string | number): Posting {
    return this.postings.filter((posting) =>
      posting.postingId === parseInt(postingId.toString(), 10)
    )[0] || null;
  }
}

angular.module('starter.services', [])
  .service('dataService', DataService)
