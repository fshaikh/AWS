using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SNSSubscriber.Models
{
    public class SNSObjectBase
    {
        // Type, MessageId,TopicArn,Message,Timestamp,SignatureVersion,Signature,SigningCertURL
        public MessageTypeEnum MessageType { get; set; }
        public string TopicArn { get; set; }
        public string Message { get; set; }

        public DateTime? Timestamp { get; set; }

        public string SignatureVersion { get; set; }

        public string Signature { get; set; }
        public string SigningCertURL { get; set; }
    }
}