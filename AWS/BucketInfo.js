﻿module.exports = (function () {
    var FP = require('./FPModule-0.1.0.js').FP;
    
    // Base class for all S3 Objects
    FP.define('AWS.S3.BaseObjectInfo', {
        config: {
            name: '',
            metadata: {}
        }
    });
    
    // This class represents Bucket info object. Contains properties for a bucket. Usage: listObjects API returns array of BucketInfo
    FP.define('AWS.S3.BucketInfo', {
        extend: 'AWS.S3.BaseObjectInfo',

        config: {
            creationDate: '',
            region:''
        }
    });
    
    // This class represents Bucket Version info
    FP.define('AWS.S3.BucketVersionInfo', {
        extend: 'AWS.S3.BaseObjectInfo',
        config: {
            status: '',
            mfaDelete:''
        }
    });
    
    // This class represents object info . Contains properties for a S3 object. Usage: listObjects API returns array of BucketInfo
    FP.define('AWS.S3.ObjectInfo', {
        extend: 'AWS.S3.BaseObjectInfo',

        config: {
            key: '',
            lastModified: '',
            eTag: '',
            size: 0,
            storageClass: '',
            owner: {
                displayName: '',
                id:''
            },
            prefix: ''
        }
    });
    

    FP.define('AWS.S3.CreateBucketRequest', {
        extend: 'AWS.S3.BaseObjectInfo',
        config: {
            location: '',
            acl:''
        }
    });

    FP.define('AWS.S3.CreateBucketResponse', {
        config: {
            location:''
        }
    });

    FP.define('AWS.S3.Location', {
        staticClass: true,
        config: {
            EU : 'EU',
            EUWEST1: "eu-west-1",
            USWEST1: "us-west-1",
            USWEST2: "us-west-2",

        },
        getLocation: function(){
            console.log('location');
        }
    });

    FP.define('AWS.S3.PutBucketTagRequest', {
        extend: 'AWS.S3.BaseObjectInfo',
        config: {
            tags:[]
        }
    });

    FP.define('AWS.S3.ObjectUploadRequest', {
        extend: 'AWS.S3.BaseObjectInfo',
        config: {
            key: '',
            body: {},
            fileName: '',
            useBody: false,
            contentType:''
        }
    });
    
    FP.define('AWS.S3.ObjectMultiPartUploadResponse', {
        extend: 'AWS.S3.BaseObjectInfo',
        config: {
            uploadId:''
        }
    });

    FP.define('AWS.S3.ObjectGetRequest', {
        extend: 'AWS.S3.BaseObjectInfo',
        config: {
            key: '',
            versionId:''
        }
    });
    
    FP.define('AWS.S3.ObjectResponseBase', {
        extend: 'AWS.S3.BaseObjectInfo',
        config: {
            size: 0,
            key: '',
            versionId: '',
            deleteMarker: false,
            metadata: {},
            storageClass: '',
            acceptRanges:'',
            expiration: '',
            lastModified: '',
            contentLength: 0,
            contentType: '',
            expires: '',
            partsCount:0
        }
    });

    FP.define('AWS.S3.ObjectGetResponse', {
        extend: 'AWS.S3.BaseObjectInfo',
        config: {
            body: {}
        }
    });

    FP.define('AWS.S3.ObjectDeleteRequest', {
        extend: 'AWS.S3.ObjectGetRequest',
        config: {
            mfa: ''
        }
    });

    FP.define('AWS.S3.LifecycleRule', {
        extend: 'AWS.S3.BaseObjectInfo',
        config: {
            prefix: '', // Required
            status: '', // Required. Values: Enabled / Disabled
            AbortIncompleteMultipartUpload: {
                DaysAfterInitiation: 0
            },
            transitions:[]
        },

        applyPrefix: function (prefixVal){
            if (prefixVal === '') {
                console.log('Prefix is required');
            } else {
                return prefixVal;
            }
        }
    });

    FP.define('AWS.S3.SignedUrlRequest', {
        extend: 'AWS.S3.BaseObjectInfo',
        config: {
            key: '',
            expires: 900, // Number of seconds to expire the pre-signed URL operation. Defaults to 15 minutes
            operation:''
        }
    });

    FP.define('AWS.S3.LoggingSetRequest', {
        extend: 'AWS.S3.BaseObjectInfo',
        config: {
            enabled: true,
            targetBucket: '', // Bucket to send logs to
            targetPrefix:'' // If multiple buckets are sending logs to the same bucket, specify prefix to distinguish between source bucket logs
        }
    });

})();