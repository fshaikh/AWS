# AWS

1 .Basic Operations
	Make all calls from nodejs app using Developers group in IAM - DONE

	Get list of all buckets - DONE
	   Returns all buckets for which the current user has access to. For eg: i created an IAM user under "Developers" group and gave S3FullAccess permission to the group. In the application, used Access Key and Secret Key of the IAM user. listBuckets function returns all the buckets across all the regions.
	   listBuckets returns 2 objects : Buckets -> Bucket -> Name, CreationDate. Owner -> 

	Get bucket properties - DONE
		use getBucket* functions

	Get list of objects in a bucket - DONE

	Create a bucket - DONE
	Modify bucket configuration
	  Tags - DONE

	Add files to a bucket 
	  Add image file  - DONE
	  Add txt file    - DONE
	Add metadata to objects - DONE .
	   All tag keys are prefixed with x-amz-meta-

	Download object
	   Txt content - DONE
	   Blob content - DONE
	   Image - DONE

	Delete
	  Object - DONE
	  Bucket

2. Upload using multi-part algorithm
	Upload large files using multi-part - DONE

3. CORS
	Understand the concept and basic minimum configuration

4. Lifecycle management - DONE
       Understand 3 different storage classes : Standard, Standard IA, Glacier
	   Understand the transitions
	   API (get, put)

5. Bucket Policy
6. Replication
7. Static website using S3
8. Transfer Acceleration
9. Logging
10. Request Payment
11. Versioning
12. Torrent support

13. Signed URLs - DONE
       Signed URLs allows to provide a temporary access to S3 bucket/object without a need to create IAM user/sharing AWS credentials.
	   To generate a url: bucket, object key (not required if PUT), expires, Operations (getObject, putObject)
	   One can then share the URL. Ex: https://fromapp.s3-us-west-2.amazonaws.com/so-architecture?AWSAccessKeyId=AKIAJVHMXM7IMIOE3CJQ&Expires=1478524540&Signature=eyliob%2F19uQxbLaQAJA4dx2nN7Q%3

14. HEAD calls against Bucket and Objects
15. S3 Events
16. Performance Optimizations



Pre-reqs
npm install aws-sdk



