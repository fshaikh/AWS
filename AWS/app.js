
var FP = require('./FPModule-0.1.0.js').FP;
require('./S3Manager.js');
var fs = require('fs');


var s3Manager = FP.create('AWS.S3.S3Manager');
s3Manager.getBuckets(false,function (err, data) {
    var length = data.length;
    for (var i = 0; i < length; i++) {
       // console.log(data[i].getName() + ' ' + data[i].getCreationDate());

        s3Manager.getBucketObjects({Bucket:data[i].getName()}, function (err, data) {
            if (!err) {
                var length = data.length;
                for (var i = 0; i < length; i++) {
                    //console.log(data[i].getName() + ' ' + data[i].getSize() + ' ' + data[i].getStorageClass() + ' ' + data[i].getOwner().displayName);
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

var objectuploadrequest = FP.create('AWS.S3.ObjectUploadRequest', {
    fileName: 'C:\\Users\\Fshaikh\\Downloads\\Redis in Action.pdf',
    key: 'redis',
    name: 'fromapp',
    useBody: false,
    metadata: {
        'type' : 'pdf',
        'holder': 'furqan shaikh'
    },
    contentType:'application/pdf'
});

s3Manager.uploadFileMultiPart(objectuploadrequest, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});

//s3Manager.uploadFile(objectuploadrequest, function (err, data) {
//    if (err) {
//        console.log(err);
//    } else {
//        console.log(data);
//    }
//});

//var getObjectRequest = FP.create('AWS.S3.ObjectGetRequest', {
//    name : 'fromapp',
//    key:'tennis'
//});

//s3Manager.downloadObject(getObjectRequest, function (err, getObjectResponse) {
//    if (err) {
//        console.log(err);
//    } else {
//        console.log(getObjectResponse.getBody());
//        fs.writeFile('C:\\Users\\Fshaikh\\Pictures\\tennis1.png', getObjectResponse.getBody(),function (err) {
//            console.log(err);
//        });
//    }
//});

//var deleteObjectRequest = FP.create('AWS.S3.ObjectDeleteRequest', {
//    name: 'fromapp',
//    key:'ps'
//});

//s3Manager.deleteObject(deleteObjectRequest, function (err, data) {
//    if (err) {
//        console.log(err);
//    } else {
//        console.log(data);
//    }
//});






