# AWS

Make all calls from nodejs app using Developers group in IAM - DONE

Get list of all buckets - DONE
   Returns all buckets for which the current user has access to. For eg: i created an IAM user under "Developers" group and gave S3FullAccess permission to the group. In the application, used Access Key and Secret Key of the IAM user. listBuckets function returns all the buckets across all the regions.
   listBuckets returns 2 objects : Buckets -> Bucket -> Name, CreationDate. Owner -> 

Get bucket properties - DONE
    use getBucket* functions

Get list of objects in a bucket - DONE

Create a bucket - DONE
Modify bucket configuration
  Logging
       Understand what logging is?
       enable and see it in action
  Events
  Lifecycle
  Tags - DONE

Add files to a bucket 
  Add image file  - DONE
  Add txt file    - DONE
Add metadata to objects - DONE .
   All tag keys are prefixed with x-amz-meta-

Download object
   Txt content - DONE
   Blob content - DONE
   Image

Delete
  Object
  Bucket

Pre-reqs
npm install aws-sdk



