﻿// Utility class for defining common functions related to S3
module.exports = (function () {
    var FP = require('./FPModule-0.1.0.js').FP;

    FP.define('AWS.S3.S3Utility', {
        staticClass: true,

        // This function returns a random name for a S3 key. Format : <random-value>/<utcnow>/
        // Algo: 
        // 1. Generates a random number between 1 and <length>.Each number is converted to hex and added to an array.
        // 2. All array elements are concateneted using join function
        // 3. 
        
        // https://s3.amazonaws.com/bucket_name/user_media/videos/screenshots/cmXRyLRQxe9R139023426817_vid001.jpeg
        //where the prefix: cmXRyLRQxe9R139023426817_ is a self generated string we build and concat to the original file name: vid001.jpg before uploading to s3.
        getRandomKeyName: function (length){
            var result = [];
            var min = 1;
            var max = length;
            
            // 
            for (var i = 0; i < length; i++) {
                result[i] = (Math.floor(Math.random() * (max - min + 1)) + min).toString(16);
            };
            var strResult = result.join('');
            var keyPrefix = (strResult + '/' + new Date().toISOString()).replace('T', '-').replace(/:/g, "-").replace(/\..+/, '') + '/';

            return keyPrefix;
        }
    });
})();