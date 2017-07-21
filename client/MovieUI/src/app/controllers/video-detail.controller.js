(function () {
    'use strict';
    
    
    angular
        .module('movieApp')
        .controller('VideoDetailController', VideoDetailController);

    VideoDetailController.$inject = ['videoService', 'reviewService', '$routeParams'];
    
    function VideoDetailController(videoService,reviewService, $routeParams) {

        var videoDetailVm = this;

        videoDetailVm.video = {};
        videoDetailVm.comments = {};
        videoDetailVm.createComment = createComment;

        var getUserName = localStorage.getItem('myUser');

        videoDetailVm.myUser = JSON.parse(getUserName);

        init();

        function init() {

            console.log('video detail controller invoked');
            console.log($routeParams);

            videoService
                .getVideoById($routeParams.id)
                .then(function (response) {
                    videoDetailVm.video = response;
                    console.log(response);
                },function (error) {
                   console.log(error);
                });

            reviewService
                .getComments($routeParams.id)
                .then(function (response) {
                    videoDetailVm.comments = response;
                        console.log(response);
                }, function (error) {
                    console.log(error);
                });
        }

        function createComment() {
                var date = new Date();
                videoDetailVm.newComment.commentDate = date;
                videoDetailVm.newComment.commentBy = videoDetailVm.myUser.firstName + " " + videoDetailVm.myUser.lastName;

            reviewService
                .createComment($routeParams.id, videoDetailVm.myUser.userId,  videoDetailVm.newComment)
                .then(function (response) {
                    if(response) {
                        console.log("comment made: " + response);
                        window.location.reload();

                    }
                }, function (error) {
                    console.log(error);
                })
        }



    }
    
    
})();