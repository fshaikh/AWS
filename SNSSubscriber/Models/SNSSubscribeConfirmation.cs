using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SNSSubscriber.Models
{
    public class SNSSubscribeConfirmation: SNSObjectBase
    {
        // Token,SubscribeURL,
        public string Token { get; set; }

        public string SubscribeURL { get; set; }
    }
}