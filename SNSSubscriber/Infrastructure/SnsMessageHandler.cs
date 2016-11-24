using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace SNSSubscriber.Infrastructure
{
    /// <summary>
    /// Custom HTTP Message handler for handling SNS requests.
    /// AWS SNS sends the JSON payload. However, it sets the content-type as plain/text.Web API doesnt have a OOB media formatter for plain/text.
    /// As a result,415 is returned to AWS without hitting controller. We trap the request using this HTTP handler and set the content type to application/json.
    /// </summary>
    public class SnsMessageHandler : DelegatingHandler
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            // Set the content type on the request.
            MediaTypeHeaderValue contentType = new MediaTypeHeaderValue(Constants.JSONCONTENTTYPE);
            request.Content.Headers.ContentType = contentType;

            // Call the inner handler.
            var response = base.SendAsync(request, cancellationToken);

            return response;
        }
    }
}