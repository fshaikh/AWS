using SNSSubscriber.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SNSSubscriber.Confirmation
{
    public interface ISubscriptionConfirmationHandler
    {
        ConfirmationSubscriptionResponse ConfirmSubscription(ConfirmSubscriptionRequest request);
        
    }
}
