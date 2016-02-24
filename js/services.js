var HOURLY = 'hourly';
var FOR_WORK = 'forwork';
var DataService = (function () {
    function DataService() {
        var _this = this;
        this.firebaseRef = new Firebase('https://gigapp.firebaseio.com/');
        this.postings = new Promise(function (resolve, reject) {
            _this.firebaseRef.child('postings').on('value', function (snapshot) {
                resolve(snapshot.val().map(function (posting) {
                    return _.assign({}, posting, {
                        postingDate: new Date(posting.postingDate)
                    });
                }));
            });
        });
    }
    DataService.prototype.getPostings = function () {
        return this.postings;
    };
    DataService.prototype.getPosting = function (postingId) {
        return this.postings.then(function (postings) {
            return postings.filter(function (posting) {
                return posting.postingId === parseInt(postingId.toString(), 10);
            })[0] || null;
        });
    };
    DataService.prototype.matchQuery = function (query, content) {
        return new RegExp(query.split('').join('(\.+)?'), 'i').test(content);
    };
    DataService.prototype.searchPostings = function (query) {
        var _this = this;
        return this.postings.then(function (postings) {
            return postings.filter(function (posting) {
                return _this.matchQuery(query, posting.title) ||
                    _this.matchQuery(query, posting.description);
            });
        });
    };
    return DataService;
}());
angular.module('starter.services', [])
    .service('dataService', DataService);
