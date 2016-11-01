module.exports = (function () {
    
    var AWS = require('aws-sdk');
    var FP = require('./FPModule-0.1.0.js').FP;
    var config = require('./config.js');
    require('./BucketInfo.js');
    var fs = require('fs');

    
    FP.define('AWS.S3.S3Manager', {
        config: {
            s3: {}
        },
        
        constructor: function (){
            // set the region
            AWS.config.region = config.region;
            
            // set the access keys
            AWS.config.update({ accessKeyId: config.credentials.AWSAccessKey, secretAccessKey: config.credentials.AWSSecretKey });

            this.s3 = new AWS.S3();
        },
        
        // This function returns list of buckets for the current authenticted user
        getBuckets: function (isDetails, callback){
            // array to hold buckets 
            var buckets = [];
            var me = this;
            
            // make S3 web service call to fetch list of buckets for which the current user has permissions for
            this.s3.listBuckets(function (err, data) {
                // if error, invoke the callback passing the error object
                if (err) {
                    callback(err, null);
                } else {
                    me._handleListBucketsSuccess(data, isDetails, buckets,callback);
                    
                    if (!isDetails) {
                        // handle successful operation
                        callback(null, buckets);
                    }
                }
            });
        },
        
        // This function returns list of objects for a bucket
        getBucketObjects: function (params, callback){
            // Array to hold the list of objects for a bucket
            var objects = [];
            var me = this;
            
            
            
            // Call S3 web service to retreive the list of objects for a bucket
            this.s3.listObjects(params, function (err, data) {
                if (err) {
                    callback(err);
                } else {
                    me._handleGetBucketObjectsSuccess(objects, data);

                    callback(null, objects);
                }
            });

        },
        
        // This function creates a bucket based on the passed in parameters
        createBucket: function (createBucketRequest, callback){
            var me = this;
            
            var params = {
                Bucket : createBucketRequest.getName(),
                CreateBucketConfiguration : {
                    LocationConstraint : createBucketRequest.getLocation()
                },
                ACL : createBucketRequest.getAcl()
            };

            // Call S3 web service to create the bucket
            this.s3.createBucket(params, function (err, data) {
                if (err) {
                    callback(err);
                } else {
                    var response = FP.create('AWS.S3.CreateBucketResponse', { location: data.Location });
                    callback(null, response);
                }
            });
        },
        
        // This function puts tags on a bucket
        putTagsToBucket: function (putBucketTagRequest, callback){
            var me = this;
            var params = {
                Bucket: putBucketTagRequest.getName(),
                Tagging: {
                    TagSet: me._getTagSet(putBucketTagRequest)
                }
            };

            this.s3.putBucketTagging(params, callback);
        },
        
        // This function uploads a simple file to a S3 bucket. Client can either pass a file name or stream
        uploadFile : function (objectUploadRequest, callback){
            var me = this;
            var params = {};
            
            // Read file using node file api
            fs.readFile(objectUploadRequest.fileName,'utf8', function (err, data) {
                if (err) {
                    callback(err);
                } else {
                    objectUploadRequest.body = data;
                    var params = me._getFileObjectUploadParams(objectUploadRequest);
                    me.s3.upload(params, function (err, data) {
                        callback(err, data);
                    });
                }
            });
        },
        
        // This function downloads an object given its key and bucket name
        downloadObject: function (objectGetRequest, callback){
            var me = this;
            var params = {
                Bucket : objectGetRequest.getName(),
                Key : objectGetRequest.getKey()
            };

            // Make S3 web service call to fetch the object data
            this.s3.getObject(params, function (err, data) {
                if (err) {
                    callback(err);
                } else {
                    // handle success
                    me._handleGetObjectSuccess(data,callback);
                }
            });

        },



        // Private functions:
        _handleListBucketsSuccess: function (data, isDetails, buckets,callback){
            var bucketCount = 0;

            for (var index in data.Buckets) {
                var bucket = data.Buckets[index];
                var bucketInfo = FP.create('AWS.S3.BucketInfo', { name: bucket.Name, creationDate : bucket.CreationDate });
                buckets.push(bucketInfo);

                if (isDetails) {
                    this._getBucketLocation(bucketInfo, function (err, data) {
                        if (!err) {
                            bucketInfo.setRegion(data.LocationConstraint);
                            bucketCount++;

                            if (bucketCount === buckets.length) {
                                callback(null, buckets);
                            }
                        }
                    });
                }
            }
        },

        _getBucketLocation: function (bucketInfo, callback){
            this.s3.getBucketLocation({Bucket : bucketInfo.getName()}, callback);
        },

        _handleGetBucketObjectsSuccess : function (objects, data){
            var contents = data.Contents;
            var length = contents.length;
            for (var i = 0; i < length; i++) {
                var content = contents[i];
                var objectInfo = FP.create('AWS.S3.ObjectInfo', {
                    name : content.Key,
                    lastModified: content.LastModified,
                    storageClass: content.StorageClass,
                    size: content.Size,
                    owner: {
                        displayName : content.Owner.DisplayName
                    }
                });

                objects.push(objectInfo);
            };
        },

        _getTagSet: function (request){
            var tags = request.tags;
            var length = tags.length;
            var s3Tags = [];
            for (var i = 0; i < length; i++) {
                var tag = { Key: tags[i].key, Value: tags[i].value };
                s3Tags.push(tag);
            }
            return s3Tags;
        },

        _getFileObjectUploadParams: function (objectUploadRequest) {
            var params = {
                Bucket : objectUploadRequest.getName(),
                Key : objectUploadRequest.getKey(),
                Body : objectUploadRequest.getBody(),
                Metadata: objectUploadRequest.getMetadata()
            };
            
            return params;
        },

        _handleGetObjectSuccess: function (data, callback){
            var getObjectResponse = FP.create('AWS.S3.ObjectGetResponse');
            getObjectResponse.setBody(data.Body);

            callback(null, getObjectResponse);
        }
    });

})();