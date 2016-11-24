using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SNSSubscriber.Confirmation;
using SNSSubscriber.Models;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SNSSubscriber.Controllers
{
    /// <summary>
    /// Web API controller to act as HTTP-based subscriber endpoint.
    /// </summary>
    [RoutePrefix("api")]
    public class SnsSubscriberController : ApiController
    {
        #region Action Methods
        /// <summary>
        /// Ping action method. Used only for health monitoring. Not required by AWS SNS.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("subscriber/ping")]
        public HttpResponseMessage Ping()
        {
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        /// <summary>
        /// Action method invoked when AWS SNS sends POST request for : Subscription Confirmation, Notification, Unsubscribe Confirmation,
        /// </summary>
        /// <param name="message">JSON request sent by AWS SNS</param>
        /// <returns></returns>
        [HttpPost]
        [Route("subscriber/handlemessage")]
        public HttpResponseMessage HandleMessage([FromBody]JToken message)
        {
            // read the header and figure out the request type
            MessageTypeEnum messageType = MessageTypeEnum.None;
            if (!GetMesageType(ref messageType))
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Invalid Request Type");
            }

            string rawMessage = string.Empty;
            if(!GetRawMessage(message,ref rawMessage))
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Incoming message is invalid format");
            }

            switch (messageType)
            {
                case MessageTypeEnum.SubscriptionConfirmation:
                    return HandleConfirmSubscribe(rawMessage);
                case MessageTypeEnum.Notification:
                    return HandleNotification(rawMessage);
                default:
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError,"Invalid Message Type");
            }
        }

        #endregion Action Methods

        #region Private Methods
        private bool GetRawMessage(JToken message,ref string rawMessage)
        {
            try
            {
                rawMessage = message.ToString();
                return true;
            }
            catch(Exception)
            {
                return false;
            }
        }

        private bool GetMesageType(ref MessageTypeEnum messageTypeEnum)
        {
            string messagetype = Request.Headers.GetValues(Constants.MESSAGEHEADER).FirstOrDefault();
            switch (messagetype)
            {
                case Constants.MESSAGE_SUBSCRIPTIONCONFIRMATION:
                    messageTypeEnum = MessageTypeEnum.SubscriptionConfirmation;
                    return true;
                case Constants.MESSAGE_NOTIFICATION:
                    messageTypeEnum = MessageTypeEnum.Notification;
                    return true;
                case Constants.MESSAGE_UNSUBSCRIBECONFIRMATION:
                    messageTypeEnum = MessageTypeEnum.UnsubscribeConfirmation;
                    return true;
                default:
                    return false;
            }
        }

        private HttpResponseMessage HandleConfirmSubscribe(string message)
        {
            // parse the message
            SNSSubscribeConfirmation obj = JsonConvert.DeserializeObject<SNSSubscribeConfirmation>(message);

            // There are 2 ways of subscription confirmation
            // 1. Send a HTTP GET request to SubscriberURL and wait for a xml response which contains a subscription arn
            // 2. Call ConfirmSubscription AWS API passing token and check response
            var handler = GetConfirmationHandler();
            var response = handler.ConfirmSubscription(new ConfirmSubscriptionRequest
            {
                Token = obj.Token,
                Arn = obj.TopicArn,
                Url = obj.SubscribeURL
            });

            if (response.IsSuccess)
            {
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, response.Message);
            }
        }

        private ISubscriptionConfirmationHandler GetConfirmationHandler()
        {
            return new UrlBasedSubscriptionConfirmationHandler();
        }

        private HttpResponseMessage HandleNotification(string message)
        {
            // parse the message
            SNSNotification obj = JsonConvert.DeserializeObject<SNSNotification>(message);

            // read the subject and message
            string subject = obj.Subject;
            string topicMessage = obj.Message;

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        #endregion Private Methods
    }
}