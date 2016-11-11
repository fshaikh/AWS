var FP = require('./FPModule-0.1.0.js').FP;
require('./S3Manager.js');
require('./S3Utility.js');

var s3Manager = FP.create('AWS.S3.S3Manager');

deleteObject();

s3Manager.getBuckets(false,function (err, data) {
    var length = data.length;
    for (var i = 0; i < length; i++) {
       // console.log(data[i].getName() + ' ' + data[i].getCreationDate());

        s3Manager.getBucketObjects({Bucket:data[i].getName()} , true, function (err, data) {
            if (!err) {
                var length = data.length;
                for (var i = 0; i < length; i++) {
                    //console.log(data[i].getName() + ' ' + data[i].getSize() + ' ' + data[i].getStorageClass() + ' ' + data[i].getOwner().displayName);
                }
            }
        });
    };
    
});

function createBucket(){
    var createBucketRequest = FP.create('AWS.S3.CreateBucketRequest', {
        name: 'fromapp',
        location: "us-west-2",
        acl: "authenticated-read"
    });
    s3Manager.createBucket(createBucketRequest, function (err, responseObj) {
        if (err) {
            console.log(err);
        } else {
            console.log(responseObj.getLocation());
        }
    });
}

function addTagsToBucket(){
    var putBucketTagRequest = FP.create('AWS.S3.PutBucketTagRequest', {
        name: 'fromapp',
        tags:[{key:'Holder',value:'Furqan'}]
    });

    s3Manager.putTagsToBucket(putBucketTagRequest, function (err, data) {
        console.log(data);
    });
}

function uploadObject(){
    var objectuploadrequest = FP.create('AWS.S3.ObjectUploadRequest', {
        fileName: 'C:\\Users\\Fshaikh\\Desktop\\Upload.txt',
        //key: 'text/' + AWS.S3.S3Utility.getRandomKeyName(8) + 'Upload.txt',
        key:'text/68211223/2016-11-11-16-41-26/Upload.txt',
        name: 'fromapp',
        useBody: false,
        metadata: {
            'type' : 'txt',
            'holder': 'furqan shaikh'
        },
        contentType: 'text/plain'
    });

    s3Manager.uploadFile(objectuploadrequest, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    });
}

function uploadMultiPart(){
    var objectuploadrequest = FP.create('AWS.S3.ObjectUploadRequest', {
        fileName: 'C:\\Users\\Fshaikh\\Downloads\\Redis in Action.pdf',
        key: AWS.S3.S3Utility.getRandomKeyName(8) + 'redis.pdf',
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

}

function downloadObject(){
    var getObjectRequest = FP.create('AWS.S3.ObjectGetRequest', {
        name : 'fromapp',
        key:'tennis'
    });

    s3Manager.downloadObject(getObjectRequest, function (err, getObjectResponse) {
        if (err) {
            console.log(err);
        } else {
            console.log(getObjectResponse.getBody());
            fs.writeFile('C:\\Users\\Fshaikh\\Pictures\\tennis1.png', getObjectResponse.getBody(),function (err) {
                console.log(err);
            });
        }
    });
}

function deleteObject(){
        var deleteObjectRequest = FP.create('AWS.S3.ObjectDeleteRequest', {
            name: 'fromapp',
            key: 'text/68211223/2016-11-11-16-41-26/Upload.txt',
            versionId:'gmDtq3BLOMBNY_mApMd9eX_h9OdryNrV'
        });
    
        s3Manager.deleteObject(deleteObjectRequest, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        });
}

function getSignedUrl(){
    var signedUrlRequest = FP.create('AWS.S3.SignedUrlRequest', { name: 'fromapp', expires: 900, operation: 'putObject' });
    s3Manager.getSignedUrl(signedUrlRequest, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    });
}

function setBucketLifecycleConfig(){
    var request = FP.create('AWS.S3.LifecycleRule', { name: 'fromnode' });
    request.setPrefix('RuleFromSDK');
    request.setStatus('Disabled');
    request.setAbortIncompleteMultipartUpload({ DaysAfterInitiation: 1 });
    request.setTransitions([
        {
            Days: 30,
            StorageClass:'STANDARD_IA'
        },
        {
            Days: 61,
            StorageClass: 'GLACIER'
        }
    ]);
    s3Manager.setBucketLifecycleConfiguration(request, function (err, data) {
        console.log(data);
    });
}

function getSetBucketVersioning(){
    //var request = FP.create('AWS.S3.BucketVersionInfo', { name: 'fromapp',status:'Enabled' });
//s3Manager.getBucketVersioning(request, function (err, data) {
//    if (err) {
//        console.log(err);
//    } else {
//        console.log(data.getStatus());
//    }
//});
//s3Manager.setBucketVersioning(request, function (err, data) {
//    if (err) {
//        console.log(err);
//    } else {
//        console.log(data);
//    }
//});
}






