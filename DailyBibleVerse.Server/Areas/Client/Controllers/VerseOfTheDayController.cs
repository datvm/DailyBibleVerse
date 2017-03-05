using DailyBibleVerse.Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace DailyBibleVerse.Server.Areas.Client.Controllers
{
    
    [RoutePrefix("api/v1/votd")]
    public class VerseOfTheDayController : ApiController
    {

        [HttpGet, Route(""), Route("niv")]
        public BibleGatewayVotd Niv()
        {
            return VersesOfTheDay.NIV.VotdResponse;
        }

        [HttpGet, Route("Viet")]
        public BibleGatewayVotd Viet()
        {
            return VersesOfTheDay.VIET1934.VotdResponse;
        }

    }

}
