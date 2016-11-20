module.exports = (function () {
    var AWS = require('aws-sdk');
    var FP = require('./FPModule-0.1.0.js').FP;
    var config = require('./config.js');
    require('./EC2BaseObject.js');

    // Define the class
    FP.define('AWS.EC2.EC2Manager', {
        config: {
            ec2: {},
        },

        // Constructor
        constructor: function (){
            // set the region
            AWS.config.region = config.region;

            // set the access keys
            AWS.config.update({ accessKeyId: config.credentials.AWSAccessKey, secretAccessKey: config.credentials.AWSSecretKey});
            
            this.ec2 = new AWS.EC2();
        },

        // Public instance functions - START
        
        // This function desribes instances
        describeInstances: function (request, callback){
            this.ec2.describeInstances({}, callback);
        },

        // This function creates volume
        createVolume: function (request, callback){
            var params = {
                AvailabilityZone: config.region,
                DryRun: request.getDryRun(),
                Encrypted: request.getEncrypted(),
                Iops: request.getIops(),
                Size: request.getSize(),
                SnapshotId: request.getSnapshotId(),
                VolumeType: request.getVolumeType()
            };

            this.ec2.createVolume(params, function (err, data) {
                if (err) {
                    callback(err);
                } else {
                    var response = FP.create('AWS.EC2.CreateVolumeResponse', {
                        volumeId: data.VolumeId,
                        size: data.Size,
                        snapshotId: data.SnapshotId,
                        availabilityZone: data.AvailabilityZone,
                        state: data.State,
                        createTime: data.CreateTime,
                        iops: data.Iops
                    });

                    callback(null, response);
                }
            });
        }
    });
})();