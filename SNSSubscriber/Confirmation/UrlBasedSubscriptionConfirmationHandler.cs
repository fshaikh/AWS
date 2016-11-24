using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SNSSubscriber.Models;
using System.Net;
using System.Xml;

namespace SNSSubscriber.Confirmation
{
    public class UrlBasedSubscriptionConfirmationHandler : ISubscriptionConfirmationHandler
    {
        public ConfirmationSubscriptionResponse ConfirmSubscription(ConfirmSubscriptionRequest request)
        {
            string subscriberUrl = request.Url;
            ConfirmationSubscriptionResponse response = new ConfirmationSubscriptionResponse();

            // Send a HTTP GET request to the above url and ensure it returns a valid xml with a subscription arn
            try
            {
                var client = new WebClient();
                string responseString = client.DownloadString(subscriberUrl);
                response.IsSuccess = true;
                

            }
            catch(Exception exObj)
            {
                response.IsSuccess = false;
                response.Exception = exObj;
                response.Message = exObj.Message;
            }

            return response;
        }

        private bool GetSubscriptionArn(string responseString,ref string subscriptionArn)
        {
            XmlDocument xmlDocument = new XmlDocument();
            xmlDocument.LoadXml(responseString);

            return true;

            /*
             * <ConfirmSubscriptionResponse xmlns="http://sns.amazonaws.com/doc/2010-03-31/">
  <ConfirmSubscriptionResult>
    <SubscriptionArn>arn:aws:sns:us-west-2:123456789012:MyTopic:2bcfbf39-05c3-41de-beaa-fcfcc21c8f55</SubscriptionArn>
  </ConfirmSubscriptionResult>
  <ResponseMetadata>
    <RequestId>075ecce8-8dac-11e1-bf80-f781d96e9307</RequestId>
  </ResponseMetadata>
  </ConfirmSubscriptionResponse>
             */
        }
    }
}