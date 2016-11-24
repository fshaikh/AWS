using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SNSSubscriber.Models
{
    public class ResponseBase
    {
        public bool IsSuccess { get; set; }

        public string Message { get; set; }

        public Exception Exception { get; set; }
    }
}