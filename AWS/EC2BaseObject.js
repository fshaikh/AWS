module.exports = (function () {
    var FP = require('./FPModule-0.1.0.js').FP;
    
    // Base class for all S3 Objects
    FP.define('AWS.EC2.BaseObjectInfo', {
        config: {
            name: '',
            metadata: {}
        }
    });
    
    // Base class for create volume request/response
    FP.define('AWS.EC2.CreateVolumeBase', {
        config: {
            availabilityZone: '',
            size: 0,
            snapshotId: '',
            iops: 0,
            encrypted: false,
        }
    })

    // Class for create volume request
    FP.define('AWS.EC2.CreateVolumeRequest', {
        extend:'AWS.EC2.CreateVolumeBase',
        config: {
            dryRun: false,
            volumeType:''
        }
    });

    // Class for create volume response
    FP.define('AWS.EC2.CreateVolumeResponse', {
        extend: 'AWS.EC2.CreateVolumeBase',
        config: {
            volumeId: '',
            state: '',
            createTime: ''
        }
    });
})();