
var FP = require('./FPModule-0.1.0.js').FP;
require('./S3Manager.js');
var fs = require('fs');

console.log(AWS.S3.Location.EU);
var s3Manager = FP.create('AWS.S3.S3Manager');
s3Manager.getBuckets(false,function (err, data) {
    var length = data.length;
    for (var i = 0; i < length; i++) {
        console.log(data[i].getName() + ' ' + data[i].getCreationDate());

        s3Manager.getBucketObjects({Bucket:data[i].getName()}, function (err, data) {
            if (!err) {
                var length = data.length;
                for (var i = 0; i < length; i++) {
                    console.log(data[i].getName() + ' ' + data[i].getSize() + ' ' + data[i].getStorageClass() + ' ' + data[i].getOwner().displayName);
                }
            }
        });
    };
    
});

//var createBucketRequest = FP.create('AWS.S3.CreateBucketRequest', {
//    name: 'fromapp',
//    location: "us-west-2",
//    acl: "authenticated-read"
//});
//s3Manager.createBucket(createBucketRequest, function (err, responseObj) {
//    if (err) {
//        console.log(err);
//    } else {
//        console.log(responseObj.getLocation());
//    }
//});

//var putBucketTagRequest = FP.create('AWS.S3.PutBucketTagRequest', {
//    name: 'fromapp',
//    tags:[{key:'Holder',value:'Furqan'}]
//});

//s3Manager.putTagsToBucket(putBucketTagRequest, function (err, data) {
//    console.log(data);
//});

//var fs = require('fs');
//fs.readFile('C:\\Users\\Fshaikh\\Documents\\AWS\\vpc.txt', 'utf8', function (err, data) {
//    if (err) {
//        console.log(err);
//    } else {
//        console.log(data);
//    }
//});

//var objectUploadRequest = FP.create('AWS.S3.ObjectUploadRequest', {
//    fileName: 'C:\\Users\\Fshaikh\\Pictures\\SO-Architecture-Overview-Logical.svg',
//    key: 'so-architecture',
//    name: 'fromapp',
//    useBody: false,
//    metadata: {
//        'Type' : 'SVG',
//        'Holder':'Furqan'
//    }
//});

//s3Manager.uploadFile(objectUploadRequest, function (err, data) {
//    if (err) {
//        console.log(err);
//    } else {
//        console.log(data);
//    }
//});

var getObjectRequest = FP.create('AWS.S3.ObjectGetRequest', {
    name : 'fromapp',
    key:'so-architecture'
});

s3Manager.downloadObject(getObjectRequest, function (err, getObjectResponse) {
    if (err) {
        console.log(err);
    } else {
        console.log(getObjectResponse.getBody());
        fs.writeFile('C:\\Users\\Fshaikh\\Pictures\\so.svg', getObjectResponse.getBody(),function (err) {
            console.log(err);
        });
    }
});






