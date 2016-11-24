

namespace SNSSubscriber.Models
{
    public class ConfirmSubscriptionRequest
    {
        public string Token { get; set; }
        public string Arn { get; set; }
        public string Url { get; set; }
    }

}