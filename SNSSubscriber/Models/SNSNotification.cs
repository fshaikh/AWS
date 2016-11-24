using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SNSSubscriber.Models
{
    public class SNSNotification:SNSObjectBase
    {
        // Subject,UnsubscribeURL
        public string Subject { get; set; }
        public string UnsubscribeURL { get; set; }
    }
}