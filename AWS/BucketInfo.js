module.exports = (function () {
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

    FP.define('AWS.S3.ObjectGetResponse', {
        extend: 'AWS.S3.BaseObjectInfo',
        config: {
            body: {},
            size:0,
            key: '',
            versionId: ''
        }
    });

    FP.define('AWS.S3.ObjectDeleteRequest', {
        extend: 'AWS.S3.ObjectGetRequest',
        config: {
            mfa:''
        }
    });
})();